<template>
  <el-card>
    <div slot="header" class="clearfix">
      <i class="el-icon-document" />
      Code Editor
    </div>
    <codeMirror />
  </el-card>
</template>

<script>
import codeMirror from './../lib/editor.vue';

export default {
  data() {
    return {
      source: null
    };
  },
  components: {
    codeMirror
  }
};
</script>
