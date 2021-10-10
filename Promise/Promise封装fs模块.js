const { resolve } = require('path')

/*
* 封装一个mineReadFile 读取文件内容
* 参数：path 文件路径
* 返回：Promise对象
*/
function mineReadFile(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        })
    })
}

// 由于返回的是Promise对象 能直接使用then()
mineReadFile('./基础.md').then(
    value => {
        console.log(value);
    },
    reason => {
        console.log(reason);
    }
)