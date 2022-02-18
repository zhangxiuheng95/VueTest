require('./style.css');
require('./lessstyle.less');
require('./sassstyle.scss');
// 下一行eslint所有规则失效
// eslint-disable-next-line

import './style.css'
const {demo} = require('./print')
demo();
console.log("这是入口文件");
// if (module.hot) {
//     module.hot.accept('./print.js',function(){//告诉webpack接受热替换HMR的模块
//         console.log('接受修改');
//         demo();
//     })
// }