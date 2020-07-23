<template>
  <div>
    <el-dialog title="Login" :visible.sync="$store.state.user.showlogin" width="30%">
      <el-form :model="ldata">
        <el-form-item label="Username">
          <el-input v-model="ldata.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="ldata.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit();">Login</el-button>
          <el-button v-on:click="$store.state.user.showlogin = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      }
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
          });
          this.$message({
            showClose: true,
            message: 'Logged in',
            type: 'success'
          });
          this.$store.state.user.showlogin = false;
        })
        .catch(err => {
          if (err.request.status === 403) {
            this.$message({
              showClose: true,
              message: 'Username or password incorrect',
              type: 'error'
            });
          } else if (err.request.status === 429) {
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
    }
  }
};
</script>

<style scoped>
</style>
