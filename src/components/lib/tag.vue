<template>
  <span class="seg-tag" :style="style">
    <i :v-if="icon" :class="'el-icon-' + icon_detail"></i>{{content}}
  </span>
</template>

<script>
export default {
  name: 'SegmentTag',
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
      default: '#606266'
    },
    border_color: {
      type: String,
      default: '#E4E7ED'
    },
    background_color: {
      type: String,
      default: 'rgb (244, 255, 255)'
    }
  },
  data() {
    return {
      style: ''
    };
  },
  mounted() {
    console.log('hi');
    this.style = 'color: ' + this.color + '; background-color: ' + this.background_color + ';';
    if(this.border) {
      this.style += 'border-color: '+ this.border_color + ';';
    }
  }
};
</script>

<style scoped>
.seg-tag {
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    font-weight: 500;
    border-width: 1px;
    border-style: solid;
    box-sizing: border-box;
    white-space: nowrap;
    margin: 3px;
}
</style>