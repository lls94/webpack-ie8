const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('./config')
const _ = require("lodash");
const path = require("path")
const projectConfig = require('../project.config')

let { fixJsArr = [] } = config

module.exports = {
    getHtmlWebpackPlugins(entriesConfig) {
        let rtn = []
        entriesConfig = entriesConfig || projectConfig.entries
        _.forEach(entriesConfig, entry => {
            const entryName = _.get(entry, 'name', entry)
            rtn.push(new HtmlWebpackPlugin({
                template: path.resolve(projectConfig.pagesRoot, `./${entryName}/index.html`),
                filename: `${entryName}.html`,
                chunks: [entryName]
            }))
        })
        return rtn
    },
    getEntries(entriesConfig) {
        let rtn = {}
        entriesConfig = entriesConfig || projectConfig.entries
        _.forEach(entriesConfig, entry => {
            const name = _.get(entry, 'name', entry)
            rtn[name] = [...fixJsArr, path.resolve(projectConfig.pagesRoot, `./${name}/main.ts`)]
        })
        return rtn
    }
};