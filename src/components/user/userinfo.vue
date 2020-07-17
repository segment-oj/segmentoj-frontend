<template>
  <div class="userinfo">
    <div v-if="this.$store.state.user.authenticated">
      <MyUserName />
      <router-link to="/user/logout">登出</router-link>
    </div>
  <div v-else>
    <router-link to="/user/login">登录</router-link>
    <router-link to="/user/register">注册</router-link>
  </div>
  </div>
</template>

<script>
import MyUserName from './MyUserName.vue';

export default {
  name: 'UserInfo',
  components: {
    MyUserName
  }
};
</script>