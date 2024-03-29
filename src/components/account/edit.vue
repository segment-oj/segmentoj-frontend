<template>
  <div>
    <el-button class="submit-button" @click="submit()">Submit</el-button>
    <div class="margin-top-20 content">
      <div v-loading="!(isMine || this.$store.state.user.isStaff || this.$store.state.user.isRoot)" class="edit-content">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-card>
              <div slot="header" class="clearfix">
                <i class="el-icon-user" />
                User Name
              </div>
              <el-input v-model="username"></el-input>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card>
              <div slot="header" class="clearfix">
                <i class="el-icon-s-operation" />
                <div class="label">Default Language</div>
                <div class="small-label">Lang</div>
              </div>
              <el-cascader 
                ref="langSelect"
                v-model="lang"
                placeholder="Select language"
                :options="options">
              </el-cascader>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-chat-line-square" />
            Permissions
          </div>
          <el-checkbox v-model="isStaff" :disabled="!isStaffMe && !isRootMe">Staff</el-checkbox>
          <el-checkbox v-model="isRoot" :disabled="!isStaffMe && !isRootMe">Root</el-checkbox>
          <el-checkbox v-model="isActive" :disabled="(!isStaffMe && !isRootMe) || isMine">Active</el-checkbox>
          <el-checkbox v-model="isJudger" :disabled="!isStaffMe && !isRootMe">Judger</el-checkbox>
        </el-card>
        <el-row class="margin-top-20" :gutter="20">
          <el-col :span="8">
            <el-card>
              <div slot="header" class="clearfix">
                <i class="el-icon-camera" />
                Navbar Color
              </div>
              <el-color-picker
                v-model="nav_color"
                :predefine="predefineColors"
                color-format="hex"
              >
              </el-color-picker>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card>
              <div slot="header" class="clearfix">
                <i class="el-icon-picture-outline" />
                Avatar URL
              </div>
              <el-input v-model="avatar_url"></el-input>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-chat-line-square" />
            Introductions
          </div>
          <MarkdownEditor v-model="introduction" />
        </el-card>
      </div>
    </div>
    <el-button class="margin-top-20 submit-button submit-button-bottom" @click="submit()">Submit</el-button>
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
      nav_color: this.$store.state.user.navColor,
      predefineColors: sfconfig.navColorPreset,
      username: 'Unknown',
      email: 'Unknown',
      introduction: 'loading...',
      isMine: false,
      isStaff: false,
      isRoot: false,
      isActive: true,
      isJudger: false,
      isRootMe: false,
      isStaffMe: false,
      isActiveMe: true,
      buttonLoading: false,
      lang: '-',
      avatarWidth: 800 < screen.width ? 400 : screen.width - 40,
      smallScreen: screen.width < 700,
      majorLangTable: sfconfig.majorLangTable,
      options: [],
      avatar_url: this.$store.state.user.avatarURL,
      extra_data: JSON.parse(this.$store.state.user.extra_data),
    };
  },
  methods: {
    showEdit() {
      this.nav_color = this.extra_data.nav_color;
      this.$axios
        .get(apiurl(`/account/${this.$route.params.id}`))
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
            this.isStaff = data.is_staff;
            this.isRoot = data.is_superuser;
            this.isActive = data.is_active;
            this.isJudger = data.is_judger;
            this.lang = data.lang;
          }
          this.avatar_url = data.avatar_url;
        })
        .catch(err => {
          if (err.request.status === 404) {
            this.$info.error('User not found');
          } else if (err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });
      this.$axios
        .get(apiurl(`/account/${this.$route.params.id}/introduction`))
        .then(res => {
          let data = res.data.res;
          this.introduction = data.introduction;
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
    submit() {
      this.extra_data.nav_color = this.nav_color;
      this.$store.commit('userConfigChange', {
        extra_data: JSON.stringify(this.extra_data)
      });
      const post_extra_data = {segmentoj_extra_data: this.extra_data};
      this.$axios
        .patch(apiurl(`/account/${this.$route.params.id}/extradata`), {
          extra_data: JSON.stringify(post_extra_data),
        })
        .catch(err => {
          this.buttonLoading = false;
          if (err.request.status === 404) {
            this.$info.error('User not found');
          } else if (err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });

      this.buttonLoading = true;
      this.$axios
        .patch(apiurl(`/account/${this.$route.params.id}/introduction`), {
          introduction: this.introduction,
        })
        .then(() => {
          this.buttonLoading = false;
        });

      this.$axios
        .patch(apiurl(`/account/${this.$route.params.id}`), {
          username: this.username,
          is_staff: this.isStaff,
          is_superuser: this.isRoot,
          is_active: this.isActive,
          lang: this.$refs['langSelect'].getCheckedNodes(true)[0].value,
          avatar_url: this.avatar_url,
        })
        .then(() => {
          if (this.isMine) {
            this.$store.commit('userNavColorChange', {
              nav_color: this.nav_color
            });
            this.$store.commit('userAvatarURLChange', {
              avatar_url: this.avatar_url
            });
          }
          this.buttonLoading = false;
          this.$info.success('Your changes have been submitted');
          if (this.isMine) {
            this.$store.commit('userStaffChange', {
              isStaff: this.isStaff,
              isRoot: this.isRoot
            });
            this.$store.commit('userLang', {
              lang: this.lang
            });
          }
        })
        .catch(err => {
          this.buttonLoading = false;
          if (err.request.status === 404) {
            this.$info.error('User not found');
          } else if (err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });
    },
    makeLangOptions() {
      let route = [];
      const formOptions = (lang_id, options_id) => {
        let res = {};
        const lang = this.majorLangTable[lang_id];
        res.label = route[route.length - 1];
        if (lang.options.length != options_id) {
          res.children = [];
        } else {
          res.value = `${lang.stringCode};`;
          for (let j in route) {
            res.value = res.value + route[j];
            if (j != route.length - 1) {
              res.value = res.value + ',';
            }
          }
          return res;
        }
        for (let i in lang.options[options_id].list) {
          route.push(lang.options[options_id].list[i]);
          res.children.push(formOptions(lang_id, options_id + 1));
          route.pop();
        }
        return res;
      };
      for (let i in this.majorLangTable) {
        let lang_table = formOptions(i, 0);
        lang_table.label = this.majorLangTable[i].label;
        this.options.push(lang_table);
      }
    }
  },
  mounted() {
    this.makeLangOptions();
    this.showEdit();
  },
  components: {
    MarkdownEditor
  }
};
</script>

<style scoped>
.submit-button {
    width: 100%;
}

#tool-bar {
    margin-right: 30px;
}

.edit-content {
    width: 100%;
}

.content {
    display: flex;
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
