import { Site_Title } from "~/credentials";
import LoginForm from "~/components/account/LoginForm";
import CreateAccountBox from "~/components/account/CreateAccountBox";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "~/components/Breadcrumbs";


export const meta = () => {
  return {
    title: `Login | ${Site_Title}`
  }
}
export default function login() {
  const { t } = useTranslation();
  const breadcrumbs = {
    pages: [
      { name: t('home'), href: '/' },
      { name: t('login'), href: '#' },
    ]
  }
  return (
    <div className="h-full flex items-center justify-center">
      <section className="px-8 mx-auto pb-48">
        <div className="container">
          <div className="py-4">
            <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="justify-center" />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-5">
            <div className="w-full md:w-1/2">
              <LoginForm />
            </div>
            <div className="w-full md:w-1/2">
              <CreateAccountBox />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
