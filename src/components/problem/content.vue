<template>
  <div id="problem-view">
    <div id="content">
      <div id="problem-content">
        <div v-if="!isWider" id="full-screen-button" @click="full_screen()">
          Expand
          <i class="el-icon-arrow-right"></i>
        </div>
        <div v-else id="full-screen-button" @click="full_screen()">
          Fold
          <i class="el-icon-arrow-left"></i>
        </div>
        <div style="display: flex;">
          <div id="title" class="header text-bold">#{{pid}}. {{ title }}</div>
        </div>
        <MarkdownContainer v-if="description" :content="description" :allowHTML="this.allowHTML"/>
      </div>
      <div id="pannel" v-if="!isWider">
        <div id="tools">
          <el-row>
            <el-col>
              <div>Tool Bar</div>
              <el-menu default-active="3">
                <el-menu-item index="3" @click="$router.push('/problem/' + $route.params.id +'/submit');">
                  <span slot="title">Submit</span>
                </el-menu-item>
                <el-submenu index="0">
                  <template slot="title">Statistics</template>
                  <el-menu-item index="0-0">
                    Submissions
                  </el-menu-item>
                  <el-menu-item index="0-1">
                    Statistics
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title">Discuss</template>
                  <el-menu-item index="1-0">
                    Discussions
                  </el-menu-item>
                  <el-menu-item index="1-1">
                    Solutions
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">Edit</template>
                  <el-menu-item index="2-0" @click="$router.push('/problem/' + $route.params.id +'/edit');">
                    Edit
                  </el-menu-item>
                  <el-menu-item index="2-1">
                    Delete
                  </el-menu-item>
                  <el-menu-item index="2-2">
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
          if(err.request.status === '404') {
            this.$SegmentMessage.error(this, 'Problem not found');
          } else if(err.request.status === '403') {
            this.$SegmentMessage.error(this, 'Permission denied');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
        });
    },
    full_screen() {
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
@media only screen and (max-width: 700px) {
    #pannel {
        z-index: 1000;
        opacity: 0.5;
        position: fixed;
        transition: 0.5s;
        right: 30px;
    }

    #pannel:hover {
        z-index: 1000;
        opacity: 1;
    }
}

.el-menu {
    border-right: none;
}

#content {
    margin-top: 30px;
    display: flex;
}

.header {
    font-size: 35px;
    color: #303133;
}

#problem-content {
    z-index: 10;
    width: 100%;
    padding: 20px;
    border: 1px solid #e4e7ed;
}

#pannel {
    background-color: #ffffff !important;
    margin-left: 20px;
    width: calc(1140px - 850px - 20px);
}

#tools {
    padding: 20px;
    border: 1px solid #e4e7ed;
}

#full-screen-button {
    float: right;
}

#full-screen-button:hover {
    cursor: pointer;
}
</style>
