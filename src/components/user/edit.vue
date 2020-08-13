<template>
  <div class="content">
    <div id="tool-bar">
      <el-card shadow="never">
        <el-avatar shape="square" :size="avatarWidth">
          <img src="./../../assets/icon/SOJ-thick-white-background.png" />
        </el-avatar>
      </el-card>
      <!-- Mobile screen -->
      <el-card class="item float" v-if="smallScreen">
        <el-button
          v-if="isMine || this.$store.state.user.isStaff || this.$store.state.user.isRoot"
          type="primary"
          @click="submit()"
          icon="el-icon-check"
          circle
        />
        <el-button
          @click="$router.go(-1);"
          icon="el-icon-back"
          circle
        />
      </el-card>
      <!-- Normal screen -->
      <el-card class="item" v-else>
        <el-button
          v-if="isMine || this.$store.state.user.isStaff || this.$store.state.user.isRoot"
          type="primary"
          @click="submit()"
          :loading="buttonLoading"
        >
          Submit
        </el-button>
        <el-button @click="$router.go(-1);">Back</el-button>
      </el-card>
    </div>
    <div v-loading="!(isMine || this.$store.state.user.isStaff || this.$store.state.user.isRoot)" class="edit-content">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card>
            <div slot="header" class="clearfix">
              <i class="el-icon-user" />
              User Name
            </div>
            <el-input v-model="username"></el-input>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="clearfix">
              <i class="el-icon-s-operation" />
              <div class="label">Default Language</div>
              <div class="small-label">Lang</div>
            </div>
            <el-select v-model="lang" placeholder="Select language">
              <el-option
                v-for="item in langTable"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="item">
        <div slot="header" class="clearfix">
          <i class="el-icon-chat-line-square" />
          Permissions
        </div>
        <el-checkbox v-model="isStaff" :disabled="!isStaffMe && !isRootMe">Staff</el-checkbox>
        <el-checkbox v-model="isRoot" :disabled="!isStaffMe && !isRootMe">Root</el-checkbox>
        <el-checkbox v-model="isActive" :disabled="(!isStaffMe && !isRootMe) || isMine">Active</el-checkbox>
      </el-card>
      <el-card class="item">
        <div slot="header" class="clearfix">
          <i class="el-icon-chat-line-square" />
          Introductions
        </div>
        <MarkdownEditor v-model="introduction" />
      </el-card>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownEditor from './../lib/MarkdownEditor.vue';
import sfconfig from './../../sfconfig';

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
      isActiveMe: true,
      buttonLoading: false,
      lang: '-',
      avatarWidth: 800 < screen.width ? 400 : screen.width - 40,
      smallScreen: screen.width < 700,
      langTable: sfconfig.langTable
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
            this.lang = String(data.lang);
          }
        });
    },
    submit() {
      this.buttonLoading = true;
      this.$axios
        .patch(apiurl('/account/' + this.$route.params.id), {
          username: this.username,
          introduction: this.introduction,
          is_staff: this.isStaff,
          is_superuser: this.isRoot,
          is_active: this.isActive,
          lang: this.lang
        })
        .then(() => {
          this.buttonLoading = false;
          this.$SegmentMessage.success(this, 'Your changes have been submitted');
          if (this.isMine) {
            this.$store.commit('userStaffChange', {
              isStaff: this.isStaff,
              isRoot: this.isRoot
            });
            this.$store.commit('userLang', {
              lang: this.lang
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

.small-label {
    display: none;
}

.clearfix {
    display: -webkit-box;
}

@media only screen and (max-width: 700px) {
    .content {
        display: inline;
    }

    #tool-bar {
        margin-right: 0;
    }

    .edit-content {
        margin-top: 20px;
    }

    .label {
        display: none;
    }

    .small-label {
        display: unset;
    }

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
}
</style>
