import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import { memo, useEffect, useState, useContext } from 'react'
import { getProductBySlug } from '~/api/products';
import FormatCurrency from '~/utils/FormatCurrency';
import CartItemLoader from './CartItemLoader';

interface CartItemProps {
    title: string;
    id: number;
    quantity: number;
    color?: any;
    size?: any;
    slug: any;
    type: any;
    price: any;
    thumbnail: any;
    name: string;
    main_image: string;
    main_image_small: string;
    category: string;
    removeFromCart: (itemId: number) => void;
    decreaseCartQuantity: any;
    addToCart: any;
    // decreaseCartQuantity: (itemId: number) => void;
}
const CartItem = ({ id, quantity, slug, thumbnail, removeFromCart, price, decreaseCartQuantity, addToCart }: CartItemProps) => {

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const handleRemoveClick = () => {
        removeFromCart(id);
    };
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const product = await getProductBySlug(slug);
            setProduct(product);
            setLoading(false);
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
        productPrice = product?.price;
        salePrice = product?.sale_price;
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
    console.log('product>> item', product)
    console.log('productPrice', productPrice)
    console.log('salePrice:', salePrice)
    console.log('variation:', variation)
    return (
        <>
            {loading ?
                <CartItemLoader />
                :
                <div className="flex items-start justify-between pb-6 mb-6 border-b border-black-300">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <div>
                            <Link to={`/products/${slug}`} className="flex items-center justify-center md:w-[120px] md:h-[120px] mr-9 rounded-xl overflow-hidden w-[60px] h-[60px]">
                                <img src={thumbnail} alt={slug} />
                            </Link>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <span className="text-xl font-semibold text-gray-900 md:text-md">{title}</span>
                                {variation ?
                                    <p className="text-base font-semibold text-gray-50">{color} - {size}</p>
                                    :
                                    ""
                                }
                            </div>

                            <div className="flex items-center justify-start">

                                <button
                                    // type="button"
                                    className={`w-10 h-10 border-2 border-gray-400  rounded-full cursor-pointer flex items-center justify-center ${quantity! > 9 ? "pointer-events-none" : ''}`}
                                    type="button"
                                    onClick={handleAddToCart}
                                >
                                    <PlusIcon className="w-6 h-6 text-green-200" aria-hidden="true" />
                                </button>
                                <input type="text" className="w-10 p-0 text-xl font-semibold text-center text-green-200 border-none select-none focus:outline-none" value={quantity!} readOnly />
                                <button
                                    onClick={handleDecrease}
                                    type="button"
                                    className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full cursor-pointer"
                                >

                                    <MinusIcon className="w-6 h-6 text-green-200" aria-hidden="true" />
                                </button>

                            </div>
                            {/* <span className="text-sm font-light text-slate-400">Categories-1</span> */}
                        </div>

                    </div>
                    <div className="flex items-start justify-center ml-auto">

                        <div className="text-right">
                            
                            {salePrice !== null && salePrice &&  salePrice !==productPrice ? (
                                <div className="flex flex-col-reverse items-end mt-5 gap-x-3">
                                    <FormatCurrency value={productPrice * quantity} />
                                    <FormatCurrency value={salePrice} lineThrough />
                                </div>
                            ) : (
                                <div className="mt-5">
                                    <FormatCurrency value={productPrice * quantity} />
                                </div>

                            )}
                        </div>
                    </div>
                    {/* <div className="flex items-center justify-center">
                        <button
                            type="button"
                            onClick={handleRemoveClick}
                            className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">remove item</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div> */}
                </div>
            }

        </>
    );
};
export default memo(CartItem);