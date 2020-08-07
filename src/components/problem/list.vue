<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <span>Columns</span>
          <el-slider
            v-model="limit"
            :step="10"
            @change="test"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-card class="item" v-if="alive">
      <AjaxTable
        :ajax_url="ajax_url"
        :columns="columns"
        :limit="limit"
        :total="data_count"
        :process="process"
      />
    </el-card>
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
      alive: true,
      ajax_url: apiurl('/problem/list'),
      limit: 50,
      columns: [{
        name: 'score',
        label: 'Status',
        width: '120',
        align: 'center'
      }, {
        name: 'pid',
        label: 'Problem ID',
        width: '120',
        align: 'center'
      }, {
        name: 'title',
        label: 'Title'
      }, {
        name: 'tag',
        label: 'Tags',
        width: '300',
        align: 'right',
        headerAlign: 'center'
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
            <el-tag effect="dark" type="warning" size="small">Hidden</el-tag>
          </div>
        );
      } else {
        x.title = (<router-link to={'/problem/' + String(x.pid)} class={color + ' text-normal'}>{ x.title }</router-link>);
      }
      x.score = (<div class={color + ' text-extra-bold'}>{x.score >= 0 ? x.score : '-'}</div>);
      x.tag = (<listTag id={x.pid}></listTag>);
      return x;
    },
    test() {
      this.alive = false;
      this.$nextTick(() => {
        this.alive = true;
      });
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

<style scoped>
.item {
    margin-top: 20px;
}
</style>
