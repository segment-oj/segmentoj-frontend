<template>
  <div id="app">
    <NavBar />
    <div id="main">
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
    <UserLogin v-if="$store.state.user.showlogin"></UserLogin>
    <UserRegister v-if="$store.state.user.showregister"></UserRegister>
  </div>
</template>

<script>
import NavBar from './components/page/navbar.vue';
import Footer from './components/page/footer.vue';
import UserLogin from './components/account/login.vue';
import UserRegister from './components/account/register.vue';

export default {
  name: 'App',
  data() {
    return {
      LoginShow: false,
      RegisterShow: false
    };
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
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
}

body {
    margin: 0;
}
</style>
