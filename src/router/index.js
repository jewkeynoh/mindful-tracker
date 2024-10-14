import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';
import ProfileView from "@/views/ProfileView.vue";
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: AnalyticsView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        }
    ]
});

export default router;