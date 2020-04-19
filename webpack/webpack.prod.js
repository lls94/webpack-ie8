// @ts-check
let {
    smp,
    merge,
    webpack,
    ManifestPlugin,
    BundleAnalyzerPlugin,
} = require('./exports')

let prodConfig = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new ManifestPlugin({
            writeToFileEmit: true,
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 1994,
            defaultSizes: 'gzip',
        }),
        new webpack.BannerPlugin({
            banner: `hash:[hash], chunkhash:[chunkhash], time:${new Date().toLocaleDateString()}`, // 其值为字符串，将作为注释存在  name:[name], filebase:[filebase], query:[query], file:[file], 
            raw: false, // 如果值为 true，将直出，不会被作为注释
            entryOnly: false, // 如果值为 true，将只在入口 chunks 文件中添加
            // test: string | RegExp | Array,
            // include: string | RegExp | Array,
            // exclude: string | RegExp | Array
        }),
    ],
}

// @ts-ignore
module.exports = smp.wrap(merge(prodConfig, require('./webpack.common')))
