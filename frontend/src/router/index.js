import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import NewsPage from '../views/NewsPage.vue';
import LoginPage from '../views/LoginPage.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import AdminCrowdfundDetail from '../views/AdminCrowdfundDetail.vue';
import AdminCrowdfundEdit from '../views/AdminEditCrowdfund.vue';
import AdminCreateCrowdfund from '../views/AdminCreateCrowdfund.vue';

function requireAdminAuth(to, from, next) {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload JWT
      const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

      if (payload.exp && payload.exp < currentTime) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token'); // Hapus token yang kadaluarsa
        next('/login');
      } else if (payload.email && payload.email.endsWith('@admin.com')) {
        next();
      } else {
        alert('Unauthorized access: Admin privileges required.');
        next('/login');
      }
    } catch (error) {
      console.error('Token decoding error:', error);
      alert('Invalid session. Please login again.');
      localStorage.removeItem('token'); // Hapus token yang tidak valid
      next('/login');
    }
  } else {
    alert('Please login to access this page.');
    next('/login');
  }
}

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/news', name: 'News', component: NewsPage },
  { path: '/login', name: 'Login', component: LoginPage },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: requireAdminAuth, // Autentikasi admin untuk halaman dashboard
  },
  {
    path: '/admin/:crowdfund_id',
    name: 'AdminCrowdfundDetail',
    component: AdminCrowdfundDetail,
    beforeEnter: requireAdminAuth, // Autentikasi admin untuk halaman detail
  },
  {
    path: '/admin/:crowdfund_id/edit',
    name: 'AdminCrowdfundEdit',
    component: AdminCrowdfundEdit,
    beforeEnter: requireAdminAuth, // Autentikasi admin untuk halaman edit
  },
  {
    path: '/admin/create',
    name: 'AdminCreateCrowdfund',
    component: AdminCreateCrowdfund,
    beforeEnter: requireAdminAuth, // Autentikasi admin untuk halaman create
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
