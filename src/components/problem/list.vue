<template>
  <div id="problem-list">
    <AjaxTable
      :ajax_url="ajax_url"
      :columns="columns"
      :limit="50"
      :total="data_count"
      :process="process"
    />
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import AjaxTable from './../lib/AjaxTable.vue';
import listTag from './listTag.vue';

export default {
  name: 'ProblemList',
  data() {
    return {
      ajax_url: apiurl('/problem/list'),
      columns: [{
        name: 'score',
        label: 'Status',
        width: '80'
      }, {
        name: 'pid',
        label: 'Problem ID',
        width: '120'
      }, {
        name: 'title',
        label: 'Title'
      }, {
        name: 'tag',
        label: 'Tags',
        width: '300'
      }],
      data_count: 10
    };
  },
  methods: {
    process(x) {
      let color = '';
      if (x.score === 100) {
        color += 'color-success';
      } else if (x.score < 100 && x.score >= 0) {
        color += 'color-danger';
      } else {
        color += 'color-regular-text';
      }
      if (!x.enabled) {
        x.title = (
          <div>
            <router-link to={'/problem/' + String(x.pid)} class={color + ' text-normal'}>{ x.title } </router-link>
            <el-tag effect="dark" type="warning">Hidden</el-tag>
          </div>
        );
      } else {
        x.title = (<router-link to={'/problem/' + String(x.pid)} class={color + ' text-normal'}>{ x.title }</router-link>);
      }
      x.score = (<div class={color + ' text-extra-bold'}>{x.score >= 0 ? x.score : '-'}</div>);
      x.tag = (<listTag id={x.pid}></listTag>);
      return x;
    }
  },
  components: {
    AjaxTable
  },
  mounted() {
    this.$axios
      .get(apiurl('/problem/list/count'))
      .then(response => {
        let data = response.data;
        this.data_count = data.res;
      })
      .catch(err => {
        this.$SegmentMessage.error(this, '[Problem List] Get List Length Failed');
        console.log(err);
      });
  }
};
</script>