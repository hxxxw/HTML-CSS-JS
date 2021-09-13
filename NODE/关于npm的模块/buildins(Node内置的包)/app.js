const path = require('path') //path为Node的内置模块包
console.log(__dirname); //__dirname 当前文件所在的物理路径
console.log(path.resolve(__dirname, '../')); //path.resolve() 解析一个路径