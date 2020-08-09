<template>
  <div>
    <carousel/>
    <jumpTo class="item" />
  </div>
</template>

<script>
import Carousel from './carousel.vue';
import jumpTo from './../lib/jumpToProblem.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    jumpTo
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}
</style>
