<template>
  <el-card style="height: 250px;">
    <VueApexCharts type="bar" height="200" :options="chartOptions" :series="submit_heatmap_data"></VueApexCharts>
  </el-card>
</template>

<script>
import apiurl from './../../apiurl';
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'HomeStatistic',
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
      ac_heatmap_data: [],
      submit_list: [],
    };
  },
  methods: {
    getStatistic() {
      this.$axios
        .get(apiurl(`/account/${this.$store.state.user.userid}/statistic`))
        .then(res => {
          const date = new Date();
          let month_str = date.toString().split(' ')[1];
          this.submit_heatmap_data = JSON.parse(res.data.res.submit_heatmap).filter((month) => {
            return month.name == month_str;
          });
          this.ac_heatmap_data = JSON.parse(res.data.res.ac_heatmap).filter((month) => {
            return month.name == month_str;
          });

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
  }
};
</script>

<style scoped>
.icon-label {
    margin-bottom: 5px;
}
</style>
