import { Link } from "@remix-run/react";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from 'react-i18next';


export default function HistorySection() {
    const { t } = useTranslation('about');
    const { i18n } = useTranslation();
    const items = [
        {
            imageSrc: "/images/image.png",
            year: "1970’s",
            description: "بدأ أبو عوف في بيع الفاكهة المجففة والمكسرات بكميات كبيرة وبالجملة.",
            description_English: "Abu Auf started selling dried fruits and nuts in bulk and wholesale."
        },
        {
            imageSrc: "/images/image.png",
            year: "1980’s",
            description: "وسعت شركة أبو عوف محفظتها، حيث قدمت المزيد من المنتجات والمكونات إلى السوق.",
            description_English: "Abu Auf expanded its portfolio, introducing more products and ingredients to the market."
        },
        {
            imageSrc: "/images/image.png",
            year: "1990’s",
            description: " افتتح أبو عوف مراكز لوجستية في القاهرة والإسكندرية",
            description_English: "Abu Auf opened logistic centers in Cairo and Alexandria"
        },
        {
            imageSrc: "/images/image.png",
            year: "2000",
            description: " قدم أبو عوف التمر الفاخر للسوق المصري",
            description_English: "Abu Auf introduced premium dates to the Egyptian market"
        },
        {
            imageSrc: "/images/image.png",
            year: "2010",
            description: " تم تقديم العلامة التجارية تحت اسم 'أبو عوف' وتم افتتاح أول متجر مميز لدينا في الميرغني.",
            description_English: "The brand was introduced under the name “Abu Auf” and our first premium store was opened in Al Merghany."
        },
        {
            imageSrc: "/images/image.png",
            year: "2018",
            description: "  وسعت شركة أبو عوف نطاق منتجاتها وقدمت مجموعة صحية من المنتجات المختلفة إلى السوق. ",
            description_English: "Abu Auf expanded its product range and introduced a healthy range of different products to the market."
        },
        {
            imageSrc: "/images/image.png",
            year: "2019",
            description: "أطلق أبو عوف موقعه على الإنترنت واكتسب المزيد من التقدير في جميع أنحاء العالم.",
            description_English: "Abu Auf launched his website and gained more recognition all over the world."
        },
        {
            imageSrc: "/images/image.png",
            year: "2021",
            description: "أطلقت شركة أبو عوف تطبيق الهاتف الخاص بها مما وفر وصولاً أسهل لعملائها وسهّل عملية الشراء.",
            description_English: "Abu Auf launched its own mobile application, which provided easier access to its customers and facilitated the purchase process."
        },
        // Add more items here...
    ];

    return (

        <div className="container px-4 mx-auto mt-6 history md:my-20 mb-14 md:px-24">
            <h3 className="text-xl font-bold leading-none text-green-400  md:text-5xl">{t('history_title')}</h3>

            <div className="mt-6 list md:mt-16 ">
                {items.map((item, index) => (
                    <div className="flex overflow-hidden single md:h-64 h-28 md:w-2/4" key={index}>
                        <img src={item.imageSrc} alt="" className="w-32 h-24  md:w-60 md:h-44" />
                        <div className="w-2 mx-5 mt-2 border-new md:w-4">
                            <span className="block w-2 h-2 bg-black rounded-full  md:w-4 md:h-4"></span>
                            <span className={`md:w-1 w-0.5 bg-gray-100 h-full mt-2 block mx-auto ${(items.length - 1 == index) ? 'hidden' : ''}`}></span>
                        </div>
                        <div className="text">
                            <p className="text-base font-extrabold text-green-400 year md:text-xl direction-ltr rtl:text-end ltr:text-start">{item.year}</p>
                            <p className="mt-1 text-sm  text-gray-50 md:text-xl">
                                {i18n.language === "ar" ?
                                    item.description : item.description_English
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
