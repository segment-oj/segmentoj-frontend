<template>
  <div class="code-mirror-editor">
    <textarea ref="editor" v-model="source"></textarea>
  </div>
</template>

<script>
import sfconfig from './../../sfconfig';

import * as CodeMirror from 'codemirror';
import './../../assets/code_mirror/CodeMirror.css';
import './../../assets/code_mirror/neo.css';
import './../../assets/code_mirror/tomorrow.css';
import './../../assets/code_mirror/zenburn.css';
import './../../assets/code_mirror/monokai.css';
import './../../assets/code_mirror/ayu-mirage.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/scroll/simplescrollbars.css';

export default {
  name: 'CodeMirror',
  data() {
    return {
      editor: null,
      source: null,
      update_from_inner: false,
    };
  },
  props: {
    mode: {
      type: Number,
      default: 0
    },
    theme: {
      type: Number,
      default: 0
    },
    enable_hint: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: () => '',
    },
  },
  watch: {
    mode(val) {
      this.editor.setOption('mode', sfconfig.codeMirrorModeTable[val].mode);
    },
    theme(val) {
      this.editor.setOption('theme', sfconfig.CodeMirrorThemeTable[val].theme);
    },
    value(new_value) {
      if (this.update_from_inner) {
        this.update_from_inner = false; 
      } else {
        this.value = new_value;
        this.editor.setValue(this.value);
      }
    },
  },
  methods: {
    loadEditor() {
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
        theme: '3024-day',
        mode: 'text/x-c++src',
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: false,
        lineWrapping: true,
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        foldCode: true,      
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        continueComments: true,
        continueLineComment: false,
        autofocus: true,
        keyMap: 'sublime',
        scrollbarStyle: 'simple',
        highlightSelectionMatches: {
          showToken: /\w/, 
          annotateScrollbar: true
        },
        undoDepth: 1000,
        hintOptions: {
          completeSingle: false
        }
      });

      if (this.enable_hint) {
        this.editor.on('keypress', () => {
          this.editor.showHint();
        });
      }

      this.editor.setValue(this.value || '');
      this.editor.on('changes', () => {
        const source = this.editor.getValue();
        this.handle_text_change(source);
      });
    },
    handle_text_change(source) {
      this.update_from_inner = true;
      this.$emit('input', source);
    },
  },
  mounted() {
    this.loadEditor();
    this.editor.setOption('mode', sfconfig.codeMirrorModeTable[this.mode].mode);
    if (this.theme === 100 && JSON.parse(this.$store.state.user.extra_data).code_mirror_theme !== undefined) {
      this.editor.setOption('theme', sfconfig.CodeMirrorThemeTable[JSON.parse(this.$store.state.user.extra_data).code_mirror_theme].theme);
    } else {
      this.editor.setOption('theme', sfconfig.CodeMirrorThemeTable[this.theme].theme);
    }
  }
};
</script>
