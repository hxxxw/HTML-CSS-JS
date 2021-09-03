const { request, response } = require('express');
const express = require('express');

const app = express();

app.get('/home', (request, response) => {
    // 响应一个页面
    response.sendFile(__dirname + '/同源策略.html');
});

app.get('/data', (request, response) => {
    response.send("用户数据");
})

app.listen(900, () => {
    console.log("900端口已启动...");
})