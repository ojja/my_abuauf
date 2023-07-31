import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeAddressDefault, removeAddress } from "~/utils/account";
import { fetchAreas, fetchGovs } from "~/utils/general";
import EditAddress from "./account/EditAddress";
import Popup from "./Popup";
import AddressLoader from "~/components/account/AddressLoader";
import { Link } from "@remix-run/react";
import { RiEditBoxLine } from "react-icons/ri";


interface AddressData {
    id: string;
    status: string;
    gov_id: string;
    area_id: string;
    full_address: string;
    apartment_type: string;
    floor: string;
    apartment: string;
    area_name_en: string;
    area_name_ar: string;
    gov_name_en: string;
    gov_name_ar: string;
}

interface SingleAddressProps {
    address: AddressData | null;
    resetAddresses?: () => Promise<void>;
    govs?: [];
}

export default function SingleAddress({ address, resetAddresses, govs, overview }: SingleAddressProps) {
    const { t, i18n } = useTranslation();
    let [isOpenAdress, setIsOpenAdress] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    function closeModal() {
        setIsOpenAdress(false)
    }

    const handleMakeAddressDefault = async (addressId: any) => {
        try {
            const response = await makeAddressDefault(addressId);
            if (response) {
                setTimeout(() => {
                    resetAddresses();
                }, 1000);
            } else {
                // Address making default failed
                // Handle the failure case
            }
        } catch (error) {
            // Handle any error that occurred during the request
        }
    };

    const handleRemoveAddress = async (addressId: any) => {
        try {
            const response = await removeAddress(addressId);
            if (response) {
                setTimeout(() => {
                    resetAddresses();
                }, 1000);
            } else {
                // Address making default failed
                // Handle the failure case
            }
        } catch (error) {
            // Handle any error that occurred during the request
        }
    };

    function openEdit() {
        setIsOpenAdress(true)
    }

    if (!address) {
        return <AddressLoader />; // Or show a loading spinner
    }
    const {
        id,
        status,
        gov_id,
        area_id,
        full_address,
        apartment_type,
        floor,
        apartment,
    } = address;
    // const addressID = status === 'default' ? 'Default Address' : `Address #${id}`;
    const addressID = status === 'default' ? t('defaultAddress') : t('address', { id });
    let govName = '';
    let government_name = '';
    govName = (i18n.language === 'ar' ? address.area_name_ar : address.area_name_en);
    government_name = (i18n.language === 'ar' ? address.gov_name_ar : address.gov_name_en);

    return (
        <div className="relative space-y-2 bg-white border border-gray-400 rounded-[32px] divide-y divide-gray-400" key={i18n.language}>
            {address.status === 'error' ?
                <div className="py-20 px-4 text-center">
                    <span className="mb-1 text-base font-semibold">{t('no_address')}</span>
                </div>
                :
                <>
                    <div className="py-5 px-4 space-y-2">
                        <div className="mb-1 text-base font-semibold">{addressID}</div>
                        <div className="inline-block mr-5 align-top">
                            <label className="text-xs text-gray-700">{t('city')}</label>
                            {isLoading ?
                                <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                :
                                <span className="block text-sm font-bold">{government_name}</span>
                            }
                        </div>
                        <div className="inline-block align-top">
                            <label className="text-xs text-gray-700">{t('area')}</label>
                            {isLoading ?
                                <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                :
                                <span className="block text-sm font-bold">{govName}</span>
                            }
                        </div>
                        <div className="block">
                            <label className="text-xs text-gray-700">{t('street_name')}</label>
                            <span className="block text-sm font-bold">{full_address}</span>
                        </div>
                        <div className="inline-block mr-5 align-top">
                            <label className="text-xs text-gray-700">{t('building_no')}</label>
                            <span className="block text-sm font-bold">MISSING</span>
                        </div>
                        {apartment_type !== 'villa' ?
                            <>
                                <div className="inline-block mr-5 align-top">
                                    <label className="text-xs text-gray-700">{t('floor')}</label>
                                    <span className="block text-sm font-bold">{floor}</span>
                                </div>
                                <div className="inline-block mr-5 align-top">
                                    <label className="text-xs text-gray-700">{t('apartment')}</label>
                                    <span className="block text-sm font-bold">{apartment}</span>
                                </div>
                            </>
                            :
                            <div className="inline-block align-top ">
                                <label className="text-xs text-gray-700">{t('property_type')}</label>
                                <span className="block text-sm font-bold capitalize">{apartment_type}</span>
                            </div>
                        }
                        {isOpenAdress ? (
                            <Popup isOpen={true} close={closeModal}>
                                <EditAddress closeModal={closeModal} address={address} resetAddresses={resetAddresses} />
                            </Popup>
                        ) : ('')}
                    </div>
                    {overview ?

                        <div className="py-5 px-4 flex">
                            <Link to="/my-account/profile" className="inline-flex items-center py-2.5 px-5 space-x-3 rounded-[32px] border-2 border-gray-400 hover:bg-green-200 font-semibold ml-auto hover:text-white hover:border-green-200">
                                {t('edit')}
                                <RiEditBoxLine className="ml-2" />
                            </Link>
                        </div>
                        :
                        <span className="absolute top-0 !mt-0 cursor-pointer right-1 left-auto border-none">
                            <Menu as="div" className="relative">
                                <Menu.Button className="w-12 h-12">
                                    <svg width="23" height="5" viewBox="0 0 23 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto">
                                        <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="black" />
                                        <circle cx="11.5" cy="2.5" r="2.5" transform="rotate(-90 11.5 2.5)" fill="black" />
                                        <circle cx="20.5" cy="2.5" r="2.5" transform="rotate(-90 20.5 2.5)" fill="black" />
                                    </svg>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 overflow-hidden text-black origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg whitespace-nowrap">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={openEdit}
                                                    className={`${active && 'bg-blue-500 text-white'}  w-full block pl-3 pr-7 py-2`}
                                                >
                                                    {t('edit_address')}
                                                </button>
                                            )}
                                        </Menu.Item>
                                        {status === 'default' ?
                                            ''
                                            :
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => handleMakeAddressDefault(id)}
                                                        className={`${active && 'bg-blue-500 text-white'}  w-full block pl-3 pr-7 py-2`}
                                                    >

                                                        {t('make_default')}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        }
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleRemoveAddress(id)}
                                                    className={`${active && 'bg-red-100'} w-full block pl-3 pr-7 py-2 text-red-500 text-left`}
                                                >
                                                    <span>{t('remove')}</span>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </span>
                    }
                </>
            }
        </div>
    )
}
