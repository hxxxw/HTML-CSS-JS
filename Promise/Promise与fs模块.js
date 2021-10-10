const fs = require('fs');

// 回调函数形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果有错直接抛出
//     if (err) throw err;
//     console.log(data.toString());
// })

// Promise形式
let p = new Promise((resolve, reject) => {
    fs.readFile('./基础.md', (err, data) => {
        // 如果有错直接抛出
        if (err) reject(err);
        // 如果成功
        resolve(data.toString());
    })
});
p.then(value => {
    console.log(value);
}, reason => {
    console.log(reason);
})