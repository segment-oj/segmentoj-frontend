<template>
  <div class='login' ref='ldata'>
    <el-form :model='ldata'>
      <el-form-item label='用户名'>
        <el-input v-model='ldata.username'></el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input type='password' v-model='ldata.password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' v-on:click='onSubmit()'>登录</el-button>
        <el-button v-on:click='onCancel()'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import goback from '../../goback';

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
          this.$message({
            message: 'Logged in',
            type: 'success'
          });
          this.$router.push('/');
        })
        .catch(err => {
          if (err.request.status === 403) {
            this.$message.error("Wrong user name or password");
          } else if (err.request.status === 429) {
            this.$message.error("Requests are too frequent");
          } else {
            this.$message.error("Unkown error");
          }
        });
    },
    onCancel() {
      goback(this);
    }
  }
};
</script>

<style scoped>
</style>