const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const { portfinder, chalk } = require('./exports')
const _ = require('lodash')
const path = require('path')
const projectConfig = require('../project.config')

const hrefColor = [0, 0, 204]
const color1 = [255, 245, 0]

let { fixJsArr = [] } = config

module.exports = {
    getHtmlWebpackPlugins(entriesConfig) {
        let rtn = []
        entriesConfig = entriesConfig || projectConfig.entries
        _.forEach(entriesConfig, entry => {
            const entryName = _.get(entry, 'name', entry)
            rtn.push(
                new HtmlWebpackPlugin({
                    template: path.resolve(
                        config.pagesRoot,
                        `./${entryName}/index.html`
                    ),
                    filename: `${entryName}.html`,
                    chunks: [entryName],
                })
            )
        })
        return rtn
    },
    getEntries: _.once(entriesConfig => {
        let rtn = {}
        entriesConfig = entriesConfig || projectConfig.entries
        _.forEach(entriesConfig, entry => {
            const name = _.get(entry, 'name', entry)
            rtn[name] = [
                ...fixJsArr,
                path.resolve(config.pagesRoot, `./${name}/main.ts`), // 放到 第一个
            ]
        })
        return rtn
    }),
    async getAvailablePorts() {
        let port = await portfinder.getPortPromise().then(port => port)
        return port
    },
    getFriendlyErrorsPluginConfig: _.once(function(port) {
        let entries = this.getEntries()
        return {
            messages: Object.keys(entries)
                .sort((next, prev) => next.length - prev.length)
                .map(key => {
                    let entry = entries[key]
                    return `${chalk.redBright(key)} ${chalk.rgb(...color1)(
                        '---->'
                    )} ${chalk.blueBright(
                        `http://localhost:${port}/${key}.html`
                    )}  ${
                        chalk.rgb(255, 167, 0)(entry[entry.length - 1])
                        // path
                        // .relative(__dirname, entries[key][0])
                        // .split(path.sep)
                        // .join('/')
                    }`
                }),
            notes: [
                ...(config.ie8
                    ? [chalk.cyan('ie8无热更新功能，更改后请手动刷新')]
                    : []),
            ],
        }
    }),
}
