import TrackingSteps from "~/components/TrackingSteps";
import ExtraProducts from "~/components/ExtraProducts";
import CartSummary from "~/components/checkout/CartSummary"
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getOrderInfo } from "~/api/common";
import { useTranslation } from "react-i18next";
import RoundedCheck from "../icons/RoundedCheck";

type OrderStatus = "processing" | "fulfilled" | "delivered" | "pending" | "on-hold" | "completed" | "cancelled" | "refunded" | "failed" | "checkout-draft";


export default function ThanksComponent({ orderID }: any) {
    const { t } = useTranslation('fields');
    const [orderData, setOrderData] = useState<any>({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrderInfo(orderID);
            setOrderData(result);
        };
        fetchData();
    }, [orderID]);
    // console.log('orderData', orderData)
    const status: OrderStatus = orderData?.order?.status || "pending";
    const statusToStepMap: Record<OrderStatus, { step: number; message: string }> = {
        pending: { step: 1, message: "Your order is pending." },
        processing: { step: 1, message: "Your order is being processed." },
        fulfilled: { step: 2, message: "Your order has been fulfilled successfully." },
        delivered: { step: 3, message: "Your order has been delivered." },
        "on-hold": { step: 1, message: "Your order is on hold." },
        completed: { step: 4, message: "Your order has been completed." },
        cancelled: { step: -1, message: "Your order has been cancelled." },
        refunded: { step: 5, message: "Your order has been refunded." },
        failed: { step: 6, message: "Your order has been failed." },
        "checkout-draft": { step: 7, message: "Your order has been draft." },
    };
    const { step, message } = statusToStepMap[status] || { step: 0, message: "" };

    const first_name = orderData?.billing?.first_name;
    const last_name = orderData?.billing?.last_name;
    const email = orderData?.billing?.email;
    const phone = orderData?.billing?.phone;
    const created_at = orderData?.billing?.created_at;
    const expected_delivery_date = orderData?.billing?.expected_delivery_date;
    const payment_method = orderData?.order?.payment_method;
    const address = orderData?.billing?.address1;
    const gov = orderData?.billing?.gov;
    const area = orderData?.billing?.area;
    const neighborhood = orderData?.billing?.neighborhood;
    const property_type = orderData?.billing?.property_type;
    const floor = orderData?.billing?.floor;
    const apartment = orderData?.billing?.apartment;
    return (
        <div>
            <div className="container px-4 py-10 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <div className="mb-5">
                    <div className="flex gap-4 items-start">
                        <div className="hidden md:block">
                            <RoundedCheck />
                        </div>
                        <div>
                            <h1 className="mb-2 text-4xl font-semibold tracking-wide uppercase text-primary-600">{t('thank_you')}</h1>
                            <h3 className="text-base font-semibold tracking-wide text-gray-900">{message}</h3>
                            <p className="mt-2 text-base text-gray-500 max-w-[500px]">{t('thanks_para')}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <TrackingSteps step={step} />
                </div>
                <div className="flex flex-col-reverse items-start md:flex-row gap-5">
                    <div className="w-full mx-auto">

                        <div className="bg-green-300 rounded-[32px]">
                            <div className="px-12 py-6">
                                <h2 className="text-2xl font-bold pt-10 border-b border-gray-200 pb-4">{t('shipping_information')}</h2>
                                <dl className="py-5 text-sm">
                                    <dd className="mt-2 text-black">
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('first_name')}</label>
                                            <span className="block text-base font-bold">{first_name}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('last_name')}</label>
                                            <span className="block text-base font-bold">{last_name}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('email')}</label>
                                            <span className="block text-base font-bold">{email}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('phone')}</label>
                                            <span className="block text-base font-bold">{phone}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <h2 className="text-2xl font-bold pt-10 border-b border-gray-200 pb-4">{t('payment_method')}</h2>
                                <dl className="py-5 text-sm">
                                    <dd className="mt-2 text-black">
                                        <div className="inline-block w-1/2 mb-2">
                                            <span className="block text-base font-bold">{payment_method}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <h2 className="text-2xl font-bold pt-10 border-b border-gray-200 pb-4">{t('shipping_details')}</h2>
                                <dl className="py-5 text-sm">
                                    <dd className="mt-2 space-y-2 black">
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-50">{t('expected_delivery_date')}</label>
                                            <span className="block text-base font-bold">{expected_delivery_date ? expected_delivery_date : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-50">{t('order_date')}</label>
                                            <span className="block text-base font-bold">{created_at ? created_at : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-50">{t('city')}</label>
                                            <span className="block text-base font-bold">{gov ? gov : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-50">{t('neighborhood')}</label>
                                            <span className="block text-base font-bold">{neighborhood ? neighborhood : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-50">{t('area')}</label>
                                            <span className="block text-base font-bold">{area ? area : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('street_name')}</label>
                                            <span className="block text-base font-bold">{address ? address : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('property_type')}</label>
                                            <span className="block text-base font-bold">{property_type ? property_type : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('floor')}</label>
                                            <span className="block text-base font-bold">{floor ? floor : 'MISSING'}</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-50">{t('apartment')}</label>
                                            <span className="block text-base font-bold">{apartment ? apartment : 'MISSING'}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <div className="pt-6 border-t border-gray-200">
                                    <Link to="/my-account/orders/single" className="inline-block bg-green-200 text-white py-4 px-10 rounded-100 w-fit cursor-pointer hover:bg-green-400 text-base font-semibold">{t('order_details')}</Link>
                                </div>
                            </div>
                        </div>

                        <div className="hidden bg-red-100">
                            <div className="flex p-10">
                                <div className="flex flex-col">
                                    <h3 className="text-[#CA4323] text-2xl font-bold mb-1">Congratulations!</h3>
                                    <p className="text-sm font-semibold leading-6 text-gray-800">
                                        You’ve earned
                                        <strong>5768 rewards points </strong>
                                        for your purchase today, and these points will be credited to your account immediately.
                                    </p>
                                </div>
                                <div className="w-1/5">
                                    <img src="/images/thanks_gift.png" alt="img alt" />
                                </div>
                            </div>
                            <div className="p-10 border-t border-gray-300">
                                <p className="text-xs font-semibold text-gray-400">Enter a password below to create a Nine Crimes account. Keep track of orders, add products to your wishlist, and have exclusive access to promotions all the time.</p>
                                <form id="create_account" action="#" method="post">
                                    <div className="form">
                                        <input id="account_password" type="password" name="password" required />
                                        <button type="submit" className="button_form">Create Account</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <CartSummary thanks={orderID} orderData={orderData} />
                </div>
                <ExtraProducts title='shop_more' count={20} />

            </div>
        </div>
    )
}
