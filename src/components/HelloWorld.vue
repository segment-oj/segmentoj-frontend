<template>
  <div>
    HelloWorld loaded. $$a_b$$<br/>
    <span>{{ $route.params.id }}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
