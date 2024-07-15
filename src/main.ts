import '@/assets/styles.scss';
import i18n from '@/plugins/i18n';
import editor from '@/plugins/editor';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

createApp(App)
  .use(router)
  .use(i18n)
  .use(editor)
  .mount('#app');
