<template>
  <div>
    <!-- Normal screen -->
    <el-row :gutter="20" v-if="!smallScreen">
      <el-col :span="6">
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
        <el-button-group class="item">
          <el-button type="primary" @click="submit();" :loading="buttonLoading">Submit</el-button>
          <el-button @click="back();">Back</el-button>
        </el-button-group>
        <el-card class="item">
          <i class="el-icon-info" /> Information
          <el-divider>Problem</el-divider>
          #{{pid}}. {{title}}
          <el-divider>Limitation</el-divider>
          {{time}} MS
          <el-divider direction="vertical"></el-divider>
          {{memory}} MB
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
            spellcheck="false"
          />
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
      <el-card class="item">
        <div slot="header" class="clearfix"><i class="el-icon-document" /> Code</div>
        <el-input
          class="code-input"
          type="textarea"
          :rows="20"
          placeholder="Paste your code"
          required
          v-model="code"
          spellcheck="false"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import sfconfig from './../../sfconfig';

export default {
  name: 'ProblemSubmit',
  data() {
    return {
      title: 'Unknown',
      pid: this.$route.params.id,
      time: '-',
      memory: '-',
      code: '',
      lang_num: '-',
      buttonLoading: false,
      smallScreen: screen.width < 700,
      langTable: sfconfig.langTable
    };
  },
  methods: {
    loadInfo() {
      this.$axios
        .get(apiurl(`/problem/${this.$route.params.id}`))
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
      this.$router.push(`/problem/${this.$route.params.id}`);
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
    this.lang_num = this.$store.state.user.userlang.toString();
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
