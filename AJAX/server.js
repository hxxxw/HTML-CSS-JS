// 1、引入express 
const { response } = require('express');
const experss = require('express');
const { request } = require('http');
const { send } = require('process');

// 2、创建应用对象
const app = experss();

// 3、创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/server', (request, response) => {
    // 设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    response.send("Hello ajax");
})
app.post('/server', (request, response) => {
    // 设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    response.send("Hello ajax IN POST");
})
// 接收JSON
app.all('/json-server', (request, response) => {
    // 设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    // response.send("Hello JSON !!!");
    // 响应一个数据
    const data = {
        name: "xianghuang"
    };
    // send()方法只能接收字符串和buffer 需要将对象进行字符串转换
    let str = JSON.stringify(data);
    response.send(str);
})
// 针对IE缓存问题
app.get('/ie', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('hello Ieeeee');
})
// 延时响应
app.get('/delay', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        response.send('延时响应效果');
    }, 3000)
})

// axios 服务
app.all('/axios-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: "xianghuang"
    };
    let str = JSON.stringify(data);
    response.send(str);
})
// fetch 服务
app.all('/fetch-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: "fetchfetchfetchfetch"
    };
    let str = JSON.stringify(data);
    response.send(str);
})
// JSONP 用户名是否存在检测
app.all('/jsonp-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: "fetchfetchfetchfetch",
        age: 132,
        msg: '用户名已经存在'
    };
    // 将数据转换字符串
    let str = JSON.stringify(data);
    // 返回script能处理的结果
    response.end(`hendle(${str})`);
})
app.all('/cors-server', (request, response) => {
    // 通过添加响应头实现跨域
    //"Access-Control-Allow-Origin", "*"允许所有域名的脚本访问该资源
    response.setHeader("Access-Control-Allow-Origin", "*");
    //允许上传自定义请求头 服务器把允许浏览器访问的头放入白名单
    response.setHeader("Access-Control-Allow-Headers", "*");
    //首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法
    response.setHeader("Access-Control-Allow-Method", "*");
    response.send("hello cors");
})


// 4、监听端口启动服务
app.listen(800, () => {
    console.log("服务已启动，800端口监听中。。。");
})