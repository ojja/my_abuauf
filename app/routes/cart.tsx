import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
// import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CartItem from "~/components/cart/CartItem";
import CouponForm from "~/components/CouponForm";
import ExtraProducts from "~/components/ExtraProducts";
import { Site_Title } from "~/credentials";
import useShoppingCart from "~/stores/cartStore";
// import { useShoppingCart } from "~/stores/cartStore";
import FormatCurrency from "~/utils/FormatCurrency";



export const meta = () => {
    return {
        title: `Cart - ${Site_Title}`
    }
}
export default function Cart() {
    let { cartItems, removeFromCart, decreaseCartQuantity, addToCart, totalPrice, addCoupon, totalAPI, totalDiscountAPI } = useShoppingCart();
    // debugger;
    // console.log('cartItems', cartItems)
    // console.log('totalDiscountAPI', totalDiscountAPI)
    const [openCoupon, setOpenCoupon] = useState(false);

    let [openNote, setOpenNote] = useState(true)
    const [NoteApplied, setNoteApplied] = useState(false);
    const applyNote = () => {
        // Add logic to apply the Note here
        setNoteApplied(true);
    };

    const editNote = () => {
        // Add logic to edit the Note here
    };

    const deleteNote = () => {
        // Add logic to delete the Note here
        setNoteApplied(false);
    };

    function toggleNote() {
        setOpenNote(!openNote)
    }
    if (totalAPI === 0) {
        totalAPI = totalPrice;
    }

    const [selectedAreaRateFromCookie, setSelectedAreaRateFromCookie] = useState(Cookies.get("selectedAreaRate"));
    console.log('selectedAreaRateFromCookie',selectedAreaRateFromCookie)
    let shippingFees = parseFloat(selectedAreaRateFromCookie ? selectedAreaRateFromCookie : '');
    useEffect(() => {
        console.log('selectedAreaRateFromCookie EFFECT',selectedAreaRateFromCookie)
        setSelectedAreaRateFromCookie(selectedAreaRateFromCookie)
    }, [shippingFees]);
    console.log('totalAPI', totalAPI)
    return (
        <div className="py-4 overflow-hidden bg-white">
            <div className="container px-4 mx-auto max-w-[1400px] sm:px-6 lg:px-8">
                <div className="pb-3 border-b border-gray-100 md:pb-10 md:border-none ">
                    <h1 className="text-4xl font-semibold">سلة التسوق</h1>
                    {/* <span>totalAPI{totalAPI}</span>
                    <span>totalDiscountAPI{totalDiscountAPI}</span> */}
                </div>
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="col-span-2 md:pr-16">
                            <div className="pt-6">
                                {cartItems.map((item, index) => (
                                    <CartItem
                                        key={index}
                                        title={''}
                                        id={item.id}
                                        quantity={item.quantity}
                                        // color={item.color}
                                        // size={item.size}
                                        slug={item.slug}
                                        thumbnail={item.thumbnail}
                                        removeFromCart={removeFromCart}
                                        decreaseCartQuantity={decreaseCartQuantity}
                                        addToCart={addToCart}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <div className=" py-8 bg-white rounded-[32px]" style={{ boxShadow: ' 0px 20px 66px rgba(0, 0, 0, 0.2)' }}>
                                <h2 className=" text-[32px] font-bold capitalize px-10 pb-6 border-b border-grayy-100">ملخص السلة</h2>
                                <div className="flex flex-col px-10 mt-10">
                                    <div className="flex justify-between">
                                        <span className="text-base font-semibold text-gray-50">مصاريف التوصيل</span>
                                        <span className="text-xl font-bold text-black">
                                            {shippingFees !== 0 ?
                                                <FormatCurrency value={shippingFees} bg={false} />
                                                :
                                                'توصيل مجاناً'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-black-300">
                                        <span className="text-base font-semibold text-gray-50">المبلغ</span>
                                        <span className="text-xl font-bold text-black">
                                            <FormatCurrency value={totalAPI + totalDiscountAPI} bg={false} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {/* <div className="flex justify-between py-3 border-b border-black-300">
                                        <span className="font-light text-gray-600">Tax estimate</span>
                                        <span className="text-gray-600">10.00 EGP</span>
                                    </div> */}
                                    {totalDiscountAPI > 0 ?
                                        <div className="flex justify-between py-3 border-b border-black-300">
                                            <span className="font-light text-red-400">Discount</span>
                                            <span className="text-red-400">-<FormatCurrency value={(totalDiscountAPI)} /></span>
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


                                    <div className="flex items-center justify-between px-10">
                                        <span className="text-base font-semibold text-gray-50">الإجمالي </span>
                                        <span className=" text-[32px] text-black font-bold">
                                            <FormatCurrency value={totalAPI} bg={false} />
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between px-4 py-4 mt-10 points bg-yellow-910 md:px-10">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.9865 11.0194C27.9974 10.465 27.8482 9.1722 26.163 8.72203L9.239 5.33398C7.99869 5.33398 6.99002 6.34263 6.99002 7.58297V10.5981L6.24036 10.5962C5.00454 10.6014 4 11.6071 4 12.8444V24.8345C4 26.0748 5.00867 27.0835 6.24898 27.0835H25.751C26.9914 27.0835 28 26.0748 28 24.8345L27.9865 11.0194ZM8.48932 7.58294C8.48932 7.19124 8.79106 6.86929 9.17376 6.8363L25.7131 10.1835C25.7191 10.1865 25.5902 10.6037 24.9897 10.5958H8.48932V7.58294ZM26.501 24.8349C26.501 25.2487 26.1652 25.5846 25.7513 25.5846H6.24893C5.83512 25.5846 5.49927 25.2487 5.49927 24.8349V12.8445C5.49927 12.4306 5.83512 12.0948 6.24893 12.0948H24.9919C25.7277 12.0948 26.5006 11.844 26.5006 11.3478V24.8349H26.501ZM8.49941 17.345C7.67141 17.345 7.00009 18.0164 7.00009 18.8444C7.00009 19.6724 7.67141 20.3437 8.49941 20.3437C9.32741 20.3437 9.99874 19.6724 9.99874 18.8444C9.99874 18.0164 9.32741 17.345 8.49941 17.345Z" fill="black" />
                                        </svg>
                                        <p className="w-1/2 text-xs font-semibold text-black md:text-base">لديك 120 نقطة في محفظتك و يمكنك خصم 12 EGP</p>
                                        <button className="bg-white rounded-100 md:text-base text-sm  font-semibold  text-black py-2.5 px-5">خصم المبلغ</button>
                                    </div>
                                    <Link to="/checkout" className="block px-3 py-4 mx-10 mt-10 text-xl text-center text-white bg-green-200 pointer-events-auto rounded-100 hover:bg-green-400 ">أطلب الآن</Link>
                                </div>
                            </div>
                            <div className="bg-white rounded-[32px] mt-9" style={{ boxShadow: ' 0px 20px 66px rgba(0, 0, 0, 0.2)' }}>
                                <div className=" py-[30px] px-10 flex justify-between cursor-pointer" onClick={toggleNote}>
                                    <p className="text-xl font-bold ">أضف ملاحظات علي الطلب</p>
                                    {openNote && (

                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.8995 19.4014C14.8092 19.4961 14.7006 19.5715 14.5802 19.6231C14.4599 19.6746 14.3304 19.7012 14.1995 19.7012C14.0686 19.7012 13.9391 19.6746 13.8188 19.6231C13.6984 19.5715 13.5898 19.4961 13.4995 19.4014L3.5 9.4019L4.9 8.0019L14.1995 17.3014L23.5002 8.0019L24.9002 9.4019L14.8995 19.4014Z" fill="black" />
                                        </svg>
                                    )}

                                    {!openNote && (
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5012 8.29977C13.5916 8.20504 13.7002 8.12963 13.8205 8.0781C13.9408 8.02657 14.0704 8 14.2012 8C14.3321 8 14.4617 8.02657 14.582 8.0781C14.7023 8.12963 14.8109 8.20504 14.9012 8.29977L24.9007 18.2993L23.5007 19.6993L14.2012 10.3998L4.90058 19.6993L3.50058 18.2993L13.5012 8.29977Z" fill="black" />
                                        </svg>
                                    )}

                                </div>
                                <div className={`flex w-full pt-10 border-t border-[#C6C6C6] coupon flex-col md:px-10 pb-10     ${openNote ? 'hidden' : ''}`}>
                                    <p className="text-base font-semibold text-gray-50">اضف ملاحظة</p>
                                    {/* <input type="text" name="order_note" className="w-full p-2 border border-gray-300 rounded-l outline-none bg-gray-50" id="order_note" placeholder="Add Order Note" /> */}
                                    <textarea name="order_note" id="" cols="30" rows="10" id="order_note" className=" focus:outline-none h-[119px] border-2 border-x-gray-400 rounded-2xl mt-2 mb-6"></textarea>
                                    {NoteApplied && (
                                        <div className="flex justify-between w-full mt-2 gap-x-3">
                                            <button
                                                type="button"
                                                className="flex items-center justify-between py-4 ml-2 text-xl font-semibold text-black bg-green-300 w-fit px-11 rounded-100"
                                                onClick={deleteNote}
                                            >
                                                ألغاء
                                            </button>
                                        </div>
                                    )}
                                    <button type="submit" onClick={applyNote} className={`${NoteApplied ? 'hidden' : ''} text-white bg-green-200 hover:bg-green-400 rounded-100 focus:ring-4 focus:outline-none text-xl font-semibold w-full sm:w-auto px-5 py-[18px] text-center `} name="add_note" defaultValue="Add">أضف</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex mt-auto items-center justify-center min-h-[400px] flex-col'>
                        <p className="text-lg text-slate-500">عربة التسوق فارغة حاليا.</p>
                        <Link to='/products' className="inline-flex justify-center px-4 py-2 mt-5 text-sm font-semibold text-white capitalize rounded-lg bg-slate-900 hover:bg-slate-700">مواصلة التسوق </Link>
                    </div>
                )}
                <ExtraProducts categorySlug="dress" count={5} title="تسوق اكتر" />
            </div>
        </div >
    )
}
