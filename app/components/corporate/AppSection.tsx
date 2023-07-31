import { useTranslation } from 'react-i18next';
import Breadcrumbs from "~/components/Breadcrumbs";
import i18next from "i18next";
import { RiAndroidFill, RiAppleFill, RiAppStoreFill } from 'react-icons/ri';


export default function AppSection() {
    const { t } = useTranslation();
    const breadcrumbs = {
        pages: [
            { name: t('home.name'), href: '/' },
            { name: t('corporate.app'), href: '#' },
        ],
    };

    const app_data = {
        google_play_url: "https://play.google.com/store/apps/details?id=com.superbware.mob.abuauf",
        app_store_url: "https://apps.apple.com/eg/app/abu-auf/id1589607136",
    };

    const openAppStore = (url:any) => {
        // window.location.href = url;
        window.open(url, "_blank");
    };
    return (
        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="flex flex-col">
                    <div className='container px-4 mx-auto md:px-24'>
                        <div className="inline-flex flex-col items-center justify-start gap-6">
                            <h1 className="self-stretch text-5xl font-bold leading-10 text-center text-black">
                                {t('appSection.downloadApp')}
                            </h1>
                            <p className="text-xl font-semibold leading-9 text-center text-gray-50">
                                {t('appSection.description')}
                            </p>
                            <div className="inline-flex items-start justify-start h-16 gap-4">
                                <button
                                    onClick={() => openAppStore(app_data.app_store_url)}
                                    className="px-6 py-4 bg-green-300 hover:bg-green-600 rounded-full flex-col justify-center items-center gap-2.5 inline-flex"
                                >
                                    <div className="inline-flex items-center justify-start gap-3">
                                        <span className="text-xl font-semibold leading-7 text-green-200">
                                            {t('appSection.appleStore')}
                                        </span>
                                        <RiAppleFill />
                                    </div>
                                </button>
                                <button
                                    onClick={() => openAppStore(app_data.google_play_url)}
                                    className="px-6 py-4 bg-green-300 hover:bg-green-600 rounded-full flex-col justify-center items-center gap-2.5 inline-flex"
                                >
                                    <div className="inline-flex items-center justify-start gap-3">
                                        <span className="text-xl font-semibold leading-7 text-green-200">
                                            {t('appSection.googlePlay')}
                                        </span>
                                        <RiAndroidFill />
                                    </div>
                                </button>
                            </div>
                            <div className="relative inline-flex flex-col items-center justify-center w-64 h-auto gap-4 p-12 pb-24 bg-white rounded-full scan-artwork">
                                <img src="/images/app-qr.webp" alt="QR Code" />
                                <span>{t('appSection.scan')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
