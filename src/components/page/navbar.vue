<template>
  <div id="nav">
    <div id="nav-content">
      <el-menu
        id="menu"
        :default-active="activeIndex"
        :router="true"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="rgb(233, 233, 235)"
      >
        <el-menu-item index=""><img src="./../../assets/icon/SOJ-thick-white.svg" style="height: 40px" /></el-menu-item>
        <el-menu-item index="/"><i class="el-icon-s-home" /> Home</el-menu-item>
        <el-menu-item index="/problem/list"><i class="el-icon-s-order" />Problem List</el-menu-item>
        <el-submenu index="2" id="user">
          <template slot="title">
              <el-avatar shape="square" v-if="this.$store.state.user.authenticated">
                {{this.$store.state.user.username}}
              </el-avatar>
              <el-avatar shape="square" v-else>
                User
              </el-avatar>
          </template>
          <div v-if="this.$store.state.user.authenticated">
            <el-menu-item :index="'/account/' + $store.state.user.userid">
              {{this.$store.state.user.username}}
            </el-menu-item>
            <UserLogout v-if="$store.state.user.showlogout" />
            <el-menu-item @click="$store.state.user.showlogout = true;">Logout</el-menu-item>
          </div>
          <div v-else>
            <el-menu-item @click="$store.state.user.showlogin = true;">Login</el-menu-item>
            <el-menu-item @click="$store.state.user.showregister = true;">Register</el-menu-item>
          </div>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import UserLogout from './../user/logout.vue';

export default {
  name: 'NavBar',
  data() {
    return {
      activeIndex: '/'
    };
  },
  components: {
    UserLogout
  }
};
</script>

<style lang="css" scoped>
#nav {
    z-index: 1000;
    background-color: #545c64;
    width: 100vw;
    position: fixed;
    top: 0;
    left: auto;
    right: auto;
}

#nav-content {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

#menu {
    border: none;
}

#user {
    float: right;
}

#user_icon {
    height: 50%;
}
</style>
