<template>
  <div id="app">
    <NavBar/>
    <div id="main">
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
    <Footer/>
    <UserLogin></UserLogin>
    <UserRegister></UserRegister>
  </div>
</template>

<script>
import NavBar from './components/page/navbar.vue';
import Footer from './components/page/footer.vue';
import UserLogin from './components/user/login.vue';
import UserRegister from './components/user/register.vue';

export default {
  name: "App",
  data() {
    return {
      LoginShow: false,
      RegisterShow: false
    }
  },
  components: {
    NavBar,
    Footer,
    UserLogin,
    UserRegister
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

.highzindex {
  z-index: 10000 !important;
 }
</style>
