<template>
  <div class="markdown-container">
    <div class='md-renderd-content' v-html="renderd_content"></div>
  </div>
</template>

<script>
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';

import rkatex from 'remarkable-katex';
import 'katex/dist/katex.min.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';
import DOMPurify from 'dompurify';

export default {
  name: 'MarkdownContainer',
  data() {
    return {
      remark: null
    };
  },
  props: {
    content: String,
    allowHTML: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.remark = new Remarkable({
      highlight: (code, lang) => {
        if (lang == 'text' || lang == 'plain') {
          return code;
        }
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, code).value;
          } catch (err) {
            console.warn(`Failed to highlight code with type '${lang}'`);
          }
        }
        try {
          return hljs.highlightAuto(code).value;
        } catch (err) {
          console.warn('Failed to highlight code without any type.');
        }
        return '';
      }

    });
    this.remark.inline.ruler.enable(['mark']);
    this.remark.use(rkatex).use(linkify);
  },
  computed: {
    renderd_content() {
      let content = this.content;
      content = this.remark.render(this.content);

      if (!this.allowHTML) {
        content = DOMPurify.sanitize(content);
      }

      return content;
    },
  },
};
</script>
