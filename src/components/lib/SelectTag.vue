<template>
  <div>
    <el-transfer v-model="value" :data="data" filterable :titles="['All', 'Selected']"></el-transfer>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'SelectTag',
  props: {
    pid: {
      type: Number,
      required: true
    }
  },
  methods: {
    getAll() {
      let arr = new Array();
      this.$axios
        .get(apiurl('problem/tag/list'))
        .then(res => {
          let data = res.data.res;
          for (let i = 0; i < data.length; i += 1) {
            arr.push({
              key: data[i].id,
              label: data[i].content
            });
          }
        })
        .catch(() => {
          this.$info.error('Get tags failed');
        });
      return arr;
    },
    getSelected() {
      let arr = new Array();
      this.$axios
        .get(apiurl(`/problem/${this.pid}`))
        .then(res => {
          let data = res.data.res.tags;
          for (let i = 0; i < data.length; i += 1) {
            arr.push(data[i]);
          }
        })
        .catch(() => {
          this.$info.error('Get tags failed');
        });
      return arr;
    },
    getTags() {
      return this.value;
    }
  },
  data() {
    return {
      data: new Array(),
      value: new Array()
    };
  },
  mounted() {
    this.data = this.getAll();
    this.value = this.getSelected();
  }
};
</script>
