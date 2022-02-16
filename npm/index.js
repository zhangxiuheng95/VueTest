
const $=require('jquery');//获取node_modules下模块js
//console.log($);

let nums=require('./js/foo.js');
console.log(nums);

const fun=require('./js/func');
console.log(fun(nums));