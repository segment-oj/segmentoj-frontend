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
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
};
