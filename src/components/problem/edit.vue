<template>
  <div>
    <span class="text-extra-big">Edit problem #.{{this.$route.params.id}}</span>
    <el-input v-model="title" placeholder="input problem title here"></el-input>
    <MarkdownEditor v-model="mdContent" />
    <el-button type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
    <el-button @click="back();">Back</el-button>
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
        .get(apiurl('/problem/content'), {
          params: {
            pid: this.$route.params.id
          }
        })
        .then(res => {
          let data = res.data;
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
        .patch(apiurl('/problem/content'), {
          pid: Number(this.$route.params.id),
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