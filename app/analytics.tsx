// analytics.js

import TagManager from 'react-gtm-module';
import { initFacebookPixel } from './fb-pixel';
import TiktokPixel from 'tiktok-pixel';

export const initializeAnalytics = () => {
  // Initialize TagManager
  const tagManagerArgs = {
    gtmId: 'GTM-TTS4BML',
  };
  TagManager.initialize(tagManagerArgs);

  // Initialize Facebook Pixel
  initFacebookPixel();

  // Initialize Tiktok Pixel
  const advancedMatching = {
    // email: '...',
    // phone_number: '...',
  };
  const options = {
    debug: false,
  };
  TiktokPixel.init('CIA567BC77U8RIVTN69G', advancedMatching, options);
  TiktokPixel.pageView();
};
