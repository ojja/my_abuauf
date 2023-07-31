import { Link } from "@remix-run/react";
import Button from "~/components/Button";
import CartSummary from "~/components/checkout/CartSummary";
import ShippingInfo from "~/components/checkout/ShippingInfo";
import ShippingOptions from "~/components/ShippingOptions";
import TimeSlot from '~/components/TimeSlot';
import { MetaFunction } from "@remix-run/node";
import { Site_Title } from "~/credentials";
import { API_ENDPOINT } from "~/config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentMethod from "~/components/PaymentMethod";
import Loader from "~/components/Loader";
import { useShoppingCart } from "~/stores/cartStore";
import ThreedsChallengeRedirectComponent from "~/components/payments/ThreedsChallengeRedirectComponent";
import Popup from "~/components/Popup";
import { useForm } from "react-hook-form";
import OrderType from "~/components/checkout/OrderType";

export default function Checkout() {
  const { t } = useTranslation('checkout');
  const { cartItems, cartQuantity, resetCart } = useShoppingCart();
  const { register, handleSubmit, watch, setValue, trigger, reset, formState: { errors } } = useForm();

  const [stepOne, setStepOne] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [responseCreditCard, setResponseCreditCard] = useState<any>(null);
  const [isOTP, setIsOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const items = Object.values(cartItems).map((item) => ({
    itemID: item.id,
    qty: item.quantity,
  }));

  const formData = watch();
  //   const isStepOne = Object.values(formData).every((value) => value !== "");
  console.log(formData);
  // console.log(formErrors);
  // console.log("errors>>", errors);

  const handleClick = async () => {
    // console.log('errors  nefore in CLICK', errors)

    const output = await trigger([
      'first_name',
      'last_name',
      'email',
      'phone',
      'order_type',
      'order_date',
      'shipping_method',
      'full_address',
      'area_id',
      'gov_id',
      'country',
      'building_no',
      'floor',
      'apartment',
      'building_number',
      'pick_from_branch'
    ]);
    console.log('output', output)
    if (output == true) {
      setStepOne(false);
    }
  };

  const handlePayClick = async () => {

    // Call the parent onSubmit function when needed
    if (formData.payment_method === "CC") {
      // console.log("handlePayClick CC");
      PaymentSession.updateSessionFromForm("card");
      const sessionId = watch("sessionId");
      console.log('sessionId', sessionId)
      const output = await trigger(["terms", "sessionId"]);
      if (output === true) {
        onSubmit(formData); // Call the parent onSubmit function with form data
      }
    }
    if (formData.payment_method === "COD") {
      // console.log("handlePayClick COD");
      const output = await trigger(["terms"]);
      if (output === true) {
        onSubmit(formData); // Call the parent onSubmit function with form data
      }
    }
  };

  const onSubmit = async (formData) => {
    // console.log("formData:", formData); // Access form data here
    setIsLoading(true);

    if (Object.keys(errors).length === 0) {
      const apiUrl = `${API_ENDPOINT}/checkout.php`;
      const requestBody = {
        billing: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address_1: formData.full_address,
          area: formData.area_id,
          gov: formData.gov_id,
          country: formData.country,
          building_no: formData.building_no,
          floor: formData.floor,
          building_number: formData.building_number,
          apartment: formData.apartment,
          property_type: formData.property_type,
          shipping_method: formData.shipping_method,
          pick_from_branch: formData.pick_from_branch,
          order_date: formData.order_date,
          order_type: formData.order_type,
        },
        items,
        shipping: {
          rate: formData.shipping_fee,
        },
        order: {
          customerID: 0,
        },
      };

      if (formData.payment_method === "COD") {
        requestBody.payment = {
          method: "COD",
          orderformData: {
            amount: 150,
            currency: "EGP",
          },
        };
      } else if (formData.payment_method === "CC") {
        requestBody.payment = {
          method: "CC",
          orderData: {
            amount: 150,
            currency: "EGP",
          },
          sessionID: formData.sessionId,
        };
      }

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const responseData: any = await response.json();
          console.log("responseData", responseData);
          console.log("API call successful");
          if (
            responseData.status === "success" &&
            responseData.code === "200"
          ) {
            const orderID = responseData.order_id;
            console.log("API 200");
            const thanksURL = `/thanks?orderID=${orderID}`;
            setTimeout(() => {
              resetCart();
              window.location.href = thanksURL;
            }, 2000);
          } else if (
            responseData.status === "success" &&
            responseData.hasOwnProperty("html")
          ) {
            setIsOTP(true);
            setResponseCreditCard(responseData);
          } else if (
            responseData.status === "err"
          ) {
            const errorExplanation = responseData.obj.error.explanation;
            setErrorMessage(errorExplanation)
          } else {
            console.log("API call failed");
            setErrorMessage('try submit again')
          }
        } else {
          console.log("API call failed");
        }
      } catch (error) {
        console.log("An error occurred", error);
      }
    } else {
      console.log("Form is invalid");
      console.log("formData >> ", formData);
    }

    setIsLoading(false);
  };

  let isStepOne = true;
  // console.log('stepOne', stepOne)
  // console.log('watch formData> ', formData)
  // const handleClick = () => {
  //   // setIsLoading(true);
  //   console.log("formData:", formData);
  //   setTimeout(() => {
  //     if (!isStepOne && !watch('terms')) {
  //       console.log('Terms not accepted');
  //       setIsLoading(false);
  //       return;
  //     }
  //     // setIsLoading(false);
  //   }, 2000);
  // };
  useEffect(() => {
    setTimeout(() => {
      // console.log('Effect set load')
      setIsLoading(false);
      // console.log('data', formData)
    }, 1000);
  }, []);

  return (
    <div className="mx-auto">
      {cartItems?.length > 0 ? (
        <>
          <div className="bg-white md:hidden w-full py-4 px-5 relative block">
            <div className=" pb-3">
              <h1 className=" text-2xl font-semibold">{t('checkout')}</h1>
            </div>
            <nav className="flex">
              <ol role="list" className="flex flex-wrap items-center text-gray-400 gap-y-2 gap-x-2 sm:gap-y-0">
                <li>
                  <div className="-m-1">
                    <Link to="/cart" className="flex items-center p-1 leading-3">
                      سلة التسوق
                      <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-sm font-bold text-white bg-gray-400 rounded-full pt-[3px]">{cartQuantity}</span>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.94278 7.5153C4.88865 7.56691 4.84556 7.62897 4.81611 7.69773C4.78667 7.76648 4.77148 7.8405 4.77148 7.9153C4.77148 7.99009 4.78667 8.06411 4.81611 8.13286C4.84556 8.20162 4.88865 8.26368 4.94278 8.3153L10.6568 14.0293L11.4568 13.2293L6.14278 7.9153L11.4568 2.60063L10.6568 1.80063L4.94278 7.5153Z" fill="#777777" />
                    </svg>

                    <div className="-m-1">
                      <span className={`p-1 ml-2 cursor-pointer ${stepOne ? 'font-semibold text-black' : ''}`} onClick={() => setStepOne(true)}> بيانات العميل </span>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.94278 7.5153C4.88865 7.56691 4.84556 7.62897 4.81611 7.69773C4.78667 7.76648 4.77148 7.8405 4.77148 7.9153C4.77148 7.99009 4.78667 8.06411 4.81611 8.13286C4.84556 8.20162 4.88865 8.26368 4.94278 8.3153L10.6568 14.0293L11.4568 13.2293L6.14278 7.9153L11.4568 2.60063L10.6568 1.80063L4.94278 7.5153Z" fill="#777777" />
                    </svg>

                    <div className="-m-1">
                      <span className={`p-1 ml-2 cursor-pointer ${!stepOne ? 'font-semibold text-black' : ''}`} onClick={handleClick}> طريقة الدفع </span>
                    </div>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex flex-col-reverse md:flex-row">

            <div className="first bg-white md:w-[66%] w-full md:pt-12 pt-4 px-4 md:px-0  pb-10 relative">
              <div className=" max-w-[700px] m-auto">
                <div className="pb-10 md:block hidden">
                  <h1 className="text-4xl font-semibold">{t('checkout')}</h1>
                </div>
                <nav className="mb-10 md:flex hidden">
                  <ol role="list" className="flex flex-wrap items-center text-gray-400 gap-y-2 gap-x-2 sm:gap-y-0">
                    <li>
                      <div className="-m-1">
                        <Link to="/cart" className="flex items-center p-1 leading-3">
                          {t('cart')}
                          <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-sm font-bold text-white bg-gray-400 rounded-full pt-[3px]">{cartQuantity}</span>
                        </Link>
                      </div>
                    </li>

                    <li>
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.94278 7.5153C4.88865 7.56691 4.84556 7.62897 4.81611 7.69773C4.78667 7.76648 4.77148 7.8405 4.77148 7.9153C4.77148 7.99009 4.78667 8.06411 4.81611 8.13286C4.84556 8.20162 4.88865 8.26368 4.94278 8.3153L10.6568 14.0293L11.4568 13.2293L6.14278 7.9153L11.4568 2.60063L10.6568 1.80063L4.94278 7.5153Z" fill="#777777" />
                        </svg>

                        <div className="-m-1">
                          <span className={`p-1 ml-2 cursor-pointer ${stepOne ? 'font-semibold text-green-200' : ''}`} onClick={() => setStepOne(true)}> {t('shipping_information')} </span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.94278 7.5153C4.88865 7.56691 4.84556 7.62897 4.81611 7.69773C4.78667 7.76648 4.77148 7.8405 4.77148 7.9153C4.77148 7.99009 4.78667 8.06411 4.81611 8.13286C4.84556 8.20162 4.88865 8.26368 4.94278 8.3153L10.6568 14.0293L11.4568 13.2293L6.14278 7.9153L11.4568 2.60063L10.6568 1.80063L4.94278 7.5153Z" fill="#777777" />
                        </svg>

                        <div className="-m-1">
                          <span className={`p-1 ml-2 cursor-pointer ${!stepOne ? 'font-semibold text-green-200' : ''}`} onClick={handleClick}> {t('payment_method')} </span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.94278 7.5153C4.88865 7.56691 4.84556 7.62897 4.81611 7.69773C4.78667 7.76648 4.77148 7.8405 4.77148 7.9153C4.77148 7.99009 4.78667 8.06411 4.81611 8.13286C4.84556 8.20162 4.88865 8.26368 4.94278 8.3153L10.6568 14.0293L11.4568 13.2293L6.14278 7.9153L11.4568 2.60063L10.6568 1.80063L4.94278 7.5153Z" fill="#777777" />
                        </svg>

                        <div className="-m-1">
                          <span className={`p-1 ml-2`}>{t('confirm_payment')}</span>
                        </div>
                      </div>
                    </li>
                  </ol>
                </nav>
                <div className=" w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
                    {errorMessage &&
                      <p className="text-red-500">{errorMessage}</p>
                    }
                    {stepOne ?
                      <div className=" step-one">
                        {isLoading ? (
                          <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                            <Loader />
                          </div>
                        ) : ('')}
                        <div className="py-6">
                          <h2 className="py-4 mb-6 border-b border-gray-100 md:text-2xl text-base font-bold text-black">{t('order_type')}</h2>
                          <OrderType register={register} errors={errors} setValue={setValue} watch={watch} />
                        </div>
                        <div className="py-6">
                          <h2 className="flex justify-between items-center py-4 mb-6 border-b border-gray-100 md:text-2xl text-base font-bold text-black">{t('shipping_information')}
                            <span className=" md:text-base text-sm text-gray-50 font-semibold flex flex-row-reverse gap-x-1">  <Link to='' className=" text-green-400 underline">تسجيل الدخول</Link>هل لديك حساب بالفعل؟ </span>
                          </h2>
                          <ShippingInfo register={register} errors={errors} />
                        </div>
                        <div className="py-6">
                          <h2 className="py-4 mb-6 border-b border-gray-100 md:text-2xl text-base font-bold text-black ">{t('choose_order_date')}</h2>
                          <TimeSlot register={register} errors={errors} setValue={setValue} watch={watch} />
                        </div>
                        <div className="py-6">
                          <h2 className="py-4 mb-6 border-b border-gray-100 md:text-2xl text-base font-bold text-black ">{t('shipping_method')}</h2>
                          <ShippingOptions register={register} errors={errors} setValue={setValue} watch={watch} />
                        </div>
                        <hr className="w-full h-1 border-t-2 border-gray-100 absolute left-0 right-0" />
                        <div className="py-6">
                          <Button
                            name={t('next_step')}
                            width="full"
                            extraclass="leading-5"
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                      :
                      <div className="step-two">
                        <div className="py-6">
                          {isOTP && (
                            <Popup isOpen={isOTP}>
                              <ThreedsChallengeRedirectComponent response={responseCreditCard} sessionID={watch("sessionId")} />
                            </Popup>
                          )}
                          <PaymentMethod register={register} errors={errors} setValue={setValue} watch={watch} onSubmit={onSubmit} formData={formData} />
                        </div>
                        <div className="py-6">
                          <div className="flex items-center">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded ${errors.terms && 'border-red-500'}`}
                              {...register('terms', {
                                required: { value: true, message: t('terms_required') }
                              })}

                            />
                            <label htmlFor="default-checkbox" className="ml-2 text-xl font-semibold text-black">{t('terms')}</label>
                          </div>
                        </div>
                        {errors.terms && errors.terms.type === "required" && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.terms.message}
                          </p>
                        )}
                        <hr className="w-full h-1 border-t-2 border-gray-100 absolute left-0 right-0" />
                        <div className="py-6">
                          <Button
                            name={t('complete_order')}
                            width="full"
                            extraclass="mt-5 leading-5"
                            onClick={handlePayClick}
                          />
                        </div>
                      </div>
                    }

                  </form>
                </div>
              </div>

            </div>
            <div className="second bg-green-300 md:w-[44%] w-full md:py-36 md:px-0 py-6 px-4 flex justify-center">
              <CartSummary rate={watch('shipping_fee')} />
            </div>

          </div>
        </>
      ) : (
        <div className='flex mt-auto items-center justify-center min-h-[400px] flex-col'>
          <p className="text-lg text-slate-500">Your cart is currently empty.</p>
          <Link to='/products' className="inline-flex justify-center px-4 py-2 mt-5 text-sm font-semibold text-white capitalize rounded-lg bg-slate-900 hover:bg-slate-700">continue shopping</Link>
        </div>
      )}
    </div>
  );
}


export const meta: MetaFunction = () => {
  return {
    title: `Checkout - ${Site_Title}`
  }
}