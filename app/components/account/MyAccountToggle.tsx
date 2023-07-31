import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next';
import { RiHeartLine, RiHome2Line, RiMenuFill, RiShoppingBagLine, RiUserLine, RiWallet3Line } from 'react-icons/ri';
import Cookies from "js-cookie";
import { Fragment } from 'react';
import { Link } from '@remix-run/react';


export default function MyAccountToggle() {
    const { t } = useTranslation('account');
    const { i18n } = useTranslation();
    const user_id = Cookies.get('user_id');

    const navItems = [
        { path: "/my-account", label: t("home"), icon: <RiMenuFill /> },
        { path: "/my-account/addresses", label: t("shipping_addresses"), icon: <RiHome2Line /> },
        { path: "/my-account/wallet", label: t("my_wallet"), icon: <RiWallet3Line /> },
        { path: "/my-account/wishlist", label: t("my_wishlist"), icon: <RiHeartLine /> },
        { path: "/my-account/orders", label: t("orders_returns"), icon: <RiShoppingBagLine /> },
        { path: "/my-account/profile", label: t("account_info"), icon: <RiUserLine /> },
    ];
    return (
        <div>
            <Popover className="relative">
            {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                inline-flex items-center px-3 py-2 text-xl font-medium focus:outline-none text-white gap-3`}
                        >
                            <div className="min-w-8 h-8 flex items-center">
                                <RiUserLine />
                            </div>
                            <span>
                                {user_id ?
                                    t('my_account')
                                    :
                                    t('login')
                                }
                            </span>
                            <ChevronDownIcon
                                className={`${open ? 'transform rotate-180' : ''}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-0 z-20 w-96 max-w-sm  transform px-4 sm:px-0">
                                <div className="overflow-hidden rounded-3xl shadow-custom p-4 bg-white">
                                    <div className="relative space-y-4">

                                        {user_id ?
                                            <div className="text-black text-xl font-medium">
                                                {navItems.map((item, index) => (
                                                    <Link
                                                        to={item.path}
                                                        className="flex justify-start w-full cursor-pointer items-center gap-3"
                                                        key={index}
                                                        onClick={close}
                                                    >
                                                        <div className="min-w-16 h-16 flex items-center">
                                                            {item.icon}
                                                        </div>
                                                        <span className="block mr-auto">{item.label}</span>
                                                        <div className="w-8 flex items-center">
                                                            <ChevronLeftIcon />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                            :
                                            <div className="text-black text-xl font-medium">
                                                <Link
                                                    to="/signup"
                                                    onClick={close}
                                                    className="flex justify-start w-full cursor-pointer items-center gap-3"
                                                >
                                                    <div className="min-w-16 h-16 flex items-center">
                                                        <RiUserLine />
                                                    </div>
                                                    <span className="block mr-auto">{t('sign_up')}</span>
                                                    <div className="w-8 flex items-center">
                                                        <ChevronLeftIcon />
                                                    </div>
                                                </Link>
                                                <Link
                                                    to="/login"
                                                    onClick={close}
                                                    className="flex justify-start w-full cursor-pointer items-center gap-3"
                                                >
                                                    <div className="min-w-16 h-16 flex items-center">
                                                        <RiUserLine />
                                                    </div>
                                                    <span className="block mr-auto">{t('login')}</span>
                                                    <div className="w-8 flex items-center">
                                                        <ChevronLeftIcon />
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
