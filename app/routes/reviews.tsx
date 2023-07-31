import type { MetaFunction } from "@remix-run/node";
import ReviewsSection from "~/components/corporate/ReviewsSection";
import { Site_Title } from "~/credentials";

export default function Reviews() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <ReviewsSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `Reviews - ${Site_Title}`
    }
}