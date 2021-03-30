<template>
  <StatusEdit v-if="loading_finished" :pid="pid" :code="code" :lang="lang_num"></StatusEdit>
</template>

<script>
import apiurl from '../../apiurl';
import StatusEdit from './editPage';

export default {
  data() {
    return {
      pid: 1,
      code: '',
      loading_finished: false
    };
  },
  mounted() {
    this.loadInfo();
  },
  methods: {
    loadInfo() {
      this.$axios
        .get(apiurl(`/status/${this.$route.params.id}`))
        .then((res) => {
          let data = res.data.res;
          this.pid = data.problem;
          this.memory = data.memory / 1000;
          this.time = data.time;
          this.code = data.code;
          this.lang_num = data.lang.toString();

          if (data.owner == this.$store.state.user.userid.toString()) {
            this.is_mine = true;
          }
          if (this.$store.state.user.isStaff || this.is_mine) {
            this.can_edit = true;
          }

          this.$axios
            .get(apiurl(`/problem/${this.pid}`))
            .then((title) => {
              this.ptitle = title.data.res.title;
            });
          this.$axios
            .get(apiurl(`/account/${data.owner}`))
            .then((name) => {
              this.owner = name.data.res.username;
            });
          this.loading_finished = true;
        })
        .catch((err) => {
          if (err.request.status === 404) {
            this.$info.error('Problem not found');
          } else if (err.request.status === 403) {
            this.$info.error('Permission denied');
          } else {
            this.$info.error('Unknown error');
          }
        });
    },
  },
  components: {
    StatusEdit,
  },
};
</script>