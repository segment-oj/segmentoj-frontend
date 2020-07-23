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
            this.$message.error('Not logged in');
            this.$store.commit('userLogout');
          } else if (err.request.status === 429) {
            this.$message.error('Requesting too frequently');
          } else {
            this.$message.error('Unknown error');
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