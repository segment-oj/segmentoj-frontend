<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="el-icon-s-tools" />
        Change Password
      </div>
      <password></password>
    </el-card>
  </div>
</template>

<script>
import password from './changePassword';

export default {
  name: 'UserEdit',
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
  components: {
    password
  }
};
</script>

<style scoped>
</style>
