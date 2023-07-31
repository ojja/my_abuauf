import { useTranslation } from "react-i18next";
import ForgotForm from "~/components/account/ForgotForm";

export default function Forgot() {
  const { t } = useTranslation();
  return (
    <div>
      <section className="py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 min-w-[525px]">
            <div className="w-full px-4">
              <div
                className="relative mx-auto max-w-[525px] overflow-hidden md:px-[60px] bg-white py-12 px-10 rounded-[32px] shadow-2xl"
              >
                <h1 className="mb-14 leading-none tracking-tight text-center text-black text-4xl font-bold">{t('forgot_password')}</h1>
                <ForgotForm/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
