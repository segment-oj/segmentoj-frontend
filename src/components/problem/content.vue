<template>
  <div id="problem-view">
    <div id="content">
      <div id="problem-content" v-loading="problemLoading">
        <div v-if="!smallScreen">
          <div v-if="!isWider" id="full-screen-button" @click="full_screen()">
            Expand
            <i class="el-icon-arrow-right"></i>
          </div>
          <div v-else id="full-screen-button" @click="full_screen()">
            Fold
            <i class="el-icon-arrow-left"></i>
          </div>
        </div>
        <div class="flex-header">
          <el-tag v-if="hidden" type="warning" id="hidden-problem" effect="dark">Hidden</el-tag>
          <h1 id="title" class="header">#{{pid}}. {{ title }}</h1>
        </div>
        <MarkdownContainer v-if="description" :content="description" :allowHTML="this.allowHTML"/>
      </div>
      <div id="panel" v-if="!isWider">
        <div id="tools">
          <el-card v-if="showSmallToolBar || !smallScreen">
            <div><i class="el-icon-s-tools" /> Tool Bar</div>
            <el-menu default-active="0" class="item">
              <el-menu-item index="0" @click="$router.push(`/problem/${$route.params.id}/submit`);">
                <span slot="title" class="text-bold"><i class="el-icon-upload2" /> Submit</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title"><div class="text-bold"><i class="el-icon-pie-chart" /> Statistics</div></template>
                <el-menu-item index="1-0" @click="jump_to_status"><i class="el-icon-upload2" />Submissions</el-menu-item>
                <el-menu-item index="1-1"><i class="el-icon-data-line" />Statistics</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><div class="text-bold"><i class="el-icon-chat-line-round" /> Discuss</div></template>
                <el-menu-item index="2-0"><i class="el-icon-chat-line-square" />Discussions</el-menu-item>
                <el-menu-item index="2-1"><i class="el-icon-key" />Solutions</el-menu-item>
              </el-submenu>
              <el-menu-item
                index="3"
                v-if="this.$store.state.user.isStaff || this.$store.state.user.isRoot" 
                @click="$router.push(`/problem/${$route.params.id}/edit`);"
              >
                <span slot="title" class="text-bold"><i class="el-icon-edit" /> Edit</span>
              </el-menu-item>
            </el-menu>
            <el-button @click="$router.push('/problem/list');" class="margin-top-small back-button">Back</el-button>
          </el-card>
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
            <el-divider class="divider">Memory</el-divider>
            <div class="tool-content">{{memory}} MB</div>
          </el-card>
          <el-card shadow="never" class="margin-top">
            <div class="margin-bottom">
              <i class="el-icon-s-flag" />
              Tags
              <div v-if="showTag" @click="showTag = false" id="tag-button">
                <i class="el-icon-arrow-up" />
                Hide
              </div>
              <div v-else @click="showTag = true" id="tag-button">
                <i class="el-icon-arrow-down" />
                Show
              </div>
            </div>
            <div class="tags" v-if="showTag">
              <ProblemTag
                v-for="item in rendertags"
                :key="item.content"
                color="#fff"
                :border_color="item.color"
                :background_color="item.color"
                :content="item.content"
              />
              <span v-if="rendertags.length === 0">No tag</span>
            </div>
          </el-card>
        </div>
      </div>
      <el-button v-if="smallScreen" class="float-bottom-right" icon="el-icon-more" @click="showSmallToolBar = !showSmallToolBar" type="info" circle />
    </div>
  </div>
</template>

<script>
import timeFormat from './../../methods/time';
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';
import ProblemTag from './../lib/ProblemTag.vue';

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
      memory: '-',
      timeAdd: 'Unknown',
      tags: [],
      rendertags: [],
      problemLoading: true,
      showTag: false,
      smallScreen: screen.width < 700,
      showSmallToolBar: false
    };
  },
  methods: {
    render_tags() {
      for(let i = 0; i < this.tags.length; i += 1) {
        this.$axios
          .get(apiurl(`/problem/tag/${this.tags[i]}`))
          .then(res => {
            let data = res.data;
            this.rendertags.push({
              color: data.res.color,
              content: data.res.content
            });
          });
      } 
    },
    loadproblem() {
      this.$axios
        .get(apiurl(`/problem/${this.$route.params.id}`))
        .then(res => {
          let data = res.data.res;
          this.title = data.title;
          this.pid = data.pid;
          this.allowHTML = data.allow_html;
          this.memory = data.memory_limit / 1000;
          this.time = data.time_limit;
          this.hidden = !data.enabled;
          this.timeAdd = timeFormat(data.date_added);
          this.tags = data.tags;
          this.render_tags();
          this.problemLoading = false;
          this.$axios
            .get(apiurl(`/problem/${this.$route.params.id}/description`))
            .then(detail => {
              this.description = detail.data.res.description;
            });
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$info.error('Problem not found');
          } else if(err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });
    },
    jump_to_status() {
      this.$router.push({
        path: '/status/list',
        query: {
          pid: this.$route.params.id
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
    ProblemTag
  }
};
</script>

<style scoped>
.item {
    margin-top: 10px;
}

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

.float-bottom-right {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
}

@media only screen and (max-width: 700px) {
    #panel {
        position: fixed;
        bottom: 90px;
        right: 30px;
        z-index: 1000;
        transition: 0.5s;
    }

    #panel:active {
        z-index: 1000;
        opacity: 1;
    }

    #panel:hover {
        z-index: 1000;
        opacity: 1;
    }

    #info {
        display: none;
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
    border: 1px solid #ebeef5;
}

#panel {
    background-color: #ffffff !important;
    margin-left: 30px;
}

#tools {
    width: 250px;
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

.margin-top-small {
    margin-top: 10px;
}

.back-button {
    width: 100%;
}
</style>
