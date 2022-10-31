<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix"><i class="el-icon-video-play" /> Result</div>
          <span :class="`score  + ${this.color}`">
            <i v-if="this.state == 10" class="el-icon-check" />
            <i v-else class="el-icon-close" />
            {{score}}
            <br>
            <span class="state">
              {{state_name}}
            </span>
          </span>
          <el-divider>Usage</el-divider>
          {{time}} ms
          <el-divider direction="vertical"></el-divider>
          {{memory}} MB
          <el-divider>Judger</el-divider>
          <UserNameLinkVue :userid="judge_by"></UserNameLinkVue>
          <el-divider>Date</el-divider>
          {{judge_time}}
        </el-card>

        <el-button-group class="margin-top-20">
          <el-button :disabled="!is_mine" type="primary" @click="submit();" :loading="buttonLoading">Resubmit</el-button>
          <el-button @click="back();">Back</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix"><i class="el-icon-video-play" /> Test Cases</div>
          <el-table
            :data="this.detail"
            style="width: 100%;">
            <el-table-column
              label="#"
              width="50">
              <template slot-scope="scope">
                <span style="font-family: monospace;">
                  #{{scope.row.num}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="Status">
              <template slot-scope="scope">
                <span :style="`color: ${processState(scope.row.status).color}; font-weight: 500;`">
                  <i :class="processState(scope.row.status).icon" /> {{processState(scope.row.status).label}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="Time"
              width="140">
              <template slot-scope="scope">
                {{scope.row.time}} ms
              </template>
            </el-table-column>
            <el-table-column
              label="Memory"
              width="140">
              <template slot-scope="scope">
                {{scope.row.memory}} MB
              </template>
            </el-table-column>
          </el-table>
          
          <pre v-if="additional_info != ''" class="additional-info">Info: {{additional_info}}</pre>
        </el-card>
        <el-card class="margin-top-20">
          <div slot="header" class="clearfix"><i class="el-icon-document" /> Code</div>
          <CodeMirror v-model="code" :theme="100"></CodeMirror>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserNameLinkVue from '../account/UserNameLink.vue';
import sfconfig from './../../sfconfig';
import timeFormat from './../../methods/time';
import apiurl from '../../apiurl';
import CodeMirror from './../lib/editor.vue';

export default {
  data() {
    return {
      pid: 1,
      code: '',
      loading_finished: false,
      score: '',
      detail: '',
      is_mine: false,
      color: '',
      state: 0,
      state_name: '',
      judge_by: '',
      judge_time: '',
      additional_info: '',
      memory: 0,
      time: 0,
      buttonLoading: false,
    };
  },
  mounted() {
    this.loadInfo();
  },
  methods: {
    processState(state) {
      let stateTable = sfconfig.stateTable.filter(id => {
        return id.value === state.toString();
      });
      return {color: stateTable[0].color, icon: stateTable[0].icon, label: stateTable[0].label};
    },
    processScoreColor(score) {
      let color = '';
      if (score === 100) {
        color += 'color-success';
      } else if (score < 100 && score > 0) {
        color += 'color-warning';
      } else if(score == 0) {
        color += 'color-danger';
      } else {
        color += 'color-regular-text';
      }
      return color;
    },
    loadInfo() {
      this.$axios
        .get(apiurl(`/status/${this.$route.params.id}`))
        .then((res) => {
          let data = res.data.res;
          this.detail = JSON.parse(data.detail).data;
          this.score = data.score;
          this.state = data.state;
          this.color = this.processScoreColor(data.score);
          let stateTable = sfconfig.stateTable.filter(id => {
            return id.value === data.state.toString();
          });
          if (stateTable[0] === undefined) {
            this.state_name = 'Invalid State';
          } else {
            this.state_name = stateTable[0].label;
          }
          this.judge_by = data.judge_by;
          this.judge_time = timeFormat(data.judge_time);
          this.additional_info = data.additional_info;
          this.pid = data.problem;
          this.memory = data.memory / 1000;
          this.time = data.time;
          this.code = data.code;
          this.lang_num = data.lang.toString();
          if (data.owner == this.$store.state.user.userid.toString()) {
            this.is_mine = true;
          }
          if (this.$store.state.user.isStaff || this.is_mine) {
            this.can_edit = true;
          }
          this.$axios
            .get(apiurl(`/problem/${this.pid}`))
            .then((title) => {
              this.ptitle = title.data.res.title;
            });
          this.$axios
            .get(apiurl(`/account/${data.owner}`))
            .then((name) => {
              this.owner = name.data.res.username;
            });
          this.loading_finished = true;
        })
        .catch((err) => {
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
      this.$router.go(-1);
    },
    submit() {
      this.buttonLoading = true;
      this.$axios
        .post(apiurl('/status'), {
          problem: Number(this.pid),
          code: this.code,
          lang: parseInt(this.lang_num),
        })
        .then(() => {
          this.$info.success('Your code has been submitted');
          this.buttonLoading = false;
        })
        .catch(err => {
          if(err.request.status === 401) {
            this.$info.error('Please login first');
          } else if (err.request.status === 400) {
            this.$info.error('Input your code');
          } else {
            this.$info.error('Unknown error');
          }
          this.buttonLoading = false;
        });
    },
  },
  components: {
    UserNameLinkVue,
    CodeMirror
  },
};
</script>

<style scoped>
.score {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}

.state {
    font-size: 22px;
}

.additional-info {
    font-size: 13px;
    font-family: monospace;
    background-color: rgb(252, 252, 252);
    padding: 10px;
    margin-bottom: 0;
}
</style>