import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react';
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ProductData } from 'types';
import { fetchCats } from '~/utils/general';
import { fetchFilterProducts } from '~/utils/productsAPI';
import ProductWidgetBestSelling from './product/ProductWidgetBestSelling';
import ProductWidgetBestSellingLoader from './product/ProductWidgetBestSellingLoader';

export default function MegaMenu() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extraProducts, setExtraProducts] = useState<ProductData[]>([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    useEffect(() => {
        document.body.classList.toggle('overflow-y-hidden', popoverOpen);

        return () => {
            // Clean up the class when the component unmounts
            document.body.classList.remove('overflow-y-hidden');
        };
    }, [popoverOpen]);
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

    const filterData = {
        selectedCategories: '',
        minPrice: 0,
        maxPrice: 100000000,
        pageNumber: 1,
        products_per_page: 3,
        criteria: 'date',
        arrangement: 'arrangement',
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const products = await fetchFilterProducts(filterData);
                setExtraProducts(products);
            } catch (error) {
                console.error('Error fetching extra products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                inline-flex items-center px-6 py-3 font-medium focus:outline-none bg-green-200 whitespace-nowrap hover:bg-green-400 text-xl rounded-100 text-white`}
                            onClick={() => setPopoverOpen(!popoverOpen)}
                        >
                            <div className="min-w-8 h-8 flex items-center">
                                <img src="/images/icons/cats.webp" alt={'all products'} width="24" height="24" className="" />
                            </div>
                            <span className="ml-3">
                                {t('all_products')}
                            </span>
                            <ChevronDownIcon
                                className={`${open ? 'transform rotate-180' : ''}
                  ml-2 h-6 w-6 text-orange-300 transition duration-150 ease-in-out`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        {/* <Popover.Overlay className="fixed inset-0 bg-black opacity-25" /> */}
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="fixed left-0 bottom-0 z-20 transform px-4 sm:px-0 w-screen" style={{ 'top': 225 }}>
                                <div className="relative flex">
                                    <Popover.Button onClick={() => setPopoverOpen(!popoverOpen)}>
                                        <div className="fixed inset-0 bg-black opacity-25 z-10" />
                                    </Popover.Button>
                                    <div className="overflow-hidden overflow-y-scroll relative z-20 max-w-screen-2xl mx-auto" style={{ 'maxHeight': 'calc(100vh - 225px)' }}>
                                        <div className="">
                                            <div>
                                                <div className="flex bg-green-300 divide-x divide-gray-100">
                                                    <div className="bg-white flex divide-x divide-gray-100 text-green-200 font-semibold text-xl">
                                                        <ul className="space-y-4 p-4">
                                                            <li className="w-[300px]">
                                                                <Link to="/" className="flex items-center px-2 py-3 rounded-2xl hover:bg-green-300" onClick={() => { close(), setPopoverOpen(!popoverOpen) }}>
                                                                    <span className="p-2">
                                                                        <img src="/images/icons/interest.webp" alt="icon" />
                                                                    </span>
                                                                    <span className="ml-4">{t('offers_and_discounts')}</span>
                                                                </Link>
                                                            </li>
                                                            <li className="w-[300px]">
                                                                <Link to="/" className="flex items-center px-2 py-3 rounded-2xl hover:bg-green-300" onClick={() => { close(), setPopoverOpen(!popoverOpen) }}>
                                                                    <span className="p-2">
                                                                        <img src="/images/icons/interest.webp" alt="icon" />
                                                                    </span>
                                                                    <span className="ml-4">{t('best_selling')}</span>
                                                                </Link>
                                                            </li>
                                                            {categoriesWithSubcategories.map((category) => (
                                                                <li
                                                                    key={category.slug}
                                                                    className="w-[300px]"
                                                                    onMouseEnter={() => setHoveredCategory(category)}
                                                                // onMouseLeave={() => setHoveredCategory(null)}
                                                                >
                                                                    <Link
                                                                        to={`/category/${category.slug}`}
                                                                        onClick={() => { close(), setPopoverOpen(!popoverOpen) }}
                                                                        className={`flex items-center px-2 py-3 rounded-2xl hover:bg-green-300 ${hoveredCategory?.slug === category.slug ? "bg-green-300" : ""}`}
                                                                    >
                                                                        <span className="p-2">
                                                                            <img src="/images/icons/interest.webp" alt="icon" />
                                                                        </span>
                                                                        <span className="ml-4">{i18n.language === 'en' ? category.name : category.ar_name}</span>
                                                                        <span className="ml-auto p-2">
                                                                            <ChevronLeftIcon className="w-6 h-6" />
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {hoveredCategory ? (
                                                            <ul className="space-y-4 p-4">
                                                                <li className="w-[300px]">
                                                                    <Link to={`/category/${hoveredCategory.slug}`} className="flex items-center px-2 py-3 rounded-2xl hover:bg-green-300" onClick={() => { close(), setPopoverOpen(!popoverOpen) }}>
                                                                        <span className="ml-4">{t('all_type')}{" "}{i18n.language === 'en' ? hoveredCategory.name : hoveredCategory.ar_name}</span>
                                                                        <span className="ml-auto p-2">
                                                                            <ChevronLeftIcon className="w-6 h-6" />
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                {hoveredCategory.subcategories.map((subCategory, index): any => (
                                                                    <li className="w-[300px]" key={index}>
                                                                        <Link to={`/category/${subCategory.slug}`} className="flex items-center px-2 py-3 rounded-2xl hover:bg-green-300" onClick={() => { close(), setPopoverOpen(!popoverOpen) }}>
                                                                            <span className="ml-4">{i18n.language === 'en' ? subCategory.name : subCategory.ar_name}</span>
                                                                            <span className="ml-auto p-2">
                                                                                <ChevronLeftIcon className="w-6 h-6" />
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <ul className="space-y-4 p-4">
                                                                <li className="w-[300px]"></li>
                                                            </ul>
                                                        )
                                                        }
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="p-10">
                                                            <h3 className="pb-4 border-b border-gray-100 text-2xl font-bold">{t('best_selling')}</h3>
                                                            <div className="flex flex-wrap 2xl:grid 2xl:grid-cols-12 gap-6 py-6">
                                                                <div className="grid gap-6 grid-cols-2 2xl:grid-cols-1 col-span-5">
                                                                    {loading ?
                                                                        <>
                                                                            <ProductWidgetBestSellingLoader />
                                                                            <ProductWidgetBestSellingLoader />
                                                                            <ProductWidgetBestSellingLoader />
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                extraProducts.map((productData: any, index) => (
                                                                                    <div key={index}>
                                                                                        <ProductWidgetBestSelling product={productData} />
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className="col-span-7">
                                                                    <div className="w-[516px] h-[528px] relative rounded-3xl shadow overflow-hidden max-w-full">
                                                                        <img className="w-full h-full left-0 top-0 absolute object-cover" src="/images/mega_banner.webp" />
                                                                        <div className="p-6 absolute bottom-0 m-5 bg-white rounded-2xl items-center gap-6 inline-flex text-green-200 text-center">
                                                                            <div className="flex-col items-center inline-flex gap-3">
                                                                                <div className="text-xl font-semibold">خصم يصل إلى</div>
                                                                                <div className="text-7xl font-bold uppercase leading-10">40%</div>
                                                                            </div>
                                                                            <div className="flex-col justify-start items-center gap-6 inline-flex">
                                                                                <div className=" text-center text-2xl font-bold">على جميع انواع التمور</div>
                                                                                <div className="text-gray-50 text-base font-semibold">* لفترة محدودة أو نفاذ الكمية</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
