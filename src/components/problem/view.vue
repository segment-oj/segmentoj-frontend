<template>
  <div id="problem-view">
    <div id="content">
      <div id="problem-content">
        <div style="display: flex">
          <div id="title" class="header text-bold">#{{pid}}. {{ title }}</div>
          <div @click="full_screen()">
            <i class="el-icon-full-screen"></i>
          </div>
        </div>
        <MarkdownContainer v-if="description" :content="description" :allowHTML="this.allowHTML"/>
      </div>
      <div id="pannel" v-if="!isWider">
        <div id="tools">
          <el-row>
            <el-col>
              <div>Tool Bar</div>
              <el-menu>
                <el-menu-item index="">
                  Submit
                </el-menu-item>
                <el-submenu index="0">
                  <template slot="title">Statistics</template>
                  <el-menu-item index="">
                    Submissions
                  </el-menu-item>
                  <el-menu-item index="">
                    Statistics
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title">Discuss</template>
                  <el-menu-item index="">
                    Discussions
                  </el-menu-item>
                  <el-menu-item index="">
                    Solutions
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">Edit</template>
                  <el-menu-item index="">
                    Edit
                  </el-menu-item>
                  <el-menu-item index="">
                    Delete
                  </el-menu-item>
                  <el-menu-item index="">
                    Settings
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';

export default {
  name: 'ProblemView',
  data() {
    return {
      description: null,
      title: null,
      pid: this.$route.params.id,
      allowHTML: false,
      isWider: false
    };
  },
  methods: {
    loadproblem() {
      this.$axios
        .get(apiurl('/problem/content'), {
          params: {
            pid: this.$route.params.id
          }
        })
        .then(res => {
          let data = res.data;
          this.title = data.title;
          this.pid = data.pid;
          this.allowHTML = data.allow_html;
          this.description = data.description;
        })
        .catch(err => {
          this.$message.error('Problem loading error');
          console.log(err);
        });
    },
    full_screen() {
      console.log('full screen');
      this.isWider = !this.isWider;
    }
  },
  mounted() {
    this.loadproblem();
  },
  components: {
    MarkdownContainer
  }
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}

#content {
  margin-top: 30px;
  display: flex;
}

.header {
  font-size: 35px;
}

#problem-content {
  z-index: 10;
  width: 100%;
  padding: 20px;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
}

#pannel {
  margin-left: 20px;
  width: calc(1140px - 850px - 20px);
}

#tools {
  padding: 20px;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
}
</style>