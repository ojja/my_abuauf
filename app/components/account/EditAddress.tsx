import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from 'react-icons/ri'
import { editAddress } from '~/utils/account';
import SelectInput from "~/components/SelectInput";
import { fetchAreas, fetchGovs } from '~/utils/general';
import Msg from "~/components/Msg";
import ProfileLoader from './ProfileLoader';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';
import { INPUT_CLASSES, LABEL_CLASSES } from '~/commonUIClasses';

interface Address {
    address_id: string;
    status: string;
    gov_id: string;
    area_id: string;
    full_address: string;
    apartment_type: string;
    floor: string;
    apartment: string;
}

export default function EditAddress({ closeModal, address, resetAddresses }: any) {
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [govs, setGovs] = useState([]);
    const [areas, setAreas] = useState([]);
    let [selectedGovId, setSelectedGovId] = useState('');
    let [selectedAreaId, setSelectedAreaId] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<Address>({
        defaultValues: address as Address,
    });
    useEffect(() => {
        if (address) {
            setValue('address_id', address.id);
            setValue('gov_id', address.gov_id);
            setValue('area_id', address.area_id);
            setValue('full_address', address.full_address);
            setValue('apartment_type', address.apartment_type);
            setValue('floor', address.floor);
            setValue('apartment', address.apartment);
        }
    }, [address, setValue]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchGovs();
            if (response) {
                setGovs(response);
                if (address && response.some((gov: any) => gov.id === address.gov_id)) {
                    setSelectedGovId(address.gov_id);
                } else {
                    setSelectedAreaId('0');
                }
            } else {
                // Handle the case when fetching the cities fails
            }
        };

        fetchData();
    }, [address]);

    selectedGovId = watch('gov_id');
    useEffect(() => {
        const fetchAreasByGovId = async () => {
            if (selectedGovId) {
                const response = await fetchAreas(selectedGovId);
                if (response === "Err in payload") {
                    return;
                }
                if (response) {
                    setAreas(response);
                    console.log('in before IF')
                    if (address && response.some((area: any) => area.area_id === address.area_id)) {
                        setSelectedAreaId(address.area_id);
                    } else {
                        setValue('area_id', 0);
                    }
                } else {
                    // Handle the case when fetching the areas fails
                }
            } else {
                setAreas([]);
            }
        };

        fetchAreasByGovId();
    }, [selectedGovId]);
    selectedAreaId = watch('area_id');

    const formData = watch();
    console.log(formData); // Log the form data on every change

    const onSubmit: SubmitHandler<Address> = async (data: Address) => {
        console.log(data);
        try {
            setIsLoading(true);
            const updatedAddress = await editAddress(data);
            setIsLoading(false);
            setMessage('Profile updated successfully');
            closeModal();
            resetAddresses();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            if (updatedAddress !== undefined) {
                setValue('gov_id', updatedAddress.gov_id);
                setValue('area_id', updatedAddress.area_id);
                setValue('full_address', updatedAddress.full_address);
                setValue('apartment_type', updatedAddress.apartment_type);
                setValue('floor', updatedAddress.floor);
                setValue('apartment', updatedAddress.apartment);
            } else {
                // Handle the case when updatedAddress is undefined
            }
        } catch (error) {
            setIsLoading(false);
            // Handle the case when updating address fails
        }
    };
    return (
        <div className="relative">
            {isLoading ?
                <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                    <Loader />
                </div>
                : ''}
            <h3 className="mb-3">{t('edit_address')}</h3>
            {message && <Msg color="green" message={message} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="gov" className="block mb-1 text-xs text-gray-400 ">{t('checkout.city')}</label>
                        <SelectInput
                            value={watch('gov_id') || ''}
                            options={[
                                { label: t('checkout.select_city'), value: "" },
                                ...govs.map((gov: any) => ({ label: i18n.language === 'ar' ? gov.name_ar : gov.name_en, value: gov.id })),
                            ]}
                            register={register('gov_id')}
                        />
                    </div>
                    <div>
                        <label htmlFor="area" className="block mb-1 text-xs text-gray-400">{t('checkout.area')}</label>
                        <SelectInput
                            value={watch('area_id') || ''}
                            options={[
                                { label: t('checkout.select_area'), value: "" },
                                ...areas?.map((area: any) => ({ label: i18n.language === 'ar' ? area.name_ar : area.name_en, value: area.area_id })),
                            ]}
                            register={register('area_id')}
                        />
                    </div>
                    <div>
                        <label htmlFor="full_address" className={LABEL_CLASSES}>{t('street_name')}</label>
                        <input
                            type="text"
                            id="full_address"
                            {...register('full_address')}
                            className={INPUT_CLASSES}
                        />
                    </div>

                    <div>
                        <label htmlFor="apartment_type" className="block mb-1 text-xs text-gray-400">{t('checkout.property_type')}</label>
                        <div className="space-x-5">
                            <label htmlFor="Flat" className='inline-block text-gray-900 peer-checked:text-blue-600'>
                                <div className='relative flex items-center py-1 pl-3'>
                                    <input
                                        type="radio"
                                        id="Flat"
                                        className='hidden peer'
                                        value='flat'
                                        {...register('apartment_type')}
                                    />
                                    <div className='absolute left-0 invisible mt-1 peer-checked:visible top-1'>
                                        <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                                    </div>
                                    <div className='absolute left-0 visible mt-1 peer-checked:invisible top-1'>
                                        <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                                    </div>
                                    <span className='ml-2 text-base font-medium'>{t('checkout.apartment')}</span>
                                </div>
                            </label>
                            <label htmlFor="Villa" className='inline-block text-gray-900 peer-checked:text-blue-600'>
                                <div className='relative flex items-center py-1 pl-3'>
                                    <input
                                        type="radio"
                                        id="Villa"
                                        className='hidden peer'
                                        value='villa'
                                        {...register('apartment_type')}
                                    />
                                    <div className='absolute left-0 invisible mt-1 peer-checked:visible top-1'>
                                        <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                                    </div>
                                    <div className='absolute left-0 visible mt-1 peer-checked:invisible top-1'>
                                        <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                                    </div>
                                    <span className='ml-2 text-base font-medium'>{t('checkout.villa')}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="space-x-5">
                        <div className="inline-block">
                            <label htmlFor="floor" className="block mb-1 text-xs text-gray-400">{t('checkout.floor')}</label>
                            <input
                                type="text"
                                id="floor"
                                placeholder="3"
                                className="w-20 p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50"
                                {...register('floor')}
                            />
                        </div>
                        <div className="inline-block">
                            <label htmlFor="apartment" className="block mb-1 text-xs text-gray-400">{t('checkout.apartment')}</label>
                            <input
                                type="text"
                                id="apartment"
                                placeholder="33"
                                className="w-20 p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50"
                                {...register('apartment')}
                            />
                        </div>
                    </div>
                    <button type="submit" className="inline-flex justify-center w-full px-3 py-4 text-sm font-semibold text-center text-white rounded-md bg-slate-900 hover:bg-slate-700">{t('edit_address')}</button>
                </div>
            </form>
        </div>
    )
}
