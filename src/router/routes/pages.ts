const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
            requiresAuth: true,
            redirectIfLoggedIn: false,
            layout: 'default'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/pages/authentication/Register.vue'),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
            layout: 'full'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/pages/authentication/Login.vue'),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
            layout: 'full'
        }
    },
    {
        path: '/verify-email/:token',
        name: 'verify-email',
        component: () => import('@/views/pages/authentication/VerifyEmail.vue'),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
            layout: 'full'
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/pages/authentication/Logout.vue'),
        meta: {
            requiresAuth: true,
            redirectIfLoggedIn: false,
            layout: 'full'
        }
    },
    {
        path: '/forgotten-password',
        name: 'forgotten-password',
        component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
            layout: 'full'
        }
    },
    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: () => import('@/views/pages/authentication/ResetPassword.vue'),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
            layout: 'full'

        }
    },
    {
        path: '/error-404',
        name: 'error-404',
        component: () => import('@/views/pages/miscellaneous/Error404.vue'),
        meta: {
            requiresAuth: true,
            redirectIfLoggedIn: false,
            layout: 'default'
        }
    }
];
export default routes;