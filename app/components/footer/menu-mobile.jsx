import { Link } from "@remix-run/react";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// const menuDetails = {
//     menu: [
//         {
//             title: 'أقسام المنتجات',
//             title_en: 'Categories',
//             pages: [
//                 {
//                     name: 'العروض و الخصومات',
//                     name_en: 'Sales',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'المكسرات',
//                     name_en: 'Nuts',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' الوجبات صحية',
//                     name_en: 'Healthy Meals',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' التمور والفواكه المجففة',
//                     name_en: 'Dates and dried fruits',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' المشروبات',
//                     name_en: 'Drinks',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' البهارات والزيوت',
//                     name_en: 'Spices and oils',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//             ],

//         },
//         {
//             title: 'عن الشركة ',
//             title_en: 'Categories',
//             pages: [
//                 {
//                     name: ' قصتنا',
//                     name_en: 'our Story',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'فروعنا',
//                     name_en: 'Our Brnaches',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' وصفاتنا',
//                     name_en: 'Our Recipes',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'العروض و الخصومات',
//                     name_en: 'Sales',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'التصدير ',
//                     name_en: 'Exporting',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'الموزعين في مصر ',
//                     name_en: 'Vendors in Egypt',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' شركاء النجاح ',
//                     name_en: 'Partners',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: '  فرص وظائف ',
//                     name_en: 'Jobs',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' إبداء الرأي ',
//                     name_en: 'Feedback',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//             ],

//         },
//         {
//             title: ' المساعدة',
//             title_en: 'Help',
//             pages: [
//                 {
//                     name: 'الاسئلة الشائعة ',
//                     name_en: 'Faqs',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' تعليقات العملاء',
//                     name_en: 'Reviews',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: ' التوصيل أو الاستلام ',
//                     name_en: 'Delivery or pick up',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'تطبيق الجوال',
//                     name_en: 'Mobile App',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'الشروط والاحكام',
//                     name_en: 'Terms and Conditions',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'سياسة الخصوصية',
//                     name_en: 'Privacy policy',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//                 {
//                     name: 'سياسة الاسترجاع',
//                     name_en: 'Return policy',
//                     // url: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//                 },
//             ],

//         },
//     ],
// }
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function MenuMobile({ menuDetails }) {
  const { t, i18n } = useTranslation();
  console.log("menuDetails MOB", menuDetails);
  return (
    <div className="block w-full mb-5 md:hidden">
      <dl className="mt-6 space-y-6 divide-y divide-green-700">
        {menuDetails.menu.map((menu, index) => (
          <Disclosure as="div" className="pt-6" key={index}>
            {({ open }) => (
              <>
                <dt className="text-lg">
                  <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                    <span className="text-base font-bold text-white">
                      {" "}
                      {i18n.language === "ar" ? menu.title : menu.title_en}
                    </span>
                    <span className="flex items-center ml-6 h-7">
                      <ChevronDownIcon
                        className={classNames(
                          open ? "-rotate-180 text-white" : "rotate-0",
                          "h-6 w-6 transform text-white"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="pr-12 mt-2">
                  <ul>
                    {menu.pages.map((page, index) => (
                      <li
                        className="text-white md:text-xl md:mb-2 hover:text-gray-100"
                        key={index}
                      >
                        <Link className="" to={page.url}>
                          {" "}
                          {i18n.language === "ar" ? page.name : page.name_en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}
