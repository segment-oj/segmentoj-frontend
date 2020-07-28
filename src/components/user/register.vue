<template>
  <div>
    <el-dialog title="Register" :visible.sync="$store.state.user.showregister" :destroy-on-close="true" :close-on-click-modal="false" width="500px">
      <el-form :model="ldata" ref="registerForm" :rules="rules" :status-icon="true">
        <el-form-item label="Username" prop="username">
          <el-input v-model="ldata.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="ldata.password"></el-input>
        </el-form-item>
        <el-form-item label="Repeat password" prop="passwdrepeat">
          <el-input type="password" v-model="ldata.passwdrepeat"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model="ldata.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit();" :loading="buttonLoading">Register</el-button>
          <el-button v-on:click="$store.state.user.showregister = false;">Cancel</el-button>
          <el-button v-on:click="$refs['registerForm'].resetFields();">Reset</el-button>
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
    let validatePasswd = (rule, value, callback) => {
      if (value === '' || value === this.ldata.password) {
        callback();
      } else {
        callback(new Error('Password mismatch'));
      }
    };
    let validateEmail = (rule, value, callback) => {
      let regular = new RegExp('^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$');
      if (regular.test(value) || value === '') {
        callback();
      } else {
        callback(new Error('Email format error'));
      }
    };
    let validateUsername = (rule, value, callback) => {
      this.$axios
        .get(apiurl('account/username/accessibility/' + value))
        .then(() => {
          callback();
        })
        .catch(err => {
          if (err.request.status === 409) {
            callback(new Error('The user name is already in use'));
          } else {
            callback();
          }
        });
    };
    return {
      ldata: {
        username: '',
        password: '',
        passwdrepeat: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: 'Input your username', trigger: 'blur' },
          { max: 10, message: 'No more than 10 characters', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          { required: true, message: 'Input your password', trigger: 'blur' },
          { min: 6, message: 'Password must be more than 6 characters', trigger: 'blur' }
        ],
        passwdrepeat: [
          { required: true, message: 'Repeat your password', trigger: 'blur' },
          { validator: validatePasswd, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur'}
        ]
      },
      buttonLoading: false
    };
  },
  methods: {
    submit() {
      this.buttonLoading = true;
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
          this.buttonLoading = false;
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
          this.buttonLoading = false;
        });
    },
    onSubmit() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs['register'].resetFields();
    }
  }
};
</script>
