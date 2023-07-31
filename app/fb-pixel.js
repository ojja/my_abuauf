import { FB_PIXELID, FB_Access_Token } from "./credentials";

const pixelId = FB_PIXELID;
let isPixelInitialized = false;

export const initFacebookPixel = () => {
  if (isPixelInitialized) {
    return;
  }
  
  !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
  }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', pixelId);
  fbq('track', 'PageView');
  
  isPixelInitialized = true;
}
export const trackAddToCart = (currency, value) => {
    window.fbq('track', 'AddToCart', {
        currency,
        value,
    });
}
