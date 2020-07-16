<template>
  <div class='login' ref='ldata'>
    <el-form :model='ldata'>
      <el-form-item label='用户名'>
        <el-input v-model='ldata.username'></el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input type='password' v-model='ldata.password'></el-input>
      </el-form-item>
      <el-form-item label='重复密码'>
        <el-input type='password' v-model='ldata.passwdrepeat'></el-input>
      </el-form-item>
      <el-form-item label='邮箱'>
        <el-input type="email" v-model='ldata.email'></el-input>
      </el-form-item>
      <p class="error-msg" v-if="err_msg !== null">{{err_msg}}</p>
      <el-form-item>
        <el-button type='primary' v-on:click='onSubmit()'>注册</el-button>
        <el-button v-on:click='onCancel()'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'UserRegister',
  data() {
    return {
      ldata: {
        username: '',
        password: '',
        passwdrepeat: '',
        email: ''
      },
      err_msg: null
    };
  },
  methods: {
    onSubmit() {
      if (this.ldata.password === this.ldata.passwdrepeat) {
        this.$axios
          .put(apiurl('/user'), {
            username: this.ldata.username,
            password: this.ldata.password,
            email: this.ldata.email
          })
          .then(() => {
            this.$router.push('/user/login');
          })
          .catch(err => {
            if (err.request.status === 400) {
              this.err_msg = "邮箱格式错误";
            } else if (err.request.status === 409) {
              this.err_msg = "用户名已被注册";
            } else {
              this.err_msg = "Unkown error";
            }
          });
      } else {
        this.err_msg = "密码不匹配";
      }
    },
    onCancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.error-msg {
  color: #F56C6C;
}
</style>