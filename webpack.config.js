'use strict'
const path = require('path');
const resolve = dir => path.join(__dirname, '.', dir);

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src')
        }
    }
}