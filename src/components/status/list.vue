<template>
  <div>
    <el-card class="item" v-if="alive">
      <AjaxTable
        :ajax_url="ajax_url"
        :columns="columns"
        :limit="limit"
        :total="data_count"
        :process="process"
        :default_sort="{prop: 'id', order: 'descending'}"
        pagination_class="status-list-pagination"
      />
    </el-card>
  </div>
</template>

<script>
import sfconfig from './../../sfconfig';
import apiurl from './../../apiurl';
import AjaxTable from './../lib/AjaxTable.vue';
import ProblemTitleLink from './../problem/ProblemTitleLink.vue';
import UserNameLink from './../user/UserNameLink.vue';

export default {
  name: 'StatusList',
  data() {
    return {
      alive: true,
      ajax_url: apiurl('/status/list'),
      limit: 30,
      columns: [{
        name: 'id',
        label: 'Run ID',
        width: '120',
        align: 'center',
        sortable: true
      }, {
        name: 'problem',
        label: 'Problem',
        align: 'center',
        sortable: false
      }, {
        name: 'state',
        label: 'Status',
        align: 'center',
        sortable: false
      }, {
        name: 'score',
        label: 'Score',
        width: '120',
        align: 'center',
        sortable: true
      }, {
        name: 'time',
        label: 'Time',
        width: '120',
        align: 'center',
        sortable: false
      }, {
        name: 'memory',
        label: 'Memory',
        width: '120',
        align: 'center',
        sortable: false
      }, {
        name: 'lang',
        label: 'Language',
        width: '120',
        align: 'center',
        sortable: false
      }, {
        name: 'owner',
        label: 'Author',
        width: '120',
        align: 'center',
        sortable: false
      }],
      data_count: 10
    };
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
        x.state = (<div style={'color: ' + stateTable[0].color + ';'} class="text-bold"><i class={stateTable[0].icon} /> {stateTable[0].label}</div>);
      } else {
        x.state = (<div style='color: #FF4949;' class="text-bold"><i class='el-icon-circle-close' /> System Error</div>);
      }
      x.time = x.time + ' ms';
      x.memory = x.memory + ' KB';
      x.owner = (<UserNameLink userid={x.owner}></UserNameLink>);
      return x;
    },
  },
  components: {
    AjaxTable
  },
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}
</style>

