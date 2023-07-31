import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react';
import { fetchCats, fetchNav } from '~/utils/general';
import { Link } from '@remix-run/react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import CurrencySwitcher from '~/components/CurrencySwitcher';
import Cookies from "js-cookie";
import { RiUserLine } from 'react-icons/ri';

export default function MobileMenu() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [cats, setCats] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [navSuppoting, setNavSupporting] = useState([]);
    const [mainMenu, setMainMenu] = useState([]);
    const user_id = Cookies.get('user_id');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCats();
            if (response) {
                setCats(response);
            } else {
                // Handle the case when fetching the cities fails
            }
        };
        fetchData();
    }, []);
    const categoriesWithSubcategories = cats.filter(
        (category) => category.subcategories.length > 0
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchNav();
            if (response) {
                setNavSupporting(response.supporting_menu);
                setMainMenu(response.main_menu);
            } else {
                // Handle the case when fetching the cities fails
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const updateHeaderHeight = () => {
                const navbarElement = document.querySelector('header') as HTMLElement;
                if (navbarElement) {
                    const height = navbarElement.offsetHeight;
                    if(height>144){
                        setHeaderHeight(133);
                    }else{
                        setHeaderHeight(height);
                    }
                }
            };
            if (typeof window !== 'undefined') {
                updateHeaderHeight();
                window.requestAnimationFrame(updateHeaderHeight);
                window.addEventListener('resize', updateHeaderHeight);
                return () => {
                    window.removeEventListener('resize', updateHeaderHeight);
                };
            }
        }, 500);
    }, []);
    return (
        <div>

            <button
                type="button"
                className="p-2 text-white"
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
            <React.Fragment>
                {/* Mobile menu */}
                <Transition show={open} >
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                        <Transition.Child

                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setOpen(false)} />
                        </Transition.Child>

                        <div className="fixed left-0 bottom-0 z-20 transform w-screen" style={{ 'top': headerHeight }}>
                            <Transition.Child

                                enter="transition ease duration-500 transform"
                                enterFrom="opacity-0 translate-y-24"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease duration-300 transform"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-24"
                            >
                                <div className="overflow-y-scroll" style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}>
                                    <div className="bg-white relative text-base font-semibold">
                                        <h3 className="text-2xl font-bold px-4 py-3 border-b border-gray-100">{t('categories')}</h3>
                                        <div className="">
                                            <ul className="space-y-4 p-4">
                                                <li className="w-full">
                                                    <Link to="/" className="flex items-center p-2 rounded-2xl hover:bg-green-300" onClick={() => { setOpen(false) }}>
                                                        <span className="p-2">
                                                            <img src="/images/icons/interest.webp" alt="icon" />
                                                        </span>
                                                        <span className="ml-4">{t('offers_and_discounts')}</span>
                                                    </Link>
                                                </li>
                                                <li className="w-full">
                                                    <Link to="/" className="flex items-center p-2 rounded-2xl hover:bg-green-300" onClick={() => { setOpen(false) }}>
                                                        <span className="p-2">
                                                            <img src="/images/icons/interest.webp" alt="icon" />
                                                        </span>
                                                        <span className="ml-4">{t('best_selling')}</span>
                                                    </Link>
                                                </li>
                                                {categoriesWithSubcategories.map((category) => (
                                                    <li
                                                        key={category.slug}
                                                        className="w-full"
                                                    // onMouseEnter={() => setHoveredCategory(category)}
                                                    // onMouseLeave={() => setHoveredCategory(null)}
                                                    >
                                                        <span
                                                            // to={`/category/${category.slug}`}
                                                            onClick={() => setHoveredCategory(category)}
                                                            // onClick={() => { close(), setPopoverOpen(!popoverOpen) }}
                                                            className={`flex items-center p-2 cursor-pointer rounded-2xl hover:bg-green-300 ${hoveredCategory?.slug === category.slug ? "bg-green-300" : ""}`}
                                                        >
                                                            <span className="p-2">
                                                                <img src="/images/icons/interest.webp" alt="icon" />
                                                            </span>
                                                            <span className="ml-4">{i18n.language === 'en' ? category.name : category.ar_name}</span>
                                                            <span className="ml-auto p-2">
                                                                <ChevronLeftIcon className="w-6 h-6" />
                                                            </span>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {hoveredCategory ? (
                                            <div className="absolute inset-0 bg-white">
                                                <h3 className="text-2xl font-bold px-4 py-3 border-b border-gray-100">{i18n.language === 'en' ? hoveredCategory.name : hoveredCategory.ar_name}</h3>
                                                <button onClick={() => setHoveredCategory(null)} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-5 right-5 border border-gray-300 rounded-full">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.50469 14.1154L1.79069 8.40005C1.73655 8.34844 1.69346 8.28638 1.66401 8.21762C1.63457 8.14886 1.61939 8.07485 1.61939 8.00005C1.61939 7.92526 1.63457 7.85124 1.66401 7.78248C1.69346 7.71373 1.73655 7.65166 1.79069 7.60005L7.50469 1.88672L8.30469 2.68672L3.56202 7.42939L15.3334 7.42938L15.3334 8.57272L3.56269 8.57272L8.30535 13.3154L7.50469 14.1154Z" fill="#163300" />
                                                    </svg>
                                                </button>
                                                <ul className="space-y-4 p-4">
                                                    <li className="w-full">
                                                        <Link to={`/category/${hoveredCategory.slug}`} className="flex items-center p-2 rounded-2xl hover:bg-green-300" onClick={() => { setOpen(false) }}>
                                                            <span className="ml-4">{t('all_type')}{" "}{i18n.language === 'en' ? hoveredCategory.name : hoveredCategory.ar_name}</span>
                                                            <span className="ml-auto p-2">
                                                                <ChevronLeftIcon className="w-6 h-6" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    {hoveredCategory.subcategories.map((subCategory, index): any => (
                                                        <li className="w-full" key={index}>
                                                            <Link to={`/category/${subCategory.slug}`} className="flex items-center p-2 rounded-2xl hover:bg-green-300" onClick={() => { setOpen(false) }}>
                                                                <span className="ml-4">{i18n.language === 'en' ? subCategory.name : subCategory.ar_name}</span>
                                                                <span className="ml-auto p-2">
                                                                    <ChevronLeftIcon className="w-6 h-6" />
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : ''}
                                    </div>
                                    <div className="bg-green-300 px-4 py-6 ">
                                        <div className="grid gap-6 divide-y-1 divide-gray-100">
                                            <div>
                                                {navSuppoting.map((item: any, index: any) => (
                                                    <Link to={`/${item.page_link}`} className={`block mt-4 lg:inline-block lg:mt-0 font-semibold ${location.pathname === `/${item.page_link}` ? 'underline' : 'hover:underline'}`} key={index}>
                                                        {i18n.language === 'ar' ? item.page_title_ar : item.page_title}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="flex flex-col py-4 gap-2">
                                                <CurrencySwitcher inMobile />
                                                <Link to={user_id ? '/my-account' : 'login'} className="px-4 py-2 font-semibold text-white bg-green-200 hover:bg-green-400 flex justify-between text-sm rounded-100">
                                                    <span>
                                                        {user_id ?
                                                            t('my_account')
                                                            :
                                                            <>
                                                                {t('login')} {t('or')} {t('sign_up')}
                                                            </>
                                                        }
                                                    </span>
                                                    <RiUserLine />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </React.Fragment>
            {/* End Mobile menu */}
        </div>
    )
}
