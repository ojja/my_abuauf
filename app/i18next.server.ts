import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next";
import i18nextOptions from "~/i18nextOptions"; // your i18n configuration file

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nextOptions.supportedLngs,
    fallbackLanguage: i18nextOptions.fallbackLng,
  },
  i18next: {
    ...i18nextOptions,
    backend: {
      loadPath: resolve("./locales/{{lng}}/{{ns}}.json"),
    },
  },
  plugins: [Backend],
});

export default i18next;