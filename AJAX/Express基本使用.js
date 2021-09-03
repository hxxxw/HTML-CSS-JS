// Express是基于Node.js的Web 服务端框架

// 1、引入express 
const experss = require('express');
// 2、创建应用对象
const app = experss();
// 3、创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/', (request, response) => {

    // 设置响应
    response.send("这是返回结果");

})
// 4、监听端口启动服务
app.listen(800, () => {
    console.log("服务已启动，8000端口监听中。。。");
})