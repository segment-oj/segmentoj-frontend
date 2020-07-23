<template>
    <div class="markdown-container">
        <div v-html="renderedContent" v-katex:auto></div>
    </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';
import marked from 'marked';
import sfconfig from './../../sfconfig';
import DOMPurify from 'dompurify';

marked.setOptions({
  ...sfconfig.markdown,
  highlight: ((code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    }
  }),
  renderer: new marked.Renderer(),
});

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
    content = marked(content);
    let sanitize = !(this.allowHTML);
    this.renderedContent = sanitize ? DOMPurify.sanitize(content) : content;
  },
  components: {

  }
}
</script>