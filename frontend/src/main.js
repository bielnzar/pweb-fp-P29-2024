import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';
import './assets/styles/global.css';
import './assets/styles/header-footer.css';
import './assets/styles/landing.css';
import './assets/styles/responsif.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

createApp(App).use(router).mount('#app');