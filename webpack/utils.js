const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const { portfinder, chalk } = require('./exports')
const _ = require('lodash')
const path = require('path')
const color1 = [255, 245, 0]

function dealEntries(entries) {
    let entryBaseConfig = {
        // name:'index',
        ext: 'ts',
    }

    return _.map(entries, entry => {
        if (_.isString(entry)) {
            return _.assign({}, entryBaseConfig, {
                name: entry,
            })
        } else if (_.isObject(entry)) {
            return _.assign({}, entryBaseConfig, entry)
        }
    })
}

const projectConfig = require('../project.config')
projectConfig.entries = dealEntries(projectConfig.entries)

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
            const ext = _.get(entry, 'ext', 'ts')

            let _temp = [
                ...fixJsArr,
                path.resolve(config.pagesRoot, `./${name}/main.${ext}`), // 放到 最后一个
            ]

            _temp['initConfig'] = entry
            rtn[name] = _temp
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
                    )}  ${chalk.rgb(255, 167, 0)(entry[entry.length - 1])}`
                }),
            notes: [
                ...(config.ie8
                    ? [chalk.cyan('ie8无热更新功能，更改后请手动刷新')]
                    : []),
            ],
        }
    }),
}
