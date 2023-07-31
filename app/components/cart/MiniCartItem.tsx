import { Link } from '@remix-run/react';
import { memo, useEffect, useState } from 'react'
import { getProductBySlug } from '~/api/products';
import FormatCurrency from '~/utils/FormatCurrency';
import MiniCartItemLoader from './MiniCartItemLoader';
import Img from "~/components/icons/Img";
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

interface Product {
    id: number;
    title: string;
    price: number;
    // Other properties of the product
}

interface MiniCartItemProps {
    title: string;
    product: Product;
    id: number;
    quantity: number;
    color: string;
    size: string;
    slug: string;
    main_image: string;
    thumbnail: string;
    removeFromCart: () => void;
}


const MiniCartItem = ({ id, quantity, slug, thumbnail, removeFromCart, price, decreaseCartQuantity, addToCart }: MiniCartItemProps) => {

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const handleRemoveClick = () => {
        const parentDiv = document.getElementById(`mini-item-${id}`);
        if (parentDiv) {
            parentDiv.classList.add("hidden");
        }
        removeFromCart(id);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const product = await getProductBySlug(slug);
            setProduct(product);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        fetchProduct();
    }, [slug]);


    const title = product.title;

    const variationId = id;
    const variation = product?.variations?.find(variation => variation.id === variationId);

    let salePrice = null;
    let productPrice = null;
    let color = null;
    let size = null;
    if (variation) {
        productPrice = variation.price;
        salePrice = variation.sale_price;
        color = variation.attributes?.attribute_pa_color
        size = variation.attributes?.attribute_pa_size
    } else {
        productPrice = product.price;
        salePrice = product.sale_price;
    }
    const productData = {
        id: id,
        thumbnail: product.main_img,
        slug: product.slug,
        price: salePrice,
    }
    const handleDecrease = () => {
        decreaseCartQuantity(productData);
    };
    const handleAddToCart = () => {
        addToCart(productData);
    };

    // console.log('product MINI', product)
    return (
        <>
            {loading ?
                <MiniCartItemLoader />
                :
                <>
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md bg-green-300">
                    {thumbnail ?
                            <img
                                src={thumbnail}
                                alt={slug}
                                className="object-cover object-center w-full h-full"
                            />
                            :
                            <span className="flex items-center justify-center h-full">
                                <Img />
                            </span>
                        }
                    </div>

                    <div className="flex flex-col flex-1 ml-4">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <Link className=" text-xl font-semibold text-black" to={`/products/${slug}`}>{title}</Link>
                                </h3>
                                <div>
                                    {salePrice !== null && salePrice != productPrice ? (
                                        <>
                                            <p className="ml-4 text-gray-400 text-sm line-through text-end">
                                                {/* {FormatCurrency2(productPrice * quantity)} */}
                                            </p>
                                            <p className="ml-4  w-fit bg-yellow-910 rounded h-[18px] flex rtl:flex-row-reverse gap-x-[2px] px-1 text-5xl">
                                                {/* {FormatCurrency(salePrice * quantity, 'EGP', ["text-sm font-normal", "text-2xl font-semibold ltr:-ml-0.5 rtl:-mr-0.5", "text-sm font-normal"])} */}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="ml-4  w-fit bg-yellow-910 rounded h-[18px] flex rtl:flex-row-reverse gap-x-[2px] px-1 text-5xl">
                                            {/* {FormatCurrency(price, 'EGP', ["text-sm font-normal", "text-2xl font-semibold ltr:-ml-0.5 rtl:-mr-0.5", "text-sm font-normal"])} */}
                                        </p>

                                    )}

                                </div>

                            </div>
                            {variation ?
                                <p className=" text-gray-50 text-base font-semibold">{color} - {size}</p>
                                :
                                ""
                            }
                        </div>
                        <div className="flex items-end justify-between flex-1 text-sm text-gray-500">
                            <div className="flex justify-start items-center">

                                <button
                                    // type="button"
                                    className={`w-10 h-10 border-2 border-gray-400  rounded-full cursor-pointer flex items-center justify-center ${quantity! > 9 ? "pointer-events-none" : ''}`}
                                    type="button"
                                    onClick={handleAddToCart}
                                >
                                    <PlusIcon className="w-6 h-6 text-green-200" aria-hidden="true" />
                                </button>
                                <input type="text" className=" w-10 p-0 text-xl  border-none font-semibold text-center text-green-200  select-none focus:outline-none" value={quantity!} readOnly />
                                <button
                                    onClick={handleDecrease}
                                    type="button"
                                    className="w-10 h-10 border-2 border-gray-400  rounded-full cursor-pointer flex items-center justify-center"
                                >

                                    <MinusIcon className="w-6 h-6 text-green-200" aria-hidden="true" />
                                </button>
                              
                            </div>
                            {removeFromCart ?
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                        onClick={handleRemoveClick}
                                    >
                                        Remove
                                    </button>
                                </div> : ''}
                        </div>
                    </div>
                </>
            }
        </>
    );
};
export default memo(MiniCartItem);