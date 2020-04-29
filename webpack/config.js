const path = require('path')
module.exports = {
    debug:true,
    root: path.resolve(__dirname, './'),
    outputPath: path.resolve(__dirname, '../dist'),
    outputFileName: '[name].js?v=[hash:6]',
    pagesRoot: path.resolve(__dirname, '../src/views'),
    deleteDirsOnStart: [path.resolve(__dirname, '../dist')],
    quiet: true,
    openSpeedMeasurePlugin: false, // 是否使用测速插件
    // fixJsArr: ['es5-polyfill'], //京东的，在ie7下有问题
    // fixJsArr: ['es5-shim/es5-shim', 'es5-shim/es5-sham', 'json3'],
    // fixJsArr:['core-js'],
    ie8: true, // 是否支持ie8
    hot: false,
    extensions: ['.js', '.ts'],
    devServerPort: 9000, //服务器端口号
    openEslintLoader: true, // 是否打开eslint
}
