import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import Button from "~/components/Button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBulkWishAPI, getWishAPI, userLogin } from "~/utils/account";
import { ErrorResponse, ProductData } from "types";
import Cookies from "js-cookie";
import Loader from "../Loader";
import SocialLogin from "./SocialLogin";
import { INPUT_CLASSES, LABEL_CLASSES } from "~/commonUIClasses";



type FormData = {
    username: string;
    password: string;
    remember: number;
  };

  
export default function LoginForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const routeData = useLoaderData();
  
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit, setValue, formState: { errors: formErrors } } = useForm();
  
    const [errors, setErrors] = useState({
      username: '',
      password: '',
      general: ''
    });
  
    const scrollToFirst = () => {
      setTimeout(() => {
        const element = document.querySelector('.border-red-500') as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = window.pageYOffset + rect.top - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
          const parent = document.querySelector('.login-form') as HTMLElement;
          if (parent) {
            const rect = parent.getBoundingClientRect();
            const offset = window.pageYOffset + rect.top - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          } else {
            const bodyRect = document.body.getBoundingClientRect();
            const offset = window.pageYOffset + bodyRect.top - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        }
      }, 500);
    };
    let localStorageWishlistItems;
    let updatedWishlistItems: number[] = [];
    if (typeof window !== "undefined") {
      localStorageWishlistItems = localStorage.getItem("wishlistItems");
      if (localStorageWishlistItems) {
        const wishlistItems = JSON.parse(localStorageWishlistItems) as ProductData[];
        updatedWishlistItems = wishlistItems.map((item: ProductData) => item.id);
      }
    }
    const addBulkWishList = async () => {
      try {
        const response = await addBulkWishAPI(updatedWishlistItems);
        if ((response as ErrorResponse).status === "error") {
          throw new Error((response as ErrorResponse).msg);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchWishListData = async () => {
      try {
        const response = await getWishAPI();
        setIsLoading(false);
        if ((response as ErrorResponse).status === "error") {
          throw new Error((response as ErrorResponse).msg);
        }
        localStorage.setItem("wishlistItems", JSON.stringify(response));
      } catch (error) {
        console.error(error.message);
      }
      setIsLoading(false);
    };
  
    const handleLoginSuccess = (user_id: number, token: string) => {
      // Store user ID in a cookie
      Cookies.set('user_id', user_id);
      Cookies.set('token', token);
      addBulkWishList();
      fetchWishListData();
      Cookies.set('isCurrentUser', 'true', { expires: new Date(Date.now() + 10 * 60 * 1000) });
      // Redirect to the dashboard or any other authorized page
      navigate('/my-account');
    };
  
    const onSubmit = (formData: FormData) => {
      const remember = formData.remember ? 1 : 0;
      userLogin(formData)
        .then((responseData: any) => {
          if (responseData.status === 'success' && responseData.msg) {
            if (responseData.msg_code === 'login_error') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                general: responseData.msg,
              }));
            } else if (responseData.msg_code === 'login_success') {
              console.log('Success Login');
              handleLoginSuccess(responseData.user_id, responseData.token);
            } else {
              scrollToFirst();
              setErrors((prevErrors) => ({
                ...prevErrors,
                general: 'An error occurred.',
              }));
            }
            setIsLoading(false);
          } else if (responseData.ERR === 'ERR_No_Payload') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: 'No payload received.',
            }));
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log('Failed to login:', error);
        });
    };
  
    
    useEffect(() => {
      setIsLoading(false);
      const user_id = Cookies.get('user_id');
      if (user_id) {
        navigate('/my-account');
        return;
      }
    }, []);
    return (
        <div className="relative w-full px-4">
            {isLoading ? (
                <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                    <Loader />
                </div>
            ) : ('')}

            <div
                className="relative mx-auto overflow-hidden bg-white py-16 px-10 md:py-20 sm:px-12 rounded-[32px] shadow-2xl"
            >
                <h1 className="mb-14 leading-none tracking-tight text-center text-black text-4xl font-bold">{t('login')}</h1>
                {errors.general && (
                    <p className="p-2 my-2 text-xs text-red-800 bg-red-100 border border-red-500 rounded">
                        {errors.general}
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="mb-5">
                        <label
                            htmlFor="username"
                            className={LABEL_CLASSES}
                        >
                            {t("login_label")}
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="username"
                                placeholder={t("login_label") as string}
                                {...register("username", {
                                    required: t("fields.username_required")
                                })}
                                className={`${INPUT_CLASSES} ${formErrors.username && "border-red-500"}`}
                            />
                            {formErrors.username && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.username.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className={LABEL_CLASSES}
                        >
                            {t("password")}
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="password"
                                placeholder={t("password") as string}
                                {...register("password", {
                                    required: t("fields.password_required"),
                                    // minLength: {
                                    //   value: 5,
                                    //   message: t("password_length")
                                    // },
                                    // pattern: {
                                    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
                                    //   message: t("password_pattern")
                                    // }
                                })}
                                className={`${INPUT_CLASSES} ${formErrors.password && "border-red-500"}`}
                            />
                            {formErrors.password && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.password.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-5">
                        <Button name={t("sign_in")} width="full" extraclass="mt-5 leading-5" type="submit" />
                    </div>
                </form>
                <div className="text-center">
                    <Link
                        to="/forgot"
                        className="text-xl text-green-200 underline"
                    >
                        {t('forget_password')}
                    </Link>
                </div>
                <div className="pt-10 border-t border-gray-200 mt-14">
                    <SocialLogin />
                </div>
            </div>
        </div>
    )
}
