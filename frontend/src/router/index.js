import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import NewsPage from '../views/NewsPage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/news', name: 'News', component: NewsPage },
  { path: '/login', name: 'Login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;