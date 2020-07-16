<template>
  <div id="app" v-katex:auto>
    Hello!
    <router-link to="/1234">1234</router-link>
      $$\frac{a_i}{1+x}$$
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
