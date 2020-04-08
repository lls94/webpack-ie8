import x from './template/test.tpl'

document.getElementsByTagName('body')[0].innerHTML = x({
    test: [1, 2, 3, 4],
})

new Promise(function(resolve) {
    resolve(123)
}).then(function(res) {
    alert(res)
})
