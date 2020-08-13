import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import userstore from './user';
import captchastore from './captcha';
import tagsstore from './tags';

export default new Vuex.Store({
  modules: {
    user: userstore,
    captcha: captchastore,
    tags: tagsstore,
  }
});