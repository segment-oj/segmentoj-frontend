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

import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
Vue.use(VueKatex, {
  globalOptions: {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ]
  }
});

import UniqueId from 'vue-unique-id';
Vue.use(UniqueId);

import './assets/css/theme.css';
import './assets/css/fontstyle.css';
import './assets/css/basic.css';
import('./loader/load');

import './methods/string';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
