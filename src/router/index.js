// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useFetch } from '@/composables/useFetch.js';
import HomeView from '../views/HomeView.vue';
import SignupView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import SharedLayout from '@/views/Dashboard/SharedLayout.vue';
import Generation from '@/views/Dashboard/Generation.vue';
import Correction from '@/views/Dashboard/Correction.vue';
import Marks from '@/views/Dashboard/Marks.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import Users from '@/views/Dashboard/Users.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // public routes
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    // protected routes
    {
      path: '/admin',
      component: SharedLayout,
      name:'admin',
      children: [
        { path: '', component: Dashboard, name: 'dash' },
        { path: 'generation', component: Generation, name: 'gen' },
        { path: 'correction', component: Correction, name: 'corr' },
        { path: 'marks', component: Marks, name: 'marks' },
        { path: 'users',  component: Users , name: 'users' },
      ],
      meta: { requiresAuth: true },
    },
  ],
});

async function fetchUserDetails() {
  const { data, error } = await useFetch('auth/users/me').get().json();
  if (error.value) {
    console.error('Failed to fetch user details:', error.value);
    return null;
  }
  return data.value;
}

router.beforeEach(async (to, from, next) => {
  // Check if the route being accessed requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Try to get the authentication token from localStorage
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
      // No token found, redirect to the login page
      next({ name: 'login' });
    } else {
      // Token found, fetch user details
      const user = await fetchUserDetails();
      if (!user) {
        // Failed to fetch user details, redirect to login
        next({ name: 'login' });
      } else if (to.name === 'users' && !user.is_superuser) {
        // User is not a superuser, redirect to home or another page
        next({ name: 'home' });
      } else {
        // User is authenticated and authorized, proceed to the route
        next();
      }
    }
  } else {
    // If the route does not require authentication, simply proceed
    next();
  }
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }
});

export default router;
