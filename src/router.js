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
    component: () => import('./components/account/content.vue')
  }, {
    path: '/account/:id/edit',
    component: () => import('./components/account/edit.vue')
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
    path: '/status/list',
    component: () => import('./components/status/list.vue')
  }, {
    path: '/status/:id',
    component: () => import('./components/status/content.vue')
  }, {
    path: '/app/editor',
    component: () => import('./components/app/CodeEditor.vue')
  }, {
    path: '*',
    component: () => import('./components/404.vue')
  }]
});

export default router;
