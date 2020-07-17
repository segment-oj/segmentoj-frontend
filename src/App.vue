<template>
  <div id="app">
    <NavBar/>
    <div id="main">
      <div id="content">
        <router-view></router-view>
      </div>
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
}

#main {
  margin-top: 80px;
  min-height: calc(100vh - 80px - 41.05px);
}

#content {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

body {
  margin: 0;
}
</style>
