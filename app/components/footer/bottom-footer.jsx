import { Link } from "@remix-run/react";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from 'react-i18next';



export default function BottomFooter() {
    const { t } = useTranslation('footer');
    return (

        <div className=" bg-black">
            <div className="container flex justify-between items-center m-auto md:py-4 md:flex-row flex-col-reverse px-5 py-9">
                <p className=" text-gray-50 text-base font-medium">{t('copy_right')}</p>
                <div className="images flex items-center gap-x-2">
                    <img src="/images/footer/COD.png" alt="" className=" w-fit h-6" />
                    <img src="/images/footer/visa.png" alt="" className=" w-fit h-6" />
                    <img src="/images/footer/master.png" alt="" className=" w-fit h-6" />
                    <img src="/images/footer/etisalat.png" alt="" className=" w-fit h-6" />
                </div>
                <a href="https://www.mitchdesigns.com/" className="flex gap-x-2 items-center opacity-40">
                    <img src="/images/footer/Logomark.png" alt="" className=" w-7 h-7" />
                    <div className="text">
                        <p className=" text-gray-300 text-[10px] font-normal">Web Design by</p>
                        <p className=" text-gray-300 text-sm font-medium">MITCH DESIGNS</p>
                    </div>
                </a>
            </div>
        </div>

    )
}
