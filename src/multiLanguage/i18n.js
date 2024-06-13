import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from 'i18next-react-native-language-detector';

import en from './translations/en';
import es from './translations/es';
i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;