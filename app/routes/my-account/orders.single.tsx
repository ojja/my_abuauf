import { Dialog, Transition } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "~/components/Button";
import Status from "~/components/Status";
import TrackingSteps from "~/components/TrackingSteps";
import FormatCurrency  from "~/utils/FormatCurrency";

const product = {
    id: 1,
    name: 'Cold Brew Bottle',
    description:
        'This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.',
    href: '#',
    quantity: 1,
    price: '$32.00',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg',
    imageAlt: 'Glass bottle with black plastic pour top and mesh insert.',
}
export default function ordersSingle() {
    const { t } = useTranslation();
    let [isOpenCancel, setIsOpenCancel] = useState(false)
    let [isCancel, setIsCancel] = useState(false)
    let [isSelectReturn, setIsSelectReturn] = useState(false)
    let [isReturn, setIsReturn] = useState(false)

    function closeSelectReturn() {
        setIsSelectReturn(false)
    }
    function openSelectReturn() {
        setIsSelectReturn(true)
    }

    function closeReturn() {
        setIsReturn(false)
    }
    function openReturn() {
        setIsReturn(true)
    }

    function closeModalCancel() {
        setIsOpenCancel(false)
    }
    function openModalCancel() {
        setIsOpenCancel(true)
    }

    function closeConfirmCancel() {
        setIsCancel(false)
    }
    function openConfirmCancel() {
        setIsCancel(true)
    }
    return (
        <div>
            <div className="flex items-center justify-between py-5 pb-5 border-b-2 border-gray-200 border-solid">
                <h1 className="text-3xl">ORDER #3776</h1>
            </div>
            <div className="py-5">

                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="text-sm text-[#929292] mr-2">Status:</span>
                        <Status
                            color="green"
                            name="Delivered"
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-[#929292] mr-2">Date:</span>
                        <strong className="font-bold text-gray-50">20/10/2022</strong>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-[#929292] mr-2">Items:</span>
                        <strong className="font-bold text-gray-50">2</strong>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-[#929292] mr-2">Points Earned:</span>
                        <strong className="font-bold text-gray-50">2000 Point (100 EGP)</strong>
                    </div>
                </div>

                {/* proccess */}
                <TrackingSteps/>

                {/* Items */}
                <div className="items-list section">
                    <div key={product.id} className="flex py-10 space-x-6 border-b border-gray-200">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                        />
                        <div className="flex flex-col flex-auto">
                            <div>
                                <h4 className="mb-2 font-medium text-gray-900">
                                    <a href={product.href}>{product.name}</a>
                                </h4>
                                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                    <div className="flex">
                                        <dt className="font-medium text-gray-900">Size</dt>
                                        <dd className="ml-2 text-gray-700">M</dd>
                                    </div>
                                    <div className="flex pl-4 sm:pl-6">
                                        <dt className="font-medium text-gray-900">Color</dt>
                                        <dd className="ml-2 text-gray-700">Green</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="flex flex-col items-start justify-end flex-1 mt-6">
                                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                    <div className="flex">
                                        <dt className="font-medium text-gray-900">Quantity</dt>
                                        <dd className="ml-2 text-gray-700">1</dd>
                                    </div>
                                    <div className="flex pl-4 sm:pl-6">
                                        <dt className="font-medium text-gray-900">Price</dt>
                                        <dd className="ml-2 text-gray-700">{FormatCurrency(32)}</dd>
                                    </div>
                                </dl>
                                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                    <div className="flex">
                                        <dt className="font-medium text-gray-900">Total</dt>
                                        <dd className="ml-2 text-gray-700">{FormatCurrency(32 * 1)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div key={product.id} className="flex py-10 space-x-6 border-b border-gray-200">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                        />
                        <div className="flex flex-col flex-auto">
                            <div>
                                <h4 className="mb-4 font-medium text-gray-900">
                                    <a href={product.href}>{product.name}</a>
                                </h4>
                                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                    <div className="flex">
                                        <dt className="font-medium text-gray-900">Size</dt>
                                        <dd className="ml-2 text-gray-700">M</dd>
                                    </div>
                                    <div className="flex pl-4 sm:pl-6">
                                        <dt className="font-medium text-gray-900">Color</dt>
                                        <dd className="ml-2 text-gray-700">Green</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="flex flex-col items-start justify-end flex-1 mt-6">
                                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                    <div className="flex">
                                        <dt className="font-medium text-gray-900">Quantity</dt>
                                        <dd className="ml-2 text-gray-700">2</dd>
                                    </div>
                                    <div className="flex pl-4 sm:pl-6">
                                        <dt className="font-medium text-gray-900">Price</dt>
                                        <dd className="ml-2 text-gray-700">{FormatCurrency(32)}</dd>
                                    </div>
                                </dl>
                                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                    <div className="flex">
                                        <dt className="font-medium text-gray-900">Total</dt>
                                        <dd className="ml-2 text-gray-700">{FormatCurrency(32 * 2)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="py-5">
                    <h4 className="text-xl font-medium text-gray-900">Shipping Info.</h4>
                    <dl className="py-5 text-sm">
                        <dd className="mt-2 text-gray-700">
                            <div className="block mb-2">
                                <span className="block text-base font-bold">Ahmed Khaled</span>
                            </div>
                            <address className="space-x-4 not-italic">
                                <div className="inline-block">
                                    <label className="text-[#6C757D] text-sm">Street & Building No.</label>
                                    <span className="block text-sm font-bold">894 Selmer Lodge Suite 482</span>
                                </div>
                                <div className="inline-block mr-5">
                                    <label className="text-[#6C757D] text-sm">Floor</label>
                                    <span className="block text-sm font-bold">4</span>
                                </div>
                                <div className="inline-block">
                                    <label className="text-[#6C757D] text-sm">Apartment</label>
                                    <span className="block text-sm font-bold">46</span>
                                </div>
                            </address>
                        </dd>
                    </dl>
                </div>
                <div className="py-5 border-t border-gray-200">
                    <h4 className="text-xl font-medium text-gray-900">{t('payment_method')}</h4>
                    <dd className="mt-2 text-gray-700">
                        <p>Credit / Debit Card</p>
                        <p>Mastercard</p>
                        <p>
                            <span aria-hidden="true">•••• </span>
                            <span className="sr-only">Ending in </span>1545
                        </p>
                    </dd>
                </div>

                <h3 className="sr-only">Summary</h3>

                <dl className="pt-10 space-y-6 text-sm border-t border-gray-200">
                    <div className="flex justify-between">
                        <dt className="font-medium text-gray-900">Subtotal</dt>
                        <dd className="text-gray-700">$36.00</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex font-medium text-gray-900">
                            Discount
                            <span className="rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2">STUDENT50</span>
                        </dt>
                        <dd className="text-gray-700">-$18.00 (50%)</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="font-medium text-gray-900">Shipping</dt>
                        <dd className="text-gray-700">$5.00</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-lg font-medium text-gray-900 uppercase">Total</dt>
                        <dd className="text-lg font-bold text-gray-900">$23.00</dd>
                    </div>
                </dl>

                <div className="pt-5 mt-5 space-x-2 border-t border-gray-200">
                    <Button
                        name={'Buy again'}
                        style="solid"
                    />
                    <Button
                        name={'Return Product'}
                        style="border"
                        onClick={openSelectReturn}
                    />
                    <Button
                        name={'Cancel Order'}
                        style="border"
                        onClick={openModalCancel}
                    />
                </div>
            </div>
            <Transition appear show={isOpenCancel} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModalCancel}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <button onClick={closeModalCancel} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                                        <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    <h3 className="mb-5 text-xl font-medium leading-6 text-gray-900">Cancel Order #354896</h3>
                                    <div>
                                        <label htmlFor="way" className="block text-sm font-medium text-gray-700">Choose why you want to cancel your order.</label>
                                        <select id="way" name="way" className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                            <option>Changed My Mind</option>
                                            <option>Other Reason</option>
                                        </select>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Write briefed cancelation reason (Optional)</label>
                                        <textarea id="reason" name="reason" rows={3} className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm sm:text-sm" placeholder=""></textarea>
                                    </div>
                                    <div className="mt-5">
                                        <Button
                                            name="Cancel Order"
                                            width="full"
                                            style="solid-red"
                                            onClick={() => {
                                                closeModalCancel();
                                                openConfirmCancel();
                                            }}
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isCancel} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeConfirmCancel}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <button onClick={closeConfirmCancel} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                                        <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto">
                                        <path d="M1 7.00024H4H28" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M25 7V28C25 28.7957 24.6839 29.5587 24.1213 30.1213C23.5587 30.6839 22.7956 31 22 31H7C6.20435 31 5.44129 30.6839 4.87868 30.1213C4.31607 29.5587 4 28.7957 4 28V7M8.5 7V4C8.5 3.20435 8.81607 2.44129 9.37868 1.87868C9.94129 1.31607 10.7044 1 11.5 1H17.5C18.2956 1 19.0587 1.31607 19.6213 1.87868C20.1839 2.44129 20.5 3.20435 20.5 4V7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.5 14.5V23.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 14.5V23.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h3 className="mt-2 mb-2 text-xl font-medium leading-6 text-center text-gray-900">Order Canceled</h3>
                                    <p className="text-center text-gray-400">Order #354896 canceled successfully</p>
                                    <div className="mt-5 text-center">
                                        <Button
                                            name="Back To Home"
                                            style="solid"
                                            href="/"
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isSelectReturn} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeSelectReturn}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <button onClick={closeSelectReturn} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                                        <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    <h3 className="mt-2 mb-2 text-xl font-medium leading-6 text-center text-gray-900">Return Order #354896</h3>
                                    <div className="px-6 py-3 -mx-6 border-t border-b border-gray-200">
                                        <p className="mb-4 text-gray-400">Please select items you want to return</p>
                                        <div className="items-list section">
                                            <label key={product.id} className="flex items-center py-6 space-x-6 border-t border-gray-200 select-none">
                                                <input type="checkbox" name="select" id="select_1" />
                                                <img
                                                    src={product.imageSrc}
                                                    alt={product.imageAlt}
                                                    className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                                                />
                                                <div className="flex flex-col flex-auto">
                                                    <div>
                                                        <h4 className="mb-2 font-medium text-gray-900">
                                                            <a href={product.href}>{product.name}</a>
                                                        </h4>
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Size</dt>
                                                                <dd className="ml-2 text-gray-700">M</dd>
                                                            </div>
                                                            <div className="flex pl-4 sm:pl-6">
                                                                <dt className="font-medium text-gray-900">Color</dt>
                                                                <dd className="ml-2 text-gray-700">Green</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-end flex-1 mt-6">
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Quantity</dt>
                                                                <dd className="ml-2 text-gray-700">1</dd>
                                                            </div>
                                                            <div className="flex pl-4 sm:pl-6">
                                                                <dt className="font-medium text-gray-900">Price</dt>
                                                                <dd className="ml-2 text-gray-700">{FormatCurrency(32)}</dd>
                                                            </div>
                                                        </dl>
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Total</dt>
                                                                <dd className="ml-2 text-gray-700">{FormatCurrency(32 * 1)}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </label>
                                            <label key={product.id} className="flex items-center py-6 space-x-6 border-t border-gray-200 select-none">
                                                <input type="checkbox" name="select" id="select_2" />
                                                <img
                                                    src={product.imageSrc}
                                                    alt={product.imageAlt}
                                                    className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                                                />
                                                <div className="flex flex-col flex-auto">
                                                    <div>
                                                        <h4 className="mb-2 font-medium text-gray-900">
                                                            <a href={product.href}>{product.name} 3</a>
                                                        </h4>
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Size</dt>
                                                                <dd className="ml-2 text-gray-700">M</dd>
                                                            </div>
                                                            <div className="flex pl-4 sm:pl-6">
                                                                <dt className="font-medium text-gray-900">Color</dt>
                                                                <dd className="ml-2 text-gray-700">Green</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-end flex-1 mt-6">
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Quantity</dt>
                                                                <dd className="ml-2 text-gray-700">3</dd>
                                                            </div>
                                                            <div className="flex pl-4 sm:pl-6">
                                                                <dt className="font-medium text-gray-900">Price</dt>
                                                                <dd className="ml-2 text-gray-700">{FormatCurrency(40)}</dd>
                                                            </div>
                                                        </dl>
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Total</dt>
                                                                <dd className="ml-2 text-gray-700">{FormatCurrency(40 * 3)}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </label>
                                            <label key={product.id} className="flex items-center py-6 space-x-6 border-t border-gray-200 select-none">
                                                <input type="checkbox" name="select" id="select_3" />
                                                <img
                                                    src={product.imageSrc}
                                                    alt={product.imageAlt}
                                                    className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                                                />
                                                <div className="flex flex-col flex-auto">
                                                    <div>
                                                        <h4 className="mb-2 font-medium text-gray-900">
                                                            <a href={product.href}>{product.name}</a>
                                                        </h4>
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Size</dt>
                                                                <dd className="ml-2 text-gray-700">M</dd>
                                                            </div>
                                                            <div className="flex pl-4 sm:pl-6">
                                                                <dt className="font-medium text-gray-900">Color</dt>
                                                                <dd className="ml-2 text-gray-700">Green</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-end flex-1 mt-6">
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Quantity</dt>
                                                                <dd className="ml-2 text-gray-700">2</dd>
                                                            </div>
                                                            <div className="flex pl-4 sm:pl-6">
                                                                <dt className="font-medium text-gray-900">Price</dt>
                                                                <dd className="ml-2 text-gray-700">{FormatCurrency(32)}</dd>
                                                            </div>
                                                        </dl>
                                                        <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                                            <div className="flex">
                                                                <dt className="font-medium text-gray-900">Total</dt>
                                                                <dd className="ml-2 text-gray-700">{FormatCurrency(32 * 2)}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex items-center pt-3 mt-3">
                                        <input id="default-checkbox" type="checkbox" />
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm text-gray-900">Agree to return <Link to="/terms" className="underline">terms & conditions</Link></label>
                                    </div>
                                    <div className="mt-5 text-center">
                                        <Button
                                            name="Return Order"
                                            style="solid"
                                            width="full"
                                            // onClick={closeSelectReturn}
                                            onClick={() => {
                                                closeSelectReturn();
                                                openReturn();
                                            }}
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isReturn} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeReturn}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <button onClick={closeReturn} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                                        <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto">
                                        <path d="M1.88281 2.31091V10.1955H9.76742" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M30.7928 23.3365V15.4519H22.9082" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M27.4947 8.8815C26.8282 6.99811 25.6955 5.31424 24.2022 3.98702C22.709 2.6598 20.9038 1.73248 18.9552 1.29159C17.0067 0.850699 14.9782 0.910609 13.059 1.46573C11.1398 2.02085 9.39257 3.05308 7.98024 4.46612L1.88281 10.1956M30.793 15.452L24.6956 21.1815C23.2833 22.5945 21.536 23.6268 19.6169 24.1819C17.6977 24.737 15.6692 24.7969 13.7206 24.356C11.772 23.9151 9.9669 22.9878 8.47365 21.6606C6.98039 20.3334 5.84768 18.6495 5.18121 16.7661" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h3 className="mt-2 mb-2 text-xl font-medium leading-6 text-center text-gray-900">Order Returned</h3>
                                    <p className="text-center text-gray-400">Order #354896 returned successfully</p>
                                    <div className="mt-5 text-center">
                                        <Button
                                            name="Back To Home"
                                            style="solid"
                                            href="/"
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
