<template>
  <div>
    <el-select
      v-model="mode"
      placeholder="Select Mode"
      style="margin-bottom: 10px;"
    >
      <el-option
        v-for="item in langTable"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="theme"
      placeholder="Select Theme"
      style="margin-bottom: 10px; margin-left: 20px;"
    >
      <el-option-group
        v-for="group in themeTable"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.themes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-option-group>
    </el-select>
    <textarea ref="editor" v-model="source" />
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import sfconfig from './../../sfconfig';

import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import './../../assets/code_mirror/CodeMirror.css';
import './../../assets/code_mirror/tomorrow.css';
import './../../assets/code_mirror/zenburn.css';
import './../../assets/code_mirror/monokai.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/markdown/markdown';
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
      editor: null,
      mode: '-',
      theme: '-', 
      themeTable: sfconfig.CodeMirrorThemeTableOptions,
      CodeMirrorThemeTable: sfconfig.CodeMirrorThemeTable
    };
  },
  watch: {
    mode(val) {
      editor.setOption('mode', this.langTable[val].mode);
    },
    theme(val) {
      editor.setOption('theme', this.CodeMirrorThemeTable[val].theme);
      this.$axios
        .patch(apiurl('/account/' + this.$store.state.user.userid), {
          editor_theme: this.theme
        });
    }
  },
  methods: {
    loadEditor() {
      editor = CodeMirror.fromTextArea(this.$refs.editor, {
        theme: '3024-day',
        mode: 'text/x-markdown',
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
    loadUserLangMode() {
      this.mode = this.langTable[sfconfig.langTable[this.$store.state.user.userlang].codeMirror].label;
      editor.setOption('mode', this.langTable[this.langTable[sfconfig.langTable[this.$store.state.user.userlang].codeMirror].value].mode);
    },
    loadUserTheme() {
      this.$axios
        .get(apiurl('/account/' + this.$store.state.user.userid))
        .then(res => {
          this.theme = String(res.data.res.editor_theme);
        });
    }
  },
  mounted() {
    this.loadEditor();
    this.loadUserLangMode();
    this.loadUserTheme();
  }
};
</script>
