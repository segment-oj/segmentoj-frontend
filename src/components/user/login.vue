<template>
  <div>
    <el-dialog title="Login" :visible.sync="$store.state.user.showlogin" :destroy-on-close="true" :close-on-click-modal="false" width="500px">
      <el-form :model="ldata" ref="loginForm" :rules="rules">
        <div class="icon-lable"><i class="el-icon-user" /> Username</div>
        <el-form-item prop="username">
          <el-input v-model="ldata.username"></el-input>
        </el-form-item>
        <div class="icon-lable"><i class="el-icon-lock" /> Password</div>
        <el-form-item prop="password">
          <el-input type="password" v-model="ldata.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit();" :loading="buttonLoading">Login</el-button>
          <el-button v-on:click="$store.state.user.showlogin = false">Cancel</el-button>
          <el-button v-on:click="reset();">Reset</el-button>
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
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Input your username'));
      } else {
        callback();
      }
    };
    let validatePasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Input your password'));
      } else {
        callback();
      }
    };
    return {
      ldata: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePasswd, trigger: 'blur' }
        ]
      },
      buttonLoading: false
    };
  },
  methods: {
    submit() {
      this.buttonLoading = true;
      this.$axios
        .post(apiurl('/account/session'), {
          username: this.ldata.username,
          password: this.ldata.password
        })
        .then(res => {
          this.$store.commit('userLogin', {
            username: this.ldata.username,
            userid: res.data.res.id
          });
          this.$SegmentMessage.success(this, 'Logged in');
          this.$store.state.user.showlogin = false;
          this.buttonLoading = false;
        })
        .catch(err => {
          if (err.request.status === 403) {
            this.$SegmentMessage.error(this, 'Username or password incorrect');
          } else if (err.request.status === 429) {
            // HTTP 429 Too Many Requests
            this.$SegmentMessage.error(this, 'Requesting too frequently');
          } else {
            // Unknown error
            this.$SegmentMessage.error(this, 'Unknown error');
          }
          this.buttonLoading = false;
        });
    },
    onSubmit() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs['loginForm'].resetFields();
    }
  }
};
</script>

<style scoped>
.icon-lable {
    margin-bottom: 5px;
}
</style>
