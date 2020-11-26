<template>
  <div>
    <!-- Normal screen -->
    <div v-if="!smallScreen">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-card>
            <div slot="header" class="clearfix"><i class="el-icon-edit-outline" /> Name</div>
            <el-input v-model="title" placeholder="Input problem title here"></el-input>
            <el-checkbox v-model="disable" label="Disabled" class="item"></el-checkbox>
            <el-checkbox v-model="html" label="Allow HTML" class="item"></el-checkbox>
          </el-card>
          <el-card class="item">
            <i class="el-icon-menu" /> Limitation
            <el-divider>Time</el-divider>
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input v-model="time" placeholder="Set time limitation"></el-input>
              </el-col>
              <el-col :span="4" class="center-text">
                MS
              </el-col>
            </el-row>
            <el-divider>Memory</el-divider>
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input v-model="memory" placeholder="Set memory limitation"></el-input>
              </el-col>
              <el-col :span="4" class="center-text">
                MB
              </el-col>
            </el-row>
          </el-card>
          <el-card class="item">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-flag" />
              Tags
              <i class="el-icon-edit edit-i-button" @click="$store.state.tagedit.displayTagEdit = true;"/>
            </div>
            <ProblemTag
              v-for="item in rendertags"
              :key="item.content"
              color="#fff"
              :border_color="item.color"
              :background_color="item.color"
              :content="item.content"
            />
            <span v-if="rendertags.length === 0">No tag</span>
          </el-card>
          <el-button-group class="item">
            <el-button type="primary" @click="submit">Submit</el-button>
            <el-button @click="back();">Back</el-button>
            <ConfirmDelete
              buttonName="Delete"
              buttonType="danger"
              :buttonFunction="this.delete"
              name="problem"
              :confirmInput="'#' + this.$route.params.id + '/' + this.title"
            />
          </el-button-group>
        </el-col>
        <el-col :span="17">
          <el-card v-loading="contentLoading">
            <div slot="header" class="clearfix"><i class="el-icon-document" /> Content</div>
            <MarkdownEditor v-model="mdContent" />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- Mobile screen -->
    <div v-else>
      <el-card class="float">
        <el-button type="primary" @click="submit();" icon="el-icon-check" circle />
        <el-button @click="back();" icon="el-icon-back" circle />
        <ConfirmDelete
          :buttonName="null"
          buttonType="danger"
          buttonIcon="el-icon-delete"
          buttonCircle="true"
          :buttonFunction="this.delete"
          name="problem"
          :confirmInput="'#' + this.$route.params.id + '/' + this.title"
        />
      </el-card>
      <el-card>
        <div slot="header" class="clearfix"><i class="el-icon-edit-outline" /> Name</div>
        <el-input v-model="title" placeholder="Input problem title here"></el-input>
        <el-checkbox v-model="disable" label="Disabled" class="item"></el-checkbox>
        <el-checkbox v-model="html" label="Allow HTML" class="item"></el-checkbox>
      </el-card>
      <el-card class="item">
        <i class="el-icon-menu" /> Limitation
        <el-divider>Time</el-divider>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-input v-model="time" placeholder="Set time limitation"></el-input>
          </el-col>
          <el-col :span="4" class="center-text">
            MS
          </el-col>
        </el-row>
        <el-divider>Memory</el-divider>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-input v-model="memory" placeholder="Set memory limitation"></el-input>
          </el-col>
          <el-col :span="4" class="center-text">
            MB
          </el-col>
        </el-row>
      </el-card>
      <el-card class="item">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-flag" />
          Tags
          <i class="el-icon-edit edit-i-button" @click="$store.state.tagedit.displayTagEdit = true;"/>
        </div>
        <ProblemTag
          v-for="item in rendertags"
          :key="item.content"
          color="#fff"
          :border_color="item.color"
          :background_color="item.color"
          :content="item.content"
        />
        <span v-if="rendertags.length === 0">No tag</span>
      </el-card>
      <el-card v-loading="contentLoading" class="item">
        <div slot="header" class="clearfix">
          <i class="el-icon-document" />
          Content
        </div>
        <MarkdownEditor v-model="mdContent" />
      </el-card>
    </div>

    <editTag />
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownEditor from './../lib/MarkdownEditor.vue';
import ConfirmDelete from './../lib/ConfirmDelete.vue';
import editTag from './EditTag.vue';
import ProblemTag from './../lib/ProblemTag.vue';

import sha256 from 'js-sha256';

export default {
  name: 'ProblemEdit',
  data() {
    return {
      title: '',
      mdContent: 'Loading...',
      mdContent_sha256: null,
      contentLoading: true,
      time: 'Unknown',
      memory: 'Unknown',
      disable: false,
      html: false,
      smallScreen: screen.width < 800,
      visible: false,
      confirmAnswer: '',
      confirmAnswerCorrect: false,
      tags: [],
      rendertags: []
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
          });
      } 
    },
    loadproblem() {
      this.$axios
        .get(apiurl('/problem/' + String(this.$route.params.id)))
        .then(res => {
          let data = res.data.res;
          this.title = data.title;
          this.memory = data.memory_limit / 1000;
          this.time = data.time_limit;
          this.disable = !data.enabled;
          this.html = data.allow_html;
          this.contentLoading = false;
          this.mdContent_sha256 = sha256(this.mdContent);
          this.tags = data.tags;
          this.render_tags();
          this.$axios
            .get(apiurl('/problem/' + String(this.$route.params.id) + '/description'))
            .then(detail => {
              this.mdContent = detail.data.res.description;
            });
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
    },
    back() {
      this.$router.push('/problem/' + this.$route.params.id);
    },
    submit() {
      let request_data = {
        title: this.title,
        memory_limit: this.memory * 1000,
        time_limit: this.time,
        allow_html: this.html,
        enabled: !this.disable
      };
      if(sha256(this.mdContent) !== this.mdContent_sha256) {
        request_data['description'] = this.mdContent;
      }

      this.mdContent_sha256 = sha256(this.mdContent);
      this.$axios
        .patch(apiurl('/problem/' + this.$route.params.id), request_data)
        .then(() => {
          this.$info.success('Your changes have been submitted');
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
    },
    delete() {
      this.$axios
        .delete(apiurl('/problem/' + this.$route.params.id))
        .then(() => {
          this.$info.success('Deleted problem #' + this.$route.params.id);
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
  mounted() {
    this.loadproblem();
  },
  components: {
    MarkdownEditor,
    ConfirmDelete,
    ProblemTag,
    editTag
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}

.center-text {
    margin-top: 0.7rem;
}

@media only screen and (max-width: 800px) {
    .float {
        z-index: 1000;
        opacity: 0.5;
        position: fixed;
        transition: 0.5s;
        right: 30px;
        top: 80px;
    }

    .float:active {
        z-index: 1000;
        opacity: 1;
    }

    .float:hover {
        z-index: 1000;
        opacity: 1;
    }
}

.edit-i-button {
    transition: all 0.5s;
    float: right;
}

.edit-i-button:hover {
    cursor: pointer;
    color: #909399;
}
</style>
