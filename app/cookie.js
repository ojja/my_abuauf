import { createCookie } from "@remix-run/node";
import Cookies from "js-cookie";

// export let i18nCookie = createCookie('i18n', {
//   sameSite: 'lax',
//   path: '/',
// })
export let i18nCookie = Cookies.set("i18n", {
  sameSite: 'lax',
  path: '/',
});
// export let i18nCookie = createCookie('i18n', {
//   sameSite: 'lax',
//   path: '/',
// })