import { json, MetaFunction } from "@remix-run/cloudflare"
// import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategoryProducts, getFilterProducts } from "~/models/category.server";
import React, { useEffect, useState } from "react";
import { v4 } from 'uuid';
import Breadcrumbs from "~/components/Breadcrumbs";
// import ProductWidget from "~/components/product/ProductWidget";
import { Site_Title } from "~/credentials";
import { API_ENDPOINT } from "~/config";
import { useTranslation } from "react-i18next";
import ShopListTop from "~/components/ShopListTop";
import Filters from "~/components/Filters";
import Sort from "~/components/Sort";
import Loader from "~/components/Loader";
import { getCategoryInfo } from "~/api/products";
import CategoryFilter from "~/components/CategoryFilter";
import ProductWidget from "~/components/product/ProductWidget";



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const meta: MetaFunction = ({ params }: any) => {
  return {
    title: `Category Page | ${params.category} - ${Site_Title}`
  }
}


export const loader = async ({ params }: any) => {
  const categorySlug = params.category;
  const pageNumber = 1;
  const perPage = 20;
  let products = [];

  try {
    products = await getCategoryProducts(categorySlug, pageNumber, perPage);
    console.log('products', products)
  } catch (e) {
    console.log('error', e);
  }

  return json({
    products,
    categorySlug,
  });
};

export default function CategorySlug() {
  const { products: initialProducts, categorySlug } = useLoaderData();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [grid, setGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(true);
  const [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(true);

  const [products, setProducts] = useState(initialProducts);
  const [pageNumber, setPageNumber] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  let [catInfo, setcatInfo] = useState('');
  let [selectedCategories, setSelectedCategories] = useState([categorySlug]);
  const [selectedSortOption, setSelectedSortOption] = useState({
    criteria: "date",
    arrangement: "DESC",
  });


  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingCat(true);
      try {
        const items = await getCategoryInfo(categorySlug);
        setcatInfo(items);
      } catch (error) {
        console.error('Error fetching extra products:', error);
      } finally {
        setIsLoadingCat(false);
      }
    };

    fetchData();
  }, []);

  const handleSortOptionChange = (option: any) => {
    setSelectedSortOption(option);
    setIsLoading(true);
    setPageNumber(1);
    setIsLoadMoreEnabled(true);
    setTimeout(() => {
      console.log('after set', pageNumber)
      fetchProducts(false, selectedCategories, option, 1);
    }, 500);
  };
  useEffect(() => {
    setProducts(initialProducts);
    setIsLoading(false);
    setIsLoadMoreEnabled(true);
    setPageNumber(1);
    setSelectedCategories([categorySlug]);
  }, [initialProducts]);

  const fetchProducts = async (appendData = false, selectedCategories: any, selectedSortOption: any) => {
    const { criteria, arrangement } = selectedSortOption;
    setIsLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategories,
          price_range: [minPrice, maxPrice],
          products_per_page: 20,
          page: pageNumber,
          sort: {
            criteria,
            arrangement,
          },
        }),
      };

      const response = await fetch(
        `${API_ENDPOINT}/filter.php`,
        options
      );
      const newData = await response.json();

      setProducts((prevProducts: any[]) => {
        if (appendData && prevProducts) {
          console.log('IF appendData')
          return [...prevProducts, ...newData as any[]];
        } else {
          console.log('IF ELSE appendData')
          return newData as any[];
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };
  const handleLoadMore = async () => {
    const { criteria, arrangement } = selectedSortOption;
    setIsLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategories,
          price_range: [minPrice, maxPrice],
          products_per_page: 20,
          page: pageNumber + 1,
          sort: {
            criteria,
            arrangement,
          },
        }),
      };

      const response = await fetch(
        `${API_ENDPOINT}/filter.php`,
        options
      );
      const newData = await response.json();
      if (Array.isArray(newData)) {
        setProducts((prevProducts) => [...prevProducts, ...newData]);
        if (newData.length < 20) {
          setIsLoadMoreEnabled(false);
        }
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      } else {
        // Handle the case when newData is not an array (e.g., error response)
        console.error('Invalid response format:', newData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading more products:', error);
    }
  };


  let handleSelectedCategoriesChange = (selectedCategories: any) => {
    setSelectedCategories(selectedCategories);
    setIsLoading(true);
    fetchProducts(false, selectedCategories, selectedSortOption);
  };

  console.log('catInfo>>', catInfo)
  const breadcrumbs = {
    pages: [
      { name: t('home'), href: '/' },
      { name: catInfo ? i18n.language === 'ar' ? catInfo.ar_name : catInfo.name : categorySlug, href: '#' }
    ]
  }
  return (
    <div className="bg-white" key={categorySlug}>
      <main className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className='pt-5 '>
          <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />

          {/* <ShopListTop grid={grid} setGrid={setGrid} setMobileFiltersOpen={setMobileFiltersOpen} /> */}
          <ShopListTop grid={grid} setGrid={setGrid} setMobileFiltersOpen={setMobileFiltersOpen} handleSortOptionChange={handleSortOptionChange} title={catInfo ? i18n.language === 'ar' ? catInfo.ar_name : catInfo.name : categorySlug} />

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"> */}
            <div className="">

              <div className="flex items-center justify-between top">
                {!isLoadingCat && catInfo ?
                  <CategoryFilter catInfo={catInfo} handleSelectedCategoriesChange={handleSelectedCategoriesChange} selectedCategories={selectedCategories}/>
                  :
                  <div className="animate-pulse">
                    <div className="flex gap-4">
                      <div className="bg-green-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="block w-32 px-2"><div className="h-4 bg-green-200 rounded-md" /></div>
                      </div>
                      <div className="bg-green-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="block w-32 px-2"><div className="h-4 bg-green-200 rounded-md" /></div>
                      </div>
                      <div className="bg-green-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="block w-32 px-2"><div className="h-4 bg-green-200 rounded-md" /></div>
                      </div>
                      <div className="bg-green-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="block w-32 px-2"><div className="h-4 bg-green-200 rounded-md" /></div>
                      </div>`
                    </div>
                  </div>
                }
                <Sort onSortOptionChange={handleSortOptionChange} />
              </div>


              {/* Product grid */}
              <div className="relative z-10 lg:col-span-3 ">
                <div className={classNames(
                  grid ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4',
                  'grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 mt-6 relative'
                )}
                >

                  {isLoading ? (
                    <div className="absolute inset-0 z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75">
                      <Loader />
                    </div>
                  ) : ('')}
                  {products && products.map((productData: any) => (
                    <React.Fragment key={v4()}>
                      <ProductWidget product={productData} />
                    </React.Fragment>
                  ))}
                </div>
                {products.length > 7 && isLoadMoreEnabled &&
                  <div className="flex items-center justify-center mt-10 loadmore">
                    <button onClick={handleLoadMore} date-num={pageNumber} type="button" className="text-green-500 hover:bg-green-500 hover:text-white font-semibold border-2 border-green-500 rounded-full text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center justify-center whitespace-nowrap">
                      {!isLoading ? (
                        'Load More'
                      ) : (
                        <>
                          <Loader extraclass={'w-4 h-4 mr-2'} />
                          Loading...
                        </>
                      )}
                    </button>
                  </div>
                }
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
