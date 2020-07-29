import Vue from 'vue';
import App from './App.vue';
import router from './router';

import message from './message';
Vue.prototype.$SegmentMessage = message;

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import './assets/element/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
Vue.use(ElementUI, { locale });

import store from './store/store';

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

import './StringPrototype';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');