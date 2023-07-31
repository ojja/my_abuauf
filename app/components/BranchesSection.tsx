import { Link } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import TextEllipsis from "./about/TextEllipsis";
import HistorySection from "./about/history";
import ValuesSection from "./about/values";
import ToggleSection from "./about/toggleSection";
import Breadcrumbs from "./Breadcrumbs";
import i18next from "i18next";
import LocationTabs from "./branches/filtersection";


export default function BranchesSection() {
    const { t } = useTranslation();
    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: t('branches'), href: '#' },
        ]
    }
    return (

        <section className="w-full ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    {/* <span className="hidden w-2/3 line-clamp-3 line-clamp-5"></span> */}
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black  md:text-4xl md:pt-7">{t('branches')}</h1>
                </div>
            </div>
           <LocationTabs />

        </section>
    )
}
