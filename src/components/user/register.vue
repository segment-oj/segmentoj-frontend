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
    SendMessageSuccess(content) {
      this.$message({
        showClose: true,
        message: content,
        type: 'success',
        customClass: 'highzindex'
      });
    },
    SendMessageError(content) {
      this.$message({
        showClose: true,
        message: content,
        type: 'error',
        customClass: 'highzindex'
      });
    },
    onSubmit() {
      if (this.ldata.password === this.ldata.passwdrepeat) {
        this.$axios
          .post(apiurl('/account'), {
            username: this.ldata.username,
            password: this.ldata.password,
            email: this.ldata.email
          })
          .then(() => {
            this.$store.state.user.showregister = false;
            this.$store.state.user.showlogin = true;
            // Successed
            this.$SegmentMessage.success(this, 'Your acount has been registered successfully');
          })
          .catch(err => {
            if (err.request.status === 400) {
              // HTTP 400 Bad Request
              this.$SegmentMessage.error(this, JSON.parse(err.request.response).detail);
            } else if (err.request.status === 409) {
              // HTTP 409 Conflict
              this.$SegmentMessage.error(this, 'Username has been taken');
            } else if (err.request.status === 429) {
              // HTTP 429 Too Many Requests
              this.$SegmentMessage.error(this, 'Requesting too frequently');
            } else {
              // Unknown error
              this.$SegmentMessage.error(this, 'Unknown error');
            }
          });
      } else {
        // Password mismatch
        this.SendMessageError('Password mismatch');
      }
    }
  }
};
</script>
