import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import { v4 } from 'uuid';
// import i18n from 'i18next';
interface GalleryProps {
  galleryImages: string[];
}

export default function Gallery({ galleryImages = [] }: GalleryProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [slider1, setSlider1] = useState<Slider | null>(null);
  const [slider2, setSlider2] = useState<Slider | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);


  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    // rtl: i18n.language === "ar" ? false : false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2,
  };

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    centerPadding: '10px',
    vertical: true,
    infinite: false,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 5,
          centerPadding: '30px',
          adaptiveHeight: true,
          variableWidth: true
        },
      },
    ],
  };

  if (galleryImages.length === 0) {
    galleryImages = ['/images/empty.jpg'];
  }

  return (
    <div className="flex flex-col-reverse overflow-hidden gallery-slider-wrapper md:flex-row" data-lang={language}>
      <div className="order-1 overflow-hidden md:w-10/12 rounded-3xl h-fit gallery">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={slider => (setSlider1(slider))}
          style={{ direction: i18n.language === "ar" ? 'rtl' : 'ltr' }}
        >
          {galleryImages.map(slide => (
            <div className="slick-slide " key={v4()}>
              <img
                className="slick-slide-image"
                src={`${slide}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:w-2/12 mr-2 gallery-thumbnail-slider-wrap max-h-[600px]">
        <Slider
          {...settingsThumbs}
          asNavFor={nav1}
          ref={slider => (setSlider2(slider))}
        >
          {galleryImages.map((slide, index) => (
            <div className={`thumbnail-slide rounded-xl overflow-hidden md:w-28 md:h-28 w-14 h-14`} key={index}>
              <img
                className="object-cover w-full h-full slick-slide-image"
                src={`${slide}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}