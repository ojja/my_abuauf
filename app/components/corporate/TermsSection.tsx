import { useTranslation } from 'react-i18next';
import Breadcrumbs from "~/components/Breadcrumbs";


interface TabsProps {
    product: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
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
export default function TermsSection() {
    const { t } = useTranslation();
    const breadcrumbs = {
        pages: [
            { name: t('home.name'), href: '/' },
            { name: t('corporate.privacy_policy'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('corporate.privacy_policy')}</h1>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="flex flex-col">
                    <div className='container px-4 mx-auto md:px-24'>
                        <ul>
                            {privacy_policy.map((item, index) => (
                                <li className="mb-10 " key={index}>
                                    <h4 className="pb-2 text-base font-bold md:text-2xl md:pb-6">{item.title} </h4>
                                    <p className="text-sm font-semibold text-gray-50 md:text-xl">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
