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
        .delete(apiurl('/account/session'))
        .then(() => {
          this.$store.commit('userLogout');
          this.$info.success('Logged out');
          this.$router.push('/');
        })
        .catch(err => {
          if (err.request.status === 401) {
            this.$info.error('Not logged in');
            this.$store.commit('userLogout');
          } else if (err.request.status === 429) {
            // HTTP 429 Too Many Requests
            this.$info.error('Requesting too frequently');
          } else {
            // Unknown error
            this.$info.error('Unknown error');
          }
          this.$store.commit('userLogout');
        });
      
      this.$store.state.user.showlogout = false;
    }
  }, 
  mounted() {
    this.logout();
  }
};
</script>
