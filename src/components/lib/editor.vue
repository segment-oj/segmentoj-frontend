<template>
  <div class="code-mirror-editor">
    <textarea ref="editor" v-model="source"></textarea>
  </div>
</template>

<script>
import sfconfig from './../../sfconfig';

import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import './../../assets/code_mirror/CodeMirror.css';
import './../../assets/code_mirror/neo.css';
import './../../assets/code_mirror/tomorrow.css';
import './../../assets/code_mirror/zenburn.css';
import './../../assets/code_mirror/monokai.css';
import './../../assets/code_mirror/ayu-mirage.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/go/go';
import 'codemirror/mode/php/php';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/comment/continuecomment';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/keymap/sublime';

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
      default: 7
    },
    theme: {
      type: String,
      default: '3024-day'
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
      }
    },
  },
  methods: {
    loadEditor() {
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
        theme: '3024-day',
        mode: 'text/gfm',
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: false,
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
    this.editor.setOption('theme', sfconfig.codeMirrorModeTable[this.theme].mode);
  }
};
</script>
