import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [{
        path: '/'
    }, {
        path: '/user/logout',
        component: () => import('./components/user/logout.vue')
    }, {
        path: '/problem/list',
        component: () => import('./components/problem/list.vue')
    }, {
        path: '*',
        component: () => import('./components/404.vue')
    }]
});

export default router;
