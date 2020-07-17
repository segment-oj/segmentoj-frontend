<template>
  <div class='login' ref='ldata'>
    <el-form :model='ldata'>
      <el-form-item label='User name'>
        <el-input v-model='ldata.username'></el-input>
      </el-form-item>
      <el-form-item label='Password'>
        <el-input type='password' v-model='ldata.password'></el-input>
      </el-form-item>
      <el-form-item label='Repeat password'>
        <el-input type='password' v-model='ldata.passwdrepeat'></el-input>
      </el-form-item>
      <el-form-item label='Email'>
        <el-input type="email" v-model='ldata.email'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' v-on:click='onSubmit()'>Register</el-button>
        <el-button v-on:click='onCancel()'>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import goback from '../../goback';

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
            this.$message({
              message: 'Your acount has been registered successfully',
              type: 'success'
            });
            this.$router.push('/user/login');
          })
          .catch(err => {
            if (err.request.status === 400) { // HTTP 400 Bad Request
              this.$message.error(JSON.parse(err.request.response).detail);
            } else if (err.request.status === 409) { // HTTP 409 Conflict
              this.$message.error("The user name is already registered");
            } else if (err.request.status === 429) { // HTTP 429 Too Many Requests
              this.$message.error("Requests are too frequent");
            } else {
              this.$message.error("Unkown error");
            }
          });
      } else {
        this.$message.error("Password mismatch");
      }
    },
    onCancel() {
      goback(this);
    }
  }
};
</script>

<style scoped>
</style>