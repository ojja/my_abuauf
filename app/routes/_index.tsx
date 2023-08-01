import HeroSection from '~/components/HeroSection';
import AboutSection from '~/components/AboutSection';
import HeroTitle from '~/components/HeroTitle';
import Testimonials from '~/components/Testimonials';
import BlogList from '~/components/BlogList';
import { MetaFunction } from "@remix-run/node";
import { Site_Title } from '~/credentials';
import ExtraProducts from '~/components/ExtraProducts';
import { Tab } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import Reviews from '~/components/Reviews';
import BlogWidget from '~/components/corporate/BlogWidget';
import RecipesSection from '~/components/corporate/RecipesSection';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function Index() {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden">
      <HeroSection />

      <div className="bg-white">
        <div className="container mx-auto py-20">
          <h2 className="text-4xl font-bold py-7 px-10 text-center md:text-left">{t('shop_our_products')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            <Link to={`/category/coffee`} className="flex flex-col justify-center items-center">
              <img src="/images/cats/item_01.webp" alt="img alt" />
              <h4 className="text-3xl font-bold -mt-9">{t('coffee')}</h4>
              <p className="text-xl font-semibold">{t('shop_our_products_subtitle')}</p>
            </Link>
            <Link to={`/category/coffee`} className="flex flex-col justify-center items-center">
              <img src="/images/cats/item_02.webp" alt="img alt" />
              <h4 className="text-3xl font-bold -mt-9">{t('coffee')}</h4>
              <p className="text-xl font-semibold">{t('shop_our_products_subtitle')}</p>
            </Link>
            <Link to={`/category/coffee`} className="flex flex-col justify-center items-center">
              <img src="/images/cats/item_03.webp" alt="img alt" />
              <h4 className="text-3xl font-bold -mt-9">{t('coffee')}</h4>
              <p className="text-xl font-semibold">{t('shop_our_products_subtitle')}</p>
            </Link>
            <Link to={`/category/coffee`} className="flex flex-col justify-center items-center">
              <img src="/images/cats/item_04.webp" alt="img alt" />
              <h4 className="text-3xl font-bold -mt-9">{t('coffee')}</h4>
              <p className="text-xl font-semibold">{t('shop_our_products_subtitle')}</p>
            </Link>
            <Link to={`/category/coffee`} className="flex flex-col justify-center items-center">
              <img src="/images/cats/item_05.webp" alt="img alt" />
              <h4 className="text-3xl font-bold -mt-9">{t('coffee')}</h4>
              <p className="text-xl font-semibold">{t('shop_our_products_subtitle')}</p>
            </Link>
            <Link to={`/category/coffee`} className="flex flex-col justify-center items-center">
              <img src="/images/cats/item_06.webp" alt="img alt" />
              <h4 className="text-3xl font-bold -mt-9">{t('coffee')}</h4>
              <p className="text-xl font-semibold">{t('shop_our_products_subtitle')}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-20 bg-white ">
        <div className="container mx-auto">
          <Tab.Group as="div" className="flex flex-col" defaultIndex={0}>
            <Tab.List className="flex flex-wrap -mb-px gap-2 border-b border-gray-200 justify-center">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'p-4 py-2.5 text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-4  transition-colors duration-300 hoverFromCenter2',
                    selected
                      ? 'border-[#DCC498]'
                      : ' border-transparent'
                  )
                }
              >{t('best_selling')}</Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'p-4 py-2.5 text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-4  transition-colors duration-300 hoverFromCenter2',
                    selected
                      ? 'border-[#DCC498]'
                      : ' border-transparent'
                  )
                }
              >{t('new_arrivals')}</Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'p-4 py-2.5 text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-4  transition-colors duration-300 hoverFromCenter2',
                    selected
                      ? 'border-[#DCC498]'
                      : ' border-transparent'
                  )
                }
              >{t('we_chose_you')}</Tab>

            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ExtraProducts categorySlug='nuts' count={20} arrangement="ASC" />
              </Tab.Panel>
              <Tab.Panel>
                <ExtraProducts count={20} />
              </Tab.Panel>
              <Tab.Panel>
                <ExtraProducts count={20} />
              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>


      <div className="py-10 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-12 grid-cols-1">
              <div className="grid grid-cols-2 lg:col-span-4">
                <img src="/images/gift/gift_05.webp" alt="img alt" className="w-full h-full object-cover" />
                <img src="/images/gift/gift_02.webp" alt="img alt" className="w-full h-full object-cover" />
                <img src="/images/gift/gift_03.webp" alt="img alt" className="w-full h-full object-cover" />
                <img src="/images/gift/gift_01.webp" alt="img alt" className="w-full h-full object-cover" />
              </div>

              <div className="grid lg:grid-cols-12 grid-cols-1 row-start-1 lg:row-start-auto lg:col-span-8">
                <div className="col-span-5">
                  <img src="/images/gift/gift_04.webp" alt="img alt" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center bg-green-950 p-12 flex-col gap-4 h-full items-start col-span-7">
                  <h5 className="text-yellow-910 text-xl font-semibold">خصم يصل إلى 20٪ على قسم</h5>
                  <h2 className="text-white text-8xl font-bold">الهدايا </h2>
                  <p className="text-[#3C926F] md:text-xl font-semibold">اعثر على الهدية المثالية لكل شخص وكل مناسبة</p>
                  <Link to="/products" className="inline-flex justify-center px-10 py-3 text-xl font-semibold text-green-200 capitalize rounded-100 bg-white">{t('shop_now')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-green-300">
        <div className="container mx-auto">
          <Reviews inHome={true} />
        </div>
      </div>


      <div className="flex flex-col mb-6 md:mb-16 md:flex-row bg-green-950 py-16 px-4 md:px-0">
        <div className="w-full md:w-1/2">
          <img src="/images/store.webp" alt="image alt" className="rounded-3xl m-auto" />
        </div>
        <div className="flex flex-col justify-center w-full px-4 py-6 md:w-1/2 md:p-12 max-w-3xl">
          <div className="flex flex-col justify-center w-full">
            <span className="font-semibold text-gray-50 md:text-xl">عن أبو عوف</span>
            <h2 className="py-3 text-xl text-white md:py-6 md:text-5xl">نحن نغير مفهوم الأكل الصحي في جميع أنحاء العالم</h2>
            <p className=" text-[#3C926F] md:text-xl font-semibold">
              تأسست شركة أبو عوف في عام 2010 وأصبحت من أشهر الأسماء في الأسواق لتقديم منتجات القهوة الطبيعية عالية الجودة والمكسرات وزبد المكسرات والأطعمة الصحية والفاكهة المجففة.. وأكثر فلكل مُنتَج حكايته الخاصة؛ وبسبب اهتمامنا المستمر بالتفاصيل، فإن كل خطوة في عملية الإنتاج في أبو عوف تُدار بعناية لضمان إنتاج منتجات عالية الجودة يتم توصيلها بحب وملئها بالمكونات المغذية من الطبيعة الأم نعطي الأولوية لابتكار المنتجات ونأخذ في الاعتبار اتجاهات السوق ورغبات العملاء وتغيُّر الأذواق، كما نشجع دائمًا نمط الحياة الصحي؛ لأن هدفنا ليس فقط تغذية الجسم، بل تغذية العقل والروح أيضًا، وذلك من خلال مجموعة متنوعة من الأعشاب والمنتجات العضوية المختلفة. نأمل في حكي قصة التغيير الذي يمكنك إحداثه في العالم عندما تقوم بتغيير عادات الأكل الخاصة بك إلى عادات صحية وممتعة ولذيذة.
            </p>
          </div>
        </div>
      </div>


      <section className="w-full pb-8 md:pb-24">
        <div className="pt-4 pb-5 md:pb-16">
          <div className="container px-4 mx-auto">
            <h2 className="pt-2 text-2xl font-bold text-green-950 md:text-4xl md:pt-7">{t('latest_news')}</h2>
          </div>
        </div>
        <div className="w-full bg-white ">
          <div className="flex flex-col">
            <div className='container px-4 mx-auto'>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 bg-white">
        <div className="container mx-auto">
          <RecipesSection inHome={true} />
        </div>
      </div>


      <div className="bg-green-300">
        <div className="container mx-auto py-14 px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl shadow-custom">
              <div className="flex flex-col justify-center text-center items-center h-full gap-4 p-16">
                <img src="/images/export_around.webp" alt="export_around alt" className="-mb-16" />
                <h3 className="text-3xl text-green-200 font-bold">منتجات أبو عوف خارج مصر</h3>
                <p className="text-xl text-green-200 font-semibold max-w-xs px-4">ما بين أسواق أوروبا، آسيا، أمريكا و الوطن العربي</p>
                <Link to="/export" className="inline-flex justify-center px-10 py-3 text-xl mt-8 font-semibold text-white capitalize rounded-100 bg-green-200 hover:bg-green-400">{t('know_more')}</Link>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-custom">
              <div className="flex flex-col justify-center text-center items-center h-full gap-4 p-16">
                <img src="/images/pick-up.webp" alt="pick-up alt" />
                <h3 className="text-3xl text-green-200 font-bold">{t('abuauf_branches')}</h3>
                <p className="text-xl text-green-200 font-semibold max-w-xs px-4">يوجد أكثر من 150 فرع أبو عوف في مصر, أكتشف الأقرب اليك</p>
                <Link to="/branches" className="inline-flex justify-center px-10 py-3 text-xl mt-8 font-semibold text-white capitalize rounded-100 bg-green-200 hover:bg-green-400">{t('abuauf_branches')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const meta: MetaFunction = () => {
  return {
    title: `HomePage - ${Site_Title}`
  }
}