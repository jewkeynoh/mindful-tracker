import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';
import ProfileView from "@/views/ProfileView.vue";
import NotFoundView from '@/views/NotFoundView.vue';
import SavedView from '@/views/SavedView.vue';
import LoginView from '@/views/LoginView.vue';
import useAuth from '@/useAuth';

const { isAuthenticated } = useAuth();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/analytics', name: 'analytics', component: AnalyticsView },
        { path: '/saved', name: 'saved', component: SavedView },
        { path: '/profile', name: 'profile', component: ProfileView },
        { path: '/login', name: 'login', component: LoginView },
        { path: '/:catchAll(.*)', name: 'not-found', component: NotFoundView }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !isAuthenticated.value) {
        next('/login');
    } else {
        next();
    }
});

export default router;
