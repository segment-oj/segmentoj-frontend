<template>
  <div id="user-content">
    <div>
      <el-card shadow="never">
        <el-avatar shape="square" icon="el-icon-user-solid" :size="400"></el-avatar>
      </el-card>
      <el-card shadow="never" class="item">
        <div slot="header" class="clearfix"><i class="el-icon-user" /> User Name</div>
        {{username}}
      </el-card>
    </div>
    <div id="info">
      <el-card shadow="never">
        <div slot="header" class="clearfix"><i class="el-icon-message" /> Email</div>
        {{email}}
      </el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix"><i class="el-icon-check" /> Sloved</div>
            {{solved}} Problems
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix"><i class="el-icon-upload2" /> Submited</div>
            {{submit}} Problems
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never" class="item">
            <div slot="header" class="clearfix"><i class="el-icon-finished" /> AC Rate</div>
            <el-progress :text-inside="true" :stroke-width="24" :percentage="rate" status="success" :color="ACRateColorMode"></el-progress>
          </el-card>
        </el-col>
      </el-row>
      <el-card shadow="never" class="item">
        <div slot="header" class="clearfix"><i class="el-icon-chat-line-square" /> Introduction</div>
        <MarkdownContainer v-if="introduction" :content="introduction"/>
      </el-card>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';

export default {
  name: 'UserHomepage',
  data() {
    return {
      username: '-',
      email: '-',
      introduction: null,
      solved: '-',
      submit: '-',
      rate: '-'
    };
  },
  methods: {
    showHomepage() {
      this.$axios
        .get(apiurl('/account/' + this.$route.params.id))
        .then(res => {
          let data = res.data.res;
          this.username = data.username;
          this.email = data.email;
          this.introduction = data.introduction;
          this.solved = data.solved;
          this.submit = data.submit_time;
          this.rate = (this.solved * 100.0) / this.submit;
          this.rate = this.rate.toFixed(2);
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
</style>
