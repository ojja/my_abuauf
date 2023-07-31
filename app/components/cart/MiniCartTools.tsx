import { EyeIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Tooltip from "../Tooltip";
import { useEffect, useRef, useState } from "react";
import { TagIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { t } from "i18next";
import { RiCheckLine } from "react-icons/ri";
import useShoppingCart from "~/stores/cartStore";



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MiniCartTools() {
    // let [openCoupone, setOpenCoupone] = useState(true)
    const [openNote, setOpenNote] = useState(true)
    const [openCoupon, setOpenCoupon] = useState(true);
    const [couponApplied, setCouponApplied] = useState(false);
    const [msg, setMsg] = useState('')
    const { addCoupon } = useShoppingCart();
    const [couponMsg, setCouponMsg] = useState('');
    const [couponCode, setCouponCode] = useState('');

    const toggleCoupon = () => {
        setOpenCoupon(!openCoupon);
    };

    const applyCoupon = () => {
        // Add logic to apply the coupon here
        setCouponApplied(true);
    };

    const editCoupon = () => {
        // Add logic to edit the coupon here
    };

    const deleteCoupon = () => {
        // Add logic to delete the coupon here
        setCouponApplied(false);
    };

    function toggleNote() {
        setOpenNote(!openNote)
    }
    const textareaRef = useRef(null);
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isDirty }, // Include isDirty in formState
    } = useForm();
    const [NoteApplied, setNoteApplied] = useState(!!Cookies.get('order_note'));
    // Load saved note from cookies on component mount
    useEffect(() => {
        const savedNote = Cookies.get('order_note');
        if (savedNote) {
            setValue('order_note', savedNote);
        }
    }, [setValue]);

    const onSubmit = (data) => {
        // Save the note to cookies
        Cookies.set('order_note', data.order_note);
        // setOpenNote(false)
        setNoteApplied(true);
        toggleNote();
        setMsg('note_added');
        setTimeout(() => {
            setMsg('');
        }, 3000);
    };

    const deleteNote = () => {
        // Delete the note from cookies
        Cookies.remove('order_note');
        setValue('order_note', '');
        setNoteApplied(false);
    };
    const editNote = () => {
        textareaRef.current.focus();
        if (isDirty) {
            handleSubmit(onSubmit)();
        }
    };
    const onSubmitCoupon = async (data) => {
        const couponCode = data.coupon_code;
        applyCoupon();
        toggleCoupon();
        setMsg('coupon_added');
        setCouponApplied(true);
        setTimeout(() => {
            setMsg('');
        }, 3000);
        // Call the addCoupon function to apply the coupon
        const response = await addCoupon(couponCode) as { status: string };

        // Handle the coupon application response
        if (response.status === 'success') {
            setCouponMsg('Coupon applied successfully');
            setCouponApplied(true);
        } else if (response.status === 'failed') {
            setCouponMsg('Coupon application failed');
            setCouponApplied(false);
        } else {
            setCouponMsg('Unknown response status');
            setCouponApplied(false);
        }

        // Reset the form after submission
        reset();
    };
    return (
        <div className=" py-6 md:mx-10 mx-4 mt-4 parent border-t border-gray-100">
            {msg &&
                <div className="absolute bottom-0 left-0 right-0">
                    <p className={`flex items-center px-6 py-3 font-semibold text-xl ${msg === 'note_added' && 'bg-yellow-300 text-green-200'} ${msg === 'coupon_added' && 'bg-green-50 text-white'}`}>
                        <RiCheckLine />
                        {t(msg)}
                    </p>
                </div>
            }
            <div className="flex items-center justify-center gap-x-6 bg-[#EDEFEB] py-6">
                <Tooltip message={'add_note'} >
                    {NoteApplied &&
                        <div className=" absolute top-[-14px]">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="28" height="28" rx="14" fill="#EBC743" />
                                <path d="M20.7858 9.35596L11.9642 18.1418L7.5 13.6418L6.5 14.6418L11.4642 19.6418C11.5292 19.7088 11.6068 19.7623 11.6927 19.799C11.7785 19.8358 11.8708 19.8551 11.9642 19.856C12.0575 19.8551 12.1498 19.8358 12.2357 19.799C12.3215 19.7623 12.3992 19.7088 12.4642 19.6418L21.7858 10.356L20.7858 9.35596Z" fill="#163300" />
                            </svg>
                        </div>
                    }
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleNote} className=" cursor-pointer">
                        <rect width="64" height="64" rx="32" fill="#163300" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M41.4291 23H22.5721C22.3449 23.0005 22.1271 23.091 21.9663 23.2515C21.8056 23.4121 21.7149 23.6298 21.7141 23.857V36.714C21.7149 36.941 21.8054 37.1586 21.966 37.3191C22.1265 37.4797 22.3441 37.5702 22.5711 37.571H26.8571V40.143C26.8571 40.443 27.0291 40.743 27.3291 40.914C27.4571 41 27.5861 41 27.7141 41C27.8806 41.0034 28.0445 40.9586 28.1861 40.871L33.1141 37.571H41.4291C41.6562 37.5702 41.8737 37.4797 42.0342 37.3191C42.1948 37.1586 42.2853 36.941 42.2861 36.714V23.857C42.2853 23.63 42.1948 23.4124 42.0342 23.2519C41.8737 23.0913 41.6562 23.0008 41.4291 23ZM40.5721 35.857H32.8571C32.691 35.8538 32.5274 35.8986 32.3861 35.986L28.5721 38.557V36.714C28.5713 36.4868 28.4806 36.2691 28.3199 36.1085C28.1591 35.948 27.9413 35.8575 27.7141 35.857H23.4301V24.714H40.5701V35.857H40.5721ZM38.8571 27.283H25.1431V28.997H38.8571V27.283ZM25.1431 31.573H38.8571V33.287H25.1431V31.572V31.573Z" fill="white" />
                    </svg>
                </Tooltip>
                <Tooltip message={'add_coupone'} >
                    {couponApplied &&
                        <div className=" absolute top-[-14px]">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="28" height="28" rx="14" fill="#EBC743" />
                                <path d="M20.7858 9.35596L11.9642 18.1418L7.5 13.6418L6.5 14.6418L11.4642 19.6418C11.5292 19.7088 11.6068 19.7623 11.6927 19.799C11.7785 19.8358 11.8708 19.8551 11.9642 19.856C12.0575 19.8551 12.1498 19.8358 12.2357 19.799C12.3215 19.7623 12.3992 19.7088 12.4642 19.6418L21.7858 10.356L20.7858 9.35596Z" fill="#163300" />
                            </svg>
                        </div>
                    }
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleCoupon} className=" cursor-pointer">
                        <rect width="64" height="64" rx="32" fill="#163300" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M33.697 21.9031C32.7597 20.9659 31.2402 20.9659 30.3029 21.9031L29.6606 22.5454C28.9855 23.2205 28.0698 23.5998 27.115 23.5998H25.9999C24.6745 23.5998 23.5999 24.6743 23.5999 25.9998V27.1149C23.5999 28.0697 23.2207 28.9854 22.5455 29.6605L21.9029 30.3031C20.9656 31.2404 20.9656 32.76 21.9029 33.6973L22.5455 34.3399C23.2207 35.015 23.5999 35.9307 23.5999 36.8855V37.9998C23.5999 39.3253 24.6745 40.3998 25.9999 40.3998H27.1143C28.0691 40.3998 28.9848 40.7791 29.6599 41.4542L30.3029 42.0972C31.2402 43.0345 32.7597 43.0345 33.697 42.0972L34.34 41.4542C35.0151 40.7791 35.9308 40.3998 36.8856 40.3998H37.9999C39.3254 40.3998 40.3999 39.3253 40.3999 37.9998V36.8855C40.3999 35.9307 40.7792 35.015 41.4544 34.3399L42.097 33.6972C43.0343 32.76 43.0343 31.2404 42.097 30.3031L41.4544 29.6605C40.7792 28.9854 40.3999 28.0697 40.3999 27.1149V25.9998C40.3999 24.6743 39.3254 23.5998 37.9999 23.5998H36.8849C35.9301 23.5998 35.0144 23.2205 34.3393 22.5454L33.697 21.9031ZM35.3984 29.0658C35.766 28.5144 35.617 27.7694 35.0656 27.4017C34.5142 27.0341 33.7691 27.1831 33.4015 27.7346L28.6015 34.9346C28.2339 35.486 28.3829 36.231 28.9343 36.5987C29.4857 36.9663 30.2308 36.8173 30.5984 36.2658L35.3984 29.0658ZM27.8 30.8002C28.7941 30.8002 29.6 29.9943 29.6 29.0002C29.6 28.0061 28.7941 27.2002 27.8 27.2002C26.8058 27.2002 26 28.0061 26 29.0002C26 29.9943 26.8058 30.8002 27.8 30.8002ZM38 35.0002C38 35.9943 37.1941 36.8002 36.2 36.8002C35.2058 36.8002 34.4 35.9943 34.4 35.0002C34.4 34.0061 35.2058 33.2002 36.2 33.2002C37.1941 33.2002 38 34.0061 38 35.0002Z" fill="white" />
                    </svg>

                </Tooltip>

            </div>
            <div
                className={classNames(
                    openCoupon ? 'opacity-0 translate-y-1 duration-200 ease-out pointer-events-none' : 'opacity-100 translate-y-0 duration-150 ease-in',
                    'fixed md:absolute left-0 right-0 bottom-0 top-0 transform z-10 transition-all'
                )}
            >
                <div onClick={() => toggleCoupon()} className="fixed inset-0 bg-black opacity-25 z-10" />
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-x rounded-t-xl z-20">
                    <div className=" flex justify-end">
                        <button
                            type="button"
                            className="p-2 m-5 text-gray-400 hover:text-gray-500 border-gray-400 border-2 rounded-100"
                            onClick={toggleCoupon}
                        >
                            <span className="sr-only">Close coupon</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitCoupon)}>
                        <div className="flex w-full pt-10 border-t border-[#C6C6C6] coupon flex-col md:px-10 pb-10 px-8">
                            <p className=" font-semibold text-base text-gray-50"> أضف كود خصم</p>

                            <Controller
                                name="coupon_code"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="focus:outline-none border-2 border-x-gray-400 rounded-2xl mt-2 mb-6"
                                        id="coupon_code"
                                    />
                                )}
                            />

                            {couponApplied && (
                                <div className="flex w-full mt-2 justify-between gap-x-3">
                                    <button
                                        type="button"
                                        className="text-white bg-green-200 hover:bg-green-400 rounded-100 w-full"
                                        onClick={editCoupon}
                                    >
                                        تعديل الكوبون
                                    </button>
                                    <button
                                        type="button"
                                        className="text-black ml-2 flex w-full justify-between items-center bg-green-300 py-4 px-6 rounded-100"
                                        onClick={deleteCoupon}
                                    >
                                        حدف الكوبون
                                        <TrashIcon className="w-4 h-4 text-black" />
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`
                                        ${couponApplied ? 'hidden' : ''} 
                                        text-white bg-green-200 hover:bg-green-400 rounded-100 focus:ring-4 focus:outline-none text-xl font-semibold w-full sm:w-auto px-5 py-[18px] text-center`
                                }
                                name="apply_coupon"
                                defaultValue="Apply coupon"
                            >
                                أضف
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className={classNames(
                    openNote ? 'opacity-0 translate-y-1 duration-200 ease-out pointer-events-none' : 'opacity-100 translate-y-0 duration-150 ease-in',
                    'fixed md:absolute left-0 right-0 bottom-0 top-0 transform z-10 transition-all'
                )}
            >
                <div onClick={() => toggleNote()} className="fixed inset-0 bg-black opacity-25 z-10" />
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl z-20">
                    <div className=" flex justify-end">
                        <button
                            type="button"
                            className="p-2 m-5 text-gray-400 hover:text-gray-500 border-gray-400 border-2 rounded-100"
                            onClick={toggleNote}
                        >
                            <span className="sr-only">Close Note</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex w-full pt-10 border-t border-[#C6C6C6] flex-col md:px-10 pb-10 px-8">
                            <p className="font-semibold text-base text-gray-50">اضف ملاحظة</p>
                            <Controller
                                name="order_note"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        ref={textareaRef}
                                        cols={30}
                                        rows={10}
                                        id="order_note"
                                        className="focus:outline-none h-[119px] border-2 border-x-gray-400 rounded-2xl mt-2 mb-6 p-4"
                                    />
                                )}
                            />
                            {NoteApplied && (
                                <div className="flex w-full mt-2 justify-between gap-x-3">
                                    <button
                                        type="button"
                                        className="text-white bg-green-200 hover:bg-green-400 rounded-100 w-full"
                                        onClick={() => {
                                            editNote()
                                        }}
                                    >
                                        تعديل الملاحظة
                                    </button>
                                    <button
                                        type="button"
                                        className="text-black ml-2 flex w-full justify-between items-center bg-green-300 py-4 px-6 rounded-100"
                                        onClick={deleteNote}
                                    >
                                        حذف الملاحظة
                                        <TrashIcon className="w-4 h-4 text-black" />
                                    </button>
                                </div>
                            )}
                            <button
                                type="submit"
                                className={`${NoteApplied ? 'hidden' : ''} text-white bg-green-200 hover:bg-green-400 rounded-100 focus:ring-4 focus:outline-none text-xl font-semibold w-full sm:w-auto px-5 py-[18px] text-center `}
                                name="add_note"
                                defaultValue="Add"
                            >
                                أضف
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
