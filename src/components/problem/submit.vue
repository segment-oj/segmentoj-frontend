<template>
  <div>
    <el-row :gutter="20" v-if="!smallScreen">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix"><i class="el-icon-s-operation" /> Language</div>
          <el-select v-model="lang_num" placeholder="Select language">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-card>
        <el-card class="item">
          <el-button type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
          <el-button @click="back();">Back</el-button>
        </el-card>
        <el-card class="item">
          <i class="el-icon-info" /> Information
          <el-divider>Problem</el-divider>
          #{{pid}}. {{title}}
          <el-divider>Limitation</el-divider>
          {{time}} MS
          <el-divider direction="vertical"></el-divider>
          {{memery}} MB
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix"><i class="el-icon-document" /> Code</div>
          <el-input
            class="code-input"
            type="textarea"
            :rows="20"
            placeholder="Paste your code"
            required
            v-model="code"
          />
        </el-card>
      </el-col>
    </el-row>
    <div v-else>
      <el-card>
        <div slot="header" class="clearfix"><i class="el-icon-s-operation" /> Language</div>
        <el-select v-model="lang_num" placeholder="Select language">
          <el-option
            v-for="item in options"
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
      <el-card class="item">
        <div slot="header" class="clearfix"><i class="el-icon-document" /> Code</div>
        <el-input
          class="code-input"
          type="textarea"
          :rows="20"
          placeholder="Paste your code"
          required
          v-model="code"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'ProblemSubmit',
  data() {
    return {
      title: 'Unknown',
      pid: this.$route.params.id,
      time: '-',
      memery: '-',
      code: '',
      lang_num: '-',
      buttonLoading: false,
      smallScreen: screen.width < 700,
      options: [{
        value: '0',
        label: 'C++'
      }, {
        value: '1',
        label: 'C++11'
      }, {
        value: '2',
        label: 'C++14'
      }, {
        value: '3',
        label: 'C++17'
      }, {
        value: '4',
        label: 'C++20'
      }, {
        value: '5',
        label: 'C'
      }, {
        value: '6',
        label: 'C#'
      }, {
        value: '7',
        label: 'Clang'
      }, {
        value: '8',
        label: 'Clang11'
      }, {
        value: '9',
        label: 'Clang14'
      }, {
        value: '10',
        label: 'Clang17'
      }, {
        value: '11',
        label: 'Clang20'
      }, {
        value: '12',
        label: 'Rust'
      }, {
        value: '13',
        label: 'Python2'
      }, {
        value: '14',
        label: 'Python3'
      }, {
        value: '15',
        label: 'Pascal'
      }, {
        value: '16',
        label: 'Go'
      }, {
        value: '17',
        label: 'Ruby'
      }, {
        value: '18',
        label: 'Java'
      }]
    };
  },
  methods: {
    loadInfo() {
      this.$axios
        .get(apiurl('/problem/' + String(this.$route.params.id)))
        .then(res => {
          let data = res.data.res;
          this.title = data.title;
          this.pid = data.pid;
          this.memery = data.memory_limit / 1000;
          this.time = data.time_limit;
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
    back() {
      this.$router.push('/problem/' + this.$route.params.id);
    },
    submit() {
      this.buttonLoading = true;
      this.$axios
        .post(apiurl('/status'), {
          problem: Number(this.$route.params.id),
          code: this.code,
          lang: this.lang_num
        })
        .then(() => {
          this.$SegmentMessage.success(this, 'Your code has been submited');
          this.buttonLoading = false;
        })
        .catch(err => {
          if(err.request.status === 401) {
            this.$SegmentMessage.error(this, 'Please login first');
          } else if (err.request.status === 400) {
            this.$SegmentMessage.error(this, 'Input your code');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
          this.buttonLoading = false;
        });
    },
  },
  mounted() {
    this.loadInfo();
    this.lang_num = String(this.$store.state.user.userlang);
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}

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
