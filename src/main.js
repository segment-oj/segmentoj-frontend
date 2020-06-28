import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import ElementUI from 'element-ui';

import HelloWorld from './components/HelloWorld.vue';
import page_not_found from './components/404.vue';

Vue.config.productionTip = false
Vue.use(Router);
Vue.use(ElementUI);

const router = new Router({
	mode: 'history',
	routes: [{
        path: "/"
    }, {
        path: "/:id",
        component: HelloWorld
    }, {
        path: "*",
        component: page_not_found
    }]
});

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
