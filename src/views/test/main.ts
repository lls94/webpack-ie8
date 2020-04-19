// alert(Math.pow(3,2) === 9) //true
// alert(Math.round(4.5)===Math.round(5.49)) // true
// alert(Math.floor(5.9) === Math.ceil(4.1)) //true
// alert(Math.abs(-1.234)===Math.abs(1.234)) // true
import './test.scss'
document.body.innerHTML= require('./template/test.tpl')()

// console.log(1)
// setTimeout(() => {
//     console.log(2)
// }, 0);
// new Promise((resolve)=>{
//     console.log(3)
//     resolve()
// }).then(()=>{
//     console.log(4)
// }).then(()=>{
//     console.log(5)
// })
// console.log(6)

var x = 5;
console.log(x++ + ++x)
console.log(++x * --x)
console.log(x)