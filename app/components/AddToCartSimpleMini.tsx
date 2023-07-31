import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { trackAddToCart } from "~/fb-pixel";
import useShoppingCart, { CartItem } from "~/stores/cartStore";
// import { TrashIcon } from "@heroicons/24/outline";
import TiktokPixel from 'tiktok-pixel';
import i18next from "i18next";




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function AddToCartSimpleMini({ className, product, disabled }: {

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
        console.log('here handleTracking')
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
                <img src="/images/icons/cart_plus.webp" alt="cart_plus" className="m-auto"/>
            </button >
        </>

    );
}
