<template>
  <div>
    <el-form :model="ldata" ref="ChangePasswordForm" :rules="rules">
      <div class="icon-lable">
        <i class="el-icon-lock" />
        New Password
      </div>
      <el-form-item prop="newpassword">
        <el-input type="password" v-model="ldata.newpassword"></el-input>
      </el-form-item>
      <div class="icon-lable">
        <i class="el-icon-lock" />
        Repeat New Password
      </div>
      <el-form-item prop="newpasswdrepeat">
        <el-input type="password" v-model="ldata.newpasswdrepeat"></el-input>
      </el-form-item>
      <div v-if="old_password_required">
        <div class="icon-lable">
          <i class="el-icon-lock" />
          Old Password
        </div>
        <el-form-item prop="oldpassword">
          <el-input type="password" v-model="ldata.oldpassword"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          v-on:click="onSubmit();"
          :loading="buttonLoading"
        >
          Change
        </el-button>
        <el-button v-on:click="reset();">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'UserChangePassword',
  data() {
    let validatePasswd = (rule, value, callback) => {
      if (value === '' || value === this.ldata.newpassword) {
        callback();
      } else {
        callback(new Error('Password mismatch'));
      }
    };
    let validateOldPasswd = (rule, value, callback) => {
      this.$axios
        .post(apiurl('/account/password'), {
          password: this.ldata.oldpassword
        })
        .then(() => {
          callback();
        })
        .catch(err => {
          console.log(err.request.status);
          callback(new Error('Old Password Wrong'));
        });
    };
    return {
      ldata: {
        oldpassword: '',
        newpassword: '',
        newpasswdrepeat: ''
      },
      rules: {
        newpassword: [
          { required: true, message: 'Input your password', trigger: 'blur' },
          { min: 6, message: 'No less than 6 characters', trigger: 'blur' }
        ],
        newpasswdrepeat: [
          { required: true, message: 'Repeat your password', trigger: 'blur' },
          { validator: validatePasswd, trigger: 'blur' }
        ],
        oldpassword: [
          { validator: validateOldPasswd, trigger: 'blur' }
        ]
      },
      old_password_required: false,
      buttonLoading: false
    };
  },
  methods: {
    submit() {
      this.buttonLoading = true;
      this.$axios
        .patch(apiurl('/account/password'), {
          password: this.ldata.newpassword
        })
        .then(() => {
          this.buttonLoading = false;
          this.$SegmentMessage.success(this, 'Changed successfully');
        })
        .catch(err => {
          console.table(err);
          if (err.request.status === 401) {
            this.$SegmentMessage.error(this, 'Please login first');
            this.$store.state.user.showlogin = true;
          }
          if (err.request.status === 403) {
            this.$SegmentMessage.error(this, 'Please enter your old password');
            this.old_password_required = true;
          }
          this.buttonLoading = false;
        });
    },
    onSubmit() {
      this.$refs['ChangePasswordForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs['ChangePasswordForm'].resetFields();
      this.old_password_required = false;
    }
  }
};
</script>

<style scoped>
.icon-lable {
    margin-bottom: 5px;
}
</style>
