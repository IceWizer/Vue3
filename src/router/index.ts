import useUserData from '@/auth/utils/useUserData';
import pages from '@/router/routes/pages';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...pages,
        {
            path: "/:pathMatch(.*)*",
            redirect: "error-404"
        }]
})

router.beforeEach((to, from, next) => {
    // check if the route has requires auth
    if (to.meta?.requiresAuth) {
        if (!useUserData.isUserLoggedIn()) {
            next({ name: 'login' });
        }
    } else if (to.meta?.redirectIfLoggedIn && useUserData.isUserLoggedIn()) {
        next({ name: 'dashboard' });
    }
    next();
});
export default router;
