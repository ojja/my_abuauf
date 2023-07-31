import { useTranslation } from 'react-i18next';

export default function RecipeWidget({ recipe }: any) {
    const { t, i18n } = useTranslation();


    return (
        <div className="md:w-1/2 md:px-3">
            <div className="block h-full hover:drop-shadow-xl">
                <div className="flex flex-wrap h-full overflow-hidden bg-green-300 rounded-xl md:flex-nowrap">
                    {/* Image */}
                    <div className="w-full md:w-[320px] h-auto md:min-h-[320px] relative" >
                        <div className="absolute flex flex-row items-center gap-2 px-3 py-1.5 bg-white shadow right-4 top-4 rounded-xl">
                            <span className="text-base">
                                {t('recipeWidget.min')} {recipe?.time}
                            </span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.42822 9.99745C1.42822 5.28161 5.28572 1.42578 9.99989 1.42578C14.7141 1.42578 18.5716 5.28161 18.5716 9.99745C18.5716 14.7116 14.7141 18.5683 9.99989 18.5683C5.28572 18.5683 1.42822 14.7116 1.42822 9.99828V9.99745ZM2.85739 9.99745C2.85739 13.9258 6.07156 17.1399 9.99989 17.1399C13.9282 17.1399 17.1432 13.9258 17.1432 9.99745C17.1432 6.06828 13.9282 2.85411 9.99989 2.85411C6.07156 2.85411 2.85822 6.06828 2.85822 9.99828L2.85739 9.99745ZM9.28572 4.28245H10.7141V9.71078L13.3574 12.3533L12.3574 13.3533L9.49989 10.4966C9.43286 10.4316 9.37941 10.3539 9.34264 10.2681C9.30588 10.1823 9.28653 10.09 9.28572 9.99661V4.28245Z" fill="black" />
                            </svg>
                        </div>
                        <a href="" className="block h-full">
                            <img className="object-cover w-full h-full" src={recipe.image} />
                        </a>
                    </div>



                    {/* Info */}
                    <div className="relative flex flex-col items-start w-full p-3 pb-4 md:py-6 md:px-6 md:w-3/5">
                        {/* Text Info */}
                        <div className="mb-4">
                            <span className="text-base text-gray-50">
                                {recipe.date}
                            </span>
                            <h4 className="pt-3 pb-3 font-bold md:text-2xl after:bg-primary-700">
                                {i18n.language === "ar" ? (recipe.ar_title || recipe.title) : recipe.title}
                            </h4>
                            <div className="text-base text-gray-50" dangerouslySetInnerHTML={{ __html: i18n.language === "ar" ? (recipe.ar_content || recipe.content) : recipe.content }} />
                        </div>

                        {/* Link Info */}
                        <a className="inline-block px-4 py-1 mt-auto text-center text-green-200 border-2 border-gray-400 border-solid rounded-full hover:bg-green-200 hover:border-gray-200 hover:text-white" href="#">
                            <span className="font-semibold md:text-xl whitespace-nowrap">{t('recipeWidget.btn')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}