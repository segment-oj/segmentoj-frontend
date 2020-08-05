<template>
  <div>
    <h1>Edit problem #{{this.$route.params.id}}</h1>
    <el-card>
      <div slot="header" class="clearfix"><i class="el-icon-edit-outline" /> Name</div>
      <el-input v-model="title" placeholder="input problem title here"></el-input>
    </el-card>
    <el-card class="item">
      <div slot="header" class="clearfix"><i class="el-icon-document" /> Content</div>
      <MarkdownEditor v-model="mdContent" />
    </el-card>
    <el-card class="item">
      <el-button type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
      <el-button @click="back();">Back</el-button>
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
      buttonLoading: false
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
          description: this.mdContent
        })
        .then(() => {
          this.$SegmentMessage.success(this, 'Your change has been submited');
          this.$router.push('/problem/'+this.$route.params.id);
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
</style>
