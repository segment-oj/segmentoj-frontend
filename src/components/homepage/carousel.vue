<template>
  <el-carousel trigger="click" :interval="5000" arrow="none" id="carousel">
    <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Carousel'
};
</script>

<style>
#carousel {
    border-radius: 4px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>