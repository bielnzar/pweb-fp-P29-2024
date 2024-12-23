import { createRouter, createWebHistory } from 'vue-router';

// Public Pages
import LandingPage from '../views/LandingPage.vue';
import NewsPage from '../views/NewsPage.vue';
import LoginPage from '../views/LoginPage.vue';

// Admin Pages
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import AdminCrowdfundDetail from '../views/admin/AdminCrowdfundDetail.vue';
import AdminEditCrowdfund from '../views/admin/AdminEditCrowdfund.vue';
import AdminCreateCrowdfund from '../views/admin/AdminCreateCrowdfund.vue';

// Middleware for protecting admin routes
const requireAdminAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage
  if (user?.role === 'admin') {
    next();
  } else {
    next('/login'); // Redirect to login if not authorized
  }
};

const routes = [
  // Public Routes
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/news', name: 'News', component: NewsPage },
  { path: '/login', name: 'Login', component: LoginPage },

  // Admin Routes
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: requireAdminAuth,
  },
  {
    path: '/admin/:crowdfund_id',
    name: 'AdminCrowdfundDetail',
    component: AdminCrowdfundDetail,
    beforeEnter: requireAdminAuth,
  },
  {
    path: '/admin/:crowdfund_id/edit',
    name: 'AdminEditCrowdfund',
    component: AdminEditCrowdfund,
    beforeEnter: requireAdminAuth,
  },
  {
    path: '/admin/create',
    name: 'AdminCreateCrowdfund',
    component: AdminCreateCrowdfund,
    beforeEnter: requireAdminAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
