import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [{
        path: "/"
    }, {
        path: "/:id",
        component: () => import('./components/HelloWorld.vue')
    }, {
        path: "*",
        component: () => import('./components/404.vue')
    }]
});

export default router;