import { useTranslation } from 'react-i18next';


export default function Branches() {
    const { t } = useTranslation();


    return (

        <div className="flex items-center justify-between p-5  bg-green-300 mt-6 rounded-[20px]">

            <div className="flex items-center gap-x-2">
                <div>
                    <img src="/images/car.png" alt="" width='57' height='48' />
                </div>
                <p className="text-xs font-semibold text-green-200 md:text-base ">التوصيل في خلال ساعتين في <span className="underline ">الشروق, القاهرة</span> </p>
            </div>
            <button className="rounded-100 bg-white whitespace-nowrap py-2.5 px-5 text-base font-semibold text-green-200">تغيير المنطقة</button>

        </div>

    )
}
