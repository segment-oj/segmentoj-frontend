

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

let _vue = _interopRequireDefault(require('vue'));

let _vuex = _interopRequireDefault(require('vuex'));

let _user = _interopRequireDefault(require('./user'));

let _captcha = _interopRequireDefault(require('./captcha'));

let _tags = _interopRequireDefault(require('./tags'));

let _CreateProblem = _interopRequireDefault(require('./CreateProblem'));

let _TagEdit = _interopRequireDefault(require('./TagEdit'));

let _todo = _interopRequireDefault(require('./todo'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj }; 
}

_vue['default'].use(_vuex['default']);

let _default = new _vuex['default'].Store({
  modules: {
    user: _user['default'],
    captcha: _captcha['default'],
    tags: _tags['default'],
    createProblem: _CreateProblem['default'],
    tagedit: _TagEdit['default'],
    todo: _todo['default']
  }
});

exports['default'] = _default;