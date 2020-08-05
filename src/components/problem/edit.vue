<template>
  <div v-if="!smallScreen">
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix"><i class="el-icon-edit-outline" /> Name</div>
          <el-input v-model="title" placeholder="Input problem title here"></el-input>
          <el-checkbox v-model="enabled" label="Enabled" class="item"></el-checkbox>
          <el-checkbox v-model="html" label="Allow HTML" class="item"></el-checkbox>
        </el-card>
        <el-card class="item">
          <i class="el-icon-menu" /> Limitation
          <el-divider>Time</el-divider>
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input v-model="time" placeholder="Set time limitation"></el-input>
            </el-col>
            <el-col :span="4" class="center-text">
              MS
            </el-col>
          </el-row>
          <el-divider>Memery</el-divider>
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input v-model="memery" placeholder="Set memery limitation"></el-input>
            </el-col>
            <el-col :span="4" class="center-text">
              MB
            </el-col>
          </el-row>
        </el-card>
        <el-card class="item">
          <el-button type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
          <el-button @click="back();">Back</el-button>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card v-loading="contentLoading">
          <div slot="header" class="clearfix"><i class="el-icon-document" /> Content</div>
          <MarkdownEditor v-model="mdContent" />
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <el-card class="float">
      <el-button type="primary" @click="submit();" icon="el-icon-check" circle />
      <el-button @click="back();" icon="el-icon-back" circle />
    </el-card>
    <el-card>
      <div slot="header" class="clearfix"><i class="el-icon-edit-outline" /> Name</div>
      <el-input v-model="title" placeholder="Input problem title here"></el-input>
      <el-checkbox v-model="enabled" label="Enabled" class="item"></el-checkbox>
      <el-checkbox v-model="html" label="Allow HTML" class="item"></el-checkbox>
    </el-card>
    <el-card class="item">
      <i class="el-icon-menu" /> Limitation
      <el-divider>Time</el-divider>
      <el-row :gutter="10">
        <el-col :span="20">
          <el-input v-model="time" placeholder="Set time limitation"></el-input>
        </el-col>
        <el-col :span="4" class="center-text">
          MS
        </el-col>
      </el-row>
      <el-divider>Memery</el-divider>
      <el-row :gutter="10">
        <el-col :span="20">
          <el-input v-model="memery" placeholder="Set memery limitation"></el-input>
        </el-col>
        <el-col :span="4" class="center-text">
          MB
        </el-col>
      </el-row>
    </el-card>
    <el-card v-loading="contentLoading" class="item">
      <div slot="header" class="clearfix"><i class="el-icon-document" /> Content</div>
      <MarkdownEditor v-model="mdContent" />
    </el-card>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownEditor from './../lib/MarkdownEditor.vue';

export default {
  name: 'ProblemEdit',
  data() {
    return {
      title: '',
      mdContent: 'Loading...',
      contentLoading: true,
      buttonLoading: false,
      time: 'Unknown',
      memery: 'Unknown',
      enabled: true,
      html: false,
      smallScreen: screen.width < 700
    };
  },
  methods: {
    loadproblem() {
      this.$axios
        .get(apiurl('/problem/' + String(this.$route.params.id)))
        .then(res => {
          let data = res.data.res;
          this.title = data.title;
          this.mdContent = data.description;
          this.memery = data.memory_limit / 1000;
          this.time = data.time_limit;
          this.enabled = data.enabled;
          this.html = data.allow_html;
          this.contentLoading = false;
        })
        .catch(err => {
          this.$SegmentMessage.error(this, 'Problem loading error');
          console.log(err);
        });
    },
    back() {
      this.$router.push('/problem/'+this.$route.params.id);
    },
    submit() {
      this.buttonLoading = true;
      this.$axios
        .patch(apiurl('/problem/' + this.$route.params.id), {
          title: this.title,
          description: this.mdContent,
          memory_limit: this.memery * 1000,
          time_limit: this.time,
          allow_html: this.html,
          enabled: this.enabled
        })
        .then(() => {
          this.buttonLoading = false;
          this.$SegmentMessage.success(this, 'Your changes have been submitted');
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$SegmentMessage.error(this, 'Problem not found');
          } else if(err.request.status === 403) {
            this.$SegmentMessage.error(this, 'Permission denied');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
          this.buttonLoading = false;
        });
    }
  },
  mounted() {
    this.loadproblem();
  },
  components: {
    MarkdownEditor
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}

.center-text {
    margin-top: 0.7rem;
}

@media only screen and (max-width: 700px) {
    .float {
        z-index: 1000;
        opacity: 0.5;
        position: fixed;
        transition: 0.5s;
        right: 30px;
        top: 80px;
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
