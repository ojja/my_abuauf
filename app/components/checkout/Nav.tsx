import { Link } from '@remix-run/react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useShoppingCart from '~/stores/cartStore';

export default function Nav({stepOne,setStepOne,handleClick}:any) {
    const { t } = useTranslation();
    const { cartQuantityTotal } = useShoppingCart();
    return (
        <nav className="flex justify-center mb-5">
            <ol role="list" className="flex flex-wrap items-center text-gray-400 gap-y-2 gap-x-2 sm:gap-y-0">
                <li>
                    <div className="-m-1">
                        <Link to="/cart" className="flex items-center p-1 leading-3">
                            {t('cart')}
                            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-sm font-bold text-white bg-gray-500 rounded-full">{cartQuantityTotal}</span>
                        </Link>
                    </div>
                </li>

                <li>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        <div className="-m-1">
                            <span className={`p-1 ml-2 cursor-pointer ${stepOne ? 'font-semibold text-gray-700' : ''}`} onClick={() => setStepOne(true)}> {t('order_details')} </span>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        <div className="-m-1">
                            <span className={`p-1 ml-2 cursor-pointer ${!stepOne ? 'font-semibold text-gray-700' : ''}`} onClick={handleClick}> {t('payment_method')} </span>
                        </div>
                    </div>
                </li>
            </ol>
        </nav>
    )
}
