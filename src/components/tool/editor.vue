<template>
  <codeMirror />
</template>

<script>
import codeMirror from './../lib/editor.vue';

export default {
  data() {
    return {
      source: null
    };
  },
  components: {
    codeMirror
  }
};
</script>
