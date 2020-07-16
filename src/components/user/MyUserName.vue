<template>
  <div>
    {{this.$store.state.user.username}}
  </div>
</template>

<script>
export default {
  name: 'MyUserName'
};
</script>