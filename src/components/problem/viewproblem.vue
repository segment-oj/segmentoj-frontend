<template>
  <div id="problem-view" v-highlight:auto>
    <div id="title" class="header text-bold">#{{pid}}. {{ title }}</div>
    <div v-katex:auto v-html="description"></div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'ProblemView',
  data() {
    return {
      description: null,
      title: null,
      pid: this.$route.params.id
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
          this.description = data.description;
          this.title = data.title;
          this.pid = data.pid;
        })
        .catch(err => {
          this.$message.error('Problem loading error');
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadproblem();
  }
};
</script>

<style scoped>
.header {
  text-align: center;
  font-size: 30px;
}
</style>