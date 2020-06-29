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

    configureWebpack: {
        optimization: {
            splitChunks: {
                chunks: 'all', // 仅提取按需载入的module
                minSize: 30000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于3kb
                maxSize: 0, // 提取出的新chunk在两次压缩之前要小于多少kb，默认为0，即不做限制
                minChunks: 1, // 被提取的chunk最少需要被多少chunks共同引入
                maxAsyncRequests: 5, // 最大按需载入chunks提取数
                maxInitialRequests: 3, // 最大初始同步chunks提取数
                automaticNameDelimiter: '~', // 默认的命名规则（使用~进行连接）
                name: true,
                cacheGroups: { // 缓存组配置，默认有vendors和default
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
};
