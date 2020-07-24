<template>
  <div>
    <MarkdownEditor v-model="content" />
    <p> {{content}} </p>
  </div>
</template>

<script>
import MarkdownEditor from './../lib/MarkdownEditor.vue';

export default {
  name: 'ProblemEdit',
  data() {
    return {
      content: 'Hey there!'
    };
  },
  components: {
    MarkdownEditor
  }
};
</script>