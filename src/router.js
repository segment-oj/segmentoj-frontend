import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('./components/home/page.vue')
  }, {
    path: '/account/:id',
    component: () => import('./components/user/content.vue')
  }, {
    path: '/account/:id/edit',
    component: () => import('./components/user/edit.vue')
  }, {
    path: '/problem/list',
    component: () => import('./components/problem/list.vue')
  }, {
    path: '/problem/:id',
    component: () => import('./components/problem/content.vue')
  }, {
    path: '/problem/:id/edit',
    component: () => import('./components/problem/edit.vue')
  }, {
    path: '/problem/:id/submit',
    component: () => import('./components/problem/submit.vue')
  }, {
    path: '*',
    component: () => import('./components/404.vue')
  }]
});

export default router;
