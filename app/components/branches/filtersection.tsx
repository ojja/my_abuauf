import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseCircleFill } from 'react-icons/ri';

export default function LocationTabs() {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState('all');

    const locations = [
        {
            name: 'القاهرة',
            label: 'القاهرة',
            places: [
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },


            ]
        },
        {
            name: 'الاسكندرية',
            label: 'الاسكندرية',
            places: [
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
            ]
        },
        {
            name: 'الجيزة',
            label: 'الجيزة',
            places: [
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
                {
                    type: "booth",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: false
                },
                {
                    type: "store",
                    place_name: "شيراتون هليوبوليس",
                    details: "24 شارع سيد زكريا امام سيلنترو , شيراتون المطار",
                    number: "01116462020",
                    direction: "https://goo.gl/maps/8T3F8mwLT8z3BzPe9",
                    branch: true
                },

            ]
        },


    ];

    const handleTabClick = (tabName: SetStateAction<string>) => {
        setSelectedTab(tabName);
    };

    const filteredLocations = selectedTab === 'all' ? locations : locations.filter((loc) => loc.name === selectedTab);
    const filteredPlaces = filteredLocations.flatMap((loc) => loc.places);
    return (
        <>
            <div className="pb-6 border-b ">
                <div className="container flex gap-3 px-4 mx-auto md:px-24">
                    <div
                        className={`text-green-200 text-xl font-semibold uppercase px-4 py-2.5 rounded-100 cursor-pointer ${selectedTab === 'all' ? 'bg-gray-100' : 'bg-green-300'
                            }`}
                        onClick={() => handleTabClick('all')}
                    >
                        الكل
                    </div>
                    {locations.map((location) => (
                        <div
                            key={location.name}
                            className={`px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer ${selectedTab === location.name ? 'bg-gray-100' : 'bg-green-300'
                                }`}
                            onClick={() => handleTabClick(location.name)}
                        >
                            <div className="justify-end items-center gap-2.5 inline-flex">
                                <div className="flex items-center justify-center gap-1 text-green-200">
                                    <div className={`text-xl font-semibold uppercase`}>
                                        {location.label}
                                    </div>
                                    {selectedTab === location.name &&
                                        <span><RiCloseCircleFill className="text-xl" /></span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="container px-4 mx-auto md:px-24 md:pt-12 md:pb-24">
                {/* Render the filtered places */}

                <div className='flex flex-wrap gap-x-6 gap-y-6'>
                    {filteredPlaces.map((place, index) => (
                        <div key={index} className={` w-full md:w-666 rounded-3xl py-5 px-6 ${place.branch ? 'bg-green-300' : ' border border-gray-50'}`}>
                            <span className={`rounded-s px-2 text-base font-semibold ${place.branch ? 'bg-green-400 text-white' : ' bg-[#F9A000] text-black'}`}>{t(`${place.type}`)}</span>
                            <p className='mt-2 mb-1 text-xl font-semibold text-green-200'>{place.place_name}</p>
                            <p className='text-base text-gray-50'>{place.details}</p>
                            <div className='flex mt-3'>
                                <a href={`tel:${place.number}`} className='flex text-base font-semibold text-green-400 gap-x-2'>
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.012 7.39453C15.7979 4.4662 13.3337 2.14453 10.3337 2.14453C7.33372 2.14453 4.86955 4.4662 4.65538 7.39453C3.40538 7.68036 2.47705 8.75203 2.47705 10.002C2.47705 11.252 3.40538 12.3237 4.65538 12.6087C4.86955 15.5379 7.33372 17.8587 10.3337 17.8587H12.4771V16.4304H10.3337C7.97705 16.4304 6.04788 14.502 6.04788 12.1445V7.85953C6.04788 5.50286 7.97705 3.57453 10.3337 3.57453C12.6912 3.57453 14.6195 5.50286 14.6195 7.85953V11.967C14.6202 12.1562 14.6957 12.3375 14.8295 12.4713C14.9632 12.6051 15.1445 12.6805 15.3337 12.6812C16.9054 12.6812 18.1912 11.467 18.1912 10.0029C18.1912 8.75286 17.2629 7.6812 16.0129 7.39536L16.012 7.39453ZM3.90538 10.002C3.90538 9.53787 4.19122 9.14453 4.61955 8.93036V11.0737C4.19122 10.8587 3.90538 10.4662 3.90538 10.002ZM16.0479 11.0737V8.93036C16.4771 9.14453 16.7629 9.53787 16.7629 10.002C16.7629 10.4662 16.4771 10.8587 16.0479 11.0737Z" fill="#126E49" />
                                    </svg>
                                    {place.number}
                                </a>
                                <hr className=' w-[1px]  h-auto mx-4 bg-gray-100' />
                                <a href={place.direction} target="_blank" rel="noopener noreferrer" className='flex text-base font-semibold text-green-400 gap-x-2'>
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_416_31880)">
                                            <path d="M9.23754 12.2157C9.02848 11.7024 8.60954 11.3033 8.08674 11.1194L2.21486 9.05346C2.1978 9.04746 2.19023 9.04199 2.18798 9.04025C2.1855 9.03833 2.18405 9.0367 2.18268 9.03467C2.17927 9.02964 2.17278 9.01596 2.17249 8.99449C2.1722 8.97303 2.17832 8.95917 2.18159 8.95405C2.18291 8.95199 2.18431 8.95032 2.18674 8.94833C2.18895 8.94654 2.19637 8.94086 2.21325 8.93441L16.3286 3.53706C16.3416 3.53209 16.3495 3.53112 16.3529 3.53087C16.3566 3.53061 16.3597 3.53088 16.3629 3.53159C16.37 3.53317 16.3823 3.5383 16.395 3.55038C16.4076 3.56246 16.4134 3.57452 16.4153 3.58154C16.4161 3.58467 16.4166 3.58771 16.4165 3.59143C16.4164 3.5949 16.4158 3.60281 16.4115 3.61605L11.7046 17.9764C11.6989 17.9935 11.6936 18.0012 11.6919 18.0035C11.6901 18.006 11.6885 18.0075 11.6865 18.0089C11.6815 18.0124 11.668 18.0192 11.6465 18.02C11.6251 18.0207 11.6111 18.0149 11.6059 18.0118C11.6038 18.0105 11.6021 18.0091 11.6001 18.0067C11.5982 18.0046 11.5924 17.9973 11.5856 17.9805L9.23754 12.2157Z" stroke="#126E49" strokeWidth="1.87317" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_416_31880">
                                                <rect width="20" height="20" fill="white" transform="translate(0.333496)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    الاتجاهات
                                </a>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </>

    );
}
