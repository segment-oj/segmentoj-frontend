"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userstore = {
  state: {
    authenticated: localStorage.getItem('user-authenticated') === 'true' ? true : false || false,
    username: localStorage.getItem('user-username') || null,
    userid: localStorage.getItem('user-userid') || null,
    userlang: localStorage.getItem('user-userlang') || null,
    isStaff: localStorage.getItem('user-is-staff') === 'true' ? true : false || false,
    isRoot: localStorage.getItem('user-is-root') === 'true' ? true : false || false,
    navColor: localStorage.getItem('user-navcolor') || null,
    showlogin: false,
    showregister: false,
    showlogout: false
  },
  mutations: {
    userLogin: function userLogin(state, data) {
      state.authenticated = true;
      state.userid = data.userid;
      state.username = data.username;
      localStorage.setItem('user-authenticated', true);
      localStorage.setItem('user-username', data.username);
      localStorage.setItem('user-userid', data.userid);
    },
    userStaffChange: function userStaffChange(state, data) {
      state.isStaff = data.isStaff;
      state.isRoot = data.isRoot;
      localStorage.setItem('user-is-root', data.isRoot);
      localStorage.setItem('user-is-staff', data.isStaff);
    },
    userStaff: function userStaff(state, data) {
      state.isStaff = data.is_staff;
      state.isRoot = data.is_superuser;
      localStorage.setItem('user-is-root', data.is_superuser);
      localStorage.setItem('user-is-staff', data.is_staff);
    },
    userLang: function userLang(state, data) {
      state.userlang = data.lang;
      localStorage.setItem('user-userlang', data.lang);
    },
    userNavColorChange: function userNavColorChange(state, data) {
      state.navColor = data.nav_color;
      localStorage.setItem('user-navcolor', data.nav_color);
    },
    userLogout: function userLogout(state) {
      state.authenticated = false;
      state.userid = null;
      state.username = null;
      state.userlang = null;
      state.isStaff = false;
      state.isRoot = false;
      localStorage.removeItem('user-is-root');
      localStorage.removeItem('user-is-staff');
      localStorage.removeItem('user-userlang');
      localStorage.removeItem('user-authenticated');
      localStorage.removeItem('user-userid');
      localStorage.removeItem('user-username');
      localStorage.removeItem('user-navcolor');
    }
  }
};
var _default = userstore;
exports["default"] = _default;