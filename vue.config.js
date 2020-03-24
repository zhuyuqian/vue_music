const path = require('path');
const resolve = dir => path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
module.exports = {
    productionSourceMap: false,
    publicPath: '/',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/color.less')
            ]
        }
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/a': {
                target: 'http://mobilecdn.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/a': ''}
            },
            '/c': {
                target: 'http://m.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/c': ''}
            },
            '/b': {
                target: 'https://wwwapi.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/b': ''}
            },
            '/d': {
                target: 'http://mvsearch.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/d': ''}
            },
            '/e': {
                target: 'https://www.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/e': ''}
            }
        }
    }
}