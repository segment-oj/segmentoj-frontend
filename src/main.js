import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.use(VueKatex, {
    globalOptions: {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ]
    }
});

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import store from './store/store';

import './assets/css/theme.css';
import './assets/css/fontstyle.css';
import('./loader/load');

Vue.config.productionTip = false;


new Vue({
    router,
    store,
	render: h => h(App),
}).$mount('#app');
