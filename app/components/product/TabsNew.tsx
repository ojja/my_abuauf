import { Tab } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import GlutenIcon from "../icons/GlutenIcon";

interface TabsProps {
    product: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function TabsNew({ product }: TabsProps) {
    const { t, i18n } = useTranslation();

    return (
        <div className="pt-12 bg-white ">
            <div className="container mx-auto">
                <Tab.Group as="div" className="flex flex-col" defaultIndex={0}>
                    <Tab.List className="flex flex-wrap mb-12 space-x-1 border-b border-gray-200">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'p-4 py-2.5 text-sm md:text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-2 md:border-b-4 transition-colors duration-300',
                                    selected
                                        ? 'border-[#DCC498]'
                                        : ' border-transparent'
                                )
                            }
                        >
                            {i18n.language === "ar" ?
                                ' الفوائد  ' : '  Benefits '
                            }
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'p-4 py-2.5 text-sm md:text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-2 md:border-b-4  transition-colors duration-300',
                                    selected
                                        ? 'border-[#DCC498]'
                                        : ' border-transparent'
                                )
                            }
                        >
                            {i18n.language === "ar" ?
                                ' طريقة الحفظ  ' : ' Preservation Method '
                            }
                        </Tab>

                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ul>
                                <li>
                                    <div className="flex items-center gap-x-3 mb-9">
                                        <GlutenIcon />
                                        <p className="text-sm font-semibold md:text-xl text-gray-50">مليئة بالعناصر الغذائية والفيتامينات الصحية</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-x-3 mb-9">
                                        <GlutenIcon />
                                        <p className="text-sm font-semibold md:text-xl text-gray-50">مليئة بالعناصر الغذائية والفيتامينات الصحية</p>
                                    </div>
                                </li>
                            </ul>
                        </Tab.Panel>
                        <Tab.Panel>
                            <ul>
                                <li>
                                    <div className="flex items-center gap-x-3 mb-9">
                                        <GlutenIcon />
                                        <p className="text-sm font-semibold md:text-xl text-gray-50">مليية والفيتامينات الصحية</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-x-3 mb-9">
                                        <GlutenIcon />
                                        <p className="text-sm font-semibold md:text-xl text-gray-50">مليئة باة والفيتامينات الصحية</p>
                                    </div>
                                </li>
                            </ul>
                        </Tab.Panel>

                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
