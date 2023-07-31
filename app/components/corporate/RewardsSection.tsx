import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import AccountNav from '../account/AccountNav';
import Breadcrumbs from "../Breadcrumbs";


export default function RewardsSection() {
    const { t } = useTranslation();

    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: t('reward'), href: '#' },
        ]
    }

    return (

        <section className="w-full ">
            <div className="pt-4 pb-12 bg-green-300 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 " />
                </div>
                <div className="flex flex-col mb-6 md:mb-16 md:flex-row bg-green-500">
                    <div className="w-full md:w-1/2 py-16">
                        <img src="/images/reward.webp" alt="image alt" className="object-cover m-auto rounded-3xl" />
                    </div>
                    <div className="flex flex-col justify-center w-full px-4 py-6 md:w-1/2 md:p-12">
                        <div className="flex flex-col justify-center w-full">
                            <span className="font-semibold text-gray-50 md:text-xl">{t('reward')}</span>
                            <h1 className="py-3 text-white md:py-6 md:text-5xl">كل ما تشتري أكثر من أبوعوف هتكسب نقط و فلوس</h1>
                            <p className=" text-[#3C926F] md:text-xl font-semibold">تأسست شركة أبو عوف في عام 2010 وأصبحت من أشهر الأسماء في الأسواق لتقديم منتجات القهوة الطبيعية عالية الجودة والمكسرات وزبد المكسرات والأطعمة الصحية والفاكهة المجففة.. وأكثر فلكل مُنتَج حكايته الخاصة؛ وبسبب اهتمامنا المستمر بالتفاصيل، فإن كل خطوة في عملية الإنتاج في أبو عوف تُدار بعناية لضمان إنتاج منتجات عالية الجودة يتم توصيلها بحب وملئها بالمكونات المغذية من الطبيعة الأم نعطي الأولوية لابتكار المنتجات ونأخذ في الاعتبار اتجاهات السوق ورغبات العملاء وتغيُّر الأذواق، كما نشجع دائمًا نمط الحياة الصحي؛ لأن هدفنا ليس فقط تغذية الجسم، بل تغذية العقل والروح أيضًا، وذلك من خلال مجموعة متنوعة من الأعشاب والمنتجات العضوية المختلفة. نأمل في حكي قصة التغيير الذي يمكنك إحداثه في العالم عندما تقوم بتغيير عادات الأكل الخاصة بك إلى عادات صحية وممتعة ولذيذة.</p>
                        </div>
                    </div>
                </div>
                <div className="container px-4 mx-auto md:px-6">
                    <div className="flex items-center flex-wrap xl:flex-nowrap gap-20">
                        <div className="flex-col gap-6 inline-flex w-full xl:w-1/2">
                            <h2 className=" text-black text-5xl font-bold leading-[4rem]">لوريم سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود </h2>
                            <p className="text-gray-50 text-xl font-semibold">تأسست شركة أبو عوف في عام 2010 وأصبحت من أشهر الأسماء في الأسواق لتقديم منتجات القهوة الطبيعية عالية الجودة والمكسرات وزبد المكسرات والأطعمة الصحية والفاكهة المجففة.. وأكثر فلكل مُنتَج حكايته الخاصة؛ وبسبب اهتمامنا المستمر بالتفاصيل، فإن كل خطوة في عملية الإنتاج في أبو عوف تُدار بعناية لضمان إنتاج منتجات عالية الجودة يتم توصيلها بحب وملئها بالمكونات المغذية من الطبيعة الأم نعطي الأولوية لابتكار المنتجات ونأخذ في الاعتبار اتجاهات السوق ورغبات العملاء وتغيُّر الأذواق، كما نشجع دائمًا نمط الحياة الصحي؛ لأن هدفنا ليس فقط تغذية الجسم، بل تغذية العقل والروح أيضًا، وذلك من خلال مجموعة متنوعة من الأعشاب والمنتجات العضوية المختلفة. نأمل في حكي قصة التغيير الذي يمكنك إحداثه في العالم عندما تقوم بتغيير عادات الأكل الخاصة بك إلى عادات صحية وممتعة ولذيذة.</p>
                            <Link className=" bg-green-200 text-xl text-white py-5 px-10 rounded-100 block w-fit cursor-pointer hover:bg-green-400 " to="/sign-up">
                                {t('create_account')}
                            </Link>
                        </div>
                        <div className="inline-flex w-full xl:w-1/2">
                            <div className="w-full flex flex-row-reverse items-start justify-center custom-negative-margin pointer-events-none">
                                <div className="first">
                                    <AccountNav customCall membershipClass="platinum" />
                                </div>
                                <div className="second">
                                    <AccountNav customCall membershipClass="gold" />
                                </div>
                                <div className="third">
                                    <AccountNav customCall membershipClass="silver" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
