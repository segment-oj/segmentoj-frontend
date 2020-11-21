<template>
  <div class="markdown-editor">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Edit" name="first">
        <div :class="editorVisibleClassName">
          <textarea
            :value="value"
            @input="handleInput($event.target.value)"
            class="markdown-editor-value-placeholder"
            :id="uid + '-markdown-editor'"
            />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Preview" name="second">
        <div id="markdown-container-outline" v-if="showPreview">
          <MarkdownContainer :content="content" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MarkdownContainer from './MarkdownContainer.vue';

import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import './../../assets/css/mde.css';

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
        this.mde.value(val);
      }
    },
  }, 
  computed: {
    editorVisbleClassName() {
      if (this.activeName == 'first') {
        return 'display-visible';
      }
      return 'display-invisible';
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
.display-visible {
    display: block;
}

.display-invisible {
    display: none;
}

.markdown-editor-value-placeholder {
    display: none;
}

#markdown-container-outline {
    padding: 10px;
    margin-bottom: 20px;
    max-height: 600px;
    overflow-y: scroll;
}
</style>