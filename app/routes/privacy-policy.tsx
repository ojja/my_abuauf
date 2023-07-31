import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import PrivacySection from "~/components/corporate/PrivacySection";
import { Site_Title } from "~/credentials";
import i18n from 'i18next';

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col items-center space-y-2">
            <PrivacySection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `${i18n.language === "en" ? 'Privacy Policy' : 'سياسة الخصوصية'} - ${Site_Title}`
    }
}