<template>
  <div class="markdown-editor">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Edit" name="first" />
      <el-tab-pane label="Preview" name="second" />
    </el-tabs>
    <div :class="editorVisbleClassName">
      <textarea :id="uid + '-markdown-editor'" />
    </div>
    <MarkdownContainer v-if="showPreview" :content="content" />
  </div>
</template>

<script>
import MarkdownContainer from './MarkdownContainer.vue';

import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

export default {
  name: 'MarkdownEditor',
  data() {
    return {
      content: null,
      activeName: 'first',
      mde: null,
      showPreview: false
    };
  },
  mounted() {
    this.mde = new SimpleMDE({
      element: document.getElementById(this.uid + '-markdown-editor'),
      autoDownloadFontAwesome: false,
      spellChecker: this.spellChecker,
      autosave: {
        enabled: true,
        uniqueId: this.uid,
        delay: 1000
      },
      toolbar: false
    });
  },
  watch: {
    activeName(newName, oldName) {
      if (oldName == 'first' && newName == 'second') {
        this.content = this.mde.value();
        this.showPreview = true;
      } else if (oldName == 'second' && newName == 'first') {
        this.showPreview = false;
      }
    }
  }, 
  computed: {
    editorVisbleClassName() {
      if (this.activeName == 'first') {
        return 'dispaly-visble';
      }
      return 'dispaly-invisble';
    }
  },
  props: {
    autofocus: {
      default: false,
      type: Boolean
    },
    spellChecker: {
      default: false,
      type: Boolean
    }
  },
  components: {
    MarkdownContainer
  }
};
</script>

<style scoped>
.dispaly-visble {
  display: block;
}

.dispaly-invisble {
  display: none;
}
</style>