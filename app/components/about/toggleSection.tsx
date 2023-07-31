import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function ToggleSection() {
    const { t, i18n } = useTranslation();
    const [showContent, setShowContent] = useState<number | null>(null); // Explicitly define the type as number or null

    const handleToggle = (index: number) => {
        setShowContent(prevIndex => (prevIndex === index ? null : index));
    };

    const missions = [
        {
            title: "نحن نعيش ونستهلك ونتنفس منتجات عضوية ",
            description: "استنادًا إلى التزامنا المستمر بتقديم طعام عضوي 100٪ ومن مصادر أخلاقية ومستدامة؛ يعتمد نجاحنا على الحصول على مواد خام عالية الجودة من جميع أنحاء العالم. واليوم، تقدم أبو عوف أكثر من 400 منتج عضوي ممتاز إلى مناطق مختلفة في جميع أنحاء العالم.",
            title_en: "We live, consume and breathe organic products",
            description_en: "Based on our ongoing commitment to providing 100% organic, ethically and sustainably sourced food; Our success depends on sourcing high quality raw materials from around the world. Today, Abu Auf delivers more than 400 premium organic products to different regions around the world."
        },
        {
            title: "في كل مرة تختار أبو عوف فإنك تختار مستقبلاً أكثر صحة لها",
            description: "نستثمر باستمرار مبالغ كبيرة من رأس مال الشركة حتى نتمكن من الاستمرار في تقديم خدمة متميزة وجودة فائقة ودعم عملاء احترافي، كما نستثمر في المعرفة المهارات جديدة لتطوير منتجاتنا وعمليات التحميص. حيث نسعى جاهدين للبقاء دائمًا على مستوى توقعات عملائنا.",
            title_en: "Every time you choose Abu Auf, you choose a healthier future",
            description_en: "Based on our ongoing commitment to providing 100% organic, ethically and sustainably sourced food; Our success depends on sourcing high quality raw materials from around the world. Today, Abu Auf delivers more than 400 premium organic products to different regions around the world."

        },
        {
            title: "جذورنا تمتد عميقًا لنقدم جودة عالية",
            description: "مسؤولياتنا كشركة تقع على رأس قائمة أولوياتنا، فجزء من مسؤولياتنا هو جعل مهمتنا هي توفير قهوة ومكسرات ومنتجات غذائية صحية ذات جودة عالية مع تأثير بيئي منخفض. من الفكرة وحتى الاستهلاك ننقل الحب والرعاية إلى منتجاتنا وخدماتنا، فنعتني بالطبيعة والبيئة وجميع الأشخاص المشاركين في تقديم منتجاتنا إليك.",
            title_en: "Our roots run deep to deliver superior quality",
            description_en: "Based on our ongoing commitment to providing 100% organic, ethically and sustainably sourced food; Our success depends on sourcing high quality raw materials from around the world. Today, Abu Auf delivers more than 400 premium organic products to different regions around the world."

        },
    ];
    return (
        <div className="mt-6 list">
            {missions.map((mission, index) => (
                <div className="px-4 py-3 mb-3 bg-green-300 single rounded-3xl md:py-8 md:px-7" key={index}>
                    <h4
                        className="flex items-center justify-between text-base font-bold text-black cursor-pointer md:text-2xl after:w-1 after:h-2 after:absolute"
                        onClick={() => handleToggle(index)} // Pass the index to handleToggle
                    >
                        <span className="inline-block pr-5 ">
                            {i18n.language === "ar" ?
                                mission.title : mission.title_en
                            }
                        </span>
                        {showContent === index ? <svg className="md:w-6 h-0.5 w-4" viewBox="0 0 24 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0007 3.20435e-05H13.0002L11.0005 0L0 3.20435e-05V2.00087H11.0005L13.0002 2.00083L24.0007 2.00087V3.20435e-05Z" fill="#126E49" />
                        </svg> : <svg className="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0007 11.0003H13.0002V0.000976562H11.0005V11.0003H0V13.0011H11.0005V24.0005H13.0002V13.0011H24.0007V11.0003Z" fill="#126E49" />
                        </svg>}
                    </h4>
                    <p className={`slide-up ${showContent === index ? 'slide-up-active' : '' && index == 0 ? 'slide-up-active' : ''} md:mt-8 mt-3 text-gray-50 font-medium md:text-xl text-sm`}>
                        {i18n.language === "ar" ?
                            mission.description : mission.description_en
                        }
                    </p>
                </div>
            ))}
        </div>
    )
}
