<template>
  <div></div>
</template>

<script>
export default {
  name: 'UserLogout',
  methods: {
    logout() {
      this.$store.commit('userLogout');
      this.$info.success('Logged out');
      this.$router.push('/');
      this.$store.state.user.showlogout = false;
    }
  }, 
  mounted() {
    this.logout();
  }
};
</script>
