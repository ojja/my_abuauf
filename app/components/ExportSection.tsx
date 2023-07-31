import { Link } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import TextEllipsis from "./about/TextEllipsis";
import HistorySection from "./about/history";
import ValuesSection from "./about/values";
import ToggleSection from "./about/toggleSection";
import Breadcrumbs from "./Breadcrumbs";
import i18next from "i18next";


export default function ExportSection() {
    const { t } = useTranslation();


    const cities = [
        {
            imageSrc: "/images/export/cities/SaudiArabia.png",
            name: "السعودية",
        },
        {
            imageSrc: "/images/export/cities/UnitedArabEmirates.png",
            name: "المتحدة العربية المتحدة",
        },
        {
            imageSrc: "/images/export/cities/Malaysia.png",
            name: "ماليزيا",
        },
        {
            imageSrc: "/images/export/cities/UnitedStates.png",
            name: "الولايات المتحدة الأمريكية",
        },
        {
            imageSrc: "/images/export/cities/China.png",
            name: "الصين",
        },
        {
            imageSrc: "/images/export/cities/Morocco.png",
            name: "المغرب",
        },
        {
            imageSrc: "/images/export/cities/HongKong.png",
            name: "هونغ كونغ",
        },
        {
            imageSrc: "/images/export/cities/Indonesia.png",
            name: "إندونيسيا",
        },
        {
            imageSrc: "/images/export/cities/Germany.png",
            name: "ألمانيا",
        },
    ];
    const items = [
        {
            imageSrc: "/images/export/items/image.png",
            name: "التمور المصرية",
            description: "تتميز التمور المصرية بسمعة طيبة وجودة مميزة وسعر تنافسي يجعلها من أولويات مستوردي التمور لزيادة القدرة التنافسية للتمر المصري، استعانت “أبوعوف” بأحدث خطوط الغسيل والتجفيف وتم شراء خط تعقيم للتمر هو الأول من نوعه والأوحد في مصر مما أعطى تمور أبوعوف ميزة إضافية حيث يعتبر هذا الخط بمثابة صمام أمان ضد حدوث أي أضرار مستقبلية للتمر و منحه صلاحية أكبر. الشركة تصدر مختلف أصناف التمور المصرية مثل (الصعيدي – السيوي – المجدول – الملكابي)."
        },
        {
            imageSrc: "/images/export/items/image1.png",
            name: "القهوة",
            description: "تقوم شركة “أبوعوف” بإنتاج أصناف مختلفة من القهوة لتتناسب مع جميع الأذواق منها: القهوة التركي – القهوة الفرنساوي – إسبريسو – القهوة العربي – قهوة نواة التمر . … وغيرها) و قد مكن تنوع القهوة إلى جانب تميز المذاق و النكهة بجميع الأصناف، شركة “أبو عوف” من اكتساح مجموعة من الأسواق، كل هذا بفضل تجربة الشركة الفريدة والمتميزة في مجال إنتاج القهوة و اهتمامها بالجودة، شركة أبو عوف تقوم دائما بتطوير وتحديث التقنيات الخاصة بها."
        },
        {
            imageSrc: "/images/export/items/image2.png",
            name: "البريتزل",
            description: "البريتزل من المقرمشات التى اكتسبت رواجا كبيرا فى مختلف الأسواق الخارجية، وذلك لأنه منتج صحي يتناسب مع جميع الأعمار كما أنه يقدم بنكهات مختلفة تتناسب مع جميع الأذواق. البريتزل الذي تقدمه شركة “أبو عوف” لذيذ لأنه مصنوع من عجينة مميزة و بطريقة فريدة. وذلك بفضل الوصفات الخاصة و المميزة. كل هذا ساهم في انتشاره بسرعة كبيرة في الأسواق و تزايد الطلب على هذا المنتج."
        },
        {
            imageSrc: "/images/export/items/image.png",
            name: "التمور المصرية",
            description: "تتميز التمور المصرية بسمعة طيبة وجودة مميزة وسعر تنافسي يجعلها من أولويات مستوردي التمور لزيادة القدرة التنافسية للتمر المصري، استعانت “أبوعوف” بأحدث خطوط الغسيل والتجفيف وتم شراء خط تعقيم للتمر هو الأول من نوعه والأوحد في مصر مما أعطى تمور أبوعوف ميزة إضافية حيث يعتبر هذا الخط بمثابة صمام أمان ضد حدوث أي أضرار مستقبلية للتمر و منحه صلاحية أكبر. الشركة تصدر مختلف أصناف التمور المصرية مثل (الصعيدي – السيوي – المجدول – الملكابي)."
        },

    ];
    const breadcrumbs = {
        pages: [
            { name: t('home.name'), href: '/' },
            { name: t('export.name'), href: '#' },
        ]
    }

    return (

        <section className="w-full ">
            <div className="pt-4 pb-12 bg-green-300 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 " />
                </div>
                <div className="flex flex-col mb-6 md:mb-16 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <img src="/images/export/image13.webp" alt="image alt" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex flex-col justify-center w-full px-4 py-6 bg-green-500 md:w-1/2 md:p-12">
                        <div className="flex flex-col justify-center w-full">
                            <span className="font-semibold text-gray-50 md:text-xl">{t('export.name')}</span>
                            <h1 className="py-3 text-xl text-white md:py-6 md:text-5xl">ما بين أسواق أوروبا، آسيا، أمريكا و الوطن العربي</h1>
                            <p className=" text-[#3C926F] md:text-xl font-semibold">اتجهت شركة "أبوعوف" للتصدير إلى الأسواق العالمية، ما بين الأسواق الأوروبية والأسيوية والأمريكية بالإضافة إلى الأسواق العربية. اهتمت الشركة بمراعاة متطلبات كل سوق على حدة و تلبية احتياجات العملاء، و ذلك بالتواصل المستمر مع الأسواق الخارجية والتواجد بالمعارض العالمية. تمكنت شركة "أبوعوف" من الانتشار في الأسواق الخارجية والتي تضم مختلف الدول. وتسعى شركة "أبوعوف" للتوسع في باقي الأسواق.</p>
                        </div>
                    </div>
                </div>
                <div className="container px-4 mx-auto md:px-0">
                    <h3 className="text-xl font-bold text-green-400 md:text-5xl">نسعى للتوسع في الأسواق العالمية</h3>
                    <div className="flex flex-wrap mt-6 md:gap-x-6 gap-x-3 md:gap-y-12 gap-y-3 md:mt-12">
                        {cities.map((cite, index) => (
                            <div  key={index} className=" bg-white md:p-9 p-3 rounded-3xl md:w-[calc(33%-20px)] lg:w-[230px] w-[calc(50%-12px)] text-center flex flex-col justify-center" style={{ boxShadow: ' 0px 20px 66px rgba(0, 0, 0, 0.2)' }}>
                                <img src={cite.imageSrc} alt="" className="mx-auto md:h-24 h-9" />
                                <p className="mt-3 text-base font-semibold md:text-2xl text-gray-50">
                                    {cite.name}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
            <div className="container px-4 mx-auto mt-6 mb-24 md:mt-16 md:px-0">
                <h3 className="text-xl font-bold text-green-400 md:text-5xl">نصّدر الأصناف الأكثر طلباً في الأسواق العالمية</h3>
                <div className="flex flex-wrap mt-6 md:mt-12">
                    {items.map((item, index) => (
                        <div className="w-full px-4 pb-4 md:pb-8 md:w-1/2 lg:w-1/3" key={index}>
                            <div className="h-full overflow-hidden bg-green-300 rounded-3xl">
                                <img src={item.imageSrc} alt="" className="w-full mx-auto " />
                                <div className="p-4 md:p-8">
                                    <p className="text-base font-bold md:text-2xl">
                                        {item.name}
                                    </p>
                                    <div className="mt-2 text-sm font-semibold md:text-base text-gray-50">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}
