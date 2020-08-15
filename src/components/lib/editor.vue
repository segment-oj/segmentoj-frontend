<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in langTable"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <textarea ref="editor" v-model="source" />
  </div>
</template>

<script>
import sfconfig from './../../sfconfig';
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import './../../assets/code_mirror/tomorrow.css';
import 'codemirror/mode/clike/clike';
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
  name: 'codeMirror',
  data() {
    return {
      source: null,
      langTable: sfconfig.codeMirrorModeTable,
      editor: null
    };
  },
  methods: {
    loadEditor() {
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
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
      this.editor.on('keypress', function() {
        this.editor.showHint();
      });
    }
  },
  mounted() {
    this.loadEditor();
  }
};
</script>
