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
          this.$SegmentMessage.success(this, 'Logged out');
          this.$router.push('/');
        })
        .catch(err => {
          if (err.request.status === 401) {
            this.$SegmentMessage.error(this, 'Not logged in');
            this.$store.commit('userLogout');
          } else if (err.request.status === 429) {
            // HTTP 429 Too Many Requests
            this.$SegmentMessage.error(this, 'Requesting too frequently');
          } else {
            // Unknown error
            this.$SegmentMessage.error(this, 'Unknown error');
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
