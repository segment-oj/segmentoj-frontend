import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import store from './store/store'

import('./loader');

Vue.config.productionTip = false

new Vue({
    router,
    store,
	render: h => h(App),
}).$mount('#app');
