<template>
  <div id="app">
    Hello!
    <router-link to="/1234">1234</router-link>
    <router-link to="/login">login</router-link>
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
