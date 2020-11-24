<template>
  <div>
    <carousel/>
    <JumpToProblem class="item" />
  </div>
</template>

<script>
import Carousel from './carousel.vue';
import JumpToProblem from './../lib/JumpToProblem.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    JumpToProblem
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}
</style>
