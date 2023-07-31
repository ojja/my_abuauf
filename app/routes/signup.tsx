import { useTranslation } from "react-i18next";
import RegisterForm from "~/components/account/RegisterForm";
import SocialLogin from "~/components/account/SocialLogin";
import Dots from "~/components/Dots";

export default function signup() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="bg-gray-100 py-20 lg:py-[120px]">
        <div className="container mx-auto w-[525px] max-w-full">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-8 text-center sm:px-12"
              >
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">{t('sign_up')}</h1>
                <RegisterForm />
                <p className="mb-6 mt-4 text-base text-gray-400">Connect With</p>
                <SocialLogin />
                <Dots />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
