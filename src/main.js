import Vue from 'vue';
import App from './App.vue';
import router from './router';
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

import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
Vue.use(ElementUI, { locale });

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import store from './store/store';

import './assets/css/theme.css';
import './assets/css/fontstyle.css';
import './assets/css/basic.css';
import ('./loader/load');

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

Vue.directive('highlight', function(el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block) => {
    hljs.highlightBlock(block);
  })
});

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');