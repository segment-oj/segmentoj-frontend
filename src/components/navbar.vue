<template>
  <div id="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router="true"
      @select="handleSelect"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item>
        <UserInfo></UserInfo>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import UserInfo from './user/userinfo.vue';

export default {
  name: 'NavBar',
  components: {
    UserInfo
  }
};
</script>