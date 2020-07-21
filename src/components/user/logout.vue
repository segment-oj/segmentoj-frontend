<template>
  <div></div>
</template>

<script>
import apiurl from '../../apiurl';
import goback from '../../goback';

export default {
  name: 'UserLogout',
  mounted() {
    this.$axios
      .delete(apiurl('/user'))
      .then(() => {
        this.$store.commit('userLogout');
        this.$message({
          message: 'Logged out',
          type: 'success'
        });
        this.$router.push('/');
      })
      .catch(err => {
        if (err.request.status === 401) {
          this.$message.error('Not logged in');
        } else if (err.request.status === 429) {
          this.$message.error('Requesting too frequently');
        } else {
          this.$message.error('Unkown error');
        }
        goback(this);
      });
  }
};
</script>