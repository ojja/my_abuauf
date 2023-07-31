import { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import { RiCopyleftLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { v4 } from 'uuid';
import { getExtraProducts } from "~/api/extraProducts";
import Loader from "./Loader";
import SmallWidget from "./product/SmallWidget";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}
export default function AlsoLikeSlider() {
    const flickityOptions = {
        initialIndex: 2,
        arrowShape: 'M 45.711 76.99 L 20.486 51.758 C 20.249 51.532 20.059 51.257 19.928 50.953 C 19.797 50.649 19.73 50.324 19.73 49.993 C 19.73 49.664 19.797 49.335 19.928 49.032 C 20.059 48.732 20.249 48.456 20.486 48.227 L 45.711 23.009 L 49.242 26.54 L 28.305 47.475 L 80.27 47.475 L 80.27 52.521 L 28.308 52.521 L 49.246 73.459 L 45.711 76.99 Z'
    }
    const [extraProducts, setExtraProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const categorySlug = 'food';
    const count = 5
    useEffect(() => {
        console.log('FETCHING')
        if (inView) {
            console.log('FETCHING 1 if')
            const fetchData = async () => {
                setLoading(true);
                try {
                    const products = await getExtraProducts(categorySlug, count);
                    setExtraProducts(prevProducts => [...prevProducts, ...products]);
                } catch (error) {
                    console.error('Error fetching extra products:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            console.log('FETCHING 1 else')
        }
    }, [categorySlug, count, inView]);
    console.log('extraProducts', extraProducts)
    return (
        <div ref={ref} className="relative">
            {loading ? (
                <div className="flex items-start justify-between w-full animate-pulse p-4">
                    <div className="flex items-start w-4/5">
                        <div>
                            <div className="flex items-center justify-center w-24 h-24 mr-5 bg-gray-300 rounded-md">
                                <span className="flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full mr-3">
                            <div className="w-full h-3 mb-4 bg-gray-200 rounded-full"></div>
                            <span className="flex my-1 text-xs font-light text-gray-400 capitalize">
                                <div className="w-1/2 h-2 mr-2 bg-gray-200 rounded-full"></div>
                                <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                            </span>
                            <span className="flex my-1 text-xs font-light text-gray-400 capitalize">
                                <div className="w-1/2 h-2 mr-2 bg-gray-200 rounded-full"></div>
                                <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                            </span>
                        </div>
                    </div>
                </div>
            ) :
                <Flickity
                    options={flickityOptions}
                    className={'flex flex-wrap'}
                    reloadOnUpdate
                >
                    {extraProducts.map((product) => (
                        <SmallWidget key={v4()} product={product} />
                    ))}
                </Flickity>
            }
        </div>
    )
}
