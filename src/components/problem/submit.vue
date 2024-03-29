<template>
  <div>
    <!-- Normal screen -->
    <el-row :gutter="20" v-if="!smallScreen">
      <el-col :span="6">
        <el-card v-if="!readonly">
          <div slot="header" class="clearfix"><i class="el-icon-s-operation" /> Language</div>
          <el-select v-model="lang_num" placeholder="Select language">
            <el-option
              v-for="item in langTable"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-card>
        <el-card :class="readonly ? '' : 'margin-top-20'">
          <i class="el-icon-info" /> Information
          <el-divider>Problem</el-divider>
          #{{pid}}. {{title}}
          <el-divider>Limitation</el-divider>
          {{time}} ms
          <el-divider direction="vertical"></el-divider>
          {{memory}} MB
          <span v-if="readonly">
            <el-divider>Language</el-divider>
            <span>{{langTable[lang_num].label}}</span>
          </span>
        </el-card>
        <el-button-group class="margin-top-20">
          <el-button v-if="resubmit && !readonly" type="primary" @click="submit();" :loading="buttonLoading">Resubmit</el-button>
          <el-button v-else-if="!readonly" type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
          <el-button @click="back();">Back</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix"><i class="el-icon-document" /> Code</div>
          <CodeMirror v-model="code" :theme="100"></CodeMirror>
        </el-card>
      </el-col>
    </el-row>
    <!-- Mobile screen -->
    <div v-else>
      <el-card>
        <div slot="header" class="clearfix"><i class="el-icon-s-operation" /> Language</div>
        <el-select v-model="lang_num" placeholder="Select language">
          <el-option
            v-for="item in langTable"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-card>
      <el-card class="float">
        <el-button type="primary" @click="submit();" icon="el-icon-check" circle />
        <el-button @click="back();" icon="el-icon-back" circle />
      </el-card>
      <el-card class="margin-top-20">
        <div slot="header" class="clearfix"><i class="el-icon-document" /> Code</div>
        <CodeMirror v-model="code" :theme="100"> </CodeMirror>
      </el-card>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import sfconfig from './../../sfconfig';
import CodeMirror from './../lib/editor.vue';

export default {
  name: 'ProblemSubmit',
  data() {
    return {
      title: 'Unknown',
      time: '-',
      memory: '-',
      code: this.base_code,
      lang_num: '-',
      buttonLoading: false,
      smallScreen: screen.width < 700,
      langTable: sfconfig.langTable
    };
  },
  props: {
    resubmit: {
      type: Boolean,
      default: false
    }, base_code: {
      type: String,
      default: ''
    }, pid: {
      type: Number,
      required: true
    }, base_lang: {
      type: Number
    }, readonly: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    loadInfo() {
      this.$axios
        .get(apiurl(`/problem/${this.pid}`))
        .then(res => {
          let data = res.data.res;
          this.title = data.title;
          this.pid = data.pid;
          this.memory = data.memory_limit / 1000;
          this.time = data.time_limit;
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
  mounted() {
    this.loadInfo();
    this.lang_num = this.base_lang || this.$store.state.user.userlang.toString();
  },
  components: {
    CodeMirror
  }
};
</script>

<style scoped>
@media only screen and (max-width: 700px) {
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
</style>
