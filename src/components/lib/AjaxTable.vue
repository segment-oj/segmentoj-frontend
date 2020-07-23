<template>
  <div class="ajax-table">
    <el-table v-loading="loading" :data="tableData" stripe class="table">
      <el-table-column v-for="item in columns" :key="item" :prop="item.name" :label="item.label"></el-table-column>
    </el-table>
    <el-pagination
      :page-size="this.limit"
      :total="this.total"
      background
      layout="prev, pager, next, jumper"
      @current-change="this.onPageChange"
      class="pagination"
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
          this.tableData = res.data.res.map(this.process);
          this.loading = false;
        })
        .catch(err => {
          this.$message.error('[Ajax Table] Request Failed.');
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

.table {
    min-height: calc(100vh - 80px - 60px - 41.05px);
}
</style>