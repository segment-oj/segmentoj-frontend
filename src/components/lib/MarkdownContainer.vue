<template>
    <div class="markdown-container">
        <div v-html="content" v-katex:auto v-highlight></div>
    </div>
</template>

<script>
export default {
  name: 'MarkdownContainer',
  data() {
    return {};
  },
  props: {
    content: String
  }
}
</script>