import { useTranslation } from 'react-i18next';
import GalleryHome from './HeroGallery';

const HeroImages = [
    {
        imageSrc: "/images/banner_01.webp",
    },
    {
        imageSrc: "/images/banner_02.webp",
    },
    {
        imageSrc: "/images/banner_01.webp",
    },
];

export default function HeroSection() {
    const { t } = useTranslation();
    return (
        <>
            <div className="">
               <GalleryHome galleryImages={HeroImages} />
            </div>
        </>
    )
}
