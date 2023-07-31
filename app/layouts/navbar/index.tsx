import React, { Fragment, useEffect, useState } from 'react';

import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useShoppingCart } from '~/stores/cartStore';
import ShoppingCart from '~/components/ShoppingCart';
import { Link, useLocation } from '@remix-run/react';
import { v4 } from 'uuid';
import SelectDelivery from '~/components/SelectDelivery';
import Search from '~/components/Search';
import ChangeLanguage from '~/components/ChangeLanguage';
import { useTranslation } from 'react-i18next';
import NoInternetConnection from '~/components/NoInternetConnection';
import StickyDiv from '~/components/StickyDiv';
import Cookies from "js-cookie";
import CurrencySwitcher from '~/components/CurrencySwitcher';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { fetchNav } from '~/utils/general';
import MegaMenu from '~/components/MegaMenu';
import MyAccountToggle from '~/components/account/MyAccountToggle';
import MobileMenu from '~/components/MobileMenu';


const navigation = {
  categories: [
    {
      id: 'Clothing',
      name: 'Category 1',
      slug: 'juices',
      featured: [
        {
          name: 'Category 1 > 2',
          href: 'pants',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Category 3 > 2',
          href: 'polo',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        }
      ],

      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Category 2', href: 'food' },
            { name: 'Category 3', href: 'coffee' },
            { name: 'Category 4', href: 'espresso' },
            { name: 'Category Trousers', href: 'trousers' },
            // { name: 'Shirts', href: 'shirts' },
            // { name: 'Tees', href: 'tees' },
            // { name: 'Jackets', href: 'jackets' },
            // { name: 'Browse All', href: 'clothing' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories X',
          items: [
            { name: 'Watches X', href: 'top' },
            { name: 'Fitness Equipment X', href: 'vest' },
            { name: 'Bags X', href: 'bags' },
            { name: 'Erin Recommends X', href: 'shoes' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands X',
          items: [
            { name: 'Full Nelson X', href: '#' },
            { name: 'My Way X', href: '#' },
            { name: 'Re-Arranged X', href: '#' },
            { name: 'Counterfeit X', href: '#' },
            { name: 'Significant Other X', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'قصتنا', href: 'about' },
    { name: 'البلوج', href: 'blog' },
    { name: 'الاسئلة الشائعة', href: 'faqs' },
    { name: 'منتجات أبو عوف خارج مصر', href: 'export' },
    { name: 'الفروع', href: 'branches' },



  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function NavBar({ }) {
  const [loading, setLoading] = useState(true);
  const { cartQuantityTotal, openCart } = useShoppingCart();

  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout-step1" || location.pathname === "/checkout-step2" || location.pathname === "/checkout";
  const user_id = Cookies.get('user_id');


  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [nav, setNav] = useState([]);
  const [navSuppoting, setNavSupporting] = useState([]);
  const [mainMenu, setMainMenu] = useState([]);
  useEffect(() => {
    console.log('animate')
    setIsAnimating(true);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 820); // Duration of the shake animation in milliseconds

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [cartQuantityTotal]); // Run the effect whenever cartQuantityTotal changes


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchNav();
      if (response) {
        setNav(response);
        setNavSupporting(response.supporting_menu);
        setMainMenu(response.main_menu);
        setLoading(false);
      } else {
        // Handle the case when fetching the cities fails
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="bg-white">
        <NoInternetConnection />
        <div>
          {isCheckoutPage ? null : typeof window !== 'undefined' && <ShoppingCart />}
        </div>

        <header className="relative z-20 bg-white">

          {/* Topbar */}
          {isCheckoutPage ? null : (
            <div className="px-4 bg-primary-100">
              <div className="container mx-auto">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto gap-6">


                  {/* Change Currncy */}
                  <div className="hidden lg:flex">
                    <CurrencySwitcher />
                  </div>

                  <nav className="text-sm text-slate-100 gap-5 hidden xl:flex">
                    {loading ?
                      <>
                        <div className="animate-pulse">
                          <div className="w-24 h-3 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="animate-pulse">
                          <div className="w-24 h-3 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="animate-pulse">
                          <div className="w-24 h-3 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="animate-pulse">
                          <div className="w-24 h-3 bg-slate-100 rounded-full"></div>
                        </div>
                      </>
                      :
                      navSuppoting.map((item, index) => (
                        <Link to={`/${item.page_link}`} className={`block mt-4 lg:inline-block lg:mt-0 font-semibold ${location.pathname === `/${item.page_link}` ? 'underline' : 'hover:underline'}`} key={index}>
                          {i18n.language === 'ar' ? item.page_title_ar : item.page_title}
                        </Link>
                      ))}
                  </nav>

                  <div className="items-center gap-x-2 m-auto hidden lg:flex">
                    <img src="/images/footer/visa.png" alt="" className=" w-fit h-6" />
                    <img src="/images/footer/master.png" alt="" className=" w-fit h-6" />
                  </div>
                  <div className="ml-auto">
                    {loading ?
                      <>
                        <div className="animate-pulse py-2 text-center">
                          <div className="w-48 h-4 bg-black m-auto rounded-full"></div>
                        </div>
                      </>
                      :
                      <p className="text-brown-500 text-xs md:text-base font-bold text-center py-2">{nav?.promotion_content!}</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* //Topbar */}


          <div className=" bg-green-900 px-4">
            <nav aria-label="Top" className="max-w-screen-2xl mx-auto">
              <div className="border-b border-green-100">
                <div className="flex items-center gap-6 py-5 justify-between">
                  <div className="lg:hidden">
                    <MobileMenu navSuppoting/>
                  </div>

                  {/* Logo */}
                  <div className="flex ml-4 lg:ml-0 items-center gap-x-2">
                    <Link to="/">
                      <img src="/logo.webp" alt="Logo" width={180} height={60} />
                    </Link>
                  </div>
                  <div className="hidden lg:block">
                    <MegaMenu />
                  </div>
                  <div className="hidden lg:block">
                    {isCheckoutPage ? null : (
                      <SelectDelivery />
                    )}
                  </div>

                  <div className="flex items-center lg:ml-auto">
                    <div className="hidden lg:block">
                      <MyAccountToggle />
                    </div>

                    {/* Search */}
                    {isCheckoutPage ? null : (
                      <div className="flex lg:ml-6">
                        <Search />
                      </div>
                    )}

                    {/* Cart */}
                    <div className="w-16">
                      {isCheckoutPage ? (
                        <Link to="/cart" className="flex items-center p-2 -m-2 group">
                          <svg className=' w-6 h-6' viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M34.3785 4.22593L27.0655 10.6906H35V16.223C35 18.0585 33.9168 19.6344 32.3551 20.2746L31.3405 30.0934C31.1125 32.3194 29.3254 34 27.184 34H8.78243C6.6411 34 4.85839 32.3194 4.63031 30.0934L3.62809 20.2737C2.06643 19.6335 1 18.0585 1 16.223V10.6906H19.295C18.0966 11.7051 17.8474 11.9346 17.4614 12.2902C17.1822 12.5474 16.8314 12.8705 15.9981 13.6043H3.78689V16.223C3.78689 16.9705 4.32102 17.5882 5.0411 17.6592L6.16594 17.7715L7.39663 29.7827C7.47282 30.5248 8.06882 31.0863 8.78243 31.0863H27.1841C27.8977 31.0863 28.4957 30.5248 28.5719 29.7827L29.8047 17.7706L30.9421 17.6588C31.6623 17.5876 32.2131 16.9705 32.2131 16.223V13.6043H23.7689C22.7128 14.5375 21.8758 15.2832 21.207 15.8789L21.2066 15.8793C18.9571 17.8833 18.6112 18.1914 18.2327 18.2388C18.164 18.2474 18.0941 18.2474 18.0116 18.2473H18.0034C17.0792 18.2473 16.4064 17.3212 16.6651 16.3837L16.668 16.3732L16.668 16.3732C16.6863 16.3068 16.7019 16.2501 16.7226 16.1953C16.8435 15.8746 17.1358 15.6186 19.1382 13.8649L19.1382 13.8649L19.1385 13.8647C19.8498 13.2418 20.7768 12.4299 21.9886 11.359L21.9885 11.3591L24.512 9.12899C25.927 7.87856 27.8359 6.19179 32.5789 2L34.3785 4.22593ZM16.6065 20.597H19.3934V28.7553H16.6065V20.597ZM22.1803 20.597V28.7553H24.9672V20.597H22.1803ZM13.8197 20.597V28.7553H11.0328V20.597H13.8197Z" fill="#163300" />
                          </svg>
                          <span className="ml-2 text-sm font-medium text-black bg-white  group-hover:text-gray-800 absolute rounded-full w-5 h-5 -top-1">{cartQuantityTotal}</span>
                        </Link>

                      ) : (

                        <StickyDiv>
                          <button
                            className={` flex items-center justify-center ml-4 lg:ml-6 bg-yellow-400 rounded-full relative w-10 h-10 ${isAnimating ? 'shake-animation' : ''}`} style={{ boxShadow: '0px 5px 10px rgba(135, 109, 14, 0.3)' }}
                            onClick={openCart}
                          >
                            <svg className=' w-6 h-6' viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M34.3785 4.22593L27.0655 10.6906H35V16.223C35 18.0585 33.9168 19.6344 32.3551 20.2746L31.3405 30.0934C31.1125 32.3194 29.3254 34 27.184 34H8.78243C6.6411 34 4.85839 32.3194 4.63031 30.0934L3.62809 20.2737C2.06643 19.6335 1 18.0585 1 16.223V10.6906H19.295C18.0966 11.7051 17.8474 11.9346 17.4614 12.2902C17.1822 12.5474 16.8314 12.8705 15.9981 13.6043H3.78689V16.223C3.78689 16.9705 4.32102 17.5882 5.0411 17.6592L6.16594 17.7715L7.39663 29.7827C7.47282 30.5248 8.06882 31.0863 8.78243 31.0863H27.1841C27.8977 31.0863 28.4957 30.5248 28.5719 29.7827L29.8047 17.7706L30.9421 17.6588C31.6623 17.5876 32.2131 16.9705 32.2131 16.223V13.6043H23.7689C22.7128 14.5375 21.8758 15.2832 21.207 15.8789L21.2066 15.8793C18.9571 17.8833 18.6112 18.1914 18.2327 18.2388C18.164 18.2474 18.0941 18.2474 18.0116 18.2473H18.0034C17.0792 18.2473 16.4064 17.3212 16.6651 16.3837L16.668 16.3732L16.668 16.3732C16.6863 16.3068 16.7019 16.2501 16.7226 16.1953C16.8435 15.8746 17.1358 15.6186 19.1382 13.8649L19.1382 13.8649L19.1385 13.8647C19.8498 13.2418 20.7768 12.4299 21.9886 11.359L21.9885 11.3591L24.512 9.12899C25.927 7.87856 27.8359 6.19179 32.5789 2L34.3785 4.22593ZM16.6065 20.597H19.3934V28.7553H16.6065V20.597ZM22.1803 20.597V28.7553H24.9672V20.597H22.1803ZM13.8197 20.597V28.7553H11.0328V20.597H13.8197Z" fill="#163300" />
                            </svg>
                            <span className="text-sm font-medium text-black bg-white  group-hover:text-gray-800 absolute rounded-full w-5 h-5 -top-1 rtl:-right-2 ltr:-left-2">{cartQuantityTotal}</span>
                            <span className="sr-only">items in cart, view bag</span>
                          </button>
                        </StickyDiv>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <nav aria-label="Bottom" className="container mx-auto text-xl text-white gap-5 hidden lg:flex">

              {loading ?
                <>
                  <div className="animate-pulse py-4">
                    <div className="w-24 h-7 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="animate-pulse py-4">
                    <div className="w-36 h-7 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="animate-pulse py-4">
                    <div className="w-24 h-7 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="animate-pulse py-4">
                    <div className="w-24 h-7 bg-gray-200 rounded-full"></div>
                  </div>
                </>
                :
                mainMenu.map((item, index) => (
                  <Link
                    to={item.type === "page" ? `/${item.page_link}` : `/category/${item.link_to_category.slug}`}
                    className="inline-flex mt-4 lg:inline-flex lg:mt-0 font-semibold gap-2 hoverFromCenter py-4"
                    key={index}
                  >
                    {item.small_extra_label === 'sale' &&
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.9798 2.22C14.8863 1.12654 13.1135 1.12654 12.02 2.22L11.2707 2.96933C10.483 3.75698 9.41474 4.19948 8.30083 4.19948H6.9999C5.4535 4.19948 4.1999 5.45308 4.1999 6.99948V8.30041C4.1999 9.41432 3.7574 10.4826 2.96975 11.2703L2.22 12.02C1.12653 13.1135 1.12654 14.8863 2.22 15.9798L2.96975 16.7295C3.7574 17.5172 4.1999 18.5855 4.1999 19.6994V20.9995C4.1999 22.5459 5.4535 23.7995 6.9999 23.7995H8.29999C9.4139 23.7995 10.4822 24.242 11.2698 25.0296L12.02 25.7798C13.1135 26.8733 14.8863 26.8733 15.9798 25.7798L16.73 25.0296C17.5176 24.242 18.5859 23.7995 19.6998 23.7995H20.9999C22.5463 23.7995 23.7999 22.5459 23.7999 20.9995V19.6994C23.7999 18.5855 24.2424 17.5172 25.0301 16.7295L25.7798 15.9798C26.8733 14.8863 26.8733 13.1135 25.7798 12.02L25.0301 11.2703C24.2424 10.4826 23.7999 9.41432 23.7999 8.30041V6.99948C23.7999 5.45308 22.5463 4.19948 20.9999 4.19948H19.699C18.5851 4.19948 17.5168 3.75698 16.7291 2.96933L15.9798 2.22ZM17.9648 10.5765C18.3937 9.93314 18.2198 9.06393 17.5765 8.63503C16.9331 8.20614 16.0639 8.37998 15.635 9.02332L10.035 17.4233C9.60614 18.0667 9.77998 18.9359 10.4233 19.3648C11.0667 19.7937 11.9359 19.6198 12.3648 18.9765L17.9648 10.5765ZM9.0999 12.5999C10.2597 12.5999 11.1999 11.6597 11.1999 10.4999C11.1999 9.3401 10.2597 8.3999 9.0999 8.3999C7.9401 8.3999 6.9999 9.3401 6.9999 10.4999C6.9999 11.6597 7.9401 12.5999 9.0999 12.5999ZM20.9999 17.4999C20.9999 18.6597 20.0597 19.5999 18.8999 19.5999C17.7401 19.5999 16.7999 18.6597 16.7999 17.4999C16.7999 16.3401 17.7401 15.3999 18.8999 15.3999C20.0597 15.3999 20.9999 16.3401 20.9999 17.4999Z"
                          fill={item.label_color} />
                      </svg>
                    }
                    {item.type === "page" ? `${i18n.language === 'ar' ? item.page_title_ar : item.page_title}` : `${item.link_to_category.name}`}
                  </Link>
                ))}
            </nav>
          </div>

        </header>
      </div>
    </>
  )
}
