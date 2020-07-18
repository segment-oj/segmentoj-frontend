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
        active-text-color="#C0C4CC"
      >
        <el-menu-item index="/">Home</el-menu-item>
        <el-submenu index="2">
          <template slot="title">User</template>
          <div v-if="this.$store.state.user.authenticated">
            <el-menu-item>
              <MyUserName />
            </el-menu-item>
            <el-menu-item index="/user/logout">Logout</el-menu-item>
          </div>
          <div v-else>
            <el-menu-item @click="$parent.showLogin();">Login</el-menu-item>
            <el-menu-item @click="$parent.showRegister();">Register</el-menu-item>
          </div>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import MyUserName from "./../user/MyUserName.vue";

export default {
  name: "NavBar",
  data() {
    return {
      activeIndex: "/"
    };
  },
  components: {
    MyUserName
  }
};
</script>

<style lang="css" scoped>
#nav {
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

#user_icon {
  height: 50%;
}
</style>
