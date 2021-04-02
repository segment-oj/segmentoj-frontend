<template>
  <div>
    <el-row>
      <el-col :span="16"> <carousel /></el-col>
      <el-col :span="8" style="padding-left: 20px;"> <Todo /> </el-col>
    </el-row>
    <JumpToProblem class="margin-top-20" />
  </div>
</template>

<script>
import Carousel from './carousel.vue';
import Todo from './todo.vue';
import JumpToProblem from './../lib/JumpToProblem.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    JumpToProblem,
    Todo,
  },
};
</script>
