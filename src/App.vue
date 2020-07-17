<template>
  <div id="app">
    <NavBar/>
    <div id="content">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/page/navbar.vue';
import Footer from './components/page/footer.vue';

export default {
  name: "App",
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}

#content {
  margin-top: 80px;
  min-height: calc(100% - 41.05px);
}

html {
  min-height: 100%;
}

body {
  min-height: calc(100% - 80px);
  margin: 0;
}

.pagetest {
  height: 1000px;
}
</style>
