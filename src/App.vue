<template>
  <div id="app">
    This is segmentoj.
    <UserInfo>
    </UserInfo>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import UserInfo from './components/user/userinfo';

export default {
  name: 'App',
  components: {
    UserInfo
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
