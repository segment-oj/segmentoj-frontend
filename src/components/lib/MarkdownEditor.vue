<template>
  <div class="markdown-editor">
    <el-tabs v-model="active_name">
      <el-tab-pane label="Edit" name="editing">
        <div :class="editor_visible_class_name">
          <CodeMirror v-model="content" :enable_hint="false" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Preview" name="previewing">
        <div class="markdown-container-outline" v-if="show_preview">
          <MarkdownContainer :content="content" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MarkdownContainer from './MarkdownContainer.vue';
import CodeMirror from './editor.vue';

export default {
  name: 'MarkdownEditor',
  data() {
    return {
      content: this.value,
      active_name: 'editing',
      is_update_from_inner: false
    };
  },
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  computed: {
    editor_visible_class_name() {
      if (this.active_name == 'editing') {
        return 'display-visible';
      }
      return 'display-invisible';
    },
    show_preview() {
      return this.active_name == 'previewing';
    }
  },
  watch: {
    content() {
      this.is_update_from_inner = true;
      this.$emit('input', this.content);
    },
    value(val) {
      if (this.is_update_from_inner) {
        this.is_update_from_inner = false;
      } else {
        this.content = val;
      }
    },
  },
  components: {
    MarkdownContainer,
    CodeMirror,
  },
};
</script>

<style scoped>
.display-visible {
    display: block;
}

.display-invisible {
    display: none;
}


.markdown-container-outline {
    padding: 10px;
    margin-bottom: 20px;
    max-height: 600px;
    overflow-y: scroll;
}
</style>