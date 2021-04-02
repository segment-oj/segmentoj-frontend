<template>
  <div v-loading="userLoading">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <i class="el-icon-user" />
            <span class="label"> User</span>
            Name
          </div>
          {{username}}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <i class="el-icon-warning-outline" />
            <span class="label"> User</span>
            ID
          </div>
          {{userid}}
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-message" /> Email
          </div>
          {{email}}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-date" />
            <span class="label"> Time Joined</span>
          </div>
          {{timeJoin}}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-time" />
            <span class="label"> Last Login</span>
          </div>
          {{lastLogin}}
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-operation" />
            <span class="label"> Lang</span>
          </div>
          {{majorLangTable[lang].label}}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-check" />
            <span class="label"> Solved</span>
            <div class="small-label"> AC</div>
          </div>
          <div class="clearfix">
            {{solved}}
            <span class="label"> Problems</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-upload2" />
            <span class="label"> Submitted</span>
            <div class="small-label"> SU</div>
          </div>
          <div class="clearfix">
            {{submit}}
            <span class="label"> Times</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-finished" />
            <span class="label"> AC</span>
            Rate
          </div>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="rate" status="success" :color="ACRateColorMode"></el-progress>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="never" class="margin-top-20">
      <div slot="header" class="clearfix">
        <i class="el-icon-chat-line-square" />
        Introductions
      </div>
      <MarkdownContainer v-if="introduction" :content="introduction"/>
    </el-card>
    <el-card class="margin-top-20">
      <div slot="header" class="clearfix"><i class="el-icon-user" /> Permissions</div>
      <el-checkbox v-model="isStaff" disabled>Staff</el-checkbox>
      <el-checkbox v-model="isRoot" disabled>Root</el-checkbox>
      <el-checkbox v-model="isActive" disabled>Active</el-checkbox>
    </el-card>
  </div>
</template>

<script>
import timeFormat from './../../methods/time';
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';
import sfconfig from './../../sfconfig';

export default {
  name: 'UserHomepage',
  data() {
    return {
      staff: false,
      username: 'Unknown',
      userid: '-',
      email: 'Unknown',
      introduction: null,
      solved: '-',
      submit: '-',
      rate: 100,
      ismine: false,
      timeJoin: 'Unknown',
      lastLogin: 'Unknown',
      userLoading: true,
      isRoot: false,
      isStaff: false,
      isActive: true,
      majorLangTable: sfconfig.majorLangTable,
      lang: 0
    };
  },
  methods: {
    showHomepage() {
      this.$axios
        .get(apiurl(`/account/${this.$route.params.id}`))
        .then(res => {
          let data = res.data.res;
          this.username = data.username;
          this.userid = data.id;
          this.email = data.email;
          this.solved = data.solved;
          this.submit = data.submit_time;
          this.timeJoin = timeFormat(data.date_joined);
          if (data.last_login == null) {
            this.lastLogin = 'Never';
          } else {
            this.lastLogin = timeFormat(data.last_login);
          }
          this.isRoot = data.is_superuser;
          this.isStaff = data.is_staff;
          this.isActive = data.is_active;
          for (let i in this.majorLangTable) {
            if (data.lang.split(';')[0] == this.majorLangTable[i].stringCode) {
              this.lang = i;
            }
          }
          if (this.submit === 0) {
            this.rate = 100;
          } else {
            this.rate = (this.solved * 100.0) / this.submit;
            this.rate = this.rate.toFixed(2);
          }
          if (this.$store.state.user.isStaff || this.userid == this.$store.state.user.userid.toString) {
            this.ismine = true;
          }
          this.$axios
            .get(apiurl(`/account/${this.$route.params.id}/introduction`))
            .then(detail => {
              this.introduction = detail.data.res.introduction;
            })
            .catch(err => {
              if(err.request.status === 404) {
                this.$info.error('User does not exist');
              } else {
                this.$info.error('Unknown error');
              }
            });
          this.userLoading = false;
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
    ACRateColorMode(percentage) {
      if (percentage < 20) {
        return 'var(--color-red)';
      } else if (percentage < 30) {
        return 'var(--color-yellow)';
      } else if (percentage < 50) {
        return 'var(--color-green)';
      }
      return 'var(--color-blue)';
    }
  },
  mounted() {
    this.showHomepage();
  },
  components: {
    MarkdownContainer
  }
};
</script>

<style scoped>
.small-label {
    display: none;
}

.clearfix {
    display: block ruby;
}

@media only screen and (max-width: 800px) {
    .label {
        display: none;
    }

    .small-label {
        display: unset;
    }
}
</style>
