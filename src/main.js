import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false

const router = await import('./router');
import('element-ui').then(() => {
    Vue.use(Element);
});

new Vue({
    router,
	render: h => h(App),
}).$mount('#app');
