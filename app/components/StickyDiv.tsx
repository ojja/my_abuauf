import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const StickyDiv = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  const [initialRight, setInitialRight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if(!isSticky)
      calculateInitialRight();
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition >= 225);
    };

    const calculateInitialRight = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        const pixels = window.innerWidth - (i18n.language === 'en' ? rect.right : rect.left);
        // console.log('rect', rect)
        // console.log('pixels', pixels)
        // console.log('window.innerWidth', window.innerWidth)
        setInitialRight(pixels);
      }
    };

    calculateInitialRight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateInitialRight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateInitialRight);
    };
  }, [isSticky]);

  return (
    <div
      ref={stickyRef}
      key={i18n.language}
      className={`${isSticky ? 'fixed top-5' : ''}`}
      style={{
        [i18n.language === 'en' ? 'right' : 'left']: initialRight,
      }}

    >
      {children}
    </div>
  );
};

export default StickyDiv;
