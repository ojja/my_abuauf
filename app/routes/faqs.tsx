import type { MetaFunction } from "@remix-run/node";
import FaqsSection from "~/components/FaqsSection";
// import AboutSection from "~/components/AboutSection";
import { Site_Title } from "~/credentials";

export default function Faqs() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <FaqsSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `FAQs Page - ${Site_Title}`
    }
}