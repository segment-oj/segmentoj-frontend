<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 30px;">
      <el-col :span="18">
        <el-card v-if="alive">
          <AjaxTable
            :ajax_url="ajax_url"
            :columns="columns"
            :limit="limit"
            :total="data_count"
            :process="process"
            :process_err="process_err"
            :customData="{ problem: problem, owner: owner, lang: lang }"
            pagination_class="status-list-pagination"
          />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <i class="el-icon-search" />
            Search
          </div>
          <el-input
            placeholder="PID"
            v-model="new_search_problem"
            class="input-with-select"
            clearable
          >
            <template slot="prepend"># .</template>
          </el-input>

          <el-input
            placeholder="Owner ID"
            v-model="new_search_owner"
            class="input-with-select margin-top-20"
            clearable
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>

          <el-input
            placeholder="Language"
            v-model="new_search_lang"
            class="input-with-select margin-top-20"
            clearable
          >
            <template slot="prepend">
              <i class="el-icon-s-operation"></i>
            </template>
          </el-input>

          <el-button class="search-button margin-top-20" icon="el-icon-search" @click="search">
            Search
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sfconfig from './../../sfconfig';
import apiurl from './../../apiurl';
import AjaxTable from './../lib/AjaxTable.vue';
import ProblemTitleLink from './../problem/ProblemTitleLink.vue';
import UserNameLink from './../account/UserNameLink.vue';

export default {
  name: 'StatusList',
  data() {
    return {
      alive: true,
      ajax_url: apiurl('/status/list'),
      limit: 30,
      search_problem: this.$route.query.pid === undefined ? '' : this.$route.query.pid,
      search_owner: this.$route.query.owner === undefined ? '' : this.$route.query.owner,
      search_lang: this.$route.query.lang === undefined ? '' : this.$route.query.lang,
      new_search_problem: '',
      new_search_owner: '',
      new_search_lang: '',
      columns: [{
        name: 'id',
        label: 'ID',
        width: '70',
        align: 'center'
      }, {
        name: 'problem',
        label: 'Problem',
        align: 'center'
      }, {
        name: 'state',
        label: 'Status',
        align: 'center',
        width: '170'
      }, {
        name: 'score',
        label: 'Score',
        width: '60',
        align: 'center'
      }, {
        name: 'time',
        label: 'Time',
        width: '80',
        align: 'center'
      }, {
        name: 'memory',
        label: 'Memory',
        width: '80',
        align: 'center'
      }, {
        name: 'lang',
        label: 'Lang',
        width: '60',
        align: 'center'
      }, {
        name: 'owner',
        label: 'Owner',
        width: '100',
        align: 'center'
      }],
      data_count: 10
    };
  },
  computed: {
    problem() {
      return this.search_problem.trim();
    },
    owner() {
      return this.search_owner.trim();
    },
    lang() {
      let res = '';
      for (let i of sfconfig.majorLangTable) {
        if (i.label.toLowerCase() == this.search_lang.toLowerCase()) {
          res = i.numberCode;
          break;
        }
      }
      return res;
    }
  },
  methods: {
    search() {
      this.search_problem = this.new_search_problem;
      this.search_owner = this.new_search_owner;
      this.search_lang = this.new_search_lang;
    },
    process(x) {
      let color = '';
      if (x.score === 100) {
        color += 'color-success';
      } else if (x.score < 100 && x.score > 0) {
        color += 'color-warning';
      } else if(x.score == 0) {
        color += 'color-danger';
      } else {
        color += 'color-regular-text';
      }
      x.problem = (<ProblemTitleLink pid={x.problem}></ProblemTitleLink>);
      x.score = (<div class={`${color} text-extra-bold`}>{x.score >= 0 ? x.score : '-'}</div>);
      x.lang = sfconfig.langTable[x.lang].label;
      let stateTable = sfconfig.stateTable.filter(id => {
        return id.value === x.state.toString();
      });
      if(stateTable.length) {
        x.state = (<router-link to={`/status/${x.id}`} style={`color: ${stateTable[0].color};`} class="text-bold"><i class={stateTable[0].icon} /> {stateTable[0].label}</router-link>);
      } else {
        x.state = (<div style='color: #FF4949;' class="text-bold"><i class='el-icon-circle-close' /> System Error</div>);
      }
      x.time = `${x.time} ms`;
      x.memory = `${Math.round(x.memory / 1024)} MB`;
      x.owner = (<UserNameLink userid={x.owner}></UserNameLink>);
      return x;
    },
    process_err(err) {
      if (err.request.status === 404) {
        return 'Problem not found';
      }
      return '[Ajax Table] Request Failed';
    }
  },
  components: {
    AjaxTable
  }
};
</script>

<style scoped>
.search-button {
    width: 100%;
}
</style>

