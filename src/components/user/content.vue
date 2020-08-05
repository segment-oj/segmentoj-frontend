<template>
  <div id="user-content">
    <div id="tool">
      <el-card shadow="never">
        <el-avatar shape="square" :size="this.avatarWidth">
          <img src="./../../assets/icon/SOJ-thick-white-background.png" />
        </el-avatar>
      </el-card>
      <el-card class="item float" v-if="!smallScreen">
        <el-button v-if="ismine" type="primary" @click="$router.push('/account/' + $route.params.id + '/edit');" icon="el-icon-edit" circle />
        <el-button @click="$router.go(-1);" icon="el-icon-back" circle />
      </el-card>
      <el-card class="item" v-else>
        <el-button v-if="ismine" type="primary" @click="$router.push('/account/' + $route.params.id + '/edit');">Edit</el-button>
        <el-button @click="$router.go(-1);">Back</el-button>
      </el-card>
    </div>
    <div id="info" v-loading="userLoading">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <i class="el-icon-user" />
              <div class="lable"> User</div>
              Name
            </div>
            {{username}}
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never">
            <div slot="header" class="clearfix"><i class="el-icon-warning-outline" />
              <div class="lable"> User</div>
              ID
            </div>
            {{userid}}
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix">
              <i class="el-icon-message" />Email
            </div>
            {{email}}
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix">
              <i class="el-icon-date" />
              <div class="lable"> Time Joined</div>
            </div>
            {{timeJoin}}
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix">
              <i class="el-icon-time" />
              <div class="lable"> Last Login</div>
            </div>
            {{lastLogin}}
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix">
              <i class="el-icon-check" />
              <div class="lable"> Sloved</div>
              <div class="small-lable"> AC</div>
            </div>
            <div class="clearfix">
              {{solved}}
              <div class="lable"> Problems</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix"><i class="el-icon-upload2" />
              <div class="lable"> Submited</div>
              <div class="small-lable"> SU</div>
            </div>
            <div class="clearfix">
              {{submit}}
              <div class="lable"> Times</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix">
              <i class="el-icon-finished" />
              <div class="lable"> AC</div>
              Rate
            </div>
            <el-progress :text-inside="true" :stroke-width="24" :percentage="rate" status="success" :color="ACRateColorMode"></el-progress>
          </el-card>
        </el-col>
      </el-row>
      <el-card shadow="never" class="item">
        <div slot="header" class="clearfix"><i class="el-icon-chat-line-square" /> Introductions</div>
        <MarkdownContainer v-if="introduction" :content="introduction"/>
      </el-card>
      <el-card class="item">
        <div slot="header" class="clearfix"><i class="el-icon-user" /> Permissions</div>
        <el-checkbox v-model="isStaff" disabled>Staff</el-checkbox>
        <el-checkbox v-model="isRoot" disabled>Root</el-checkbox>
        <el-checkbox v-model="isActive" disabled>Active</el-checkbox>
      </el-card>
    </div>
  </div>
</template>

<script>
import timeFormat from './../../methods/time';
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';

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
      avatarWidth: 800 < screen.width ? 300 : screen.width - 40,
      smallScreen: 700 < screen.width
    };
  },
  methods: {
    showHomepage() {
      this.$axios
        .get(apiurl('/account/' + this.$route.params.id))
        .then(res => {
          let data = res.data.res;
          this.username = data.username;
          this.userid = data.id;
          this.email = data.email;
          this.introduction = data.introduction;
          this.solved = data.solved;
          this.submit = data.submit_time;
          this.timeJoin = timeFormat(data.date_joined);
          this.lastLogin = timeFormat(data.last_login);
          this.isRoot = data.is_superuser;
          this.isStaff = data.is_staff;
          this.isActive = data.is_active;
          this.userLoading = false;
          if (this.submit === 0) {
            this.rate = 100;
          } else {
            this.rate = (this.solved * 100.0) / this.submit;
            this.rate = this.rate.toFixed(2);
          }
          if (this.$store.state.user.isStaff || this.userid == String(this.$store.state.user.userid)) {
            this.ismine = true;
          }
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$SegmentMessage.error(this, 'User does not exist');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
        });
    },
    ACRateColorMode(percentage) {
      if (percentage < 20) {
        return '#F56C6C';
      } else if (percentage < 30) {
        return '#E6A23C';
      } else if (percentage < 50) {
        return '#67C23A';
      }
      return '#409EFF';
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
.small-lable {
    display: none;
}

.clearfix {
    display: block ruby;
}

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

    #info {
        margin-left: 0;
        margin-top: 20px;
        max-width: 100vw;
    }

    .lable {
        display: none;
    }

    .small-lable {
        display: unset;
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
}
</style>
