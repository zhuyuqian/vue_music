// vue.config.js
module.exports = {
    productionSourceMap: false,
    publicPath: '/',
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/a': {
                target: 'http://mobilecdn.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/a': ''}
            },
            '/c':{
                target: 'http://m.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/c': ''}
            },
            '/b':{
                target: 'https://wwwapi.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/b': ''}
            },
            '/d':{
                target: 'http://mvsearch.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/d': ''}
            },
            '/e':{
                target: 'https://www.kugou.com/',
                changeOrigin: true,
                pathRewrite: {'^/e': ''}
            }
        }
    }
}