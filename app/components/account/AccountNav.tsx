import { Link, useLoaderData, useLocation } from "@remix-run/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";
import { RiMenuFill, RiHeartLine, RiShoppingBagLine, RiHome2Line, RiWallet3Line, RiUserLine, RiLogoutBoxRLine } from "react-icons/ri";

export default function AccountNav({ userInfo, customCall = false, membershipClass = "silver" }: any) {
    const { t } = useTranslation('account');
    const [isLoading, setIsLoading] = useState(true);
    // console.log('userInfo Nav', userInfo);
    const { first_name = '', last_name = '' } = userInfo || {};

    useEffect(() => {
        if (userInfo) {
            setIsLoading(false);
        }
    }, [userInfo]);
    const navItems = [
        { path: "/my-account", label: t("home"), icon: <RiMenuFill /> },
        { path: "/my-account/addresses", label: t("shipping_addresses"), icon: <RiHome2Line /> },
        { path: "/my-account/wallet", label: t("my_wallet"), icon: <RiWallet3Line /> },
        { path: "/my-account/wishlist", label: t("my_wishlist"), icon: <RiHeartLine /> },
        { path: "/my-account/orders", label: t("orders_returns"), icon: <RiShoppingBagLine /> },
        { path: "/my-account/profile", label: t("account_info"), icon: <RiUserLine /> },
    ];

    const location = useLocation();
    const isActiveNavItem = (path: any) => {
        const currentPath = location.pathname;
        return (
            currentPath === path ||
            (currentPath.startsWith(path) && currentPath.includes("/orders/") && path !== "/my-account")
        );
    };

    const handleLogout = () => {
        Cookies.remove('user_id');
        Cookies.remove('token');
        localStorage.removeItem("wishlistItems");
        window.location.reload();
    };

    let membershipClasses = 'bg-gradient-to-r from-gray-200 to-white';
    if (membershipClass === 'platinum') {
        membershipClasses = 'bg-gradient-to-r from-black to-[#414141]';
    }
    if (membershipClass === 'gold') {
        membershipClasses = 'bg-gradient-to-b from-yellow-600 to-yellow-600 text-white';
    }
    if (membershipClass === 'silver') {
        membershipClasses = 'bg-gradient-to-r from-gray-200 to-white';
    }
    return (
        <div className='h-full py-5 space-y-2 text-gray-500 bg-white w-96 shadow-custom rounded-xl'>
            <div className='divide-y divide-gray-100'>
                {/* Info */}
                {customCall ?
                    <div className="px-8">
                        <div className={`px-3 py-0.5 rounded-lg justify-center items-center gap-2 inline-flex text-gray-50 shadow ${membershipClasses}`}>
                            <div className="justify-center items-center gap-1 flex">
                                <div className="text-base font-semibold leading-relaxed">{t(`${membershipClass}`)}</div>
                            </div>
                        </div>

                        <div className="mt-2 py-2">
                            <h2 className="text-3xl font-semibold capitalize">{'مرحبا محمد'}</h2>
                        </div>
                    </div>
                    :
                    isLoading ?
                        <div className="flex items-center p-2 pb-4 space-x-4">
                            < span className="flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                                </svg>
                            </span>
                            <div className="mr-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                                <div className="w-12 h-2 mt-2 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                        :
                        // <div className="flex items-center p-2 pb-4 space-x-4">
                        //     <Avatar
                        //         name={`${first_name!} ${last_name!}`}
                        //         size='48'
                        //         round
                        //     />
                        //     <div>
                        //         <h2 className="text-lg font-semibold capitalize">{first_name!} {last_name!}</h2>
                        //         <span className="flex items-center space-x-1">
                        //             <Link to="/my-account/profile" rel="noopener noreferrer" className="text-xs text-gray-400 hover:underline">{t("view_profile")}</Link>
                        //         </span>
                        //     </div>
                        // </div>

                        <div className="px-8">
                            <div className={`px-3 py-0.5 rounded-lg justify-center items-center gap-2 inline-flex text-gray-50 shadow ${membershipClasses}`}>
                                <div className="justify-center items-center gap-1 flex">
                                    <div className="text-base font-semibold leading-relaxed">{t(`${membershipClass}`)}</div>
                                </div>
                            </div>

                            <div className="mt-2 py-2">
                                <h2 className="text-3xl font-semibold capitalize">{t('hey')} {first_name}</h2>
                            </div>
                        </div>
                }
                <ul className="pt-2 pb-4 space-y-4 text-base px-4">
                    {customCall ?
                        <>
                            <li className="flex items-center p-2 space-x-2 rounded-md font-semibold bg-green-300 ">
                                <span className="p-2">
                                    <RiMenuFill />
                                </span>
                                <span className="text-base">الرئيسية</span>
                            </li>
                            <li className="flex items-center p-2 space-x-2 rounded-md font-semibold">
                                <span className="p-2">
                                    <RiShoppingBagLine />
                                </span>
                                <span className="text-base">طلباتي</span>
                            </li>
                        </>
                        :
                        navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-2 space-x-2 rounded-md font-semibold ${isActiveNavItem(item.path) ? 'bg-green-300' : 'hover:bg-green-300'}`}
                                >
                                    <span className="p-2 text-xl">
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
                {
                    !customCall &&
                    <>
                        <ul className="pt-2 pb-4 space-y-1 text-base text-green-200 font-semibold px-4">
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 rounded-md hover:bg-green-300 underline">
                                    <span>{t("need_help")}</span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 rounded-md hover:bg-green-300 underline">
                                    <span>{t("faqs")}</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="py-6 px-8 space-y-1 text-base text-green-200 font-semibold">
                            <li>
                                <button className="flex items-center py-2.5 px-5 space-x-3 rounded-[32px] border-2 border-gray-400 hover:bg-green-200 hover:text-white hover:border-green-200" onClick={handleLogout}>
                                    <span>{t("log_out")}</span>
                                    <RiLogoutBoxRLine />
                                </button>
                            </li>
                        </ul>
                    </>
                }
            </div >
        </div >
    );
}
