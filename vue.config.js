module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' // CHANGE TO YOUR PRODUCTION PATH
    : '/',

  pages: {
    index: {
      entry: 'src/main.js',
      title: 'SegmentOJ', // CHANGE HERE
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index',],
    },
  },

  configureWebpack: {
    externals: {
      'axios': 'axios',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vue-template-compiler': 'VueTemplateCompiler',
      'dompurify': 'DOMPurify',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
      'highlight.js': 'hljs',
      'codemirror': 'CodeMirror',
      'katex': 'katex',
      'remarkable': 'remarkable',
    },
  },
};
