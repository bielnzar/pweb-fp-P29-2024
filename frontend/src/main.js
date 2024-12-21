import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';
// import './assets/styles/global.css';
// import './assets/styles/landing.css';
// import './assets/styles/news.css';
// import './assets/styles/login.css';

createApp(App).use(router).mount('#app');