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
    content: String,
    allowHTML: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    let content = this.content;
    content = content.replaceAll('\\', '\\\\'); // for KaTeX
    content = this.$marked(content);
    let sanitize = !(this.allowHTML);
    this.renderedContent = sanitize ? this.$DOMPurify.sanitize(content) : content;
  }
}
</script>