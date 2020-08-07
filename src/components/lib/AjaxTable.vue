<template>
  <div class="ajax-table">
    <el-table v-loading="loading" :data="tableData">
      <el-table-column
        v-for="item in columns"
        :key="item"
        :prop="item.name"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :header-align="item.headerAlign"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="this.limit"
      background
      layout="prev, pager, next, jumper"
      @current-change="this.onPageChange"
      class="pagination"
      :total="this.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'AjaxTable',
  data() {
    return {
      loading: true,
      tableData: null,
      offset: 0
    };
  },
  methods: {
    onPageChange(page_id) {
      this.offset = (page_id - 1) * this.limit;
      this.load_data();
    },
    load_data() {
      this.loading = true;
      this.$axios
        .get(this.ajax_url, {
          params: {
            offset: this.offset,
            limit: this.limit
          }
        })
        .then(res => {
          this.total = res.data.count;
          this.tableData = res.data.res.map(this.process);
          this.loading = false;
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
    }
  }
};
</script>

<style scoped>
.pagination {
    height: 36px;
    margin-top: 20px;
    text-align: center;
}
</style>