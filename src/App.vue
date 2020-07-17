<template>
  <div id="app">
    <!--top navbar-->
    <div id="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router="true"
        @select="handleSelect"
      >
        <el-menu-item index="/">
          首页
        </el-menu-item>
        <el-menu-item>
          <UserInfo></UserInfo>
        </el-menu-item>
      </el-menu>
    </div>This is segmentoj.
    <router-view></router-view>
  </div>
</template>

<script>
import UserInfo from "./components/user/userinfo";

export default {
  name: "App",
  components: {
    UserInfo
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
