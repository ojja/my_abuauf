import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { v4 } from "uuid";
import { useTranslation } from 'react-i18next';
import { useLocation } from '@remix-run/react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function ChangeLanguage() {
    const { pathname } = useLocation();
    const { t, i18n } = useTranslation();
    // const history = useHistory();

    function handleChangeLanguage(lang: string) {
        i18n.changeLanguage(lang);
        const newPathname = `/${lang}${pathname}`;
        console.log('newPathname', newPathname)
    }
    // console.clear();
    // console.log('i18n', i18n)
    return (
        <div className="hidden lg:ml-8 lg:flex">
            {i18n.language === 'en' ?
                <span className="block ml-3 cursor-pointer font-sans-ar" onClick={() => handleChangeLanguage('ar')}>العربيه</span>
                :
                <span className="block ml-3 cursor-pointer" onClick={() => handleChangeLanguage('en')}>English</span>
            }
        </div>
    )
}
