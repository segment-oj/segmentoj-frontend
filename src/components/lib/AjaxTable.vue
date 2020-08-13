<template>
  <div class="ajax-table">
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
    <el-pagination
      :page-size="this.limit"
      background
      layout="prev, pager, next, jumper"
      @current-change="this.onPageChange"
      class="pagination"
      :total="this.total"
    />
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
    };
  },
  watch: {
    limit() {
      this.onPageChange(this.pageId);
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
            limit: this.limit
          }
        })
        .then(res => {
          if (limit === this.limit) {
            this.total = res.data.count;
            this.tableData = res.data.res.map(this.process);
            this.loading = false;
          }
        })
        .catch(err => {
          this.$SegmentMessage.error(this, '[Ajax Table] Request Failed');
          console.log(err);
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
    total: {
      type: Number,
      required: true
    },
    process: {
      type: Function,
      default: x => x
    },
    default_sort: {
      
    }
  },
};
</script>

<style scoped>
.pagination {
    height: 36px;
    margin-top: 20px;
    text-align: center;
}
</style>