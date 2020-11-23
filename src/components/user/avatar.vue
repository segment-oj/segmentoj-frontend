<template>
  <el-avatar :shape="this.shape" :size="this.size">
    <img v-if="this.imgsrc" :src="this.imgsrc" alt="picture" />
    <img v-else src="./../../assets/icon/SOJ-thick-white-background.png">
  </el-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    imgsrc: {
      type: String,
    }, size: {
      type: Number,
    }, shape: {
      type: String,
      default: 'square'
    }
  }
};
</script>