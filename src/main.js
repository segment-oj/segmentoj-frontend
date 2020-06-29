import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false

const router = await import('./router');
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
