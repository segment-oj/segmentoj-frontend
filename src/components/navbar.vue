<template>
  <div id="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item>
        <el-submenu>
          <template slot="title">
            <img src="./../assets/logo.png" id="user_icon"/>
          </template>
          <div v-if="this.$store.state.user.authenticated">
            <el-menu-item>
              <MyUserName />
            </el-menu-item>
            <el-menu-item index="/user/logout">
              登出
            </el-menu-item>
          </div>
          <div v-else>
            <el-menu-item index="/user/login">
              登录
            </el-menu-item>
            <el-menu-item index="/user/register">
              注册
            </el-menu-item>
          </div>
        </el-submenu>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import MyUserName from "./user/MyUserName.vue";

export default {
  name: 'NavBar',
  data() {
    return {
      activeIndex: '1'
    }
  },
  components: {
    MyUserName
  }
};
</script>

<style lang="css" scoped>
#user_icon {
  height: 50%;
}
</style>