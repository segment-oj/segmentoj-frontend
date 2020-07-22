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
      if (x.score === 100) {
        color += 'color-success';
      } else if (x.score < 100 && x.score >= 0) {
        color += 'color-danger';
      } else {
        color += 'color-regular-text';
      }
      x.title = (<router-link to={'/problem/' + String(x.pid)} class={color}>{ x.title }</router-link>);
      x.score = (<div class={color}>{x.score >= 0 ? x.score : '-'}</div>)
      return x;
    }
  },
  components: {
    AjaxTable
  }
};
</script>