// @ts-check
let {
    smp,
    merge,
    webpack,
    ManifestPlugin,
    BundleAnalyzerPlugin
} = require("./exports");

let prodConfig = {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new ManifestPlugin({
            writeToFileEmit: true
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 1994,
            defaultSizes: 'gzip'
        })
    ]
};

module.exports = smp.wrap(merge(require("./webpack.common"), prodConfig));