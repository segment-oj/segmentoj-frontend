import VueKatex from 'vue-katex';
Vue.use(VueKatex, {
    globalOptions: {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ]
    }
});