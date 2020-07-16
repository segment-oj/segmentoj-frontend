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


import('./loader/load');

Vue.config.productionTip = false


new Vue({
    router,
	render: h => h(App),
}).$mount('#app');
