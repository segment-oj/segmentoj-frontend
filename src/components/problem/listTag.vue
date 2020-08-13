<template>
  <div>
    <div v-if="$store.state.tags.displayTags">
      <ProblemTag
        v-for="item in this.rendertags"
        :key="item.content"
        color="#fff"
        :height="22"
        :border_color="item.color"
        :background_color="item.color"
        :content="item.content"
      />
    </div>
  </div>
</template>

<script>
import ProblemTag from './../lib/problemTag.vue';
import apiurl from './../../apiurl';

export default {
  name: 'listTag',
  data() {
    return {
      rendertags: []
    };
  },
  props: {
    tags: {
      type: Array
    },
  },
  watch: {
    tags() {
      this.loadTag();
    }
  },
  methods: {
    loadTag() {
      this.rendertags = [];
      for(let i = 0; i < this.tags.length; i += 1) {
        this.$axios
          .get(apiurl('/problem/tag/' + this.tags[i]))
          .then(detail => {
            let data = detail.data;
            this.rendertags.push({
              color: data.res.color,
              content: data.res.content
            });
          });
      }
    }
  },
  mounted() {
    this.loadTag();
  },
  components: {
    ProblemTag
  }
};
</script>
