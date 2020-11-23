"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'history',
  routes: [{
    path: '/',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/home/page.vue'));
      });
    }
  }, {
    path: '/account/:id',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/user/content.vue'));
      });
    }
  }, {
    path: '/account/:id/edit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/user/edit.vue'));
      });
    }
  }, {
    path: '/problem/list',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/problem/list.vue'));
      });
    }
  }, {
    path: '/problem/:id',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/problem/content.vue'));
      });
    }
  }, {
    path: '/problem/:id/edit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/problem/edit.vue'));
      });
    }
  }, {
    path: '/problem/:id/submit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/problem/submit.vue'));
      });
    }
  }, {
    path: '/status/list',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/status/list.vue'));
      });
    }
  }, {
    path: '/status/:id',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/status/content.vue'));
      });
    }
  }, {
    path: '/app/editor',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/app/editor.vue'));
      });
    }
  }, {
    path: '*',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/404.vue'));
      });
    }
  }]
});
var _default = router;
exports["default"] = _default;