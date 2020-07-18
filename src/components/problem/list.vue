<template>
  <div id="problem-list">
    <AjaxTable
      :ajax_url="this.ajax_url"
      :columns="this.columns"
      :limit=3
      :total=10
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
        name: 'title',
        label: 'Title'
      }]
    }
  },
  components: {
    AjaxTable
  }
};
</script>