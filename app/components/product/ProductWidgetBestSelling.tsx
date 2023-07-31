import { memo } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "@remix-run/react";
import AddToCartSimpleMini from "../AddToCartSimpleMini";
import { useTranslation } from "react-i18next";

import FormatCurrency from "~/utils/FormatCurrency";
import ProgressiveImage from "../ProgressiveImage";
import { ProductData } from "types";


type ProductWidgetBestSellingProps = {
  product: ProductData,

}
const ProductWidgetBestSelling = ({ product }: ProductWidgetBestSellingProps) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  let productTitle = i18n.language == 'en' ? product?.name : product?.ar_name;
  let name = productTitle?.length > 45 ? productTitle?.slice(0, 45).concat("...") : productTitle;
  const imageSrc = product?.main_image ? product.main_image : product?.thumbnail;

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
    });
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
      <div className="bg-white shadow-custom rounded-3xl flex h-full">
        <Link to={`/products/${product?.slug}`} className="flex w-24 min-w-24 min-h-24 justify-center items-center border-r border-gray-100" onClick={handleLinkClick}>
          {imageSrc ? (
            <ProgressiveImage src={imageSrc} placeholder={imageSrc} alt={productTitle} className="self-center object-cover object-center max-w-75 max-h-75 m-auto" />
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
            </span>
          )}
        </Link>
        <div className="flex items-center justify-between flex-1">
          <div className="py-5 pl-5">
            <h4 className="md:text-base text-sm text-black"><Link to={`/products/${product?.slug}`} prefetch="intent">{name}</Link></h4>
            <div className="mt-3">
              <FormatCurrency value={product?.price ? product.price : 0} />
            </div>
          </div>
          <div className="px-3">
            <AddToCartSimpleMini
              className="bg-green-200 rounded-full w-12 h-12 items-center justify-center text-white cursor-pointer hover:bg-green-400"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ProductWidgetBestSelling);