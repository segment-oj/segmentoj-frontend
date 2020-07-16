<template>
  <div class="userinfo">
    <div v-if="this.$store.state.user.authenticated">
      <MyUserName />
      <router-link to="/user/logout">登出</router-link>
    </div>
    <router-link v-else to="/user/login">登录</router-link><br>
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