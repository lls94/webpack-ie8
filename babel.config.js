console.log(require('./common.config'))

let presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: "usage",
            corejs: { version: 3 },
            modules: 'umd' //"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false，默认为"auto"
            // loose: true
        }
    ],
    ["@babel/typescript"]
]

let plugins = [
    "lodash",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    // [
    //     // 笔者为了兼容IE8才用了这个插件，代价是不能tree shaking
    //     // 没有IE8兼容需求的同学可以把这个插件去掉
    //     '@babel/plugin-transform-modules-commonjs' //IE8兼容
    // ]
]

module.exports = function (api) {
    api.cache(false);
    return {
        presets,
        plugins
    }
};