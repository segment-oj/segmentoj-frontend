import Vue from 'vue';
import App from './App.vue';
import router from './router';

import('./loader');

Vue.config.productionTip = false

import('element-ui').then(() => {
    Vue.use(Element);
});

new Vue({
    router,
	render: h => h(App),
}).$mount('#app');
