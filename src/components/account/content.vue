<template>
  <el-row :gutter="20">
    <el-col :span="8" id="tool">
      <el-card shadow="never">
        <UserAvatar :imgsrc="avatar_url" shape="square" :size="320" />
      </el-card>
      <BadgeBoard></BadgeBoard>
    </el-col>

    <el-col :span="16" id="info">
      <el-tabs v-model="active_tab" :tab-position="'right'">
        <el-tab-pane label="Information" name="first">
          <userInfo></userInfo>
        </el-tab-pane>
        <el-tab-pane v-if="can_edit" label="Edit" name="second">
          <userEdit></userEdit>
        </el-tab-pane>
        <el-tab-pane v-if="is_mine" label="Security" name="third">
          <userSecure></userSecure>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import apiurl from './../../apiurl';
import userInfo from './information.vue';
import userEdit from './edit.vue';
import userSecure from './secure.vue';
import UserAvatar from './avatar.vue';
import BadgeBoard from './BadgeBoard.vue';

export default {
  name: 'UserHomepage',
  data() {
    return {
      active_tab: 'first',
      is_mine: false,
      can_edit: false,
      avatar_url: '',
    };
  },
  methods: {
    showHomepage() {
      this.$axios
        .get(apiurl(`/account/${this.$route.params.id}`))
        .then(res => {
          let data = res.data.res;
          this.userid = data.id;
          this.isStaff = data.is_staff;
          this.avatar_url = data.avatar_url;
          if (this.userid == this.$store.state.user.userid.toString()) {
            this.is_mine = true;
          }
          if (this.$store.state.user.isStaff || this.is_mine) {
            this.can_edit = true;
          }
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$info.error('User does not exist');
          } else {
            this.$info.error('Unknown error');
          }
          this.userLoading = false;
        });
    },
  },
  mounted() {
    this.showHomepage();
  },
  components: {
    userInfo,
    userEdit,
    userSecure,
    UserAvatar,
    BadgeBoard
  }
};
</script>

<style scoped>
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
        margin-left: 0;
        width: 800px;
    }
}
</style>
