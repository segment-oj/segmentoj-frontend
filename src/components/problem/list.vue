<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card>
          <i class="el-icon-search" />
          Search
          <el-input
            placeholder="Search"
            v-model="searchTitle"
            class="input-with-select" 
            style="margin-top: 9px;"
            clearable
          >
          </el-input>
        </el-card>
      </el-col>
      <el-col :span="6">
        <JumpToProblem />
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="16">
              <span>
                <i class="el-icon-s-grid" />
                Columns
              </span>
              <el-slider
                v-model="limit"
                :step="10"
                :min="10"
                style="margin-top: 10px;"
              />
            </el-col>
            <el-col :span="8">
              <div>
                <i class="el-icon-collection-tag" />
                Show Tags
              </div>
              <el-switch
                v-model="showTags"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin-top: 17px;"
              />
            </el-col>
          </el-row>
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
        :default_sort="{prop: 'pid', order: 'ascending'}"
        :costumData="{title:title}"
      />
    </el-card>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import AjaxTable from './../lib/AjaxTable.vue';
import JumpToProblem from './../lib/jumpToProblem.vue';
import listTag from './listTag.vue';

export default {
  name: 'ProblemList',
  data() {
    return {
      alive: true,
      ajax_url: apiurl('/problem/list'),
      limit: 50,
      searchTitle: '',
      showTags: this.$store.state.tags.displayTags,
      columns: [{
        name: 'score',
        label: 'Status',
        width: '120',
        align: 'center',
        sortable: true
      }, {
        name: 'pid',
        label: 'Problem ID',
        width: '120',
        align: 'center',
        sortable: true
      }, {
        name: 'title',
        label: 'Title',
        sortable: false
      }, {
        name: 'tag',
        width: '400',
        align: 'right',
        sortable: false
      }],
      data_count: 10
    };
  },
  watch: {
    showTags(val) {
      this.$store.commit('setDisplayTag', {
        val: val
      });
    },
    limit(val) {
      this.set_column(val);
    },
  },
  computed: {
    title() {
      return this.searchTitle.trim();
    },
  },
  methods: {
    get_list_lenth() {
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
    },
    get_column() {
      if (this.$store.state.user.userid === null) {
        return;
      }
      this.$axios
        .get(apiurl('/account/' + this.$store.state.user.userid))
        .then(res => {
          let data = res.data.res;
          this.limit = data.list_column;
        });
    },
    set_column(x) {
      if (this.$store.state.user.userid === null) {
        return;
      }
      this.$axios
        .patch(apiurl('/account/' + this.$store.state.user.userid), {
          list_column: x
        });
    },
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
      
      x.tag = (<listTag tags={ x.tags }></listTag>);
      
      return x;
    },
  },
  components: {
    AjaxTable,
    JumpToProblem
  },
  mounted() {
    this.get_list_lenth();
    this.get_column();
  }
};
</script>

<style scoped>
.item {
    margin-top: 20px;
}
</style>
