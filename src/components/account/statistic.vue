<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="Submission Heatmap">
        <VueApexCharts type="heatmap" height="280" :options="chartOptions" :series="submit_heatmap_data"></VueApexCharts>
      </el-tab-pane>
      <el-tab-pane label="Submitted Problems">
        <span v-for="problem in submit_list" :key="problem" style="margin: 8px;">
          <ProblemTitleLink :pid="problem"></ProblemTitleLink>
        </span>
      </el-tab-pane>
      <el-tab-pane label="AC Heatmap"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import VueApexCharts from 'vue-apexcharts';
import ProblemTitleLink from './../problem/ProblemTitleLink.vue';

export default {
  name: 'UserStatistic',
  data() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        colors: ['#008FFB'],
        title: {
          text: ''
        },
      },
      submit_heatmap_data: [],
      submit_list: [],
    };
  },
  methods: {
    getStatistic() {
      this.$axios
        .get(apiurl(`/account/${this.$route.params.id}/statistic`))
        .then(res => {
          this.submit_heatmap_data = JSON.parse(res.data.res.submit_heatmap);
          this.submit_list = JSON.parse(res.data.res.submit_list);
        })
        .catch(err => {
          if (err.request.status === 404) {
            this.$info.error('User does not exist');
          } else {
            this.$info.error('Unknown error');
          }
          this.userLoading = false;
        });
    }
  },
  mounted() {
    this.getStatistic();
  },
  components: {
    VueApexCharts,
    ProblemTitleLink
  }
};
</script>

<style scoped>
.icon-label {
    margin-bottom: 5px;
}
</style>
