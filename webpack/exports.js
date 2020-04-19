const config = require("./config");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin({
    disable: !config.openSpeedMeasurePlugin
});
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

let portfinder =require('portfinder')
portfinder.basePort = config.devServerPort
module.exports = {
    smp,
    config,
    portfinder,
    SpeedMeasurePlugin,
    BundleAnalyzerPlugin,
    _: require('lodash'),
    path: require("path"),
    chalk: require("chalk"),
    dartSass: require("sass"),
    webpack: require("webpack"),
    merge: require("webpack-merge"),
    isProd: process.env.NODE_ENV === 'production',
    WorkboxPlugin: require('workbox-webpack-plugin'),
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