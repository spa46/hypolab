import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Login": "Login",
        "Register": "Register",
        "Email": "Email",
        "Password": "Password",
        "Username": "Username"
      }
    },
    ko: {
      translation: {
        "Login": "로그인",
        "Register": "회원가입",
        "Email": "이메일",
        "Password": "비밀번호",
        "Username": "사용자 이름"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;