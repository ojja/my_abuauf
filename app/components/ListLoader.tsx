import ProductLoader from "~/components/product/ProductLoader";

export default function ListLoader() {
    return (
        <div>
            <div className="animate-pulse">
                <div className="flex flex-col flex-wrap items-baseline justify-between pt-2 pb-6 mb-4 border-b border-gray-200 md:flex-row">
                    <div className="w-64 h-8 bg-gray-200 rounded-md"></div>
                    <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-200">
                    <div className="w-96 h-4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <div>
                            <div>
                                <div className="py-6 border-b border-gray-200">
                                    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                                </div>
                                <div className="py-6 border-b border-gray-200">
                                    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                                </div>
                                <div className="py-6 border-b border-gray-200">
                                    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 lg:col-span-3">
                            <div className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 mt-6 relative">
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
