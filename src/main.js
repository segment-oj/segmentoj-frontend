import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import ElementUI from 'element-ui';

import HelloWorld from './components/HelloWorld.vue'

Vue.config.productionTip = false
Vue.use(Router);
Vue.use(ElementUI);

const router = new Router({
	mode: 'history',
	routes: [{
        path: "/:id",
        component: HelloWorld
    }]
});

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
