<template>
  <div>
    <el-row gutter="20" style="margin-bottom: 30px;">
      <el-col span="18">
        <el-card v-if="alive">
          <AjaxTable
            :ajax_url="ajax_url"
            :columns="columns"
            :limit="limit"
            :total="data_count"
            :process="process"
            :process_err="process_err"
            :customData="{problem:problem}"
            pagination_class="status-list-pagination"
          />
        </el-card>
      </el-col>
      
      <el-col span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <i class="el-icon-search" />
            Search
          </div>
          <el-input
            placeholder="PID"
            v-model="searchProblem"
            class="input-with-select"
            clearable
          >
            <template slot="prepend">#.</template>
          </el-input>
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
      searchProblem: this.$route.query.pid === undefined ? '' : this.$route.query.pid,
      columns: [{
        name: 'id',
        label: 'Run ID',
        width: '80',
        align: 'center'
      }, {
        name: 'problem',
        label: 'Problem',
        align: 'center'
      }, {
        name: 'state',
        label: 'Status',
        align: 'center',
        width: '120'
      }, {
        name: 'score',
        label: 'Score',
        width: '60',
        align: 'center'
      }, {
        name: 'time',
        label: 'Time',
        width: '90',
        align: 'center'
      }, {
        name: 'memory',
        label: 'Memory',
        width: '90',
        align: 'center'
      }, {
        name: 'lang',
        label: 'Language',
        width: '90',
        align: 'center'
      }, {
        name: 'owner',
        label: 'Author',
        width: '120',
        align: 'center'
      }],
      data_count: 10
    };
  },
  computed: {
    problem() {
      return this.searchProblem.trim();
    },
  },
  methods: {
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
      x.score = (<div class={color + ' text-extra-bold'}>{x.score >= 0 ? x.score : '-'}</div>);
      x.lang = sfconfig.langTable[x.lang].label;
      let stateTable = sfconfig.stateTable.filter(id => {
        return id.value === String(x.state);
      });
      if(stateTable.length) {
        x.state = (<router-link to={'/status/' + String(x.id)} style={'color: ' + stateTable[0].color + ';'} class="text-bold"><i class={stateTable[0].icon} /> {stateTable[0].label}</router-link>);
      } else {
        x.state = (<div style='color: #FF4949;' class="text-bold"><i class='el-icon-circle-close' /> System Error</div>);
      }
      x.time = x.time + ' ms';
      x.memory = x.memory + ' KB';
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
.item {
    margin-top: 20px;
}
</style>

