import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { searchForm } from "~/api/common";
import { INPUT_CLASSES } from "~/commonUIClasses";
import Popup from "./Popup";

export default function Search() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    let [isSearch, setIsSearch] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { register, handleSubmit, watch } = useForm();
    const [searchResults, setSearchResults] = useState([]);

    function closeModal() {
        setIsSearch(false);
    }

    function openModal() {
        setIsSearch(true);
    }

    useEffect(() => {
        document.body.classList.toggle('overflow-y-hidden', popoverOpen);

        return () => {
            // Clean up the class when the component unmounts
            document.body.classList.remove('overflow-y-hidden');
        };
    }, [popoverOpen]);
    const keyword = watch('keyword');
    const onSubmit = async (data: string) => {
        console.log('data', data)
        // Call the searchForm function with the entered keyword
        const searchResult = await searchForm(keyword);
        // Handle the search result here (e.g., update state, display data)
        setSearchResults(Array.isArray(searchResult) ? searchResult : []); // Check if searchResult is an array
        setSearchResults(searchResult);
    };

    return (
        <div>
            <span className="bg-green-200 rounded-full w-12 h-12 items-center justify-center text-white cursor-pointer hover:bg-green-400 flex" onClick={() => { openModal(), setPopoverOpen(!popoverOpen) }}>
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className=" w-5 h-5" aria-hidden="true" />
            </span>
            {isSearch && (
                <Popup isOpen={isSearch} close={() => { closeModal(), setPopoverOpen(!popoverOpen) }} width="full">
                    <div className=" divide-y divide-gray-200">
                        <div className="px-8 py-5">
                            <h3 className="text-2xl font-bold">{t('search')}</h3>
                        </div>
                        <div className="px-8 py-5 space-y-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="default-search"
                                        className={`w-full py-4 pr-5 border-2 border-green-400 text-black outline-none rounded-100 pl-10`}
                                        placeholder="Search Products"
                                        required
                                        {...register('keyword')}
                                        onKeyUp={handleSubmit(onSubmit)}
                                    />
                                </div>
                            </form>

                            <ul className="space-y-4 p-4">
                                {Array.isArray(searchResults) ?
                                    searchResults.map((item, index) => (
                                        <li className="w-full" key={index}>
                                            <Link to={`/products/${item.slug}`} className="flex items-center px-2 py-3 rounded-2xl hover:bg-green-300" onClick={() => { closeModal(), setPopoverOpen(!popoverOpen) }}>
                                                <span className="ml-4">{t('all_type')}{" "}{i18n.language === 'en' ? item.title : item.ar_title}</span>
                                                <span className="ml-auto p-2">
                                                    <ChevronLeftIcon className="w-6 h-6" />
                                                </span>
                                            </Link>
                                        </li>
                                    )) : (
                                        <p>{t('no_products')}</p>
                                    )}
                            </ul>
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    );
}
