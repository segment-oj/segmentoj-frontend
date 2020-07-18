<template>
  <div id="problem-list">
    <AjaxTable
      :ajax_url="this.ajax_url"
      :columns="this.columns"
      :limit=3
      :total=10
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
      x.title = (<router-link to={'/problem/' + String(x.pid)}>{ x.title }</router-link>);
      let color = 'text-extra-bold ';
      if (x.score === 100) color += 'color-success';
      else if (x.score < 100 && x.score >= 0) color += 'color-danger';
      else color += 'color-primary-text';
      x.score = (<div class={color}>{x.score >= 0 ? x.score : '-'}</div>)
      return x;
    }
  },
  components: {
    AjaxTable
  }
};
</script>