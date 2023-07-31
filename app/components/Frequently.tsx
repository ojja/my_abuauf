import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import FormatCurrency from "~/utils/FormatCurrency";
import { v4 } from 'uuid';
import { useTranslation } from "react-i18next";
import useShoppingCart from "~/stores/cartStore";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

export default function Frequently({ upSellingProducts, currentProduct }: any) {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const {
        addToCart,
    } = useShoppingCart();

    const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: boolean }>(() => {
        const initialSelected: { [key: string]: boolean } = {};
        upSellingProducts?.forEach((product: any) => {
            initialSelected[product.slug] = true;
        });
        return initialSelected;
    });

    let [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
    let [selectedOriginalPrice, setSelectedOriginalPrice] = useState<number>(0);

    const handleProductSelect = (product: any) => {
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [product.slug]: !prevSelectedProducts[product.slug],
        }));

        const productPrice = parseFloat(product.price);
        const productOriginalPrice = parseFloat(product.sale_price || product.price);

        setSelectedTotalPrice((prevTotal) => {
            if (!selectedProducts[product.slug]) {
                return prevTotal + productPrice;
            } else {
                return prevTotal - productPrice;
            }
        });

        setSelectedOriginalPrice((prevTotal) => {
            if (!selectedProducts[product.slug]) {
                return prevTotal + productOriginalPrice;
            } else {
                return prevTotal - productOriginalPrice;
            }
        });
    };
    const addMultipleToCart = (selectedProducts: { [key: string]: boolean }) => {
        Object.keys(selectedProducts).forEach((slug) => {
            if (selectedProducts[slug]) {
                const selectedProduct = upSellingProducts.find((product: any) => product.slug === slug);
                if (selectedProduct) {
                    addToCart(selectedProduct);
                }
            }
        });
    };
    console.log('selectedProducts', selectedProducts)

    return (
        <div className="px-4 py-6 mt-6 bg-green-300 border-gray-100 md:border-t-2 md:pt-12 md:mt-12 md:bg-transparent rounded-xl">
            <h2 className="mb-12 text-base font-bold text-black md:text-3xl">
                {t('bought_together_title')}
            </h2>
            <div className="flex flex-wrap md:flex-nowrap">
                <div className="flex items-center justify-center mr-5">
                    <div className={`w-20 p-5 border-2 rounded-[10px] cursor-pointer ${selectedProducts[currentProduct.slug] ? 'opacity-50' : ''}`} onClick={() => { handleProductSelect(currentProduct) }}>
                        <img src={currentProduct.thumbnail} alt={currentProduct.title} />
                    </div>
                    {<PlusIcon className="w-6 h-6" />}
                    {upSellingProducts.map((product: any, index: any) => (
                        <React.Fragment key={v4()}>
                            <div className={`w-20 p-5 border-2 rounded-[10px] cursor-pointer ${selectedProducts[product.slug] ? 'opacity-50' : ''}`} onClick={() => { handleProductSelect(product) }}>
                                <img src={product.main_image} alt={product.slug} />
                            </div>
                            {index !== upSellingProducts.length - 1 && <PlusIcon className="w-6 h-6" />}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="hidden mb-3 font-medium md:block">
                        <p className="text-base font-semibold text-gray-50">{t('total')}: </p>
                        <div className="flex items-center gap-x-2">
                            <div className="text-2xl font-bold text-black">
                                <FormatCurrency value={selectedOriginalPrice} />
                            </div>
                            <del className="text-sm text-gray-400 line-through">
                                <FormatCurrency value={selectedTotalPrice} lineThrough />
                            </del>
                        </div>
                    </div>
                    {selectedTotalPrice > 0 ? (
                        <button className="items-center flex justify-between px-5  py-2.5 text-sm font-semibold capitalize border-2 border-solid rounded-100  whitespace-nowrap border-gray-400 focus:outline-none" onClick={() => { addMultipleToCart(selectedProducts) }}>
                            {t('add_all_to_cart')}
                            <PlusIcon className="w-4 h-4 text-green-500 " aria-hidden="true" />
                        </button>
                    ) : (
                        // <p className={`flex p-2 text-sm rounded-lg w-full mt-2 text-red-800 bg-red-100`}>
                        //     {t('choose_items_to_buy_together')}
                        // </p>
                        ''
                    )}
                </div>
            </div>
            <div>
                <ul className=" mt-14">
                    <li key={v4()} className="flex items-center mb-4">
                        <label htmlFor={`product-${currentProduct.slug}`} className="cursor-pointer">
                            <div className='relative flex items-center py-1 pl-3'>
                                <input
                                    type="checkbox"
                                    name={`product-select`}
                                    className='hidden peer'
                                    id={`product-${currentProduct.slug}`}
                                    checked={selectedProducts[currentProduct.slug] || false}
                                    onChange={() => handleProductSelect(currentProduct)}
                                />
                                <div className='absolute left-0 invisible mt-1 text-xl peer-checked:visible top-1'>
                                    <RiCheckboxFill className='peer-checked:bg-green-200' />
                                </div>
                                <div className='absolute left-0 visible mt-1 text-xl peer-checked:invisible top-1'>
                                    <RiCheckboxBlankLine className='peer-checked:bg-green-200' />
                                </div>
                                <div className="ml-4 text-base font-semibold">
                                    {i18n.language === 'en' ? currentProduct.title : currentProduct.ar_title}
                                    <div className="flex price gap-x-3 ">
                                        {currentProduct.sale_price && currentProduct.sale_price !== currentProduct.price ? (
                                            <>
                                                <FormatCurrency value={currentProduct.sale_price} />
                                                <FormatCurrency value={currentProduct.price} lineThrough />
                                            </>
                                        ) : (
                                            <FormatCurrency value={currentProduct.price} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </label>
                    </li>
                    {upSellingProducts.map((product: any, index: any) => (
                        <li key={v4()} className="flex items-center mb-4">
                            <label htmlFor={`product-${product.slug}`} className="">
                                <div className='relative flex items-center py-1 pl-3'>
                                    <input
                                        type="checkbox"
                                        name={`product-select`}
                                        className='hidden peer'
                                        id={`product-${product.slug}`}
                                        checked={selectedProducts[product.slug] || false}
                                        onChange={() => handleProductSelect(product)}
                                    />
                                    <div className='absolute left-0 invisible mt-1 text-xl peer-checked:visible top-1'>
                                        <RiCheckboxFill className='peer-checked:bg-green-200' />
                                    </div>
                                    <div className='absolute left-0 visible mt-1 text-xl peer-checked:invisible top-1'>
                                        <RiCheckboxBlankLine className='peer-checked:bg-green-200' />
                                    </div>
                                    <div className="ml-4 text-base font-semibold">
                                        {i18n.language === 'en' ? product.title : product.ar_title}
                                        <div className="flex price gap-x-3 ">
                                            {product.sale_price && product.sale_price !== product.price ? (
                                                <>
                                                    <FormatCurrency value={product.sale_price} />
                                                    <FormatCurrency value={product.price} lineThrough />
                                                </>
                                            ) : (
                                                <FormatCurrency value={product.price} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="mb-3 font-medium">
                    <p className="text-base font-semibold text-gray-50">{t('total')}: </p>
                    <div className="flex items-center gap-x-2">
                        <div className="text-2xl font-bold text-black">
                            <FormatCurrency value={selectedOriginalPrice} />
                        </div>
                        <del className="text-sm text-gray-400 line-through">
                            <FormatCurrency value={selectedTotalPrice} lineThrough />
                        </del>
                    </div>
                </div>
                {selectedTotalPrice > 0 ? (
                    <button className="items-start flex w-full justify-between px-5 py-2.5 text-sm font-semibold capitalize rounded-100  whitespace-nowrap bg-green-200 hover:bg-green-400 text-white focus:outline-none" onClick={() => { addMultipleToCart(selectedProducts) }}>
                        {t('add_all_to_cart')}
                    </button>
                ) : (
                    <button className="items-start flex w-full justify-between px-5 py-2.5 text-sm font-semibold capitalize rounded-100  whitespace-nowrap bg-green-200 hover:bg-green-400 text-white focus:outline-none" onClick={() => { addMultipleToCart(selectedProducts) }} disabled>
                        {t('add_all_to_cart')}
                    </button>
                )}
            </div>
        </div>
    );
}
