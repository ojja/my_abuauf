import { useTranslation } from "react-i18next";
import { INPUT_CLASSES, LABEL_CLASSES } from "~/commonUIClasses";

export default function ShippingInfo({ register, errors }: any) {
    const { t } = useTranslation('fields');
    return (
        (<div>
            <div className="grid grid-cols-4 gap-8">
                <div className="col-span-2">
                    <div>
                        <label htmlFor="" className={LABEL_CLASSES}>{t('first_name')}</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                className={`${INPUT_CLASSES} ${errors.first_name ? 'border-red-500' : ''}`}
                                {...register('first_name', {
                                    required: { value: true, message: t('first_name_required') }
                                })}
                            />
                            {errors.first_name && errors.first_name.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>)}
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <div>
                        <label htmlFor="" className={LABEL_CLASSES}> {t('last_name')} </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                className={`${INPUT_CLASSES} ${errors.last_name && 'border-red-500'}`}
                                {...register('last_name', {
                                    required: { value: true, message: t('last_name_required') }
                                })}
                            />
                            {errors.last_name && errors.last_name.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>)}
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        <label htmlFor="" className={LABEL_CLASSES}> {t('phone_number')} </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                placeholder=""
                                className={`${INPUT_CLASSES} ${errors.phone && 'border-red-500'}`}
                                {...register('phone', {
                                    required: { value: true, message: t('phone_required') }
                                })}
                            />
                            {errors.phone && errors.phone.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>)}
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        <label htmlFor="" className={LABEL_CLASSES}> {t('email_address')} </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                className={`${INPUT_CLASSES} ${errors.email && 'border-red-500'}`}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: t('email_address_required'),
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: t('email_address_format'),
                                    },
                                })}
                            />

                            {errors.email && errors.email.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.email.message}</p>)}
                        </div>
                    </div>
                </div>

                
            </div>
        </div>)
    );
}
