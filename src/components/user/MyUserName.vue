<template>
  <div>
    {{username}}
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'MyUserName',
  data() {
    return {
      username: 'Loading'
    }
  },
  mounted() {
    this.$axios
      .get(apiurl('/user'))
      .then(res => {
        this.username = res.data.username;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>