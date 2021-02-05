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
          v-for="item in lang_table"
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
          v-for="group in theme_table"
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
      lang_table: sfconfig.codeMirrorModeTable,
      theme_table: sfconfig.CodeMirrorThemeTableOptions,
      CodeMirrorThemeTable: sfconfig.CodeMirrorThemeTable,
      majorLangTable: sfconfig.majorLangTable,
      user_config: JSON.parse(this.$store.state.user.user_config),
    };
  },
  watch: {
    theme(val) {
      this.theme = val;
      this.user_config.code_mirror_theme = this.theme;
      this.$store.commit('userConfigChange', {
        user_config: JSON.stringify(this.user_config)
      });
      const frontend_config = {segmentoj_frontend_config: this.user_config};
      this.$axios
        .patch(apiurl(`/account/${this.$store.state.user.userid}`), {
          frontend_config: JSON.stringify(frontend_config)
        });
    }
  },
  methods: {
    loadUserLangMode() {
      for (let i in this.majorLangTable) {
        if (this.majorLangTable[i].stringCode == this.$store.state.user.userlang.split(';')[0]) {
          this.mode = this.majorLangTable[i].codeMirror;
        }
      }
    },
    loadUserTheme() {
      this.theme = this.user_config.code_mirror_theme;
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
