<template>
  <div>
    <div v-if="$store.state.tags.displayTags">
      <SegmentTag
        v-for="item in this.rendertags"
        :key="item.content"
        color="#fff"
        height="25px"
        :border_color="item.color"
        :background_color="item.color"
        :content="item.content"
      />
    </div>
  </div>
</template>

<script>
import SegmentTag from './../lib/tag.vue';
import apiurl from './../../apiurl';

export default {
  name: 'listTag',
  data() {
    return {
      tags: [],
      rendertags: []
    };
  },
  props: {
    pid: {
      type: Number,
      default: 0
    },
  },
  watch: {
    pid() {
      this.loadTag();
    }
  },
  methods: {
    loadTag() {
      this.rendertags = [];
      this.tags = [];
      this.$axios
        .get(apiurl('/problem/' + String(this.pid)))
        .then(res => {
          this.tags = res.data.res.tags;
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
        });
    }
  },
  mounted() {
    this.loadTag();
  },
  components: {
    SegmentTag
  }
};
</script>
