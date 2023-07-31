import { Tab } from "@headlessui/react";
import Reviews from "~/components/Reviews";
import RecipeWidget from "~/components/RecipeWidget";

interface TabsProps {
    recipes: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Tabs({ recipes }: TabsProps) {
    console.log('recipes',recipes)
    return (
        <div className="bg-white">
            <div className="">
                <Tab.Group as="div" className="flex flex-col" defaultIndex={0}>
                    <Tab.List className="relative">
                        <div className="container mx-auto md:pt-20">
                            <div className="flex flex-wrap -mb-px space-x-1">
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'p-4 py-2.5 text-sm md:text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-2 md:border-b-4 transition-colors duration-300',
                                            selected
                                                ? 'border-[#DCC498]'
                                                : ' border-transparent'
                                        )
                                    }
                                >الاراء <span className="inline-flex items-center justify-center w-4 h-4 pt-1 text-xs text-black rounded-full bg-yellow-910">2</span></Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'p-4 py-2.5 text-sm md:text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-2 md:border-b-4 transition-colors duration-300',
                                            selected
                                                ? 'border-[#DCC498]'
                                                : ' border-transparent'
                                        )
                                    }
                                >الوصفات</Tab>
                            </div>
                        </div>
                        <hr className="absolute left-0 right-0 text-gray-200"
                        // style={{ 'top': height }}
                        />
                    </Tab.List>
                    <Tab.Panels className="container mx-auto">
                        <Tab.Panel>
                            <Reviews />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-16 lg:pr-8">
                                <div className="relative flex flex-wrap list md:-mx-3 gap-y-6">
                                    {recipes && recipes.map((recipe: any, index: any) => (
                                        <RecipeWidget recipe={recipe} key={index} />
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>

                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
