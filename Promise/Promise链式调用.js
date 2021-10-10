let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000)
}).then(value => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK1');
        }, 1000)
    })
    // return new Promise(() => { }) 使用这个中断Promise链条
}).then(value => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK2');
        }, 1000)
    })
}).then(value => {
    console.log(value);
})

// 想要中断Promise链条 只要返回一个pending状态的Promise对象