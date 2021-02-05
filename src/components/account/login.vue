<template>
  <div>
    <el-dialog
      title="Login"
      :visible.sync="$store.state.user.showlogin"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      width="500px"
      class="max-screen"
      >
      <el-form :model="ldata" ref="loginForm" :rules="rules">
        <div class="icon-label">
          <i class="el-icon-user" />
          Username
        </div>
        <el-form-item prop="username">
          <el-input v-model="ldata.username"></el-input>
        </el-form-item>
        <div class="icon-label">
          <i class="el-icon-lock" />
          Password
        </div>
        <el-form-item prop="password">
          <el-input type="password" v-model="ldata.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-on:click="onSubmit();"
            :loading="buttonLoading"
          >
            Login
          </el-button>
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
        .post(apiurl('/account/token'), {
          username: this.ldata.username,
          password: this.ldata.password
        })
        .then(res => {
          let userid = JSON.parse(atob(res.data.access.split('.')[1])).user_id;
          this.$axios
            .get(apiurl(`/account/${userid}`))
            .then(detail => {
              const frontend_config = JSON.parse(detail.data.res.frontend_config);
              this.$store.commit('userLang', {
                lang: detail.data.res.lang
              });
              this.$store.commit('userStaff', {
                is_staff: detail.data.res.is_staff,
                is_superuser: detail.data.res.is_superuser
              });
              this.$store.commit('userNavColorChange', {
                nav_color: frontend_config.nav_color
              });
              this.$store.commit('userAvatarURLChange', {
                avatar_url: detail.data.res.avatar_url
              });
            });
          this.$store.commit('userLogin', {
            username: this.ldata.username,
            userid: userid,
            accessToken: res.data.access,
            refreshToken: res.data.refresh
          });
          this.$axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
          this.$info.success('Logged in');
          this.$store.state.user.showlogin = false;
          this.buttonLoading = false;
        })
        .catch(() => {
          this.$info.error('Username or password incorrect.');
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
.icon-label {
    margin-bottom: 5px;
}
</style>
