<template>
  <div></div>
</template>

<script>
import apiurl from '../../apiurl';

export default {
  name: 'UserLogout',
  methods: {
    SendMessageSuccess(content) {
      this.$message({
        showClose: true,
        message: content,
        type: 'success',
        customClass: 'highzindex'
      });
    },
    SendMessageError(content) {
      this.$message({
        showClose: true,
        message: content,
        type: 'error',
        customClass: 'highzindex'
      });
    },
    logout() {
      this.$axios
        .delete(apiurl('/user'))
        .then(() => {
          this.$store.commit('userLogout');
          this.SendMessageSuccess('Logged out');
        })
        .catch(err => {
          if (err.request.status === 401) {
            this.SendMessageError('Not logged in');
            this.$store.commit('userLogout');
          } else if (err.request.status === 429) {
            // HTTP 429 Too Many Requests
            this.SendMessageError('Requesting too frequently');
          } else {
            // Unknown error
            this.SendMessageError('Unknown error');
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