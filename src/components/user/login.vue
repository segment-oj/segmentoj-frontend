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
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
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
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>