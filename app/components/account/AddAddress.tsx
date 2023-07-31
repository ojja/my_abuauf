import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from 'react-icons/ri'
import { addAddress } from '~/utils/account';
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

export default function AddAddress({ closeModal, resetAddresses }: any) {
    const { t } = useTranslation('fields');
    const { i18n } = useTranslation();
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
    } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchGovs();
            if (response) {
                setGovs(response.govs);
            } else {
                // Handle the case when fetching the cities fails
            }
        };

        fetchData();
    }, []);

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
    console.log('govs>', govs); // Log the form data on every change
    console.log(formData); // Log the form data on every change

    const onSubmit: SubmitHandler<Address> = async (data: Address) => {
        console.log(data);
        try {
            setIsLoading(true);
            const updatedAddress = await addAddress(data);
            setIsLoading(false);
            setMessage('Added Address successfully');
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
            <h3 className="mb-3 font-bold text-2xl">{t('add_address')}</h3>
            <hr className="absolute -left-6 -right-6" />
            {message && <Msg color="green" message={message} />}
            <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="gov" className={LABEL_CLASSES}>{t('city')}</label>
                        <SelectInput
                            value={watch('gov_id') || ''}
                            options={[
                                { label: t('select_city'), value: "" },
                                ...govs.map((item: any) => ({ label: i18n.language === 'ar' ? item.gov_name : item.gov_name_en, value: item.gov_id })),
                            ]}
                            register={register('gov_id')}
                        />
                    </div>
                    <div>
                        <label htmlFor="area" className={LABEL_CLASSES}>{t('area')}</label>
                        <SelectInput
                            value={watch('area_id') || ''}
                            options={[
                              { label: t("select_area"), value: "" },
                              ...areas?.map((area) => ({
                                label:
                                  i18n.language === "ar" ? area.city_name : area.city_name_en,
                                value: area.city_id,
                              })),
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
                        <label htmlFor="apartment_type" className={LABEL_CLASSES}>{t('property_type')}</label>
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
                                    <span className='ml-2 text-base font-medium'>{t('apartment')}</span>
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
                                    <span className='ml-2 text-base font-medium'>{t('villa')}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="space-x-5">
                        <div className="inline-block">
                            <label htmlFor="floor" className={LABEL_CLASSES}>{t('floor')}</label>
                            <input
                                type="text"
                                id="floor"
                                placeholder="3"
                                className={INPUT_CLASSES}
                                {...register('floor')}
                            />
                        </div>
                        <div className="inline-block">
                            <label htmlFor="apartment" className={LABEL_CLASSES}>{t('apartment')}</label>
                            <input
                                type="text"
                                id="apartment"
                                placeholder="33"
                                className={INPUT_CLASSES}
                                {...register('apartment')}
                            />
                        </div>
                    </div>
                    <hr className="absolute -left-6 -right-6" />
                    <dir className="p-0 pt-6">
                        <button type="submit" className="inline-flex justify-center w-full px-8 py-4 font-semibold text-white bg-green-200 hover:bg-green-400 text-xl rounded-100 items-center whitespace-nowrap">{t('add_address')}</button>
                    </dir>
                </div>
            </form>
        </div>
    )
}
