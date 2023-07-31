import { useState } from "react";
// import FacebookLogin from "@greatsumini/react-facebook-login";
// import { GoogleLogin } from '@leecheuk/react-google-login';
import { useTranslation } from "react-i18next";
import { ErrorResponse, ProductData } from "types";
import { addBulkWishAPI, getWishAPI, checkFBLogin } from "~/utils/account";
import Cookies from "js-cookie";
import { useNavigate } from "@remix-run/react";

export default function SocialLogin() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: ''
    });
    const handleFacebookLogin = (response: any) => {
        console.log(response);
        fbLogin(response.email, response.id, response.name)
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
    const fbLogin = async (email, id, name) => {
        try {
            const response = await checkFBLogin(email, id, name);
            if (response.status === 'success' && response.msg) {
                if (response.msg_code === 'login_error') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: response.msg,
                    }));
                } else if (response.msg_code === 'login_success') {
                    console.log('Success Login');
                    handleLoginSuccess(response.user_id, response.token);
                } else {
                    //   scrollToFirst();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: 'An error occurred.',
                    }));
                }
                setIsLoading(false);
            } else if (response.ERR === 'ERR_No_Payload') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: 'No payload received.',
                }));
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    const [userName, setUserName] = useState('');

    const handleGoogleLoginSuccess = (response: any) => {
        console.log("handleGoogleLoginSuccess", response);
        setUserName(response.profileObj.name);
    };

    const handleGoogleLoginFailure = (error: any) => {
        console.log(error);
    };
    const [profile, setProfile] = useState(null);
    console.log('profile', profile)
    return (
        <div>
            <ul className="flex justify-between -mx-2">
                <li className="w-full px-2">
                    {/* <FacebookLogin
                        appId="246500391469096"
                        // autoLoad={true}
                        // fields="email"
                        fields="name,email,picture"
                        callback={handleFacebookLogin}
                        textButton={t('login_with_facebook')}
                        cssClass="rounded-[32px] border border-2 border-gray-400 py-4 px-6 text-green-200 flex items-center w-full text-xl font-semibold justify-between flex-row-reverse"
                        icon={<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1950_2271)">
                                <path d="M23.082 0H1.819C1.09 0 0.5 0.591 0.5 1.319V22.582C0.5 23.311 1.09 23.901 1.819 23.901H13.266V14.645H10.151V11.038H13.266V8.378C13.266 5.291 15.152 3.61 17.905 3.61C19.224 3.61 20.358 3.708 20.688 3.752V6.978L18.778 6.979C17.28 6.979 16.99 7.691 16.99 8.735V11.038H20.562L20.097 14.645H16.99V23.901H23.081C23.81 23.901 24.4 23.31 24.4 22.582V1.319C24.4 0.59 23.809 0 23.081 0" fill="#3B5998" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1950_2271">
                                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                        }
                    /> */}
                </li>
                <li className="w-full px-2">
                    {/* <GoogleLogin
                        clientId="713814789034-175url5i9ld0ljvqllglvvmcbahl1741.apps.googleusercontent.com"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        style={{ display: 'block' }}
                        className={"!rounded-[32px] !border-gray-400 !border-2 !py-1 !px-6 !text-green-200 !flex !items-center !w-full !text-xl !justify-between !flex-row-reverse !shadow-none"}
                    >
                        <span className="!font-semibold">{t('login_with_google')}</span>
                    </GoogleLogin> */}
                </li>
            </ul>
        </div>
    )
}
