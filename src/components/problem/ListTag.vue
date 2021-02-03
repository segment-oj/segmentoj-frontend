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
import ProblemTag from './../lib/ProblemTag.vue';
import apiurl from './../../apiurl';
import AWaitLock from './../../methods/lock';

export default {
  name: 'listTag',
  data() {
    return {
      rendertags: new Array(),
    };
  },
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  watch: {
    tags() {
      this.loadTag();
    },
  },
  methods: {
    loadTag() {
      this.rendertags = [];
      let t = this.$store.state.tags;
      for (let i = 0; i < this.tags.length; i += 1) {
        if (t.tagsLock[this.tags[i]] === undefined) {
          t.tagsLock[this.tags[i]] = new AWaitLock();
        }
        if (t.tagsData[this.tags[i]] !== undefined) {
          this.rendertags[i] = t.tagsData[this.tags[i]];
        } else {
          t.tagsLock[this.tags[i]].acquire().then(() => {
            if (t.tagsData[this.tags[i]] !== undefined) {
              t.tagsLock[this.tags[i]].release();
              this.rendertags[i] = t.tagsData[this.tags[i]];
            } else {
              this.$axios
                .get(apiurl(`/problem/tag/${this.tags[i]}`))
                .then((detail) => {
                  let data = detail.data.res;
                  t.tagsData[this.tags[i]] = {
                    color: data.color,
                    content: data.content,
                  };
                  this.rendertags[i] = t.tagsData[this.tags[i]];
                  t.tagsLock[this.tags[i]].release();
                });
            }
          });
        }
      }
    },
  },
  mounted() {
    this.loadTag();
  },
  components: {
    ProblemTag
  },
};
</script>
