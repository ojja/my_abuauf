import React, { Fragment, useState } from 'react';
import { useCurrency } from '~/CurrencyContext';
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { RiCheckLine } from 'react-icons/ri';
import { useLocation } from '@remix-run/react';
// import { t } from 'i18next';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const CurrencySwitcher: React.FC = ({ inMobile }: any) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const { i18n } = useTranslation();
    const { currency, setCurrency } = useCurrency();

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
    };
    const getFlagImage = (currencyCode: string) => {
        if (currencyCode === 'AED') {
            return '/images/aed.webp';
        } else if (currencyCode === 'EGP') {
            return '/images/egypt.webp';
        }
        return '';
    };
    function handleChangeLanguage(lang: string) {
        i18n.changeLanguage(lang);
        const newPathname = `/${lang}${pathname}`;
        console.log('newPathname', newPathname)
    }
    return (
        <div>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                inline-flex items-center px-3 py-2 text-base font-medium focus:outline-none w-full bg-white md:!bg-transparent md:rounded-none rounded-100 justify-between md:border-none border-2 border-gray-400
                `}
                        >
                            <div className="min-w-8 md:h-8 flex items-center">
                                <img src={getFlagImage(currency)} alt={currency} width="16" height="16" className="" />
                            </div>
                            <span className="text-green-200 ml-3">
                                {t(currency === "EGP" ? 'egypt' : 'aed')} ({currency})
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
                            <Popover.Panel className="fixed bottom-0 md:bottom-auto md:absolute md:top-full left-0 z-20 md:w-96 md:max-w-sm transform top-0 w-full flex items-end">
                                {inMobile &&
                                    <Popover.Button onClick={() => close()}>
                                        <div className="fixed inset-0 bg-black opacity-25 z-10" />
                                    </Popover.Button>
                                }
                                <div className="overflow-hidden rounded-t-3xl md:rounded-3xl shadow-custom bg-white w-full z-20">
                                    {inMobile &&
                                        <div className="px-6 py-5 border-b border-gray-100 relative ">
                                            <h3 className="text-xl font-bold">{t('country')} {t('and')} {t('language')}</h3>
                                            <Popover.Button onClick={() => close()} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-5 right-5 border border-gray-300 rounded-full">
                                                <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </Popover.Button>
                                        </div>
                                    }
                                    <div className="relative space-y-4 p-4">
                                        <div>
                                            <h4 className="text-xl font-medium py-3 border-b border-gray-100 text-slate-900">{t('country')}</h4>
                                            <div
                                                className="flex justify-start text-xl font-medium text-black w-full cursor-pointer items-center"
                                                onClick={() => handleCurrencyChange('EGP')}
                                            >
                                                <div className="min-w-16 h-16 flex items-center">
                                                    <img src={getFlagImage('EGP')} alt="EGP" width="24" height="24" className="" />
                                                </div>
                                                <span className="block ml-3 mr-auto">{t('egypt')} (EGP)</span>
                                                <div className="min-w-16 h-16 flex items-center">
                                                    {currency === 'EGP' ? <RiCheckLine /> : ''}
                                                </div>
                                            </div>
                                            <div
                                                className="flex justify-start text-xl font-medium text-black w-full cursor-pointer items-center"
                                                onClick={() => handleCurrencyChange('AED')}
                                            >
                                                <div className="min-w-16 h-16 flex items-center">
                                                    <img src={getFlagImage('AED')} alt="AED" width="24" height="24" className="" />
                                                </div>
                                                <span className="block ml-3 mr-auto">{t('aed')} (AED)</span>

                                                <div className="min-w-16 h-16 flex items-center">
                                                    {currency === 'AED' ? <RiCheckLine /> : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-medium py-3 border-b border-gray-100 text-slate-900">{t('language')}</h4>
                                            <div
                                                className="flex justify-start text-xl font-medium text-black w-full cursor-pointer items-center"
                                                onClick={() => handleChangeLanguage('en')}
                                            >
                                                <div className="min-w-16 h-16 flex items-center">
                                                    <img src="/images/web.webp" alt="web" width="24" height="24" />
                                                </div>
                                                <span className="block ml-3 mr-auto">{t('lng_en')}</span>
                                                <div className="min-w-16 h-16 flex items-center">
                                                    {i18n.language === 'en' ? <RiCheckLine /> : ''}
                                                </div>
                                            </div>
                                            <div
                                                className="flex justify-start text-xl font-medium text-black w-full cursor-pointer items-center"
                                                onClick={() => handleChangeLanguage('ar')}
                                            >
                                                <div className="min-w-16 h-16 flex items-center">
                                                    <img src="/images/web.webp" alt="web" width="24" height="24" />
                                                </div>
                                                <span className="block ml-3 mr-auto">{t('lng_ar')}</span>

                                                <div className="min-w-16 h-16 flex items-center">
                                                    {i18n.language === 'ar' ? <RiCheckLine /> : ''}
                                                </div>
                                            </div>
                                        </div>
                                        {inMobile &&
                                            <div className="p-4 pt-6 border-t border-gray-100">
                                                <Popover.Button onClick={() => close()} className="px-8 font-semibold text-white bg-green-200 hover:bg-green-400 text-xl rounded-100 w-full flex items-center whitespace-nowrap justify-center py-3">{t('confirm')}</Popover.Button>
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
    );
};

export default CurrencySwitcher;
