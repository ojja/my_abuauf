import { Link } from "@remix-run/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { MetaFunction } from "@remix-run/node";
import WishListProducts from "~/components/AddWishList";
import FormatCurrency from "~/utils/FormatCurrency";
import WishList from "~/components/WishList";
import { Site_Title } from "~/credentials";

export const meta = () => {
  return {
    title: `My Wishtlist | ${Site_Title}`
  }
}

export default function wishlist() {
  return (
    <div>
      <WishList />
    </div>

  )
}