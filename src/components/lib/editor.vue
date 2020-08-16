<template>
  <div>
    <textarea ref="editor" v-model="source" />
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
import 'codemirror/mode/markdown/markdown';
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

let editor;

export default {
  name: 'codeMirror',
  data() {
    return {
      source: null,
      langTable: sfconfig.codeMirrorModeTable,
      CodeMirrorThemeTable: sfconfig.CodeMirrorThemeTable
    };
  },
  props: {
    mode: {
      type: String,
      default: 'text/x-c++src'
    },
    theme: {
      type: String,
      default: '3024-day'
    }
  },
  watch: {
    mode(val) {
      editor.setOption('mode', this.langTable[val].mode);
    },
    theme(val) {
      editor.setOption('theme', this.CodeMirrorThemeTable[val].theme);
    }
  },
  methods: {
    loadEditor() {
      editor = CodeMirror.fromTextArea(this.$refs.editor, {
        theme: '3024-day',
        mode: 'text/x-c++src',
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
      editor.on('keypress', function() {
        editor.showHint();
      });
    },
  },
  mounted() {
    this.loadEditor();
    editor.setOption('mode', this.langTable[this.mode].mode);
    editor.setOption('theme', this.langTable[this.theme].mode);
  }
};
</script>
