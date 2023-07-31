import { memo, useState } from 'react';
import { v4 } from "uuid";
// import useShoppingCart from "~/stores/cartStore";
// import FormatCurrency, { FormatCurrency2 } from "~/utils/FormatCurrency";
// import { memo } from 'react';
import { useShoppingCart } from "~/stores/cartStore";
import FormatCurrency from "~/utils/FormatCurrency";
import MiniCartItem from "../cart/MiniCartItem";
import { XMarkIcon } from '@heroicons/react/20/solid';
import CouponForm from '../CouponForm';
import { Link } from '@remix-run/react';
import Cookies from 'js-cookie';

// const CartSummary = ({ thanks, rate }: any) => {
//     const { cartItems, totalAPI, totalDiscountAPI, totalPrice } = useShoppingCart();
//     let [opencart, setOpencart] = useState(false)
//     console.log('totalPrice', totalPrice)
//     const checkoutTotal = totalAPI === 0 ? totalPrice : totalAPI
//     const [openCoupon, setOpenCoupon] = useState(false);
//     const shippingFees = parseFloat(rate);
//     const totalSubTotal = checkoutTotal + totalDiscountAPI;
//     const totalAmount = checkoutTotal + shippingFees;

//     function toggleCart() {
//         setOpencart(!opencart)
//     }
const CartSummary = ({ thanks, rate = 0, orderData }: any) => {
    let { cartItems, totalAPI, totalDiscountAPI, totalPrice } = useShoppingCart();
    let [opencart, setOpencart] = useState(false)
    const [openCoupon, setOpenCoupon] = useState(false);
    // console.log('totalPrice', totalPrice)
    let checkoutTotal = totalAPI === 0 ? totalPrice : totalAPI

    let selectedAreaRateFromCookie = Cookies.get("selectedAreaRate");
    let shippingFees = parseFloat(selectedAreaRateFromCookie ? selectedAreaRateFromCookie : '');
    let totalSubTotal = checkoutTotal + totalDiscountAPI;
    let totalAmount = checkoutTotal + shippingFees;
    if (thanks) {
        totalSubTotal = orderData?.order?.subtotal;
        totalAmount = orderData?.order?.total;
        shippingFees = orderData?.order?.shipping_fees;
        cartItems = orderData?.order?.items ? orderData?.order?.items : [];
    }
    function toggleCart() {
        setOpencart(!opencart)
    }
    // console.log('shippingFees', shippingFees)
    return (
        <div className={` ml-0 md:mt-0 md:ml-5 w-full ${thanks ? 'md:w-[500px]' : 'md:w-[470px]'}`}>
            {/* Order summary */}
            <div className={`${thanks ? 'md:min-w-[500px]' : 'md:min-w-[470px]'} w-full`} >

                <div className="bg-white shadow-sm  md:py-8 py-4  rounded-[32px] overflow-hidden" style={{ boxShadow: ' 0px 20px 66px rgba(0, 0, 0, 0.2)' }}>
                    <h2 className="  hidden md:flex md:text-[32px]  font-bold capitalize md:px-10 px-4 md:pb-6  pb-4 border-b border-grayy-100 justify-between">
                        <>ملخص السلة {thanks ? `#${thanks}` : ''}</>
                        {thanks ? '' :
                            <Link to="/cart" className="px-4 py-2 text-xl text-green-200 border-2 border-gray-400 rounded-100">
                                تعديل
                            </Link>
                        }

                    </h2>
                    <h2 className={` flex md:hidden  text-base font-bold capitalize md:px-10 px-4 md:pb-6   ${opencart ? 'border-b border-grayy-100  pb-4' : ''} justify-between`} onClick={toggleCart}>
                        <>ملخص السلة {thanks ? `#${thanks}` : ''}</>
                        {opencart && (

                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6425 5.92897C10.578 5.8613 10.5004 5.80743 10.4145 5.77063C10.3285 5.73382 10.236 5.71484 10.1425 5.71484C10.049 5.71484 9.95648 5.73382 9.87054 5.77063C9.78459 5.80743 9.70702 5.8613 9.6425 5.92897L2.5 13.0715L3.5 14.0715L10.1425 7.42897L16.7858 14.0715L17.7858 13.0715L10.6425 5.92897Z" fill="black" />
                            </svg>

                        )}

                        {!opencart && (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6425 13.8581C10.578 13.9258 10.5004 13.9797 10.4145 14.0165C10.3285 14.0533 10.236 14.0723 10.1425 14.0723C10.049 14.0723 9.95648 14.0533 9.87054 14.0165C9.78459 13.9797 9.70702 13.9258 9.6425 13.8581L2.5 6.71564L3.5 5.71564L10.1425 12.3581L16.7858 5.71564L17.7858 6.71564L10.6425 13.8581Z" fill="black" />
                            </svg>

                        )}


                    </h2>
                    <div className={` md:block ${opencart ? 'block' : 'hidden'} `}>
                        <ul role="list" className="mx-4 border-b border-gray-200 md:mx-10">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex py-6">
                                    <MiniCartItem
                                        id={item.id}
                                        price={item.price}
                                        quantity={item.quantity}
                                        slug={item.slug}
                                        thumbnail={item.thumbnail}
                                        removeFromCart=''
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center justify-between px-4 py-4 mt-6 points bg-yellow-910 md:px-10">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.9865 11.0194C27.9974 10.465 27.8482 9.1722 26.163 8.72203L9.239 5.33398C7.99869 5.33398 6.99002 6.34263 6.99002 7.58297V10.5981L6.24036 10.5962C5.00454 10.6014 4 11.6071 4 12.8444V24.8345C4 26.0748 5.00867 27.0835 6.24898 27.0835H25.751C26.9914 27.0835 28 26.0748 28 24.8345L27.9865 11.0194ZM8.48932 7.58294C8.48932 7.19124 8.79106 6.86929 9.17376 6.8363L25.7131 10.1835C25.7191 10.1865 25.5902 10.6037 24.9897 10.5958H8.48932V7.58294ZM26.501 24.8349C26.501 25.2487 26.1652 25.5846 25.7513 25.5846H6.24893C5.83512 25.5846 5.49927 25.2487 5.49927 24.8349V12.8445C5.49927 12.4306 5.83512 12.0948 6.24893 12.0948H24.9919C25.7277 12.0948 26.5006 11.844 26.5006 11.3478V24.8349H26.501ZM8.49941 17.345C7.67141 17.345 7.00009 18.0164 7.00009 18.8444C7.00009 19.6724 7.67141 20.3437 8.49941 20.3437C9.32741 20.3437 9.99874 19.6724 9.99874 18.8444C9.99874 18.0164 9.32741 17.345 8.49941 17.345Z" fill="black" />
                            </svg>
                            <p className="w-1/2 text-xs font-semibold text-black md:text-base">لديك 120 نقطة في محفظتك و يمكنك خصم 12 EGP</p>
                            <button className="bg-white rounded-100 md:text-base text-sm  font-semibold  text-black py-2.5 px-5">خصم المبلغ</button>
                        </div>
                        {totalDiscountAPI > 0 ?
                            <div className="flex justify-between py-3 border-b border-black-300">
                                <span className="font-light text-red-400">Discount</span>
                                <span className="text-red-400">
                                    {/* -{FormatCurrency(totalDiscountAPI)} */}
                                </span>
                            </div>
                            :
                            <div className="flex flex-wrap justify-between px-10 py-3">
                                {openCoupon ?
                                    <div className="w-full">
                                        <button
                                            type="button"
                                            className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setOpenCoupon(false)}
                                        >
                                            <span className="sr-only">Close coupon</span>
                                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                                        </button>
                                        <CouponForm />
                                    </div>

                                    :
                                    <span className="flex font-semibold underline cursor-pointer text-gray-50 gap-x-3" onClick={() => setOpenCoupon(true)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.6971 1.90216C12.7598 0.964904 11.2402 0.964904 10.3029 1.90216L9.66066 2.54444C8.98553 3.21957 8.06986 3.59886 7.11508 3.59886H6C4.67451 3.59886 3.6 4.67337 3.6 5.99886V7.11394C3.6 8.06872 3.22071 8.98439 2.54558 9.65952L1.90294 10.3022C0.965682 11.2394 0.965683 12.759 1.90294 13.6963L2.54558 14.3389C3.22071 15.014 3.6 15.9297 3.6 16.8845V17.9989C3.6 19.3243 4.67451 20.3989 6 20.3989H7.11435C8.06913 20.3989 8.98481 20.7781 9.65994 21.4533L10.3029 22.0963C11.2402 23.0335 12.7598 23.0335 13.6971 22.0963L14.3401 21.4533C15.0152 20.7781 15.9309 20.3989 16.8856 20.3989H18C19.3255 20.3989 20.4 19.3243 20.4 17.9989V16.8845C20.4 15.9297 20.7793 15.014 21.4544 14.3389L22.097 13.6963C23.0343 12.759 23.0343 11.2394 22.097 10.3022L21.4544 9.65952C20.7793 8.98439 20.4 8.06872 20.4 7.11394V5.99886C20.4 4.67337 19.3255 3.59886 18 3.59886H16.8849C15.9301 3.59886 15.0145 3.21957 14.3393 2.54444L13.6971 1.90216ZM15.3985 9.06486C15.7661 8.51342 15.6171 7.76838 15.0656 7.40076C14.5142 7.03313 13.7692 7.18214 13.4015 7.73358L8.60154 14.9336C8.23391 15.485 8.38292 16.2301 8.93436 16.5977C9.48579 16.9653 10.2308 16.8163 10.5985 16.2649L15.3985 9.06486ZM7.8 10.7992C8.79411 10.7992 9.6 9.99333 9.6 8.99922C9.6 8.00511 8.79411 7.19922 7.8 7.19922C6.80588 7.19922 6 8.00511 6 8.99922C6 9.99333 6.80588 10.7992 7.8 10.7992ZM18 14.9992C18 15.9933 17.1941 16.7992 16.2 16.7992C15.2059 16.7992 14.4 15.9933 14.4 14.9992C14.4 14.0051 15.2059 13.1992 16.2 13.1992C17.1941 13.1992 18 14.0051 18 14.9992Z" fill="black" />
                                    </svg>
                                        هل لديك برومو كود؟</span>
                                }
                            </div>
                        }

                        <dl className="px-4 py-6 space-y-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <dt className="font-semibold text-gray-50 text-bas">المبلغ</dt>
                                <dd className="text-xl font-bold text-black">
                                    {/* {FormatCurrency2(totalSubTotal)} */}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="font-semibold text-gray-50 text-bas">مصاريف التوصيل</dt>
                                <dd className="text-xl font-bold text-black">
                                    {shippingFees !== 0 ?
                                        <FormatCurrency value={shippingFees} bg={false}/>
                                        :
                                        'توصيل مجاناً'
                                    }
                                </dd>
                            </div>
                            {/* <div className="flex items-center justify-between">
                            <dt className="text-sm">Taxes</dt>
                            <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                        </div> */}
                            {totalDiscountAPI > 0 ?
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-red-400">الخصم</dt>
                                    <dd className="text-sm font-medium text-red-400">
                                        {/* -{FormatCurrency2(totalDiscountAPI)} */}
                                    </dd>
                                </div>
                                :
                                ''
                            }
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <dt className="text-base font-semibold text-gray-50">الإجمالي</dt>
                                <dd className=" text-[32px] text-black font-bold">
                                    {/* {FormatCurrency2(totalAmount)} */}
                                </dd>
                            </div>
                            {thanks ?
                                <div>
                                    <p>You have earn <strong className="text-green-500">48</strong> Points!</p>
                                </div>
                                : ''}
                        </dl>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default memo(CartSummary);