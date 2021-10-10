let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK'); //执行成功
        // reject("err");
    }, 1000)
})

p.then(value => {
    console.log(111);
}).then(value => {
    console.log(222);
    throw '失败了'
}).then(value => {
    console.log(333);
}).catch(reason => {   //当出现错误(不管在哪个环节) 会跳过then 直接执行catch
    console.warn(reason);
})