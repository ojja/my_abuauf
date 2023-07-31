import { useTranslation } from 'react-i18next';
import Breadcrumbs from "~/components/Breadcrumbs";
import ContactForm from './ContactForm';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ContactSection() {
    const { t } = useTranslation();
    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: t('contact'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-12">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('contact')}</h1>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="flex flex-col">
                    <div className='container px-4 mx-auto md:px-12'>
                        <div className="flex flex-col flex-wrap-reverse items-start gap-20 lg:gap-24 md:flex-nowrap md:flex-row">
                            <div className="inline-flex flex-col items-start justify-start w-full p-6 border border-gray-400 shadow grow shrink basis-0 md:p-9 rounded-3xl md:w-auto">
                                <ContactForm />
                            </div>
                            <div className="inline-flex flex-col items-center justify-start w-full bg-green-300 grow shrink basis-0 rounded-3xl md:w-auto">
                                <div className="inline-flex items-center self-stretch gap-5 rounded p-9">
                                    <div className="p-3 bg-white rounded-full justify-center items-center gap-2.5 flex">
                                        <div className="w-7 h-7 p-0.5 justify-center items-center flex">
                                            <div className="relative flex flex-col items-start justify-start w-6 h-6">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.9995 0.000579727V6.00014H24.0006V24H0V6.00072H3.9999V0H19.9995V0.000579727ZM21.9998 8.30028L19.9995 10.1402L17.9999 11.9812L13.6294 16.0002L11.9997 17.5014L10.37 16.0002L6.00072 11.9812L3.9999 10.1402L1.99966 8.30028V22.0009H21.9998V8.30086V8.30028ZM17.9993 2.0014H6.0013V9.26016L11.9997 14.7815L17.9999 9.26016V2.00198L17.9993 2.0014ZM16.0002 8.00039V10.0006H8.00038V8.00039H16.0002ZM16.0002 4.00048V6.00072H8.00038V4.00048H16.0002Z" fill="#185039" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex flex-col justify-start gap-5 grow shrink basis-0">
                                        <div className="self-stretch flex-col justify-start  gap-1.5 flex">
                                            <h4 className="self-stretch text-base font-semibold leading-relaxed text-black">البريد الاكتروني</h4>
                                            <div className="self-stretch text-base text-gray-700 underline">info@abuauf.com</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-[1px] bg-gray-100" />
                                <div className="inline-flex items-center self-stretch gap-5 rounded p-9">
                                    <div className="p-3 bg-white rounded-full justify-center items-center gap-2.5 flex">
                                        <div className="w-7 h-7 p-0.5 justify-center items-center flex">
                                            <div className="relative flex flex-col items-start justify-start w-6 h-6">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.9995 0.000579727V6.00014H24.0006V24H0V6.00072H3.9999V0H19.9995V0.000579727ZM21.9998 8.30028L19.9995 10.1402L17.9999 11.9812L13.6294 16.0002L11.9997 17.5014L10.37 16.0002L6.00072 11.9812L3.9999 10.1402L1.99966 8.30028V22.0009H21.9998V8.30086V8.30028ZM17.9993 2.0014H6.0013V9.26016L11.9997 14.7815L17.9999 9.26016V2.00198L17.9993 2.0014ZM16.0002 8.00039V10.0006H8.00038V8.00039H16.0002ZM16.0002 4.00048V6.00072H8.00038V4.00048H16.0002Z" fill="#185039" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex flex-col justify-start gap-5 grow shrink basis-0">
                                        <div className="self-stretch flex-col justify-start  gap-1.5 flex">
                                            <h4 className="self-stretch text-base font-semibold leading-relaxed text-black">رقم التليفون</h4>
                                            <div className="self-stretch text-base text-gray-700 underline">(+20) 000 000 000</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-[1px] bg-gray-100" />
                                <div className="inline-flex items-center self-stretch gap-5 rounded p-9">
                                    <div className="p-3 bg-white rounded-full justify-center items-center gap-2.5 flex">
                                        <div className="w-7 h-7 p-0.5 justify-center items-center flex">
                                            <div className="relative flex flex-col items-start justify-start w-6 h-6">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.9995 0.000579727V6.00014H24.0006V24H0V6.00072H3.9999V0H19.9995V0.000579727ZM21.9998 8.30028L19.9995 10.1402L17.9999 11.9812L13.6294 16.0002L11.9997 17.5014L10.37 16.0002L6.00072 11.9812L3.9999 10.1402L1.99966 8.30028V22.0009H21.9998V8.30086V8.30028ZM17.9993 2.0014H6.0013V9.26016L11.9997 14.7815L17.9999 9.26016V2.00198L17.9993 2.0014ZM16.0002 8.00039V10.0006H8.00038V8.00039H16.0002ZM16.0002 4.00048V6.00072H8.00038V4.00048H16.0002Z" fill="#185039" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex flex-col justify-start gap-5 grow shrink basis-0">
                                        <div className="self-stretch flex-col justify-start  gap-1.5 flex">
                                            <h4 className="self-stretch text-base font-semibold leading-relaxed text-black">العنوان الرئيسي</h4>
                                            <div className="self-stretch text-base text-gray-700">اخر عباس العقاد - تقاطع ذاكر حسين - بجوار انبي</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
