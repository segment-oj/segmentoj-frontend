<template>
  <el-dialog
    title="Edit Tag"
    :visible.sync="$store.state.tagedit.displayTagEdit"
    width="625px"
    class="max-screen"
  >
    <el-button circle @click="new_tag_visible = !new_tag_visible"><i class="el-icon-plus" /> New</el-button>
    <el-popover
      placement="top"
      v-model="new_tag_visible"
    >
      <el-divider class="divider">Name</el-divider>
      <el-input placeholder="name" v-model="new_tag_name"></el-input>
      <el-divider class="divider">Color</el-divider>
      <el-color-picker
        v-model="new_tag_color"
        :predefine="predefineColors"
        color-format="hex"
      >
      </el-color-picker>
      <el-button type="primary" icon="el-icon-plus" @click="new_tag" style="width: 100%; margin-top: 10px;"></el-button>
    </el-popover>
    <SelectTag class="item" ref="tagSelector" :pid="this.$route.params.id" />
    <el-button-group class="item">
      <el-button
        type="primary"
        v-on:click="Submit"
      >
        Submit
      </el-button>
      <el-button @click="$store.state.tagedit.displayTagEdit = false">Cancel</el-button>
    </el-button-group>
  </el-dialog>
</template>

<script>
import apiurl from './../../apiurl';
import sfconfig from './../../sfconfig';
import SelectTag from './../lib/SelectTag.vue';

export default {
  name: 'editTag',
  data() {
    return {
      new_tag_visible: false,
      new_tag_name: '',
      new_tag_color: '#409eff',
      predefineColors: sfconfig.tagColorPreset,
    };
  },
  methods: {
    Submit() {
      let request_data = {
        tags: this.$refs.tagSelector.getTags()
      };

      this.$axios
        .patch(apiurl('/problem/' + this.$route.params.id), request_data)
        .catch(err => {
          if (err.request.status === 404) {
            this.$info.error('Problem not found');
          } else if (err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });

      this.$store.state.tagedit.displayTagEdit = false;
      this.$router.go(0);
    },
    new_tag() {
      this.$axios
        .post(apiurl('/problem/tag'), {
          content: this.new_tag_name,
          color: this.new_tag_color
        })
        .then(() => {
          this.new_tag_visible = false;
          this.$info.success('Succeeded');
        })
        .catch((err) => {
          if (err.request.status === 400) {
            this.$info.error('Tag exists');
          }
          this.$info.error('Unknown error');
        });

      this.$router.go(0);
    }
  },
  components: {
    SelectTag
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}

.divider {
    margin: 20px 0;
}
</style>
