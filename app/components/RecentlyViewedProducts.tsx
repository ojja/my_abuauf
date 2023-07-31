import Slider from "react-slick";
import { useRecentView } from "~/stores/allstores";
import { ProductWidget } from "./product/ProductWidget";
import { useProductStore } from "~/stores/product";

// export default function RecentlyViewedProducts() {
//     const {
//         recentItems,
//     } = useRecentView();
//     // console.log('recentItems', recentItems)
//     return (
//         <div className="mt-10 bg-white border-t-2">
//             <div className="container px-4 py-16 mx-auto sm:py-24 sm:px-6">
//                 <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900">Recently Viewed Products</h2>
//                 <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    
//                     {recentItems.sort(() => Math.random() - 0.5)
//                         .slice(0, 5)
//                         .map((productData: any) => (
//                             <ProductWidget product={productData} key={productData.id} />
//                         ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
export default function RecentlyViewedProducts() {
    const { recentItems } = useRecentView();

    // Slick Carousel settings
    const settings = {
        dots: true,
        arrows:true,
        infinite: false,
        // fade: true,
        speed: 2000,
        slidesToShow: 4, // Adjust the number of items visible on each slide
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="mt-10 bg-white border-t-2">
            <div className="container px-4 py-16 mx-auto sm:py-24 sm:px-6">
                <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900">Recently Viewed Products</h2>
                <div className="mt-6">
                    <Slider {...settings}>
                        {recentItems
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 5)
                            .map((productData: any) => (
                                <ProductWidget product={productData} key={productData.id} isItemInWishlist={false} />
                            ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

