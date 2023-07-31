import type { MetaFunction } from "@remix-run/node";
import ShippingInfoSection from "~/components/corporate/ShippingInfoSection";
import { Site_Title } from "~/credentials";


export default function ShippingInfo() {
    return (
        <>
            <div className="flex flex-col items-center space-y-2">
                <ShippingInfoSection />
            </div>
        </>
    )

}
export const meta: MetaFunction = () => {
    return {
        title: `Shipping Information - ${Site_Title}`
    }
}
