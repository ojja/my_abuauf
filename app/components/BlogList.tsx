import { useTranslation } from "react-i18next";
import Breadcrumbs from "./Breadcrumbs";
import BlogWidget from "./corporate/BlogWidget";

export default function BlogList() {
    const { t } = useTranslation();
    const breadcrumbs = {
        pages: [
            { name: t('home.name'), href: '/' },
            { name: t('corporate.blog'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('corporate.blog')}</h1>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="flex flex-col">
                    <div className='container px-4 mx-auto md:px-24'>

                        <div className="flex flex-wrap -mx-2 gap-y-6">
                            <div className="w-full px-2 md:w-1/2 lg:w-1/3">
                                <BlogWidget />
                            </div>
                            <div className="w-full px-2 md:w-1/2 lg:w-1/3">
                                <BlogWidget />
                            </div>
                            <div className="w-full px-2 md:w-1/2 lg:w-1/3">
                                <BlogWidget />
                            </div>
                            <div className="w-full px-2 md:w-1/2 lg:w-1/3">
                                <BlogWidget />
                            </div>
                            <div className="w-full px-2 md:w-1/2 lg:w-1/3">
                                <BlogWidget />
                            </div>
                            <div className="w-full px-2 md:w-1/2 lg:w-1/3">
                                <BlogWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
