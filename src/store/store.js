import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import userstore from './user';

export default new Vuex.Store({
  modules: {
    user: userstore
  }
});