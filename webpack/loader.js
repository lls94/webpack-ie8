// @ts-check
const { dartSass, isProd, MiniCssExtractPlugin, config } = require('./exports')

const cssBaseLoaderArr = [{
        // Creates `style` nodes from JS strings
        loader: isProd || config.ie8 ? MiniCssExtractPlugin.loader : 'style-loader'
    }, {
        // Translates CSS into CommonJS
        loader: 'css-loader'
    },
    {
        loader: 'postcss-loader'
    }
]

module.exports = {
    eslintLoader: {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
            fix: true,
        }
    },
    urlLoader: [{
        loader: 'url-loader',
        options: {
            limit: 4 *
                1024,
            esModule: false,
            name: 'images/[name].[ext]?v=[contenthash:4]'
        },
    }],
    cssLoader: [
        ...cssBaseLoaderArr
    ],
    sassLoader: [
        ...cssBaseLoaderArr,
        // Compiles Sass to CSS
        {
            loader: 'sass-loader',
            options: {
                implementation: dartSass,
            }
        }
    ],
    artTemplateLoader: [{
        loader: 'art-template-loader',
        options: {
            // art-template options (if necessary)
            // @see https://github.com/aui/art-template
            cache: true
        }
    }],
    babelLoader: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: true
        }
    }]
}