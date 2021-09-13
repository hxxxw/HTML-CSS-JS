// Node.js 异步编程的直接体现就是回调, 异步编程依托于回调来实现. 回调函数在完成任务后就会被调用
// 回调函数一般作为函数的最后一个参数出现
// 例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。
// 这样在执行代码时就没有阻塞或等待文件 I / O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

// 同步阻塞代码
var fs = require('fs');  //fs 文件系统
var data = fs.readFileSync('./NODE/回调函数测试文本.txt'); //fs模块下的同步读取函数

console.log(data.toString());
console.log("程序执行结束");
console.log("*****************");

// 异步非阻塞代码
fs.readFile('./NODE/回调函数测试文本.txt', function (err, data2) { //fs模块下的同步读取函数
    if (err) {    //当正常读取时，err参数为null，data参数为读取到的String
        return console.error(err);
    }
    console.log(data2.toString());
})
console.log("程序执行结束");