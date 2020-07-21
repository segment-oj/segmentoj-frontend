<template>
    <div class="markdown-container">
        <div v-html="renderedContent" v-katex:auto></div>
    </div>
</template>

<script>
export default {
  name: 'MarkdownContainer',
  data() {
    return {
      renderedContent: null
    };
  },
  props: {
    content: String
  },
  mounted() {
    let content = this.content;
    content = content.replaceAll('\\', '\\\\');
    this.renderedContent = this.$marked(content);
  }
}
</script>