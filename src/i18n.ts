import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import sp from './locales/sp.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      zh: { translation: zh },
      sp: { translation: sp },
    },
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 如果当前语言未找到，则使用此语言
    interpolation: {
      escapeValue: false, // React 已经安全处理了 XSS
    },
});