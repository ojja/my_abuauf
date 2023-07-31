import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { RiCheckLine } from 'react-icons/ri';
import { v4 } from 'uuid';


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Sort({ onSortOptionChange }: any) {
    const { t, i18n } = useTranslation();
    const sortOptions = [
        { name: 'best_seller', criteria: 'date', arrangement: 'ASC', current: true },
        { name: 'newest', criteria: 'date', arrangement: 'DESC', current: false },
        { name: 'oldest', criteria: 'date', arrangement: 'ASC', current: false },
        { name: 'priceLowToHigh', criteria: 'price', arrangement: 'ASC', current: false },
        { name: 'priceHighToLow', criteria: 'price', arrangement: 'DESC', current: false },
    ];

    const [selectedSortOption, setSelectedSortOption] = useState(sortOptions.find(option => option.current));
    const [selectedSortOptionName, setSelectedSortOptionName] = useState('');

    const handleSortOptionClick = (option: any) => {
        setSelectedSortOption((prevOption) => {
            const updatedOptions = sortOptions.map((sortOption) => {
                return {
                    ...sortOption,
                    current: sortOption === option,
                };
            });
            onSortOptionChange(option);
            return updatedOptions.find((sortOption) => sortOption.current);
        });
    };

    useEffect(() => {
        if (selectedSortOption) {
            setSelectedSortOptionName(selectedSortOption.name);
        }
    }, [selectedSortOption]);

    console.log('selectedSortOption', selectedSortOption)
    console.log('selectedSortOptionName', selectedSortOptionName)
    return (
        <Menu as="div" className="relative z-20 inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center py-2.5 px-5 text-sm font-medium text-green-200 group hover:text-white hover:bg-green-200 rounded-100 border-2 border-gray-400 hover:border-green-200">
                    {t(`sortOptions.${selectedSortOptionName}`)}
                    <ChevronDownIcon
                        className="flex-shrink-0 w-5 h-5 ml-4 -mr-1"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-20 w-72 mt-2 origin-top-right bg-white rounded-2xl shadow-custom overflow-hidden ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">
                        {sortOptions.map((option) => (
                            <Menu.Item key={v4()}>
                                {({ active }) => (
                                    <div className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        selectedSortOptionName === option.name ? 'bg-gray-100' : '',
                                        'flex justify-between items-center px-4 py-2 cursor-pointer'
                                    )}
                                        onClick={() => handleSortOptionClick(option)}>
                                        <span
                                            className={classNames(
                                                'block text-xl cursor-pointer font-medium text-black'
                                            )}
                                        >
                                            {t(`sortOptions.${option.name}`)}
                                        </span>
                                        {selectedSortOptionName === option.name ?
                                            <RiCheckLine />
                                            : ''
                                        }
                                    </div>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
