import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.json';
import sr from './sr.json';

Vue.use(VueI18n);

const messages = {
  en,
  sr
};

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages
});

export default i18n;
