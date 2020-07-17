<template>
  <div id="nav">
    <el-menu
      :default-active="activeIndex"
      :router="true"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#C0C4CC"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          User
        </template>
        <div v-if="this.$store.state.user.authenticated">
          <el-menu-item>
            <MyUserName />
          </el-menu-item>
          <el-menu-item index="./../user/logout">
            Logout
          </el-menu-item>
        </div>
        <div v-else>
          <el-menu-item index="./../user/login">
            login
          </el-menu-item>
          <el-menu-item index="./../user/register">
            Register
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import MyUserName from './../user/MyUserName.vue';

export default {
  name: 'NavBar',
  data() {
    return {
      activeIndex: '/'
    }
  },
  components: {
    MyUserName
  }
};
</script>

<style lang="css" scoped>
#nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

#user_icon {
  height: 50%;
}
</style>
