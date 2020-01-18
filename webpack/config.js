const path = require('path');
module.exports = {
    quiet: true,
    openSpeedMeasurePlugin: false, // 是否使用测速插件
    // fixJsArr: ['es5-polyfill'], //京东的，在ie7下有问题
    // fixJsArr: ['es5-shim/es5-shim', 'es5-shim/es5-sham', 'json3'],
    // fixJsArr:['core-js'],
    ie8: true,
    hot: false, // 是否支持ie8
    extensions: ['.js', '.ts'],
    deleteDirsOnStart: [path.resolve(__dirname, "../dist")],
    devServerPort: 9000, //服务器端口号
    openEslintLoader: true, // 是否打开eslint
};