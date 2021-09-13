const lodash = require('lodash')

function myChunk(arr) {
    let changearr = lodash.chunk(arr, 2)
    return changearr
}

module.exports = myChunk //模块对外暴露的方法