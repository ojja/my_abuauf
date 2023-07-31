import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import FormatCurrency from "~/utils/FormatCurrency";
import Quickview from "../Quickview";

const SmallWidget = ({ product }: any) => {
    let [openQuick, setOpenQuick] = useState(false)
    function openModal() {
        setOpenQuick(!openQuick)
    }
    return (
        <div className="flex items-center w-full p-4 border-b border-gray-300">
            <div className="flex-shrink-0  w-20 h-20 overflow-hidden">
                <div className="upsell_item_img border-2 border-gray-100 rounded-xl overflow-hidden h-full">
                    <img className=" h-full w-full" src={product.main_image} alt={product.name} />
                </div>
            </div>
            <div className="flex flex-col flex-1 ml-4">
                <a className=" text-base font-semibold text-black">{product.name}</a>
                <span className="  w-fit bg-yellow-910 rounded h-[18px] flex rtl:flex-row-reverse gap-x-[2px] px-1 text-5xl">
                    {/* {FormatCurrency(product.price , 'EGP' , ["text-sm font-normal", "text-2xl font-semibold ltr:-ml-0.5 rtl:-mr-0.5", "text-sm font-normal"])} */}
                    <FormatCurrency value={product.price}/>
                </span>
            </div>
            <div className="">
                <span onClick={openModal} className="flex items-center justify-center  w-12 h-12 p-1">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="24" fill="#163300" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.1424 25.0723L16.7366 25.4689L16.7399 25.4639C16.7737 25.4135 16.8093 25.3643 16.8466 25.3164C16.9257 25.2114 17.0466 25.0564 17.2082 24.8689C17.6431 24.3655 18.1231 23.903 18.6424 23.4873C19.9016 22.4798 21.7132 21.5006 23.9999 21.5006C26.2866 21.5006 28.0982 22.4798 29.3574 23.4873C29.8764 23.9031 30.3562 24.3656 30.7907 24.8689C30.9558 25.0603 31.1123 25.2588 31.2599 25.4639L31.2632 25.4689L31.8574 25.0723C32.4516 24.6764 32.4516 24.6756 32.4507 24.6756L32.4499 24.6739L32.4466 24.6689L32.4382 24.6564C32.3929 24.5896 32.3456 24.524 32.2966 24.4598C32.1991 24.3306 32.0582 24.1514 31.8741 23.9364C31.3814 23.3661 30.8375 22.8423 30.2491 22.3714C28.8316 21.2364 26.7141 20.0723 23.9999 20.0723C21.2866 20.0723 19.1691 21.2364 17.7499 22.3723C17.1618 22.8429 16.6182 23.3665 16.1257 23.9364C15.9269 24.1678 15.7386 24.408 15.5616 24.6564L15.5532 24.6689L15.5499 24.6731V24.6748L15.5491 24.6756L16.1424 25.0723ZM23.9999 27.2148C24.2813 27.2148 24.5599 27.1593 24.8198 27.0517C25.0797 26.944 25.3159 26.7862 25.5149 26.5872C25.7138 26.3883 25.8716 26.1521 25.9793 25.8922C26.087 25.6322 26.1424 25.3536 26.1424 25.0723C26.1424 24.7909 26.087 24.5123 25.9793 24.2524C25.8716 23.9924 25.7138 23.7562 25.5149 23.5573C25.3159 23.3583 25.0797 23.2005 24.8198 23.0929C24.5599 22.9852 24.2813 22.9298 23.9999 22.9298C23.4316 22.9298 22.8865 23.1555 22.4846 23.5574C22.0828 23.9593 21.857 24.5043 21.857 25.0727C21.857 25.641 22.0828 26.1861 22.4846 26.588C22.8865 26.9898 23.4316 27.2156 23.9999 27.2156V27.2148Z" fill="white" />
                    </svg>

                </span>
                {openQuick && <Quickview openQuick={openQuick} openModal={openModal} product={product} />}
            </div>
        </div>
    );
};

export default SmallWidget;
