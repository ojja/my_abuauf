import { memo, useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "@remix-run/react";
import Quickview from "../Quickview";
import AddToCartSimple from "../AddToCartSimple";
import { useTranslation } from "react-i18next";
import FormatCurrency from "~/utils/FormatCurrency";
import ProgressiveImage from "../ProgressiveImage";
import WishlistBtn from "../WishlistBtn";
import { ProductData } from "types";
import AddCart from "../icons/AddCart";


// type Product = {
//   [x: string]: string;
//   id: string,
//   name: string,
//   price: number,
//   main_image: string,
//   thumbnail: string,
//   slug: string,
//   sale_price: string;
//   main_image_small: string;
//   category: string;
//   type: string;
// }

type ProductWidgetProps = {
  product: ProductData,
  key: any
  wishlist?: any;
  isItemInWishlist: boolean;
}
const ProductWidget = ({ product, wishlist }: ProductWidgetProps) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [isOpenCart, setIsOpenCart] = useState(false);

  let [openQuick, setOpenQuick] = useState(false);
  function openModal() {
    setOpenQuick(!openQuick);
  }
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [extraText, setExtraText] = useState("");
  // const productTitle = product?.name ? product?.name : product?.title;
  // Ensure productTitle is defined before using it
  const productTitle = product
    ? i18n.language === 'en'
      ? product?.name || ''
      : product?.name || ''
    : '';
  useEffect(() => {
    // Check if the title has a hyphen and a number after it
    const hyphenIndex = productTitle.indexOf("-");
    if (hyphenIndex !== -1) {
      const numberAfterHyphen = parseInt(productTitle.slice(hyphenIndex + 1));
      if (!isNaN(numberAfterHyphen)) {
        // Split the title at the hyphen
        const parts = productTitle.split("-");
        // Update the title and extra text
        setUpdatedTitle(parts[0].trim());
        setExtraText(parts[1].trim());
        return;
      }
    }
    // If no hyphen or invalid number, keep the original title
    setUpdatedTitle(productTitle);
    setExtraText("");
  }, [productTitle]);

  // const imageSrc = product?.main_image ? product.main_image.replace('/uploads/', '/uploads-webpc/uploads/').concat('.webp') : product?.thumbnail;
  const imageSrc = product?.main_image ? product.main_image : product?.thumbnail;
  // const imageSrcSmall = product?.main_image_small ? product.main_image_small.replace('/uploads/', '/uploads-webpc/uploads/').concat('.webp') : product?.thumbnail;
  const imageSrcSmall = imageSrc;

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };
  const handleQuickviewToggle = () => {
    setOpenQuick(!openQuick);
  };

  let itemID;
  let salePrice = null;
  let productPrice = null;
  if (product?.type === "simple") {
    itemID = product.id;
    productPrice = product.price;
    salePrice = product.sale_price;
  } else if (product?.type === "variable") {
    itemID = product.id;
    productPrice = product.price;
    salePrice = product.sale_price;
  }
  return (
    <>
      <div className={`relative flex flex-col group border-2 border-gray-100 rounded-3xl overflow-hidden pb-5 h-full`}>
        <div className="relative z-10 w-full overflow-hidden bg-green-300 min-h-80 group-hover:opacity-75 ">
          <Link to={
            `/products/${product?.slug
            }`
          }
            onClick={handleLinkClick}
            className={
              `block aspect-w-4 aspect-h-3 lg:h-80 ${product?.slug ? product.slug : "pointer-events-none"
              }`
            }>
            {
              imageSrc ? (
                <ProgressiveImage src={imageSrc} placeholder={imageSrcSmall} alt={product?.name} className="self-center object-cover object-center m-auto max-w-75 max-h-75" />
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                </span>
              )
            } </Link>
          <button onClick={openModal} className="absolute justify-center hidden p-2 text-sm font-semibold bg-white border-2 border-gray-400 rounded-full md:inline-flex right-2 bottom-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.9843 1H18.4532C18.598 1.0005 18.7368 1.05828 18.8393 1.16072C18.9417 1.26316 18.9995 1.40195 19 1.54682V7.01632H17.9064V2.85868L11.8907 8.875L11.125 8.10932L17.1407 2.09301H12.9843V1Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.01568 1H1.54682C1.40195 1.0005 1.26316 1.05828 1.16072 1.16072C1.05828 1.26316 1.00051 1.40195 1 1.54682V7.01632H2.09364V2.85868L8.10932 8.875L8.875 8.10932L2.85932 2.09301H7.01568V1Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12.9843 19H18.4532C18.598 18.9995 18.7368 18.9417 18.8393 18.8393C18.9417 18.7368 18.9995 18.598 19 18.4532V12.9837H17.9064V17.1413L11.8907 11.125L11.125 11.8907L17.1407 17.907H12.9843V19Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.01568 19H1.54682C1.40195 18.9995 1.26316 18.9417 1.16072 18.8393C1.05828 18.7368 1.00051 18.598 1 18.4532V12.9837H2.09364V17.1413L8.10932 11.125L8.875 11.8907L2.85932 17.907H7.01568V19Z" fill="black" />
              </g>
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-black md:text-xl">
              <Link to={`/products/${product?.slug}`} prefetch="intent">
                {/* <span aria-hidden="true" className={`absolute inset-0 z-1 ${product?.slug ? "" : "pointer-events-none"}`} /> */}
                {updatedTitle}
              </Link>
              {extraText && <span className="block text-base font-medium uppercase text-gray-50">{extraText}</span>}
            </h3>

          </div>
          <div className="flex items-end mt-5 gap-x-3">
            {salePrice && salePrice !== productPrice ? (
              <>
                <FormatCurrency value={product?.price ? product.price : 0} />
                <FormatCurrency value={product?.sale_price ? product.sale_price : 0} lineThrough />
              </>
            ) : (
              <FormatCurrency value={product?.price ? product.price : 0} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between px-5 mt-auto gap-x-3">
          <div className="relative z-1 md:w-4/5">
            {
              product?.type != "variable" ? (
                <AddToCartSimple className="inline-flex justify-center w-full"
                  product={
                    {
                      id: itemID,
                      thumbnail: imageSrc,
                      slug: product.slug,
                      price: salePrice,
                    }
                  }
                  disabled={salePrice === null}
                />
              )
                : (
                  <Link to={`/products/${product?.slug}`} prefetch="intent" className="px-5 font-medium text-white bg-green-200 hover:bg-green-400 text-xl rounded-100 w-full flex items-center whitespace-nowrap justify-between py-2.5">
                    <span className="hidden md:block">{t('view_prooduct')}</span>
                    <span className="block md:hidden"><AddCart /></span>
                  </Link>
                )
            }
          </div>
          <div className="absolute z-10 w-1/5 md:top-0 top-2 md:right-0 md:left-auto left-2 md:relative">
            <WishlistBtn product={product} inWishlistPage={wishlist} />
          </div>
          {openQuick && <Quickview openQuick={openQuick} openModal={handleQuickviewToggle} product={product} />}
        </div>
      </div>
    </>
  );
}

export default memo(ProductWidget);