import { Link } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MenuDesktop({ menuDetails }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="hidden w-3/4 md:flex ltr:md:mr-24 rtl:md:ml-24 ">
      {menuDetails.menu.map((menu, index) => (
        <div className="w-1/3 " key={index}>
          <>
            <h4 className="mb-5 font-bold text-green-600 md:text-base">
              {i18n.language === "ar" ? menu.title : menu.title_en}
            </h4>
            <ul>
              {menu.pages.map((page, index) => (
                <li
                  className="text-white md:text-xl md:mb-2 hover:text-gray-100"
                  key={index}
                >
                  <Link to={page.url} className="">
                    {i18n.language === "ar" ? page.name : page.name_en}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        </div>
      ))}
    </div>
  );
}
