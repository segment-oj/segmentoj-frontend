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
            :default_sort="{prop: 'pid', order: 'ascending'}"
            :customData="{title:title}"
            pagination_class="problem-list-pagination"
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
            placeholder="Search"
            v-model="searchTitle"
            class="input-with-select"
            clearable
          >
          </el-input>
        </el-card>
        <JumpToProblem class="margin-top-20" />
        <el-card class="margin-top-20">
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
          <el-divider class="divider" />
          <el-checkbox v-model="showTags"> Show Tags</el-checkbox>
          <div v-if="this.$store.state.user.isStaff || this.$store.state.user.isRoot">
            <el-divider class="divider" />
              <el-button
              style="width: 100%;"
              @click="$store.state.createProblem.displayCreateProblem = true;"
              size="medium"
              >
              <i class="el-icon-circle-plus" />
              Create New Problem
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <CreateProblem />
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import AjaxTable from './../lib/AjaxTable.vue';
import JumpToProblem from './../lib/JumpToProblem.vue';
import CreateProblem from './create.vue';

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
        width: '90',
        align: 'center',
        sortable: true
      }, {
        name: 'pid',
        label: 'Problem ID',
        width: '120',
        align: 'center'
      }, {
        name: 'title',
        label: 'Title',
        sortable: false
      }, {
        name: 'tag',
        width: '300',
        align: 'right',
        sortable: false
      }],
      data_count: 10,
      extra_data: JSON.parse(this.$store.state.user.extra_data),
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
    get_column() {
      if (this.$store.state.user.userid === null) {
        return;
      }
      this.limit = this.extra_data.col_limit;
    },
    set_column(x) {
      if (this.$store.state.user.userid === null) {
        return;
      }
      this.limit = x;
      this.extra_data.col_limit = this.limit;
      this.$store.commit('userConfigChange', {
        extra_data: JSON.stringify(this.extra_data)
      });
      const post_extra_data = {segmentoj_extra_data: this.extra_data};
      this.$axios
        .patch(apiurl(`/account/${this.$store.state.user.userid}/extradata`), {
          extra_data: JSON.stringify(post_extra_data)
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
            <router-link to={`/problem/${x.pid}`} class={`${color} text-normal`}>{ x.title } </router-link>
            <el-tag effect="dark" type="warning" size="small">Hidden</el-tag>
          </div>
        );
      } else {
        x.title = (<router-link to={`/problem/${x.pid}`} class={`${color} text-normal`}>{ x.title }</router-link>);
      }
      x.pid = (<div class={color}>{x.pid}</div>);
      x.score = (<div class={`${color} text-extra-bold`}>{x.score >= 0 ? x.score : '-'}</div>);
      
      x.tag = (<listTag tags={ x.tags }></listTag>);
      
      return x;
    },
  },
  components: {
    AjaxTable,
    JumpToProblem,
    CreateProblem
  },
  mounted() {
    this.get_column();
  }
};
</script>

<style scoped>
.divider {
    margin: 20px 0;
}
</style>
