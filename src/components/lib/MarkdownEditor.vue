<template>
  <div class="markdown-editor">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Edit" name="first" />
      <el-tab-pane label="Preview" name="second" />
    </el-tabs>
    <div :class="editorVisbleClassName">
      <textarea 
        :value="value" 
        @input="handleInput($event.target.value)" 
        class="markdown-editor-value-placeholder" 
        :id="uid + '-markdown-editor'" 
        />

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
      showPreview: false,
      isValueUpdateFromInner: false
    };
  },
  methods: {
    handleInput(val) {
      this.isValueUpdateFromInner = true;
      this.$emit('input', val);
    },

    handleBlur(val) {
      this.isValueUpdateFromInner = true;
      this.$emit('blur', val);
    },
  },
  mounted() {
    this.mde = new SimpleMDE({
      element: document.getElementById(this.uid + '-markdown-editor'),
      autoDownloadFontAwesome: false,
      spellChecker: this.spellChecker,
      toolbar: false,
      forceSync: true
    });

    this.mde.codemirror.on('change', (instance, changeObj) => {
      if (changeObj.origin === 'setValue') {
        return;
      }
      const val = this.mde.value();
      this.handleInput(val);
    });

    this.mde.codemirror.on('blur', () => {
      const val = this.mde.value();
      this.handleBlur(val);
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
    },
    value(val) {
      if (this.isValueUpdateFromInner) {
        this.isValueUpdateFromInner = false;
      } else {
        this.simplemde.value(val);
      }
    },
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
    },
    value: {
      type: String
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

.markdown-editor-value-placeholder {
    display: none;
}
</style>