import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koTranslation from '../locales/ko.json';
import viTranslation from '../locales/vi.json';

const resources = {
  ko: {
    translation: koTranslation
  },
  vi: {
    translation: viTranslation
  }
};

// 저장된 언어 설정 가져오기
const savedLanguage = localStorage.getItem('language') || 'ko';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'ko',
    debug: true, // 디버그 모드 활성화
    interpolation: {
      escapeValue: false
    }
  });

// 언어 변경 시 로컬 스토리지에 저장
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

// 디버그: 현재 로드된 번역 확인
console.log('Loaded translations:', {
  ko_quickSelection: i18n.getResource('ko', 'translation', 'consultation.quickSelection'),
  ko_todayConsultations: i18n.getResource('ko', 'translation', 'consultation.todayConsultations'),
  vi_quickSelection: i18n.getResource('vi', 'translation', 'consultation.quickSelection'),
  vi_todayConsultations: i18n.getResource('vi', 'translation', 'consultation.todayConsultations'),
});

export default i18n;