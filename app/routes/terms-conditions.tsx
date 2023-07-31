import type { MetaFunction } from "@remix-run/node";
import { Site_Title } from "~/credentials";
import i18n from 'i18next';
import TermsSection from "~/components/corporate/TermsSection";

export default function TermsConditions() {
    return (
        <div className="flex flex-col items-center space-y-2">
            <TermsSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `${i18n.language === "en" ? 'Privacy Policy' : 'سياسة الخصوصية'} - ${Site_Title}`
    }
}