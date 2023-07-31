import { Link } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import TextEllipsis from "./about/TextEllipsis";
import HistorySection from "./about/history";
import ValuesSection from "./about/values";
import ToggleSection from "./about/toggleSection";
import Breadcrumbs from "./Breadcrumbs";
import i18next from "i18next";


export default function AboutSection() {
    const { t } = useTranslation('about');
    const [click, setClick] = useState(false);
    const [showContent, setShowContent] = useState<number | null>(null); // Explicitly define the type as number or null

    const handleToggle = (index: number) => {
        setShowContent(prevIndex => (prevIndex === index ? null : index));
    };

    const items = [
        {
            imageSrc: "/images/image.png",
            year: "1970’s",
            description: "بدأ أبو عوف في بيع الفاكهة المجففة والمكسرات بكميات كبيرة وبالجملة.",
        },
        {
            imageSrc: "/images/image.png",
            year: "1980’s",
            description: "وسعت شركة أبو عوف محفظتها، حيث قدمت المزيد من المنتجات والمكونات إلى السوق.",
        },
        {
            imageSrc: "/images/image.png",
            year: "1990’s",
            description: " افتتح أبو عوف مراكز لوجستية في القاهرة والإسكندرية",
        },
        {
            imageSrc: "/images/image.png",
            year: "2000",
            description: " قدم أبو عوف التمر الفاخر للسوق المصري",
        },
        {
            imageSrc: "/images/image.png",
            year: "2010",
            description: " تم تقديم العلامة التجارية تحت اسم 'أبو عوف' وتم افتتاح أول متجر مميز لدينا في الميرغني.",
        },
        {
            imageSrc: "/images/image.png",
            year: "2018",
            description: "  وسعت شركة أبو عوف نطاق منتجاتها وقدمت مجموعة صحية من المنتجات المختلفة إلى السوق. ",
        },
        {
            imageSrc: "/images/image.png",
            year: "2019",
            description: "أطلق أبو عوف موقعه على الإنترنت واكتسب المزيد من التقدير في جميع أنحاء العالم.",
        },
        {
            imageSrc: "/images/image.png",
            year: "2021",
            description: "أطلقت شركة أبو عوف تطبيق الهاتف الخاص بها مما وفر وصولاً أسهل لعملائها وسهّل عملية الشراء.",
        },
        // Add more items here...
    ];
    const values = [
        {
            title: "الثقة والولاء هم سلاحنا للنجاح",
            description: "فريقنا لديه التزام عميق بالتميز والتفاني في تقديم مجموعة متنوعة من الخدمات؛ فرضاء العملاء هو ركيزة نجاحنا، حيث يتأكد فريقنا من أخذ كل التعليقات بعين الاعتبار ويعمل عليها لمواصلة بناء وتجديد اسم علامتنا التجارية باستمرار واكتساب ثقة وولاء عملائنا.",
        },
        {
            title: "الصدق والنزاهة والالتزام قيَم أساسية نتمسك بها",
            description: "نستثمر باستمرار مبالغ كبيرة من رأس مال الشركة حتى نتمكن من الاستمرار في تقديم خدمة متميزة وجودة فائقة ودعم عملاء احترافي، كما نستثمر في المعرفة المهارات جديدة لتطوير منتجاتنا وعمليات التحميص. حيث نسعى جاهدين للبقاء دائمًا على مستوى توقعات عملائنا.",
        },
        {
            title: "مسؤولية الريادة بأسواق المنتجات العضوية",
            description: "مسؤولياتنا كشركة تقع على رأس قائمة أولوياتنا، فجزء من مسؤولياتنا هو جعل مهمتنا هي توفير قهوة ومكسرات ومنتجات غذائية صحية ذات جودة عالية مع تأثير بيئي منخفض. من الفكرة وحتى الاستهلاك ننقل الحب والرعاية إلى منتجاتنا وخدماتنا، فنعتني بالطبيعة والبيئة وجميع الأشخاص المشاركين في تقديم منتجاتنا إليك.",
        },
        {
            title: "روح العائلة بالفريق",
            description: "نخلق بيئة عمل صحية تدفع كل عضو للتميز في منطقته؛ حيث نعمل كعائلة على ابتكار وتحسين وتقديم أفضل جودة وخدمة في السوق.",
        },
    ];
    const missions = [
        {
            title: "نحن نعيش ونستهلك ونتنفس منتجات عضوية ",
            description: "استنادًا إلى التزامنا المستمر بتقديم طعام عضوي 100٪ ومن مصادر أخلاقية ومستدامة؛ يعتمد نجاحنا على الحصول على مواد خام عالية الجودة من جميع أنحاء العالم. واليوم، تقدم أبو عوف أكثر من 400 منتج عضوي ممتاز إلى مناطق مختلفة في جميع أنحاء العالم.",
        },
        {
            title: "في كل مرة تختار أبو عوف فإنك تختار مستقبلاً أكثر صحة لها",
            description: "نستثمر باستمرار مبالغ كبيرة من رأس مال الشركة حتى نتمكن من الاستمرار في تقديم خدمة متميزة وجودة فائقة ودعم عملاء احترافي، كما نستثمر في المعرفة المهارات جديدة لتطوير منتجاتنا وعمليات التحميص. حيث نسعى جاهدين للبقاء دائمًا على مستوى توقعات عملائنا.",
        },
        {
            title: "جذورنا تمتد عميقًا لنقدم جودة عالية",
            description: "مسؤولياتنا كشركة تقع على رأس قائمة أولوياتنا، فجزء من مسؤولياتنا هو جعل مهمتنا هي توفير قهوة ومكسرات ومنتجات غذائية صحية ذات جودة عالية مع تأثير بيئي منخفض. من الفكرة وحتى الاستهلاك ننقل الحب والرعاية إلى منتجاتنا وخدماتنا، فنعتني بالطبيعة والبيئة وجميع الأشخاص المشاركين في تقديم منتجاتنا إليك.",
        },
    ];
    const breadcrumbs = {
        pages: [
            { name:t('home'), href: '/' },
            { name: t('about'), href: '#' },
        ]
    }
    
    return (

        <section className=" w-full">
            <div className="hero bg-green-300 pt-4 pb-16">
                <div className="details container mx-auto md:px-24 px-4">
                <span className="hidden line-clamp-3 line-clamp-5 w-2/3"></span>
                <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 border-b border-gray-200" />
                    <img src="/images/about/about-hero.png" alt="" />
                    <TextEllipsis
                        width='w-2/3'
                        title= {t('hero_title')}
                        content=  {t('hero_content')}     />
                </div>
            </div>
            <HistorySection />
            <ValuesSection />
            <div className="container mx-auto md:py-16 py-6 md:px-24 px-4">
                <div className="flex items-center flex-col md:flex-row ">
                    <div className="image md:w-1/2 w-full md:mr-9 mb-4 md:mb-0 ">
                        <img src="/images/about/image13.png" alt="" className="rounded-3xl" />
                    </div>
                    <div className="text md:w-1/2 w-full md:ml-9">
                        <h3 className="text-green-400 font-bold md:text-5xl md:mb-6 mb-3 text-xl"> {t('mission_title')}</h3>
                        <p className="text-gray-50 font-semibold md:leading-9 md:text-2xl text-sm">{t('mission_content')}</p>
                        <ToggleSection />
                    </div>

                </div>
                <div className="flex items-center flex-col-reverse md:flex-row  md:mt-40 mt-6">
                    <div className="text md:w-1/2 w-full md:mr-9 ">
                        <h3 className="text-green-400 font-bold md:text-5xl md:mb-6 mb-3 text-xl">{t('now')} </h3>
                        <TextEllipsis
                            lineClampNumber={5}
                            textAlign="text-start"
                            content={t('now_content')}
                        />
                    </div>
                    <div className="image md:w-1/2 w-full md:ml-9 mb-4 md:mb-0 ">
                        <img src="/images/about/image14.png" alt="" className="rounded-3xl" />
                    </div>
                </div>
            </div>
        </section>
    )
}
