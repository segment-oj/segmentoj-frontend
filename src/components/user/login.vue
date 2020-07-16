<template>
  <div class='login' ref='ldata'>
    <el-form :model='ldata'>
      <el-form-item label='用户名'>
        <el-input v-model='ldata.username'></el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input type='password' v-model='ldata.password'></el-input>
      </el-form-item>
      <p class="error-msg" v-if="err_msg !== null">{{err_msg}}</p>
      <el-form-item>
        <el-button type='primary' v-on:click='onSubmit()'>登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'UserLogin',
  data() {
    return {
      ldata: {
        username: '',
        password: ''
      },
      err_msg: null
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(apiurl('/user'), {
          username: this.ldata.username,
          password: this.ldata.password
        })
        .then(res => {
          this.$store.commit('userLogin', {
            username: this.ldata.username,
            userid: res.data.res.id
          })
          this.$router.push('/');
        })
        .catch(err => {
          if (err.request.status === 403) {
            this.err_msg = "用户名或密码错误";
          }
        });
    }
  }
};
</script>

<style scoped>
.error-msg {
  color: #F56C6C;
}
</style>