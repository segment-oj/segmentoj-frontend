import Vue from 'vue';
import App from './App.vue';
import router from './router';
import sfconfig from './sfconfig';
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
Vue.use(ElementUI, {locale});

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import store from './store/store';

import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';
import marked from 'marked';
marked.setOptions({
  ...sfconfig.markdown,
  highlight: ((code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    }
  }),
  renderer: new marked.Renderer(),
});
Vue.prototype.$marked = marked;

import DOMPurify from 'dompurify';
Vue.prototype.$DOMPurify = DOMPurify;

import './assets/css/theme.css';
import './assets/css/fontstyle.css';
import './assets/css/basic.css';
import('./loader/load');

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');