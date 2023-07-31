import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiRadioButtonLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import CustomRadioBtnCheck from "./icons/CustomRadioBtnCheck";
import CustomRadioBtnUnCheck from "./icons/CustomRadioBtnUnCheck";
import PaymentForm from "./PaymentForm";

const PaymentMethod = ({ formData, handleChange, register, setValue, errors, onSubmit, watch }: any) => {
    const { t } = useTranslation('fields');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [renderCount, setRenderCount] = useState(0);

    // const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const paymentMethod = event.target.value;
    //     setShowPaymentForm(paymentMethod === "CC");
    // };
    // console.log('OJJA 1');
    // useEffect(() => {
    //     setRenderCount((prevCount) => prevCount + 1);
    // }, []);

    // console.log("PaymentMethod render count:", renderCount);
    const payment_method = watch("payment_method");
    // console.log("payment_method:", payment_method);
    return (
        <>
            <h2 className="py-4 mb-6 border-b border-gray-100 md:text-2xl text-base font-bold text-black ">{t('payment_method')}</h2>
            <ul className=''>
                <li className='py-2'>
                    <label htmlFor="Credit_Card" className='block text-black'>
                        <div className="relative flex flex-col">
                            <input
                                type="radio"
                                name="payment_method"
                                id="Credit_Card"
                                className="hidden peer"
                                value="CC"
                                {...register("payment_method")}
                            />
                            <CustomRadioBtnCheck />
                            <CustomRadioBtnUnCheck />
                            <span className='flex justify-between items-center text-xl font-semibold py-6 pr-6 pl-14 cursor-pointer peer-checked:border-[3px] border-2 peer-checked:border-green-200 border-gray-400 rounded-2xl uppercase'>
                                Credit Card
                                <img src="/images/icons/cc_Icons.webp" alt="cc_Icons" />
                            </span>
                            <div className="h-0 overflow-hidden peer-checked:h-auto peer-checked:p-2">
                                <PaymentForm handleChange={handleChange} onSubmit={onSubmit} register={register} setValue={setValue} errors={errors} />
                            </div>
                        </div>
                    </label>
                </li>
                <li className='py-2'>
                    <label htmlFor="vod_cash" className='block text-black opacity-25'>
                        <div className='relative flex flex-col'>
                            <input
                                type="radio"
                                name="payment_method"
                                id="vod_cash"
                                className="hidden peer"
                                value="vod_cash"
                                disabled
                                {...register("payment_method")}
                            />
                            <CustomRadioBtnCheck />
                            <CustomRadioBtnUnCheck />
                            <span className='flex justify-between items-center text-xl font-semibold py-6 pr-6 pl-14 cursor-pointer peer-checked:border-[3px] border-2 peer-checked:border-green-200 border-gray-400 rounded-2xl uppercase'>
                                {t('vod_cash')}
                                <img src="/images/icons/vod_cash.webp" alt="vod_cash_Icons" />
                            </span>
                        </div>
                    </label>
                </li>
                <li className='py-2'>
                    <label htmlFor="etisalat_cash" className='block text-black opacity-25'>
                        <div className='relative flex flex-col'>
                            <input
                                type="radio"
                                name="payment_method"
                                id="etisalat_cash"
                                className="hidden peer"
                                value="etisalat_cash"
                                disabled
                                {...register("payment_method")}
                            />
                            <CustomRadioBtnCheck />
                            <CustomRadioBtnUnCheck />
                            <span className='flex justify-between items-center text-xl font-semibold py-6 pr-6 pl-14 cursor-pointer peer-checked:border-[3px] border-2 peer-checked:border-green-200 border-gray-400 rounded-2xl uppercase'>
                                {t('etisalat_cash')}
                                <img src="/images/icons/etisalat_cash.webp" alt="etisalat_cash_Icons" />
                            </span>
                        </div>
                    </label>
                </li>
                <li className='py-2'>
                    <label htmlFor="insta_pay" className='block text-black opacity-25'>
                        <div className='relative flex flex-col'>
                            <input
                                type="radio"
                                name="payment_method"
                                id="insta_pay"
                                className="hidden peer"
                                value="insta_pay"
                                disabled
                                {...register("payment_method")}
                            />
                            <CustomRadioBtnCheck />
                            <CustomRadioBtnUnCheck />
                            <span className='flex justify-between items-center text-xl font-semibold py-6 pr-6 pl-14 cursor-pointer peer-checked:border-[3px] border-2 peer-checked:border-green-200 border-gray-400 rounded-2xl uppercase'>
                                {t('insta_pay')}
                                <img src="/images/icons/insta_pay.webp" alt="insta_pay_Icons" />
                            </span>
                        </div>
                    </label>
                </li>
                <li className='py-2'>
                    <label htmlFor="valu" className='block text-black opacity-25'>
                        <div className='relative flex flex-col'>
                            <input
                                type="radio"
                                name="payment_method"
                                id="valu"
                                className="hidden peer"
                                value="valu"
                                disabled
                                {...register("payment_method")}
                            />
                            <CustomRadioBtnCheck />
                            <CustomRadioBtnUnCheck />
                            <span className='flex justify-between items-center text-xl font-semibold py-6 pr-6 pl-14 cursor-pointer peer-checked:border-[3px] border-2 peer-checked:border-green-200 border-gray-400 rounded-2xl uppercase'>
                                {t('valu')}
                                <img src="/images/icons/valu.webp" alt="valu_Icons" />
                            </span>
                        </div>
                    </label>
                </li>
                <li className='py-2'>
                    <label htmlFor="COD" className='block text-black'>
                        <div className='relative flex flex-col'>
                            <input
                                type="radio"
                                name="payment_method"
                                id="COD"
                                className="hidden peer"
                                value="COD"
                                defaultChecked
                                {...register("payment_method")}
                            />
                            <CustomRadioBtnCheck />
                            <CustomRadioBtnUnCheck />
                            <span className='flex justify-between items-center text-xl font-semibold py-6 pr-6 pl-14 cursor-pointer peer-checked:border-[3px] border-2 peer-checked:border-green-200 border-gray-400 rounded-2xl uppercase'>
                                {t('cod')}
                                <img src="/images/icons/cod.webp" alt="cod_Icons" />
                            </span>
                        </div>
                    </label>
                </li>
            </ul>
        </>
    );
}

export default memo(PaymentMethod)