<template>
  <el-dialog
    title="Create New Problem"
    :visible.sync="$store.state.tagedit.displayTagEdit"
    width="625px"
    class="max-screen"
  >
    <SelectTag ref="tagSelector" :pid="this.$route.params.id" />
    <div class="item">
      <el-button
        type="primary"
        v-on:click="Submit();"
      >
        Submit
      </el-button>
      <el-button v-on:click="$store.state.tagedit.displayTagEdit = false">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
import apiurl from './../../apiurl';
import SelectTag from './../lib/SelectTag.vue';

export default {
  name: 'editTag',
  data() {
    return {
    };
  },
  methods: {
    Submit() {
      let request_data = {
        tags: this.$refs.tagSelector.getTags()
      };

      this.$axios
        .patch(apiurl('/problem/' + this.$route.params.id), request_data)
        .then(() => {
          this.$store.state.tagedit.displayTagEdit = false;
        })
        .catch(err => {
          if (err.request.status === 404) {
            this.$info.error('Problem not found');
          } else if (err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });
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
</style>
