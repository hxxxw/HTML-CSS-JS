# 如何改变Promise的状态
    1、resolve(value) 将pending改为resolved
    2、reject(reason) 将pending改为rejected
    3、throw抛出异常  将pending改为rejected

# 一个Promise指定多个成功/失败回调函数都会调用吗 [多个then()]
    当promise改变为对应状态时会调用 

# Promise.then()返回的新promise的结果状态由什么决定
    由 then()指定的回调函数执行的结果决定 
    具体为：
        1、如果抛出异常，结果(新promise)变为rejected状态，reason为抛出的异常
        2、如果返回的结果是非promise的任意值，新promise变为resolve，value为返回的值
        3、如果返回的是另外一个新promise，那么新的promise结果会为返回的结果

# 通过promise的then()返回一个新的promise 在then()里面继续创建promise 从而形成链式调用