import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import userstore from './user';
import captchastore from './captcha';
import tagsstore from './tags';
import createProblem from './CreateProblem';
import tageditstore from './TagEdit';

export default new Vuex.Store({
  modules: {
    user: userstore,
    captcha: captchastore,
    tags: tagsstore,
    createProblem: createProblem,
    tagedit: tageditstore
  }
});