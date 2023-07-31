import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { trackAddToCart } from "~/fb-pixel";
import useShoppingCart, { CartItem } from "~/stores/cartStore";
// import { TrashIcon } from "@heroicons/24/outline";
import TiktokPixel from 'tiktok-pixel';
import i18next from "i18next";
import AddCart from "./icons/AddCart";




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function AddToCartSimple({ className, product, disabled, singleProductView, }: {

    className?: string;
    product: CartItem;
    disabled: boolean;
    singleProductView?: boolean;
}) {
    const { t, i18n } = useTranslation();
    const {
        getItemQuantity,
        addToCart,
        decreaseCartQuantity,
    } = useShoppingCart();
    const quantity = getItemQuantity(product) ?? 0;
    //  quantity = getItemQuantity(product);
    const handleTracking = () => {
        TiktokPixel.track('AddToCart', {
            contents: [
                {
                    content_id: '301',
                    content_name: 'dress',
                    quantity: 1,
                    price: 8,
                }
            ],
            content_type: 'product',
            value: 9.2,
            currency: 'USD',
        });
    }
    return (
        <>
            <button
                disabled={disabled}
                type="submit"
                onClick={() => {
                    addToCart(product);
                    trackAddToCart('EGP', product.price);
                    handleTracking;
                }}
                className={classNames(
                    disabled ? 'cursor-not-allowed' : '',
                    className ?? ''
                )}
            >
                {quantity === 0 ? (
                    <div className={`px-5 font-medium text-white bg-green-200 hover:bg-green-400 text-base md:text-xl rounded-100 w-full flex items-center whitespace-nowrap ${singleProductView ? 'justify-center py-2 md:py-4' : 'justify-between py-2.5'}`}>
                        {singleProductView ?
                            <p>{t('add_to_cart')}</p>
                            :
                            <>
                                <p className="hidden md:block">{t('add_to_cart')}</p>
                                <span className="block md:hidden"><AddCart /></span>
                            </>
                        }
                    </div>

                )


                    : (
                        <div className="flex items-center justify-start">
                            <span
                                // type="button"
                                className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full cursor-pointer md:w-12 md:h-12"
                                onClick={(e) => { decreaseCartQuantity(product); e.stopPropagation() }}
                            >
                                {/* {quantity! === 1 ? 
                            <TrashIcon className="w-4 h-4 text-gray-500" /> 
                            :  */}
                                <MinusIcon className="w-4 h-4 text-green-200 md:w-6 md:h-6" aria-hidden="true" />
                                {/* } */}
                            </span>
                            <input type="text" className="w-8 p-0 mx-2 text-xl font-semibold text-center text-green-200 border-none select-none md:mx-7 focus:outline-none" value={quantity!} readOnly />
                            <span
                                // type="button"
                                className={`flex items-center text-white justify-center w-8 h-8 md:w-12 md:h-12 bg-green-200 hover:bg-green-400 rounded-full cursor-pointer ${quantity! > 9 ? "pointer-events-none" : ''}`}
                                onClick={(e) => { addToCart(product); e.stopPropagation() }}
                            >
                                <PlusIcon className="w-4 h-4 text-white md:w-6 md:h-6" aria-hidden="true" />
                            </span>
                        </div>
                    )
                }
            </button >
        </>

    );
}
