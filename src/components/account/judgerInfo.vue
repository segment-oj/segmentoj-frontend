<template>
  <div v-loading="userLoading">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <i class="el-icon-user" />
            <span class="label"> Judger</span>
            Name
          </div>
          {{ username }}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <i class="el-icon-warning-outline" />
            <span class="label"> User</span>
            ID
          </div>
          {{ userid }}
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-date" />
            <span class="label"> Time Joined</span>
          </div>
          {{ timeJoin }}
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
      <el-col :span="12">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-check" />
            <span class="label"> Judged</span>
            <div class="small-label"> Judged</div>
          </div>
          <div class="clearfix">
            {{ submit }}
            <span class="label"> Problems</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never" class="margin-top-20">
          <div slot="header" class="clearfix">
            <i class="el-icon-cpu" />
            <span class="label"> Hardware Config</span>
            <div class="small-label"> Hardware</div>
          </div>
          <div class="clearfix">
            {{ introduction }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="margin-top-20">
      <div slot="header" class="clearfix"><i class="el-icon-user" /> Permissions</div>
      <el-checkbox v-model="isStaff" disabled>Staff</el-checkbox>
      <el-checkbox v-model="isRoot" disabled>Root</el-checkbox>
      <el-checkbox v-model="isActive" disabled>Active</el-checkbox>
      <el-checkbox v-model="isJudger" disabled>Judger</el-checkbox>
    </el-card>
  </div>
</template>
  
<script>
import timeFormat from './../../methods/time';
import apiurl from './../../apiurl';

export default {
  name: 'JudgerHomePage',
  data() {
    return {
      staff: false,
      username: 'Unknown',
      userid: '-',
      introduction: null,
      submit: '-',
      ismine: false,
      timeJoin: 'Unknown',
      lastLogin: 'Unknown',
      userLoading: true,
      isRoot: false,
      isStaff: false,
      isActive: true,
      isJudger: true,
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
          this.isJudger = data.is_judger;
          if (this.$store.state.user.isStaff || this.userid == this.$store.state.user.userid.toString) {
            this.ismine = true;
          }

          this.$axios
            .get(apiurl(`/account/${this.$route.params.id}/introduction`))
            .then(detail => {
              this.introduction = detail.data.res.introduction;
            });
          this.userLoading = false;
        })
        .catch(err => {
          if (err.request.status === 404) {
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
  