<template>
  <div>
    <el-carousel trigger="click" :interval="5000" arrow="none" id="carousel">
      <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel'
};
</script>

<style>
#carousel {
    height: 300px;
    border-radius: 4px;
}

.el-carousel__item:nth-child(2n) {
    background-color: var(--color-base-border);
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: var(--color-extra-light-border);
}
</style>