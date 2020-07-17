<template>
  <div id="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu>
        <template slot="title">
          用户
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
    </el-menu>
  </div>
</template>

<script>
import MyUserName from './user/MyUserName.vue';

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
