import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";
import en from "./en.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: getLocales()[0].languageCode,
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
