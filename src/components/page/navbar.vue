<template>
  <div id="nav" class="high-zindex">
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
        <el-menu-item index="" @click="$router.push('/')">
          <img src="./../../assets/icon/SOJ-thick-white.png" style="height: 40px;" />
        </el-menu-item>
        <el-menu-item index="/" class="webkit-box">
          <i class="el-icon-s-home" />
          <div class="lable"> Home</div>
        </el-menu-item>
        <el-menu-item index="/problem/list" class="webkit-box">
          <i class="el-icon-s-order" /> 
          <div class="lable"> Problem List</div>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-help" />
            <span class="lable"> Applications</span>
          </template>
          <el-menu-item index="/app/editor">
            Code Editor
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2" id="user">
          <template slot="title">
              <el-avatar shape="square">
                <img src="./../../assets/icon/SOJ-thick-white-background.png" />
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

<style scoped>
@media only screen and (max-width: 500px) {
    .lable {
        display: none;
    }
}

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

#menu {
    border: none;
}

#user {
    float: right;
}

#user_icon {
    height: 50%;
}

.webkit-box {
    display: -webkit-box;
}
</style>
