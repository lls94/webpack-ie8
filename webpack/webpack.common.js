// @ts-check
let {
    MiniCssExtractPlugin,
    DuplicatePackageCheckerPlugin,
    UglifyJsPlugin,
    FileManagerPlugin,
    LodashModuleReplacementPlugin,
    config,
    isProd,
    webpack,
    WorkboxPlugin,
} = require('./exports')

const path = require('path')

const loaderConfig = require('./loader')

let { getHtmlWebpackPlugins, getEntries } = require('./utils')

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: getEntries(),
    output: {
        filename: config.outputFileName,
        path: config.outputPath,
    },
    resolve: {
        extensions: config.extensions,
        symlinks: false,
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@public': path.resolve(__dirname, '../src/public'), // 公用部分，template模板
            '@pages': path.resolve(__dirname, '../src/pages'), // 页面
            '@images': path.resolve(__dirname, '../src/images'), // 图片
            '@config': path.resolve(__dirname, '../src/config'), // 配置
            '@utils': path.resolve(__dirname, '../src/utils'), // 工具类
            '@components': path.resolve(__dirname, '../src/components'), // 公共组件库
            '@lib': path.resolve(__dirname, '../src/lib'), // js库
        },
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: !isProd,
                uglifyOptions: {
                    ie8: config.ie8,
                    ...(isProd
                        ? {
                              compress: {
                                  drop_console: isProd && !config.debug,
                                  drop_debugger: isProd && !config.debug,
                                  ...(isProd && !config.debug
                                      ? {}
                                      : { pure_funcs: ['console.log'] }),
                              },
                          }
                        : {}),
                },
            }),
        ],
    },
    // externals: ["es5-polyfill"],
    module: {
        rules: [
            ...(config.openEslintLoader ? [loaderConfig.eslintLoader] : []), //eslint-loader
            {
                test: /\.(ts|js)x?$/,
                // exclude: /node_modules\/(?!(lodash-es)\/).*/,
                include: [
                    path.resolve(__dirname, '../node_modules/art-template'),
                    path.resolve(__dirname, '../src/'),
                ],
                use: loaderConfig.babelLoader,
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: loaderConfig.urlLoader,
            },
            {
                test: /\.css$/i,
                use: loaderConfig.cssLoader,
            },
            {
                test: /\.s[ac]ss$/i,
                use: loaderConfig.sassLoader,
            },
            {
                test: /\.(art|tpl)$/,
                use: loaderConfig.artTemplateLoader,
            },
        ],
    },
    plugins: [
        new FileManagerPlugin({
            onStart: [
                {
                    delete: config.deleteDirsOnStart || [],
                },
            ],
        }),
        isProd
            ? new webpack.HashedModuleIdsPlugin()
            : new webpack.NamedModulesPlugin(),
        ...getHtmlWebpackPlugins(),
        ...(isProd || config.ie8 ? [new MiniCssExtractPlugin()] : []), //提取css
        new LodashModuleReplacementPlugin(),
        new DuplicatePackageCheckerPlugin(), //检测重复依赖
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
}
