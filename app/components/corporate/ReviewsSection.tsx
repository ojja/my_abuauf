import { useTranslation } from 'react-i18next';
import Breadcrumbs from "~/components/Breadcrumbs";
import ReviewWidget from '~/components/corporate/ReviewWidget';


const data = {
    description_ar: "لوريم ايبسوم لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات .",
    description: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
}
const privacy_policy = [
    {
        title: "سياسة الخصوصية",
        description: 'تصف سياسة الخصوصية هذه ("السياسة") كيف يقوم أبو عوف ("أبو عوف" أو "نحن" أو "لدينا") بجمع وحماية واستخدام معلومات التعريف الشخصية ("المعلومات الشخصية") أنت ("المستخدم" ، "أنت" أو "الخاص بك") على موقع abuauf.com وأي من منتجاته أو خدماته (يُشار إليها إجمالاً بـ "الموقع" أو "الخدمات"). كما يصف الخيارات المتاحة لك فيما يتعلق باستخدامنا لمعلوماتك الشخصية وكيف يمكنك الوصول إلى هذه المعلومات وتحديثها. لا تنطبق هذه السياسة على ممارسات الشركات التي لا نملكها أو نتحكم فيها ، أو على الأفراد الذين لا نوظفهم أو نديرهم.',
    },
    {
        title: "الجمع التلقائي للمعلومات",
        description: 'عندما تزور موقع الويب ، تقوم خوادمنا تلقائيًا بتسجيل المعلومات التي يرسلها متصفحك. قد تتضمن هذه البيانات معلومات مثل عنوان IP الخاص بجهازك ، ونوع المتصفح وإصداره ، ونوع نظام التشغيل وإصداره ، وتفضيلات اللغة أو صفحة الويب التي كنت تزورها قبل وصولك إلى موقعنا الإلكتروني ، وصفحات موقعنا الإلكتروني التي تزورها ، والوقت الذي تقضيه في تلك الصفحات والمعلومات التي تبحث عنها على موقعنا الإلكتروني وأوقات الوصول والتواريخ وإحصائيات أخرى.',
    }
];
export default function ReviewsSection() {
    const { t, i18n } = useTranslation();
    const breadcrumbs = {
        pages: [
            { name: t('home.name'), href: '/' },
            { name: t('corporate.reviews'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('corporate.reviews')}</h1>
                    <p className="max-w-2xl mt-4 text-sm font-semibold text-gray-50 md:text-base">{i18n.language === "ar" ? (data.description_ar || data.description) : data.description}</p>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="container px-4 mx-auto details md:px-24">
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 gap-24">
                            <ReviewWidget />
                            <ReviewWidget />
                            <ReviewWidget />
                            <ReviewWidget />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
