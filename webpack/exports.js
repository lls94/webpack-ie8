const config = require("./config");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin({
    disable: !config.openSpeedMeasurePlugin
});
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = {
    smp,
    config,
    SpeedMeasurePlugin,
    BundleAnalyzerPlugin,
    _: require('lodash'),
    path: require("path"),
    chalk: require("chalk"),
    dartSass: require("sass"),
    webpack: require("webpack"),
    merge: require("webpack-merge"),
    portfinder: require('portfinder'),
    isProd: process.env.NODE_ENV === 'production',
    UglifyJsPlugin: require('uglifyjs-webpack-plugin'),
    ManifestPlugin: require("webpack-manifest-plugin"),
    FileManagerPlugin: require("filemanager-webpack-plugin"),
    MiniCssExtractPlugin: require("mini-css-extract-plugin"),
    LodashModuleReplacementPlugin: require('lodash-webpack-plugin'),
    CircularDependencyPlugin: require("circular-dependency-plugin"),
    FriendlyErrorsPlugin: require("friendly-errors-webpack-plugin"),
    FriendlyErrorsWebpackPlugin: require("friendly-errors-webpack-plugin"),
    DuplicatePackageCheckerPlugin: require("duplicate-package-checker-webpack-plugin")
};