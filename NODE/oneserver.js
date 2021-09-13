// 1、使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http
const res = require('express/lib/response');
let http = require('http');
// 2、使用 http.createServer()方法创建服务器，并使用listen方法绑定800端口。函数通过 request, response 参数来接收和响应数据
//    function createServer(requestListener?: RequestListener): Server;
var xx = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('hello Http');
    // createServer函数会返回一个server对象 servser对象中有个listen方法用于指定端口号
}).listen(800, () => {
    console.log("服务已启动，800端口监听中。。。");
})