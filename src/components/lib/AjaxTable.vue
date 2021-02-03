<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :default-sort="default_sort"
    >
      <el-table-column
        v-for="item in columns"
        :key="item"
        :prop="item.name"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :header-align="item.headerAlign"
        :sortable="item.sortable"
      />
    </el-table>
    <div :class="`${pagination_class} top-zindex`">
      <el-pagination
        :page-size="this.limit"
        background
        layout="prev, pager, next, jumper"
        @current-change="this.onPageChange"
        :total="this.own_total"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AjaxTable',
  data() {
    return {
      loading: true,
      tableData: null,
      offset: 0,
      pageId: 1,
      own_total: this.total,
    };
  },
  watch: {
    limit() {
      this.onPageChange(this.pageId);
    },
    customData(new_val, old_val) {
      let json_new_val = JSON.stringify(new_val);
      let json_old_val = JSON.stringify(old_val);
      if (json_new_val != json_old_val) {
        this.onPageChange(1);
      }
    }
  },
  methods: {
    onPageChange(page_id) {
      this.pageId = page_id;
      this.offset = (page_id - 1) * this.limit;
      this.load_data();
    },
    load_data() {
      let limit = this.limit;
      this.loading = true;
      this.$axios
        .get(this.ajax_url, {
          params: {
            offset: this.offset,
            limit: this.limit,
            ...this.customData
          }
        })
        .then(res => {
          if (limit === this.limit) {
            this.own_total = res.data.count;
            this.tableData = res.data.res.map(this.process);
            this.loading = false;
          }
        })
        .catch(err => {
          this.$info.error(this.process_err(err));
        });
    }
  },
  mounted() {
    this.load_data();
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    ajax_url: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      default: 20
    },
    customData: {
      type: Object
    },
    total: {
      type: Number,
      required: true
    },
    process: {
      type: Function,
      default: x => x
    },
    default_sort: {
      type: Object,
      default: null
    },
    pagination_class: {
      type: String,
      default: 'pagination'
    },
    process_err: {
      type: Function,
      default: (err) => {
        console.log(err);
        return '[Ajax Table] Request Failed';
      }
    }
  },
};
</script>
