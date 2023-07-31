import { useTranslation } from "react-i18next";

export default function BlogWidget() {
    const { t } = useTranslation();
    return (
        <div className="h-full overflow-hidden bg-green-300 rounded-xl hover:drop-shadow-xl">
            <div className="">
                <img
                    src="/images/blog/image-01.jpg"
                    alt="image"
                    className="w-full"
                />
            </div>
            <div className="p-5 pb-8 md:px-8 md:py-5">
                <span className="text-base font-semibold text-gray-50">
                    Dec 22, 2023
                </span>
                <h3 className="mb-4">
                    <a
                        href="#"
                        className="inline-block text-xl font-bold sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                        Meet AutoManage, the best AI management
                    </a>
                </h3>
                <p className="mb-4 text-base text-gray-50">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry.
                </p>
                <a href="#" className="text-xl font-semibold leading-none text-green-200 border-b-2 border-green-200 hover:pb-2">
                    {t('read_more')}
                </a>
            </div>
        </div>
    )
}
