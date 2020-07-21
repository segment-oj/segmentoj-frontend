<template>
  <div id="problem-view">
    <div id="title" class="header text-extra-bold">#{{pid}}. {{ title }}</div>
    <div v-html="description" v-katex:auto></div>
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
            console.log(res);
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
  font-size: 35px;
}
</style>