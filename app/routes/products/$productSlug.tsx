import Gallery from "~/components/Gallery";
import type { MetaFunction } from "@remix-run/node";
import { useInView } from 'react-intersection-observer';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ActionFunction, json, LoaderFunction, redirect, defer } from "@remix-run/node";
import invariant from 'tiny-invariant';
import { getProductBySlug, Product } from "~/api/products";
import { Await, useLoaderData, useNavigate } from "@remix-run/react";
import AddToCartSimple from "~/components/AddToCartSimple";
import { v4 } from 'uuid';
import ProductSpecifications from "~/components/ProductSpecifications";
import Tabs from "~/components/product/Tabs";
import SizeGuide from "~/components/SizeGuide";
import ExtraProducts from "~/components/ExtraProducts";
import Breadcrumbs from "~/components/Breadcrumbs";
import Stars from "~/components/Stars";
import SelectColor from "~/components/product/SelectColor";
import SelectSize from "~/components/product/SelectSize";
import FormatCurrency from "~/utils/FormatCurrency";
import Frequently from "~/components/Frequently";
import { useProductStore } from "~/stores/product";
import RecentlyViewedProducts from "~/components/RecentlyViewedProducts";
import Accordion from "~/components/Accordion";
import { getSelectedCurrency } from "~/utils/currencyUtils";
import FavoriteHeart from "~/components/icons/favorite-icon";
import Heart from "~/components/icons/Heart";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import TabsNew from "~/components/product/TabsNew";
import Branches from "~/components/product/Branch";
import UpSellingProducts from "~/components/UpSellingProducts";

import SingleLoader from "~/components/product/SingleLoader";
import useShoppingCart from "~/stores/cartStore";
import { getUpSellingProducts } from "~/api/upselling";

interface Feature {
    name: string;
    description: string;
}
const features: Feature[] = [
    { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
    { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
    { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
    { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
    { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
]


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.productSlug, 'expected params.productId');

    const product = await getProductBySlug(params.productSlug!);
    return json(product);
};


export const meta: MetaFunction = ({ data }: any) => {
    return {
        title: `Single | ${data.title}`,
        description: `${data.description}`,
        'og:title': data.title,
        'og:description': data.description,
        'og:image': data.main_img,
    }
}


export default function ProductSingle() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const product = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const [isLoadingPage, setIsLoadingPage] = useState(true); // State for simulating page loading
    const nearestNumberRating = 4
    const [selectedSize, setSelectedSize] = useState(product.attributes?.pa_size?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.attributes?.pa_color?.[0] || '');

    let variation = product?.variations?.find((variation: any) =>
        variation.attributes.attribute_pa_size === selectedSize &&
        variation.attributes.attribute_pa_color === selectedColor
    );
    // let variationPrice = variation ? variation.price : null;
    // let variationSalePrice = variation ? variation.sale_price : null;

    // console.log('Selected currency:', getSelectedCurrency());

    useEffect(() => {
        setIsLoadingPage(true);
        setTimeout(() => {
            setIsLoadingPage(false);
        }, 1000);
        setSelectedSize(product?.attributes?.pa_size?.[0] || '');
        setSelectedColor(product?.attributes?.pa_color?.[0] || '');
        addToRecent(product);
    }, [product]);
    let itemID;
    let salePrice = null;
    let productPrice = null;
    let color = null;
    let size = null;

    if (product.type === "simple") {
        itemID = product.id;
        productPrice = product.price;
        salePrice = product.sale_price;
    } else if (product.type === "variable") {
        variation = product?.variations?.find((variation: any) =>
            variation.attributes.attribute_pa_size === selectedSize &&
            variation.attributes.attribute_pa_color === selectedColor
        );
        productPrice = variation?.price ? variation.price : 0;
        // productPrice = 212;
        salePrice = variation?.sale_price;
        // salePrice = 200;
        color = variation?.attributes?.attribute_pa_color
        size = variation?.attributes?.attribute_pa_size
        itemID = variation?.id
    }


    const {
        addToRecent,
        addToWishlist,
        wishlistItems
    } = useProductStore();
    const isWishlist = wishlistItems?.some((item) => item.id === product.id);

    const handleWishlistClick = () => {
        addToWishlist(product);
    };
    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: product.category_name, href: `/category/${product.category_slug}` }
        ]
    }

    // Generate the JSON-LD structured data
    const generateStructuredData = () => {
        // Define the schema data for the single product
        const schemaData = {
            '@context': 'http://schema.org',
            '@type': 'Product',
            name: product.title,
            image: product.main_img,
            description: product.description,
            sku: product.sku,
            cat: product.category,
            condition: 'new',
            gender: product.gender,
            brand: {
                '@type': 'Brand',
                name: 'LA',
            },
            offers: {
                '@type': 'Offer',
                price: 90,
                priceCurrency: 'EGP',
                availability: product.availability,
                // url: currentUrl,
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: 4.5,
                reviewCount: 89,
            },
        };

        return JSON.stringify(schemaData);
    };

    const productTitle = product
        ? i18n.language === 'en'
            ? product?.title || ''
            : product?.ar_title || ''
        : '';
    const productDescription = product
        ? i18n.language === 'en'
            ? product?.description || ''
            : product?.ar_description || ''
        : '';

    const productCategory = product
        ? i18n.language === 'en'
            ? product?.category_name || ''
            : product?.ar_category_name || `MISSING AR  ${product?.category_name}`
        : '';

    const recipes = [
        {
            "ID": 224,
            "slug": "delicious-pistachio-and-white-chocolate-mousse-cake",
            "title": "Delicious pistachio and white chocolate mousse cake",
            "content": "Taza baked goods is the best choice for a quick hot dog or for delicious lunch box ideas, choose the kind you like.",
            "ar_title": "كعكة موس الفستق اللذيذة والشوكولاتة البيضاء",
            "ar_content": "مخبوزات الطازة هي أحلى أختيار لنقنقة سريعة او لافكار لذيذة في اللانش بوكس، اختار النوع اللي تحبه.",
            "extra_data": [],
            "image": "https:\/\/backend.woosonicpwa.com\/wp-content\/uploads\/2023\/07\/recipe_02.jpg"
        },
        {
            "ID": 222,
            "slug": "vegan-fettuccine-alfredo-with-cashew-nuts",
            "title": "Vegan Fettuccine Alfredo With Cashew Nuts",
            "content": "Taza baked goods is the best choice for a quick hot dog or for delicious lunch box ideas, choose the kind you like.",
            "ar_title": "فيتوتشيني ألفريدو نباتي مع الكاجو",
            "ar_content": "مخبوزات الطازة هي أحلى أختيار لنقنقة سريعة او لافكار لذيذة في اللانش بوكس، اختار النوع اللي تحبه.",
            "extra_data": [],
            "image": "https:\/\/backend.woosonicpwa.com\/wp-content\/uploads\/2023\/07\/recipe_01.jpg"
        }
    ]
    // console.clear();
    // console.log('productSlug>>', product)
    // console.log('isLoadingPage>>', isLoadingPage)
    const [upSellingProducts, setUpSellingProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    let isMobileView = false;
    if (typeof window !== 'undefined') {
        isMobileView = window.innerWidth < 768;
    }
    useEffect(() => {
        if (inView) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const products = await getUpSellingProducts(product.id);
                    console.log('here', products)
                    if (Array.isArray(products)) {
                        setUpSellingProducts((prevProducts) => [...prevProducts, ...products]);
                    }
                } catch (error) {
                    console.error('Error fetching extra products:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [product.id, inView]);
    const {
        addToCart,
    } = useShoppingCart();
    const addDirectCheckout = () => {
        addToCart(product); // Call the existing addToCart function to add the product to the cart

        navigate('/checkout');
    }

    return (
        <div className="single-product">
            <section className="overflow-hidden bg-white">
                {/* Add the JSON-LD script tag with the structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
                />
                {/* Product Intro */}
                <div className="pb-10">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-wrap items-start -mx-4">
                            <div className="w-full mb-2">
                                <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="p-4 shadow" />
                            </div>
                            <div className="w-full md:mb-16 md:pr-16 lg:w-1/2 lg:mb-0">
                                <Gallery galleryImages={product.images} />
                                {/* <Gallery2 galleryImages={product.images} /> */}
                                {!isMobileView && (
                                    <div ref={ref} >
                                        <Frequently upSellingProducts={upSellingProducts} currentProduct={
                                            {
                                                title: productTitle,
                                                ar_title: productTitle,
                                                id: product.id,
                                                slug: product.slug,
                                                thumbnail: product.main_img,
                                                price: productPrice,
                                                sale_price: salePrice,
                                            }
                                        } />
                                    </div>
                                )}
                            </div>
                            <div className="w-full px-4 bg-white md:mb-20 md:shadow-custom md:px-9 lg:w-1/2 rounded-3xl">

                                <div className="relative mb-6 pt-9">
                                    <span className="hidden bg-orange-500 bg-purple-500 bg-pink-500 bg-center bg-cover bg-of-white-500 bg-olive-500 bg-golden-500 bg-navy-500 sm:bg-center"></span>
                                    <button
                                        className={`w-8 h-8 rounded-full bg-primary-400 absolute top-9 right-9 z-10 flex justify-center items-center`}
                                        onClick={handleWishlistClick}>
                                        <span>
                                            {(isWishlist ?
                                                <FavoriteHeart />
                                                :
                                                <Heart />

                                            )}
                                        </span>
                                    </button>
                                    <span className="text-xs text-gray-50">{product.sku}</span>
                                    <span className="text-xs font-semibold md:text-xl text-gray-50">{productCategory}</span>

                                    <h1 className="mt-2 mb-4 text-2xl font-medium capitalize md:text-5xl font-heading">{productTitle}</h1>

                                    {/* Reviews */}
                                    <Stars nearestNumberRating={nearestNumberRating} />

                                    <div className="mt-6">
                                        <div className="text-[#999999] text-xl" dangerouslySetInnerHTML={{ __html: productDescription }} />
                                    </div>


                                    {/* Sizes */}
                                    {product.attributes?.pa_size ? (
                                        <SelectSize
                                            sizes={product.attributes?.pa_size || []}
                                            selectedSize={selectedSize}
                                            onSelectedSizeChange={setSelectedSize}
                                        />
                                    ) : ('')}


                                    {salePrice && salePrice !== productPrice ? (
                                        <div className="flex items-end mt-5 gap-x-3">
                                            <FormatCurrency value={productPrice} bigger />
                                            <FormatCurrency value={salePrice} lineThrough />
                                        </div>
                                    ) : (
                                        <div className="mt-5">
                                            <FormatCurrency value={productPrice} bigger />
                                        </div>

                                    )}
                                </div>


                                <div className="mt-10">

                                    {/* <span className="pt-3 text-xs">{`${selectedSize} - ${selectedColor} - ID ${itemID}`}</span> */}
                                    {/* <span className="block text-xs tracking-wider text-gray-400">{product.availability}</span> */}
                                    <div className="mt-10 ">
                                        <AddToCartSimple
                                            className="inline-flex justify-center w-full py-3 text-xl font-medium text-center text-white "
                                            product={
                                                {
                                                    id: itemID,
                                                    thumbnail: product.main_img,
                                                    // size: selectedSize,
                                                    // color: selectedColor,
                                                    slug: product.slug,
                                                    price: salePrice,
                                                }
                                            }
                                            // disabled={!Boolean(selectedSize.inStock)}
                                            disabled={salePrice === null}
                                            singleProductView={true}
                                        />


                                        <button
                                            type="submit"
                                            disabled
                                            className="items-center justify-center w-full py-2 text-base font-medium text-center text-green-200 capitalize border-2 border-green-500 border-solid cursor-pointer md:py-3 md:text-xl rounded-100 focus:outline-none"
                                        >

                                            {i18n.language === "ar" ?
                                                ' أشتري حالاً ' : ' Direct checkout '
                                            }
                                        </button>
                                    </div>
                                </div>


                                <div>
                                    <div className="w-full">
                                        <Branches />
                                        <TabsNew product={{ description: productDescription }} />
                                    </div>
                                    <div className="w-full">
                                        <button
                                            className=' text-black text-sm md:text-xl font-semibold rounded-100 border-2 border-gray-400 px-5 py-2.5 mb-9 transition-all duration-300 ease hover:text-white hover:bg-gray-400'
                                            onClick={() => setOpen(true)}
                                        >
                                            القيم الغذائية
                                        </button>
                                        <>
                                            <div className={classNames(
                                                open
                                                    ? 'translate-x-0'
                                                    // : '-translate-x-full',
                                                    : `${i18n.language === 'en' ? 'translate-x-full' : '-translate-x-full'} invisible`,
                                                'fixed md:w-[600px] w-full bg-green-300 top-0 right-0 left-auto transform transition ease-in-out duration-500 pt-5 pb-32 h-full z-40'
                                            )} style={{ boxShadow: ' 0px 20px 66px rgba(0, 0, 0, 0.2)' }}>

                                                <div className="flex justify-between items-center px-5 border-b border-[#C6C6C6] pb-5">
                                                    <button
                                                        className='p-3 border-2 border-gray-400 rounded-full '
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.3575 4.92969L15.3575 3.92969L10.1433 9.14385L4.92834 3.92969L3.92834 4.92969L9.14334 10.1439L3.92834 15.358L4.92834 16.358L10.1433 11.1439L15.3575 16.358L16.3575 15.358L11.1425 10.1439L16.3575 4.92969Z" fill="#163300" />
                                                        </svg>

                                                    </button>
                                                    <h4 className=" text-[32px] font-semibold">
                                                        القيم الغذائية
                                                    </h4>
                                                </div>
                                                <div className="pt-5 ">
                                                    <img src="/images/list.png" alt="" className="m-auto" />
                                                </div>
                                            </div>
                                            <div onClick={() => setOpen(false)}
                                                className={classNames(
                                                    open
                                                        ? 'pointer-events-auto visible opacity-100'
                                                        // : '-translate-x-full',
                                                        : 'pointer-events-none invisible opacity-0',
                                                    'fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 transition-all duration-300 ease-linear z-30'
                                                )}></div>
                                        </>
                                    </div>
                                </div>
                            </div>

                            {isMobileView && (
                                <div ref={ref} className="w-full p-4">
                                    <Frequently upSellingProducts={upSellingProducts} currentProduct={
                                        {
                                            title: productTitle,
                                            ar_title: productTitle,
                                            id: product.id,
                                            slug: product.slug,
                                            thumbnail: product.main_img,
                                            price: productPrice,
                                            sale_price: salePrice,
                                        }
                                    } />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-4 py-10">
                    <Tabs recipes={recipes} />
                </div>

                <div className="container mx-auto">
                    <ExtraProducts categorySlug={product.category_slug} count={20} title={'similar_products'} />
                </div>
                <div className="container mx-auto">
                    <UpSellingProducts productID={product.id} title={'shop_more_abuauf'} isEmpty={false} categorySlug={product.category_slug} />
                </div>
                {/* <RecentlyViewedProducts /> */}

                {/* <ProductSpecifications
                    // @ts-ignore
                    features={features}
                /> */}
            </section>
        </div>
    )
}
