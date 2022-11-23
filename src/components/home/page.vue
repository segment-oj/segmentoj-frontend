<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"> <Carousel /></el-col>
      <el-col :span="8"> <Todo /> </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-top-20">
      <el-col :span="8">
        <JumpToProblem/>
      </el-col>
      <el-col :span="16">
        <HomeStatistic v-if="this.$store.state.user.authenticated" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Carousel from './carousel.vue';
import Todo from './todo.vue';
import JumpToProblem from './../lib/JumpToProblem.vue';
import HomeStatistic from './statistic.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    JumpToProblem,
    Todo,
    HomeStatistic,
  },
};
</script>
