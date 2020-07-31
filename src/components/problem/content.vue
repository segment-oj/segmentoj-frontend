<template>
  <div id="problem-view">
    <div id="content">
      <div id="problem-content" v-loading="problemLoading">
        <div v-if="!isWider" id="full-screen-button" @click="full_screen()">
          Expand
          <i class="el-icon-arrow-right"></i>
        </div>
        <div v-else id="full-screen-button" @click="full_screen()">
          Fold
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="flex-header">
          <el-tag v-if="hidden" type="warning" id="hidden-problem" effect="dark">Hidden</el-tag>
          <h1 id="title" class="header">#{{pid}}. {{ title }}</h1>
        </div>
        <MarkdownContainer v-if="description" :content="description" :allowHTML="this.allowHTML"/>
      </div>
      <div id="pannel" v-if="!isWider">
        <div id="tools">
          <el-row>
            <el-col>
              <div><i class="el-icon-s-tools" /> Tool Bar</div>
              <el-menu default-active="3">
                <el-menu-item index="3" @click="$router.push('/problem/' + $route.params.id +'/submit');">
                  <span slot="title" class="text-bold"><i class="el-icon-upload2" /> Submit</span>
                </el-menu-item>
                <el-submenu index="0">
                  <template slot="title"><div class="text-bold"><i class="el-icon-pie-chart" /> Statistics</div></template>
                  <el-menu-item index="0-0">Submissions</el-menu-item>
                  <el-menu-item index="0-1">Statistics</el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title"><div class="text-bold"><i class="el-icon-chat-line-round" /> Discuss</div></template>
                  <el-menu-item index="1-0">Discussions</el-menu-item>
                  <el-menu-item index="1-1">Solutions</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title"><div class="text-bold"><i class="el-icon-edit" /> Edit</div></template>
                  <el-menu-item index="2-0" @click="$router.push('/problem/' + $route.params.id +'/edit');">
                    Edit
                  </el-menu-item>
                  <el-menu-item index="2-1">Delete</el-menu-item>
                  <el-menu-item index="2-2">Settings</el-menu-item>
                </el-submenu>
              </el-menu>
              <el-button @click="$router.push('/problem/list');">Back</el-button>
            </el-col>
          </el-row>
        </div>
        <div id="info">
          <el-card shadow="never">
            <div><i class="el-icon-info" /> Information </div>
            <el-divider class="divider">Name</el-divider>
            <div class="tool-content">{{title}}</div>
            <el-divider class="divider">PID</el-divider>
            <div class="tool-content">#{{pid}}</div>
            <el-divider class="divider">Date Created</el-divider>
            <div class="tool-content">{{timeAdd}}</div>
          </el-card>
          <el-card shadow="never" class="margin-top">
            <div><i class="el-icon-menu" /> Limitation </div>
            <el-divider class="divider">Time</el-divider>
            <div class="tool-content">{{time}} MS</div>
            <el-divider class="divider">Memery</el-divider>
            <div class="tool-content">{{memery}} MB</div>
          </el-card>
          <el-card shadow="never" class="margin-top">
            <div class="margin-bottom">
              <i class="el-icon-collection-tag" />
              Tags
              <div v-if="showTag" @click="showTag = false" id="tag-button"><i class="el-icon-arrow-up" />Hide tags</div>
              <div v-if="!showTag" @click="showTag = true" id="tag-button"><i class="el-icon-arrow-down" />Show tags</div>
            </div>
            <div class="tags" v-if="showTag">
              <SegmentTag
                v-for="item in rendertags"
                :key="item.content"
                :border_color="item.color"
                :content="item.content"
                >
              </SegmentTag>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeFormat from './../../methods/time';
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';
import SegmentTag from './../lib/tag.vue';

export default {
  name: 'ProblemView',
  data() {
    return {
      description: null,
      title: 'Unknown',
      pid: this.$route.params.id,
      allowHTML: false,
      isWider: false,
      enable: true,
      hidden: false,
      time: '-',
      memery: '-',
      timeAdd: 'Unknown',
      tags: [],
      rendertags: [],
      problemLoading: true,
      showTag: false
    };
  },
  methods: {
    render_tags() {
      for(let i = 0; i < this.tags.length; i += 1) {
        this.$axios
          .get(apiurl('/problem/tag/' + this.tags[i]))
          .then(res => {
            let data = res.data;
            this.rendertags.push({
              color: data.res.color,
              content: data.res.content
            });
          })
          .catch(() => {

          });
      } 
    },
    loadproblem() {
      this.$axios
        .get(apiurl('/problem/' + String(this.$route.params.id)))
        .then(res => {
          let data = res.data.res;
          this.title = data.title;
          this.pid = data.pid;
          this.allowHTML = data.allow_html;
          this.description = data.description;
          this.memery = data.memory_limit / 1000;
          this.time = data.time_limit;
          this.hidden = !data.enabled;
          this.timeAdd = timeFormat(data.date_added);
          this.tags = data.tags;
          this.problemLoading = false;
          this.render_tags();
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$SegmentMessage.error(this, 'Problem not found');
          } else if(err.request.status === 403) {
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
    MarkdownContainer,
    SegmentTag
  }
};
</script>

<style scoped>
#hidden-problem {
    margin: 30px 0;
    margin-right: 10px;
}

.flex-header {
    display: flex;
}

.margin-top {
    margin-top: 20px;
}

.margin-bottom {
    margin-bottom: 15px;
}

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
}

#tools {
    width: 200px;
    padding: 20px;
    border: 1px solid #e4e7ed;
}

#full-screen-button,
#tag-button {
    float: right;
}

#full-screen-button:hover,
#tag-button:hover {
    cursor: pointer;
}

#info {
    margin-top: 20px;
}

.divider {
    margin: 20px 0;
}

.tool-content {
    color: #606266;
}
</style>
