import { json, MetaFunction } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import ProductWidget from "~/components/product/ProductWidget";
import { v4 } from 'uuid';
import React, { useEffect, useState } from "react";
import Breadcrumbs from "~/components/Breadcrumbs";
import ShopListTop from "~/components/ShopListTop";
import { useTranslation } from "react-i18next";
import Filters from "~/components/Filters";
import { getFilterProducts } from "~/models/category.server";
import { Site_Title } from "~/credentials";
import { API_ENDPOINT } from "~/config";
import Loader from "~/components/Loader";
import { createResponse } from "@remix-run/node/server";
import ListLoader from "~/components/ListLoader";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const meta: MetaFunction = ({ params }: any) => {
    return {
        title: `Shop All - ${Site_Title}`
    }
}
export const loader: LoaderFunction = async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 500000;
    let selectedCategories = searchParams.get("selectedCategories") || "";
    const perPage = 20;

    try {
        // Start the Server-Timing measurement
        const start = process.hrtime();

        const response = await getFilterProducts(
            selectedCategories,
            pageNumber,
            perPage,
            minPrice,
            maxPrice
        );
        const filteredProducts = await response;

        // Calculate the elapsed time
        const elapsed = process.hrtime(start);
        const responseTime = Math.round(elapsed[0] * 1000 + elapsed[1] / 1e6);

        // Create the Server-Timing header value
        const serverTiming = `total;dur=${responseTime}`;

        // Create the response with the Server-Timing header
        return new Response(JSON.stringify({ filteredProducts }), {
            headers: {
                "Content-Type": "application/json",
                "Server-Timing": serverTiming,
            },
        });
    } catch (error) {
        console.log("error", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};



export default function shop() {
    const { t } = useTranslation();
    const [isLoadingPage, setIsLoadingPage] = useState(true); // State for simulating page loading
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [grid, setGrid] = useState(false);
    const cat = 'Category';
    const breadcrumbs = {
        pages: [
            { name: 'Home', href: '/' },
            { name: 'Woman', href: '#' },
            { name: 'Parent Category', href: '#' },
            { name: cat, href: '#' }
        ]
    }

    const { filteredProducts: initialProducts } = useLoaderData();
    const [products, setProducts] = useState(initialProducts);
    let [selectedCategories, setSelectedCategories] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(true);
    const [selectedSortOption, setSelectedSortOption] = useState({
        criteria: "date",
        arrangement: "DESC",
    });
    const handleSortOptionChange = (option: any) => {
        setSelectedSortOption(option);
        setIsLoading(true);
        fetchProducts(false, selectedCategories, option);
    };

    // console.log('selectedCategories', selectedCategories);
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };


    const fetchProducts = async (appendData = false, selectedCategories: any, selectedSortOption: any) => {
        console.log('selectedCategories Before try', selectedCategories)
        console.log('selectedSortOption Before try', selectedSortOption)
        const { criteria, arrangement } = selectedSortOption;
        try {
            setIsLoading(true);
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
    const debouncedFetchProducts = debounce(fetchProducts, 2000);
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
            setProducts((prevProducts) => [...prevProducts, ...newData]);
            if (newData.length < 20) {
                setIsLoadMoreEnabled(false);
            }
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
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

    const handleMinPriceChange = (event: any) => {
        setMinPrice(event.target.value);
        debouncedFetchProducts();
    };

    const handleMaxPriceChange = (event: any) => {
        setMaxPrice(event.target.value);
        debouncedFetchProducts();
    };
    const categories = [
        { value: 'clothing', label: 'Clothing', checked: false },
        { value: 'dress', label: 'Dress', checked: false },
        { value: 'shirt', label: 'shirt', checked: false },
        { value: 'skirt', label: 'skirt', checked: false },
        { value: 'shoes', label: 'shoes', checked: false },
        { value: 'trousers', label: 'trousers', checked: false },
        { value: 'food', label: 'food', checked: false },
        { value: 'coffee', label: 'coffee', checked: false },
        { value: 'espresso', label: 'espresso', checked: false },
        { value: 'french-coffee', label: 'french-coffee', checked: false },
        { value: 'turkish-coffee', label: 'turkish-coffee', checked: false },
        { value: 'nuts', label: 'nuts', checked: false },
        { value: 'raw-nuts', label: 'raw-nuts', checked: false },
    ]
    useEffect(() => {
        // Simulate page loading
        const loadingTimeout = setTimeout(() => {
            setIsLoadingPage(false);
            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, []);
    // console.log('products>>', products);
    return (
        <div className="bg-white">
            <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className='pt-5'>
                    {isLoadingPage ? (
                        <ListLoader />
                    ) : (
                        <>
                            <ShopListTop grid={grid} setGrid={setGrid} setMobileFiltersOpen={setMobileFiltersOpen} title={'Shop All'} handleSortOptionChange={handleSortOptionChange} />
                            <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 border-b border-gray-200" />
                            <section aria-labelledby="products-heading" className="pt-6 pb-24">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    <Filters
                                        filteredProducts={products}
                                        selectedCategories={selectedCategories}
                                        handleMinPriceChange={handleMinPriceChange}
                                        handleMaxPriceChange={handleMaxPriceChange}
                                        handleSelectedCategoriesChange={handleSelectedCategoriesChange}
                                        categories={categories}
                                    />
                                    {/* Product grid */}
                                    <div className="relative z-10 lg:col-span-3">
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
                                            {Array.isArray(products) && products.map((productData: any) => (
                                                <React.Fragment key={v4()}>
                                                    <ProductWidget product={productData} />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        {isLoadMoreEnabled &&
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
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
