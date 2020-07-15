<template>
  <div id="app">
    Hello!
    <div class="userinfo"> <!-- user name -->
      <div v-if="isAuthenticated()">
        Hello, <MyUserName />
        <UserLogout />
      </div>
      <router-link v-else to="/login">login</router-link><br>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import MyUserName from './components/user/MyUserName.vue';
import UserLogout from './components/user/logout.vue';

export default {
  name: 'App',
  methods: {
    isAuthenticated() {
      if (localStorage.getItem('authenticated') === "true") return true;
      else return false;
    }
  }, 
  components: {
    MyUserName,
    UserLogout
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
