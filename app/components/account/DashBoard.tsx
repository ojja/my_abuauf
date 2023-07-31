import Msg from "~/components/Msg";
import OrdersTable from "~/components/OrdersTable";
import ReferralBox from "~/components/ReferralBox";
import FormatCurrency from "~/utils/FormatCurrency";
import SingleAddress from "~/components/SingleAddress";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUserInfo, getDefaultAddress } from "~/utils/account";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { RiEdit2Fill, RiEdit2Line, RiEditBoxLine, RiEditFill, RiUserLine } from "react-icons/ri";


interface AddressData {
    id: string;
    status: string;
    gov_id: string;
    area_id: string;
    full_address: string;
    apartment_type: string;
    floor: string;
    apartment: string;
    area_name_en: string;
    area_name_ar: string;
    gov_name_en: string;
    gov_name_ar: string;
}
interface UserInfo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_day: string;
    birth_month: string;
    birth_year: string;
    gender: string;
}

export default function DashBoard({ userOrders }: any) {
    const { t } = useTranslation('account');
    const [address, setAddress] = useState<AddressData | null>(null);
    const [userInfo, setUserInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isMsg, setIsMsg] = useState(false);
    const [msg, setMsg] = useState('');

    // Check if the 'isNewUser' cookie exists
    const isNewUserCookie = Cookies.get('isNewUser');
    const isCurrentUserCookie = Cookies.get('isCurrentUser');
    if (isNewUserCookie) {
        setIsMsg(true);
        setMsg('thankYouForJoining');
        Cookies.remove('isNewUser');
    }
    if (isCurrentUserCookie) {
        setIsMsg(true);
        setMsg('welcomeBack');
        Cookies.remove('isCurrentUser');
    }
    useEffect(() => {
        const fetchData = async () => {
            const responseAddress = await getDefaultAddress();
            setAddress(responseAddress);
        };
        fetchData();
        const getUserInfo = async () => {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                setUserInfo(userInfo as UserInfo);
                setIsLoading(false)
            } else {
                // Handle the case when fetching user information fails
            }
        };
        getUserInfo();

    }, []);

    return (
        <div>
            {isMsg &&
                <Msg
                    color="green"
                    message={t(`${msg}`)}
                />
            }
            <div className="flex justify-between py-8 border-b border-gray-100 border-solid gap-10">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">{t("account_home")}</h1>
                    <p className="text-gray-50 text-xl">{t("account_home_subtitle")}</p>
                </div>
                <div className="flex items-center justify-between p-6 border-2 border-green-200 bg-green-300 rounded-2xl">
                    <span className="text-xl tracking-wider text-gray-50">{t("wallet_balance")}</span>
                    <span className="ml-20 text-3xl font-bold text-green-900"><FormatCurrency value={400} /></span>
                </div>
            </div>

            <div className="py-8 border-b border-gray-100 border-solid">
                <div className="py-9">
                    <h2 className="text-2xl font-bold">{t("share_friends_title")}</h2>
                    <p className="text-gray-50 text-xl">{t("share_friends_subtitle")}</p>
                </div>
                <ReferralBox
                    url={'/ref?76543345'}
                />
            </div>

            <div className="py-8 mt-10">
                <h2 className="pb-2 mb-4 text-3xl border-b border-gray-100 border-solid">{t("orders_returns")}</h2>
                <OrdersTable userOrders={userOrders} />
            </div>

            <div className="py-8 mt-10">
                <h2 className="pb-2 mb-4 text-3xl border-b border-gray-100 border-solid">{t("orders_returns")}</h2>
                <div className="">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="bg-white border border-gray-400 rounded-[32px] divide-y divide-gray-400">
                                <div className="py-5 px-4 space-y-2">
                                    <div className="mb-1 flex items-center gap-2 font-semibold text-xl"><RiUserLine /> <span className="text-base">{t('your_info')}</span></div>
                                    <div className="block">
                                        {isLoading ?
                                            <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                            :
                                            <span className="block text-xl font-semibold text-gray-400">{userInfo.first_name}{" "}{userInfo.last_name}</span>
                                        }
                                    </div>
                                    <div className="block">
                                        {isLoading ?
                                            <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                            :
                                            <span className="block text-xl font-semibold text-gray-400">{userInfo.email}</span>
                                        }
                                    </div>
                                    <div className="block">
                                        {isLoading ?
                                            <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                            :
                                            <span className="block text-xl font-semibold text-gray-400">{userInfo.phone}</span>
                                        }
                                    </div>
                                </div>
                                <div className="py-5 px-4 flex">
                                    <Link to="/my-account/profile" className="inline-flex items-center py-2.5 px-5 space-x-3 rounded-[32px] border-2 border-gray-400 hover:bg-green-200 font-semibold ml-auto hover:text-white hover:border-green-200">
                                        {t('edit')}
                                        <RiEditBoxLine className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SingleAddress address={address} overview={true} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
