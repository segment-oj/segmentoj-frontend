import sfconfig from './../sfconfig';

const captchastore = {
  state: {
    captchaKey: null,
    captchaAnswer: null
  },
  mutations: {
    newCaptcha(state) {
      state.captchaKey = Math.floor(Math.random() * sfconfig.captchaKeyMax) + 1;
    },
    setAnswer(state, data) {
      state.captchaAnswer = data.val;
    }
  }
};

export default captchastore;