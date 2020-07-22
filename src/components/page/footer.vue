<template>
  <div class="footer">
    <div class="footer-content">
      Powered by
      <el-link
        href="https://github.com/segment-oj/segmentoj"
        type="primary"
        :underline="false"
      >SegmentOJ</el-link>
      .
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="css" scoped>
.footer {
    width: 100%;
    text-align: center;
    color: #909399;
}

.footer-content {
    font-size: 15px;
    padding: 10px;
}
</style>