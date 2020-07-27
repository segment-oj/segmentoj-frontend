<template>
  <div>
    <h1>Submit problem #{{this.$route.params.id}}</h1>
    <el-select v-model="lang_num" placeholder="Select language">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input
      class="code-input"
      type="textarea"
      :rows="20"
      placeholder="Paste your code"
      required
      v-model="code"
    >
    </el-input>
    <br>
    <el-button type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
    <el-button @click="back();">Back</el-button>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'ProblemSubmit',
  data() {
    return {
      code: '',
      lang_num: null,
      buttonLoading: false,
      options: [{
        value: '0',
        label: 'C++'
      }, {
        value: '1',
        label: 'C++11'
      }, {
        value: '2',
        label: 'C++14'
      }, {
        value: '3',
        label: 'C++17'
      }, {
        value: '4',
        label: 'C++20'
      }, {
        value: '5',
        label: 'C'
      }, {
        value: '6',
        label: 'C#'
      }, {
        value: '7',
        label: 'Clang'
      }, {
        value: '8',
        label: 'Clang11'
      }, {
        value: '9',
        label: 'Clang14'
      }, {
        value: '10',
        label: 'Clang17'
      }, {
        value: '11',
        label: 'Clang20'
      }, {
        value: '12',
        label: 'Rust'
      }, {
        value: '13',
        label: 'Python2'
      }, {
        value: '14',
        label: 'Python3'
      }, {
        value: '15',
        label: 'Pascal'
      }, {
        value: '16',
        label: 'Go'
      }, {
        value: '17',
        label: 'Ruby'
      }, {
        value: '18',
        label: 'Java'
      }]
    };
  },
  methods: {
    back() {
      this.$router.push('/problem/'+this.$route.params.id);
    },
    submit() {
      this.buttonLoading = true;
      this.$axios
        .post(apiurl('/status'), {
          problem: Number(this.$route.params.id),
          code: this.code,
          lang: this.lang_num
        })
        .then(() => {
          this.$SegmentMessage.success(this, 'Your code has been submited');
          this.$router.push('/problem/'+this.$route.params.id);
        })
        .catch(err => {
          if(err.request.status === 401) {
            this.$SegmentMessage.error(this, 'Please login first');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
          this.buttonLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.code-input {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
