import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  ns: ["translation", "common", "button", "label"],
  defaultNS: "translation",
  fallbackNS: "common",
  // lng: "en-US",
  fallbackLng: "en",
  resources: {
    en: {
      button: {},
      common: {},
      label: {},
      translation: {},
    },
    zh: {
      button: {},
      common: {},
      label: {},
      translation: {},
    },
  },
});
