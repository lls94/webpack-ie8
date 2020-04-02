const path = require("path")
module.exports = {
    root: path.resolve(__dirname, './'),
    pagesRoot: path.resolve(__dirname, './src/views'),
    entries: [
        'index',
        'pay',
        'test',
        // {
        //     name: 'pay'
        // }
    ]
}