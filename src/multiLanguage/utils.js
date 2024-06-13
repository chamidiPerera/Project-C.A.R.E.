import { useTranslation } from "react-i18next";

export const { t, i18n } = useTranslation();

export const changeLanguage = (language) => {
  i18n.changeLanguage(language);
};