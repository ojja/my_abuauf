import Sort from "~/components/Sort";
import { FunnelIcon, Squares2X2Icon, ViewColumnsIcon } from '@heroicons/react/20/solid';
import { useTranslation } from "react-i18next";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import Loader from "./Loader";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export const loader = async ({ params }: any) => {
    const categorySlug = params.catSlug;
}

export let handle = {
    // In the handle export, we can add a i18n key with namespaces our route
    // will need to load. This key can be a single string or an array of strings.
    // TIP: In most cases, you should set this to your defaultNS from your i18n config
    // or if you did not set one, set it to the i18next default namespace "translation"
    i18n: "common",
  };
export default function ShopListTop({ grid, setGrid, setMobileFiltersOpen, title, handleSortOptionChange }: any) {
    // const { t, i18n } = useTranslation();
    const { t, ready, i18n } = useTranslation('common')
    // if (!ready) return <Loader /> // i18next may not be ready when changing route with <Link>
    const { categorySlug } = useLoaderData();
    // useEffect(() => {
    //     i18n.loadNamespaces("common").then(() => {
    //       i18n.setDefaultNamespace("common");
    //       i18n.changeLanguage("en");
    //     });
    //   }, [i18n]);
    return (
        <div>
            <div className="flex flex-col flex-wrap items-baseline justify-between pt-2 pb-6 mb-4 md:flex-row">
                {title ?
                    <h1 className="text-4xl font-bold tracking-tight text-black">{title}</h1>
                    :
                    <h1 className="text-4xl font-bold tracking-tight text-black"> {t('new_arrivals')} {t('in')} {categorySlug}</h1>
                }
                {/* <div className="flex items-center self-end mt-3 md:mt-0">

                    <Sort onSortOptionChange={handleSortOptionChange} />

                    <button type="button" className={classNames(
                        grid ? 'text-gray-500' : 'text-gray-400',
                        "-m-2 ml-2 p-2 hover:text-gray-500"
                    )} onClick={() => setGrid(true)}>
                        <span className="sr-only">View grid</span>
                        <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button type="button" className={classNames(
                        grid ? 'text-gray-400' : 'text-gray-500',
                        "-m-2 ml-2 p-2 hover:text-gray-500"
                    )} onClick={() => setGrid(false)}>
                        <span className="sr-only">View Columns</span>
                        <ViewColumnsIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div> */}
            </div>
        </div>
    )
}
