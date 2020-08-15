<template>
  <div>
    <router-link :to="( '/problem/' + String(this.pid))" class="text-normal">{{this.title}} </router-link>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'ProblemTitleLink',
  props: {
    pid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      title: new String()
    };
  },
  methods: {
    loadproblem(id) {
      this.$axios
        .get(apiurl('/problem/' + String(id)))
        .then(res => {
          this.title = '#' + String(id) + '.' + res.data.res.title;
        })
        .catch(() => {
          this.title = '#' + String(id);
        });
    }
  },
  mounted() {
    console.log(this.pid);
    this.title = '#' + this.pid;
    this.loadproblem(this.pid);
  }
};
</script>