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