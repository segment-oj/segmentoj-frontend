<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="el-icon-s-promotion" />
        Jump to
      </div>
      <el-input
        placeholder="PID"
        v-model="jumpToProblem"
        class="input-with-select"
      >
        <template slot="prepend">#.</template>
        <el-button slot="append" icon="el-icon-top-right" @click="jump"></el-button>
      </el-input>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'JumpToProblem',
  data() {
    return {
      jumpToProblem: null
    };
  },
  methods: {
    jump() {
      this.jumpToProblem = String(parseInt(this.jumpToProblem.trim()));
      this.$router.push('/problem/' + this.jumpToProblem);
    }
  }
};
</script>
