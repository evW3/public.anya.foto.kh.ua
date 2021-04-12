import { createWebHistory, createRouter } from 'vue-router';


const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Gallery',
            meta: { layout: "main" },
            component: () => import('@views/Home.vue')
        },
        {
            path: '/prices',
            name: 'Prices',
            meta: { layout: "main" },
            component: () => import('@views/Prices.vue')
        },
        {
            path: '/planning',
            name: 'Planning',
            meta: { layout: "main" },
            component: () => import('@views/Planning.vue')
        },
        {
            path: '/admin',
            name: 'sign-in',
            component: () => import('@views/SignIn.vue')
        },
    ]
});

export default router;


