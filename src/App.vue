<template>
  <div id="app">
    <NavBar></NavBar>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar.vue';

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#content {
  margin-top: 80px;
}
</style>
