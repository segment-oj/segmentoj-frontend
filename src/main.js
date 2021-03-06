import Vue from 'vue';
import App from './App.vue';
import router from './router';
import sfconfig from './sfconfig';

import infoMessage from './methods/message';
Vue.prototype.$info = infoMessage;

import store from './store/store';

import axios from 'axios';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = sfconfig.api.server;
if (store.state.user.accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.user.accessToken}`;
}

import './assets/element/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
Vue.use(ElementUI, { locale });

import './assets/css/var.css';
import './assets/css/theme.css';
import './assets/css/fontstyle.css';
import './assets/css/basic.css';
import './assets/css/md.css';
import('./loader/load');

import './methods/string';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
