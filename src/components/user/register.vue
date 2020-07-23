<template>
  <div>
    <el-dialog title="Register" :visible.sync="$store.state.user.showregister" width="30%">
      <el-form :model="ldata">
        <el-form-item label="Username">
          <el-input v-model="ldata.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="ldata.password"></el-input>
        </el-form-item>
        <el-form-item label="Repeat password">
          <el-input type="password" v-model="ldata.passwdrepeat"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input type="email" v-model="ldata.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit();">Register</el-button>
          <el-button v-on:click="$store.state.user.showregister = false;">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
            this.$store.state.user.showregister = false;
            this.$store.state.user.showlogin = true;
            this.$message({
              showClose: true,
              message: 'Your acount has been registered successfully',
              type: 'success',
              customClass: 'highzindex'
            });
          })
          .catch(err => {
            if (err.request.status === 400) {
              // HTTP 400 Bad Request
              this.$message({
                showClose: true,
                message: JSON.parse(err.request.response).detail,
                type: 'error'
              });
            } else if (err.request.status === 409) {
              // HTTP 409 Conflict
              this.$message({
                showClose: true,
                message: 'Username has been taken',
                type: 'error'
              });
            } else if (err.request.status === 429) {
              // HTTP 429 Too Many Requests
              this.$message({
                showClose: true,
                message: 'Requesting too frequently',
                type: 'error'
              });
            } else {
              this.$message({
                showClose: true,
                message: 'Unknown error',
                type: 'error'
              });
            }
          });
      } else {
        this.$message({
          showClose: true,
          message: 'Password mismatch',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style>
</style>