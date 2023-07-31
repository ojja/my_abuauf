import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { v4 } from 'uuid';
import i18n from 'i18next';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
interface GalleryImage {
    imageSrc: string;
}
interface GalleryHomeProps {
    galleryImages: GalleryImage[];
}

export default function GalleryHome({ galleryImages = [] }: GalleryHomeProps) {
    const CustomPrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={`left-12 absolute top-1/2 -translate-y-1/2 bg-green-200 rounded-full p-5 text-white z-10 cursor-pointer hover:bg-green-400 ${className}`} onClick={onClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6291 2.82887L22.2001 11.4019C22.2813 11.4793 22.3459 11.5724 22.3901 11.6755C22.4343 11.7787 22.457 11.8897 22.457 12.0019C22.457 12.1141 22.4343 12.2251 22.3901 12.3282C22.3459 12.4314 22.2813 12.5245 22.2001 12.6019L13.6291 21.1719L12.4291 19.9719L19.5431 12.8579L1.88608 12.8579L1.88608 11.1429L19.5421 11.1429L12.4281 4.02888L13.6291 2.82887Z" fill="currentColor" />
                </svg>

            </div>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={`right-12 rotate-180 absolute top-1/2 -translate-y-1/2 bg-green-200 rounded-full p-5 text-white z-10 cursor-pointer hover:bg-green-400 ${className}`} onClick={onClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                    <path d="M13.6291 2.82887L22.2001 11.4019C22.2813 11.4793 22.3459 11.5724 22.3901 11.6755C22.4343 11.7787 22.457 11.8897 22.457 12.0019C22.457 12.1141 22.4343 12.2251 22.3901 12.3282C22.3459 12.4314 22.2813 12.5245 22.2001 12.6019L13.6291 21.1719L12.4291 19.9719L19.5431 12.8579L1.88608 12.8579L1.88608 11.1429L19.5421 11.1429L12.4281 4.02888L13.6291 2.82887Z" fill="currentColor" />
                </svg>
            </div>
        );
    };

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        // fade: true,
        arrows: true,
        rtl: i18n.language === "ar" ? true : false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };


    return (
        <div className="overflow-hidden gallery-slider-wrapper"
        >
            <Slider
                {...settingsMain}
                className="order-1"
            >
                {galleryImages.map(slide => (
                    <div key={v4()} className="pointer-events-none">
                        <img
                            className="w-full slick-slide-image"
                            src={slide.imageSrc}
                        />
                    </div>
                ))}
            </Slider>

        </div>
    );
}