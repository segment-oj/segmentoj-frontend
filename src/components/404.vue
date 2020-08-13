<template>
  <div>
    <el-card style="height: 700px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-warning" />
        Error
      </div>
      <div class="box">
        <div class="logo">
          404
        </div>
        <el-divider />
        <div class="message">
          Page Not Found
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'page-not-found'
};
</script>

<style scoped>
.logo {
    font-size: 8em;
}

.message {
    font-size: 2em;
    font-weight: 100;
}

.box {
    text-align: center;
}
</style>
