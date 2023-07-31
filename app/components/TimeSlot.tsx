import Datepicker from 'react-tailwindcss-datepicker';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TimeSlot({ register, errors, setValue, watch }: any) {
    const { t } = useTranslation();

    const [dateValue, setDateValue] = useState({
        startDate: '',
        endDate: null,
    });

    const handleValueChange = (newValue: any) => {
        setDateValue(newValue);
        setValue('order_date', newValue.startDate); // Use setValue to update the form value
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let order_date = 'Today';
    order_date = watch('order_date');
    const isDatePickerDisabled = order_date === 'deliver_today';
    // console.log('order_date', order_date);
    // console.log('dateValue', dateValue);

    return (
        <div>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    <input
                        type="radio"
                        id="deliver_today"
                        value={"Today"}
                        className="hidden peer"
                        defaultChecked
                        {...register('order_date', {
                            required: { value: true, message: t('fields.order_date_required') },
                        })}
                    />
                    <label
                        htmlFor="deliver_today"
                        className="inline-flex items-center justify-between w-full h-full py-3 px-6 text-gray-500 bg-white border-2 border-gray-400 rounded-3xl cursor-pointer peer-checked:border-green-200 peer-checked:text-green-200 hover:text-gray-600 hover:border-green-200"
                    >
                        <div className="block">
                            <div className="w-full text-xl font-semibold">{t('today')}</div>
                            <div className="w-full">{t('within_60_min')}</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input
                        type="radio"
                        id="deliver_date"
                        value={''}
                        className="hidden peer"
                        {...register('order_date', {
                            required: { value: true, message: t('fields.order_date_required') },
                        })}
                    />
                    <label
                        htmlFor="deliver_date"
                        className="inline-flex items-center justify-between w-full h-full py-3 px-6 text-gray-500 bg-white border-2 border-gray-400 rounded-3xl cursor-pointer peer-checked:border-green-200 peer-checked:text-green-200 hover:text-gray-600 hover:border-green-200"
                    >
                        <div className="block">
                            <div className="w-full text-xl font-semibold">{t('choose_date')}</div>
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                value={dateValue}
                                onChange={handleValueChange}
                                minDate={tomorrow}
                                disabled={isDatePickerDisabled}
                            />
                            {errors.order_date && errors.order_date.type === 'required' && (
                                <p className="mt-1 text-xs text-red-500">{errors.order_date.message}</p>
                            )}
                        </div>
                    </label>
                </li>
            </ul>
            {errors.order_date && errors.order_date.type === 'required' && (
                <p className="mt-1 text-xs text-red-500">{errors.order_date.message}</p>
            )}
        </div>
    );
}
