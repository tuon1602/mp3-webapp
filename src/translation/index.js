import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import vn from "./resource/vn.json";
import en from "./resource/en.json";
import jp from "./resource/jp.json";
import fr from "./resource/fr.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vn: {
      translation: vn,
    },
    fr: {
      translation: fr,
    },
    jp: {
      translation: jp,
    },
  },
  lng: localStorage.getItem("lng") || "en",
});
export default i18next;
