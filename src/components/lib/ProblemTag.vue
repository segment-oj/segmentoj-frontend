<template>
  <span class="tag" :style="style">
    <i v-if="icon" :class="`el-icon-${icon_detail}`"></i>{{content}}
  </span>
</template>

<script>
export default {
  name: 'ProblemTag',
  props: {
    content: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: false
    },
    icon_detail: String,
    border: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'var(--color-regular-text)'
    },
    border_color: {
      type: String,
      default: 'var(--color-light-border)'
    },
    background_color: {
      type: String,
      default: 'var(--color-blue-0)'
    },
    height: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      style: ''
    };
  },
  mounted() {
    this.style = `color: ${this.color}; background-color: ${this.background_color};`;
    if(this.border) {
      this.style += `border-color: ${this.border_color};`;
    }
    this.style += `height: ${this.height}px;`;
    this.style += `line-height: ${this.height - 2}px;`;
  }
};
</script>

<style scoped>
.tag {
    display: inline-block;
    padding: 0 10px;
    font-size: 12px;
    border: 1px solid;
    box-sizing: border-box;
    white-space: nowrap;
    margin: 3px;
}
</style>
