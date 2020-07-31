<template>
  <div class="content">
    <div id="tool-bar">
      <el-card shadow="never">
        <el-avatar shape="square" :size="400"><img src="./../../assets/icon/SOJ-thick-white-background.png" /></el-avatar>
      </el-card>
      <el-card class="item">
        <div slot="header" class="clearfix"><i class="el-icon-setting" /> Tool Bar</div>
        <el-button v-if="isMine || this.$store.state.user.isStaff || this.$store.state.user.isRoot" type="primary" @click="submit()">Submit</el-button>
        <el-button @click="$router.go(-1);">Back</el-button>
      </el-card>
    </div>
    <div v-loading="!(isMine || this.$store.state.user.isStaff || this.$store.state.user.isRoot)" class="edit-content">
      <el-card>
        <div slot="header" class="clearfix"><i class="el-icon-user" /> User Name</div>
        <el-input v-model="username"></el-input>
      </el-card>
      <el-card class="item">
        <div slot="header" class="clearfix"><i class="el-icon-chat-line-square" /> Permissions</div>
        <el-checkbox v-model="isStaff" :disabled="!isStaffMe && !isRootMe">Staff</el-checkbox>
        <el-checkbox v-model="isRoot" :disabled="!isStaffMe && !isRootMe">Root</el-checkbox>
        <el-checkbox v-model="isActive" :disabled="(!isStaffMe && !isRootMe) || isMine">Active</el-checkbox>
      </el-card>
      <el-card class="item">
        <div slot="header" class="clearfix"><i class="el-icon-chat-line-square" /> Introductions</div>
        <MarkdownEditor v-model="introduction" />
      </el-card>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownEditor from './../lib/MarkdownEditor.vue';

export default {
  name: 'UserEdit',
  data() {
    return {
      username: 'Unknown',
      email: 'Unknown',
      introduction: 'loading...',
      isMine: false,
      isStaff: false,
      isRoot: false,
      isActive: true,
      isRootMe: false,
      isStaffMe: false,
      isActiveMe: true
    };
  },
  methods: {
    showEdit() {
      this.$axios
        .get(apiurl('/account/' + this.$route.params.id))
        .then(res => {
          let data = res.data.res;
          this.isRootMe = this.$store.state.user.isRoot;
          this.isStaffMe = this.$store.state.user.isStaff;
          if (data.id == this.$store.state.user.userid) {
            this.isMine = true;
          }
          if (this.isMine || this.isRootMe || this.isStaffMe) {
            this.username = data.username;
            this.email = data.email;
            this.introduction = data.introduction;
            this.isStaff = data.is_staff;
            this.isRoot = data.is_superuser;
            this.isActive = data.is_active;
          }
        });
    },
    submit() {
      this.$axios
        .patch(apiurl('/account/' + this.$route.params.id), {
          username: this.username,
          introduction: this.introduction,
          is_staff: this.isStaff,
          is_superuser: this.isRoot,
          is_active: this.isActive
        })
        .then(() => {
          this.$SegmentMessage.success(this, 'Submitted');
          if (this.isMine) {
            this.$store.commit('userStaffChange', {
              isStaff: this.isStaff,
              isRoot: this.isRoot
            });
          }
        });
    }
  },
  mounted() {
    this.showEdit();
  },
  components: {
    MarkdownEditor
  }
};
</script>

<style scoped>
#tool-bar {
    margin-right: 30px;
}

.edit-content {
    width: 100%;
}

.content {
    display: flex;
}

.item {
    margin-top: 20px;
}
</style>
