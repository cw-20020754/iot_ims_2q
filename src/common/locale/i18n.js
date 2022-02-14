import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "../locale/ko.json";

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: ko,
    },
  },
  lng: "ko",
  fallbackLng: "ko",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
