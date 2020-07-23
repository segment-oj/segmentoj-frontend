<template>
  <div></div>
</template>

<script>
import apiurl from '../../apiurl';

export default {
  name: 'UserLogout',
  methods: {
    logout() {
      this.$axios
        .delete(apiurl('/user'))
        .then(() => {
          this.$store.commit('userLogout');
          this.$message({
            message: 'Logged out',
            type: 'success'
          });
        })
        .catch(err => {
          if (err.request.status === 401) {
            this.$message({
              showClose: true,
              message: 'Not logged in',
              type: 'error'
            });
            this.$store.commit('userLogout');
          } else if (err.request.status === 429) {
            this.$message({
              showClose: true,
              message: 'Requesting too frequently',
              type: 'error'
            });
          } else {
            this.$message({
              showClose: true,
              message: 'Unknown error',
              type: 'error'
            });
          }
        });
      
      this.$store.state.user.showlogout = false;
    }
  }, 
  mounted() {
    this.logout();
  }
};
</script>