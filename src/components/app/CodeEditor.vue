<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="el-icon-document" />
        Code Editor
      </div>
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
      <CodeMirror :mode="mode" :theme="theme" />
    </el-card>
  </div>
</template>

<script>
import CodeMirror from './../lib/editor.vue';
import apiurl from './../../apiurl';
import sfconfig from './../../sfconfig';

export default {
  name: 'CodeEditorContainer',
  data() {
    return {
      mode: '-',
      theme: '-',
      langTable: sfconfig.codeMirrorModeTable,
      themeTable: sfconfig.CodeMirrorThemeTableOptions,
      CodeMirrorThemeTable: sfconfig.CodeMirrorThemeTable
    };
  },
  watch: {
    theme(val) {
      this.$axios
        .patch(apiurl(`/account/${this.$store.state.user.userid}`), {
          editor_theme: val
        });
    }
  },
  methods: {
    loadUserLangMode() {
      this.mode = this.langTable[sfconfig.langTable[this.$store.state.user.userlang].codeMirror].label;
    },
    loadUserTheme() {
      this.$axios
        .get(apiurl(`/account/${this.$store.state.user.userid}`))
        .then(res => {
          this.theme = res.data.res.editor_theme.toString();
        });
    }
  },
  mounted() {
    this.loadUserLangMode();
    this.loadUserTheme();
  },
  components: {
    CodeMirror
  }
};
</script>
