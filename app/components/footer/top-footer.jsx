import { Link } from "@remix-run/react";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CampaignMonitorForm from "~/components/footer/companinMonitor";

export default function TopFooter() {
  const { t } = useTranslation("footer");
  return (
    <div className="bg-primary-100">
      <div className="container flex flex-col-reverse justify-between px-5 m-auto md:py-16 md:flex-row py-9">
        <div className="w-full mt-5  md:w-1/3 md:mt-0">
          <h4 className="text-2xl font-bold text-green-500  md:text-4xl">
            {t("faqs_title")}
          </h4>
          <p className="mt-2 mb-6 text-sm font-semibold text-green-600  md:text-xl">
            {t("faqs_para")}
          </p>
          <Link
            to=""
            className="block px-10 py-4 text-white bg-green-200 cursor-pointer  rounded-100 w-fit hover:bg-green-400"
          >
            {t("faqs_button")}{" "}
          </Link>
        </div>
        <div className="w-full  md:w-3/5">
          <h4 className="text-2xl font-bold text-green-500  md:text-4xl">
            {t("subscription_title")}
          </h4>
          <p className="mt-2 mb-6 text-sm font-semibold text-green-600  md:text-xl">
            {t("subscription_para")}
          </p>
          <CampaignMonitorForm />
        </div>
      </div>
    </div>
  );
}
