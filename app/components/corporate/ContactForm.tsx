import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import Loader from '../Loader';
import { INPUT_CLASSES, LABEL_CLASSES } from "~/commonUIClasses";
import { contactUsForm } from '~/utils/corporateAPI';
import Msg from "~/components/Msg";

export default function ContactForm() {
    const { t } = useTranslation('fields');
    const { i18n } = useTranslation();
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSet] = useState(false);
    const [isMsg, setIsMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        msg: '',
    });
    const [errors, setErrors] = useState({
        response: '',
        general: ''
    });
    const onSubmit = (formData: FormData) => {
        console.log(formData); // Access form data here
        contactUsForm(formData)
            .then((responseData: any) => {
                // Perform the necessary actions after registration
                if (responseData === 1) {
                    setIsMsg(true);
                    setMsg('thank you');
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: 'An error occurred.'
                    }));
                }
                setIsLoading(false);
            })
            .catch((error) => {
                // Handle the registration error
                console.log('Failed to register:', error);
            });
    };
    return (
        <div className="relative w-full"
            key={i18n.language}>
            {isLoading ? (
                <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                    <Loader />
                </div>
            ) : ('')}
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.general && (
                    <p className="p-2 my-2 text-xs text-red-800 bg-red-100 border border-red-500 rounded">
                        {errors.general}
                    </p>
                )}
                {isMsg ?
                    <Msg
                        color="green"
                        message={t(`${msg}`)}
                    />
                    :
                    <div className="grid grid-cols-2 gap-4 py-4 pb-5">
                        <div>
                            <label htmlFor="" className={`${LABEL_CLASSES}`}> {t('first_name')} </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    className={`${INPUT_CLASSES} ${formErrors.firstname && 'border-red-500'}`}
                                    {...register('firstname', {
                                        required: { value: true, message: t('first_name_required') }
                                    })}
                                />
                                {formErrors.firstname && (
                                    <p className="mt-1 text-xs text-red-500">{formErrors.firstname.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="" className={`${LABEL_CLASSES}`}> {t('last_name')} </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    className={`${INPUT_CLASSES} ${formErrors.lastname && 'border-red-500'}`}
                                    {...register('lastname', {
                                        required: { value: true, message: t('last_name_required') }
                                    })}
                                />
                                {formErrors.lastname && (
                                    <p className="mt-1 text-xs text-red-500">{formErrors.lastname.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="" className={`${LABEL_CLASSES}`}> {t('email_address')} </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    className={`${INPUT_CLASSES} ${formErrors.email && 'border-red-500'}`}
                                    {...register('email', {
                                        required: { value: true, message: t('email_required') }
                                    })}
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-xs text-red-500">{formErrors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="" className={`${LABEL_CLASSES}`}> {t('phone_number')} </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    placeholder=""
                                    className={`${INPUT_CLASSES} ${formErrors.phone && 'border-red-500'}`}
                                    {...register('phone', {
                                        required: { value: true, message: t('phone_required') }
                                    })}
                                />
                                {formErrors.phone && (
                                    <p className="mt-1 text-xs text-red-500">{formErrors.phone.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="" className={`${LABEL_CLASSES}`}> {t('note')} </label>
                            <div className="mt-1">
                                <textarea
                                    // type="text"
                                    // type="textarea"
                                    id="msg"
                                    {...register("msg", {
                                        required: t("note_required"),
                                        minLength: {
                                            value: 5,
                                            message: t("note_length")
                                        },
                                    })}
                                    className={`${INPUT_CLASSES} ${formErrors.msg && "border-red-500"}`}
                                />
                                {formErrors.msg && (
                                    <p className="mt-1 text-xs text-red-500">{formErrors.msg.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <Button
                                name={t('send')}
                                width="full"
                                type="submit"
                            />
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}
