import Vue from 'vue';
import App from './App.vue';
import router from './router'

Vue.config.productionTip = false

import('element-ui').then(() => {
    Vue.use(Element);
});

import('./assets/fonts/Fira_Code/fira_code.css');
import('./assets/fonts/Fira_Sans/fira_sans.css');
import('./assets/fonts/fonts.css');

new Vue({
    router,
	render: h => h(App),
}).$mount('#app');
