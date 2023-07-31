import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OrdersTableRow from "~/components/OrdersTableRow";

export default function OrdersTable({ userOrders }: { userOrders: any[] }) {
    const { t } = useTranslation('account');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(userOrders.length === 0);
      }, [userOrders]);
    

    return (
        <div>
            {!isLoading && userOrders.length == 0 ?
                <div className="w-full text-center ">
                    <p className="py-4 mb-5 text-lg text-gray-500">{t('no_orders')}</p>
                    <a href="/" className="inline-flex justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">{t("shop_now")}</a>
                </div>
                :
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr>
                            <th>{t('order_number')}</th>
                            <th>{t('date')}</th>
                            <th>{t('status')}</th>
                            <th>{t('price')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <>
                                <tr>
                                    <td className="pr-2"><div className="w-20 h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-24 h-6 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-48 h-10 mt-2 bg-gray-200 rounded-lg"></div></td>
                                </tr>
                                <tr>
                                    <td className="pr-2"><div className="w-20 h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-24 h-6 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-48 h-10 mt-2 bg-gray-200 rounded-lg"></div></td>
                                </tr>
                            </>
                            :
                            userOrders.map((order) => (
                                <OrdersTableRow key={order.order_id} order={order} />
                            ))

                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
