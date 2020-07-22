<template>
  <div id="problem-view">
    <div id="title" class="header text-bold">#{{pid}}. {{ title }}</div>
    <div id="content">
      <MarkdownContainer id="problem-content" v-if="description" :content="description" :allowHTML="this.allowHTML"/>
      <div id="pannel">

      </div>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';

export default {
  name: 'ProblemView',
  data() {
    return {
      description: null,
      title: null,
      pid: this.$route.params.id,
      allowHTML: false,
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
          this.pid = data.pid;
          this.allowHTML = data.allow_html;
          this.description = data.description;
        })
        .catch(err => {
          this.$message.error('Problem loading error');
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadproblem();
  },
  components: {
    MarkdownContainer
  }
};
</script>

<style scoped>
#content {
  margin-top: 30px;
  display: flex;
}

.header {
  font-size: 35px;
  text-align: center;
}

#problem-content {
  width: 800px;
  padding: 0px 20px 20px 20px;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
}

#pannel {
  margin-left: 20px;
  width: calc(1140px - 800px - 20px);
  padding: 20px;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
}
</style>