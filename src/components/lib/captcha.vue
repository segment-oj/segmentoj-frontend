<template>
  <div class="captcha">
    <el-input v-model="captcha_answer"></el-input>
    <img class="captcha-img" v-if="loaded" @click="refresh_captcha();" :src="img_url" />
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'captcha',
  data() {
    return {
      img_url: null,
      captcha_answer: '',
      loaded: false
    };
  },
  watch: {
    captcha_answer(val) {
      this.$store.commit('setAnswer', {
        val: val
      });
    }
  },
  methods: {
    refresh_captcha() {
      this.img_url = apiurl(`/captcha/${this.$store.state.captcha.captchaKey}?sfid=${Math.random()}`);
    }
  },
  mounted() {
    this.$store.commit('newCaptcha');
    this.img_url = apiurl(`/captcha/${this.$store.state.captcha.captchaKey}?sfid=${Math.random()}`);
    this.loaded = true;
  }
};
</script>

<style scoped>
.captcha {
    display: flex;
}

.captcha-img {
    margin-left: 10px;
}

.captcha-img:hover {
    cursor: pointer;
}
</style>
