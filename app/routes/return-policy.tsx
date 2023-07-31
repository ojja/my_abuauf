import type { MetaFunction } from "@remix-run/node";
import { Site_Title } from "~/credentials";
import i18n from 'i18next';
import RefundSection from "~/components/corporate/RefundSection";

export default function RefundPolicy() {
    return (
        <div className="flex flex-col items-center space-y-2">
            <RefundSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `${i18n.language === "en" ? 'Refund Policy' : 'سياسة الاسترجاع'} - ${Site_Title}`
    }
}