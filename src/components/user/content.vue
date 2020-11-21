<template>
  <div id="user-content">
    <div id="tool">
      <el-card shadow="never">
        <el-avatar shape="square" :size="this.avatarWidth">
          <img src="./../../assets/icon/SOJ-thick-white-background.png" />
        </el-avatar>
      </el-card>
      <!-- Mobile screen -->
      <el-card class="item float" v-if="!smallScreen">
        <el-button v-if="ismine" type="primary" @click="$router.push('/account/' + $route.params.id + '/edit');" icon="el-icon-edit" circle />
        <el-button @click="$router.go(-1);" icon="el-icon-back" circle />
      </el-card>
      <!-- Normal screen -->
      <el-card class="item" v-else>
        <el-button v-if="ismine" type="primary" @click="$router.push('/account/' + $route.params.id + '/edit');">Edit</el-button>
        <el-button @click="$router.go(-1);">Back</el-button>
      </el-card>
    </div>

    <userinfo></userinfo>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import userinfo from './information.vue';

export default {
  name: 'UserHomepage',
  data() {
    return {
      ismine: false,
      avatarWidth: 800 < screen.width ? 300 : screen.width - 40,
      smallScreen: 700 < screen.width,
    };
  },
  methods: {
    showHomepage() {
      this.$axios
        .get(apiurl('/account/' + this.$route.params.id))
        .then(res => {
          let data = res.data.res;
          this.userid = data.userid;
          this.isStaff = data.is_staff;
          if (this.$store.state.user.isStaff || this.userid == String(this.$store.state.user.userid)) {
            this.ismine = true;
          }
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$SegmentMessage.error(this, 'User does not exist');
          } else {
            this.$SegmentMessage.error(this, 'Unknown error');
          }
          this.userLoading = false;
        });
    },
  },
  mounted() {
    this.showHomepage();
  },
  components: {
    userinfo
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}

#info {
    margin-left: 30px;
    width: 800px;
}

#user-content {
    display: flex;
}

@media only screen and (max-width: 800px) {
    #user-content {
        display: inline;
    }
}

@media only screen and (max-width: 700px) {
    .float {
        z-index: 1000;
        opacity: 0.5;
        position: fixed;
        transition: 0.5s;
        right: 30px;
        top: 50px;
    }

    .float:active {
        z-index: 1000;
        opacity: 1;
    }

    .float:hover {
        z-index: 1000;
        opacity: 1;
    }

    #info {
        margin-top: 20px;
        margin-left: 0px;
        width: 800px;
    }
}
</style>
