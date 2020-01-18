// @ts-check
let {
    path,
    chalk,
    config,
    merge,
    FriendlyErrorsPlugin,
    smp,
    CircularDependencyPlugin,
    webpack,
    _
} = require('./exports');

let devConfig = {
    ...(config.hot ? {} : {
        watchOptions: {
            ignored: /node_modules/,
        },
    }),
    devServer: {
        inline: config.hot, // true 内联模式 一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台   false 使用 <iframe> 标签，包含了关于构建的消息
        port: config.devServerPort,
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        quiet: config.quiet,
        overlay: {
            warnings: true,
            errors: true,
        },
        hot: config.hot,
        // writeToDisk: true
    },
    devtool: 'inline-source-map',
    plugins: [
        ...(config.hot ? [new webpack.HotModuleReplacementPlugin()] : []),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `app is running here http://localhost:${config.devServerPort}`,
                ],
                notes: [...(config.ie8 ? [chalk.cyan('ie8无热更新功能，更改后请手动刷新')] : [])],
            },
            onErrors: function (severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,

            // add formatters and transformers (see below)
            additionalFormatters: [],
            additionalTransformers: [],
        }),
        new CircularDependencyPlugin({
            // 循环引用检测
            exclude: /node_modules/,
            include: /src/,
            failOnError: false,
            allowAsyncCycles: false,
            cwd: process.cwd(),
            // : webpackModuleRecord
            onDetected({ module, paths, compilation }) {
                // compilation.hooks.finishModules
                // console.log(module.reasons,13999);
                _.forEach(paths, (path, index, ele) => {
                    ele[index] = chalk.yellow(path.split('\\').join('/'));
                });
                let msg =
                    chalk.rgb(
                        251,
                        62,
                        68
                    )('存在循环引用 (循环引用不能立即调用) \n') +
                    paths.join(' -> ');
                if (this.failOnError) {
                    compilation.errors.push(new Error(msg));
                } else {
                    FriendlyNotes.indexOf(`${msg}`) === -1 &&
                        FriendlyNotes.push(`${msg}`);
                }
            },
        }),
    ],
};

module.exports = () => {
    return new Promise((resolve, reject) => {
        resolve(smp.wrap(merge(require('./webpack.common'), devConfig)));
    });
};