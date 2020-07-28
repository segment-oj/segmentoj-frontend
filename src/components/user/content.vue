<template>
  <div id="user-content">
    <div>
      <el-card shadow="never">
        <el-avatar shape="square" icon="el-icon-user-solid" :size="400"></el-avatar>
      </el-card>
    </div>
    <div id="info">
      <el-card shadow="never">
        <div slot="header" class="clearfix"><i class="el-icon-user" /> User Name</div>
        {{username}}
      </el-card>
      <el-card shadow="never" class="item">
        <div slot="header" class="clearfix"><i class="el-icon-message" /> Email</div>
        {{email}}
      </el-card>
      <el-card shadow="never" class="item">
        <div slot="header" class="clearfix"><i class="el-icon-check" /> Sloved</div>
        {{solved}} Problems
      </el-card>
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
      username: '',
      email: '',
      introduction: null
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
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$SegmentMessage.error(this, 'User does not exist');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
        });
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
