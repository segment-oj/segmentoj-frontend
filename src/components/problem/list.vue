<template>
  <div id="problem-list">
    <AjaxTable
      :ajax_url="this.ajax_url"
      :columns="this.columns"
      :limit=10
      :total=20
      :process="this.process"
    ></AjaxTable>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import AjaxTable from './../lib/AjaxTable.vue';

export default {
  name: 'ProblemList',
  data() {
    return {
      ajax_url: apiurl('/problem/list'),
      columns: [{
        name: 'pid',
        label: 'Problem ID'
      }, {
        name: 'score',
        label: 'Status'
      }, {
        name: 'title',
        label: 'Title'
      }]
    }
  },
  methods: {
    process(x) {
      let color = 'text-extra-bold ';
      let link_type;
      if (x.score === 100) {
        color += 'color-success';
        link_type = 'success';
      } else if (x.score < 100 && x.score >= 0) {
        color += 'color-danger';
        link_type = 'warning';
      } else {
        color += 'color-primary-text';
        link_type = 'info';
      }
      x.title = (<el-link href={'/problem/' + String(x.pid)} type={link_type}>{ x.title }</el-link>);
      x.score = (<div class={color}>{x.score >= 0 ? x.score : '-'}</div>)
      return x;
    }
  },
  components: {
    AjaxTable
  }
};
</script>