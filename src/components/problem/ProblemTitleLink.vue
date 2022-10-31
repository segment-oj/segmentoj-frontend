<template>
  <span>
    <router-link :to="( `/problem/${this.pid}`)" class="color-regular-text text-normal">{{this.title}} </router-link>
  </span>
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
      title: '',
    };
  },
  methods: {
    loadproblem(id) {
      this.$axios
        .get(apiurl(`/problem/${id}`))
        .then(res => {
          this.title = `#${id}. ${res.data.res.title}`;
        })
        .catch(() => {
          this.title = `#${id}`;
        });
    }
  },
  watch: {
    pid() {
      this.title = `#${this.pid}`;
      this.loadproblem(this.pid);
    }
  },
  mounted() {
    this.title = `#${this.pid}`;
    this.loadproblem(this.pid);
  }
};
</script>