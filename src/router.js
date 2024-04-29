import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
import OrderPage from './pages/OrderPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/single-restaurant/:slug',
            name: 'restaurant',
            component: SingleRestaurant,
        },
        {
            path: '/checkout',
            name: 'order',
            component: OrderPage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage,
        },
    ]
});

export { router };