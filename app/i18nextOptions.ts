export default {
    // This is the list of languages your application supports
    supportedLngs: ["ar","en"],
    // debug:true,
    // This is the language you want to use in case
    // if the user language is not in the supportedLngs
    fallbackLng: "ar",
    // The default namespace of i18next is "translation", but you can customize it here
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    // Disabling suspense is recommended
    react: { useSuspense: false },
  };