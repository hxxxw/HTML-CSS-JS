class Promise {
    // 构造方法
    constructor(executor) {
        // 添加属性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        this.callbacks = []; //可能会指定多个回调 使用数组保存
        // 保存当前this指向的值
        const self = this;

        //resolve函数
        function resolve(data) {
            // 判断状态，只能修改一次的状态
            if (self.PromiseState !== 'pending') return;
            // 1、修改对象状态 【PromiseState】
            self.PromiseState = "resolved";
            // 2、设置对象结果值 【PromiseResult】
            self.PromiseResult = data;
            // 异步任务下 调用成功的回调函数
            // if (self.callback.value) {
            //     self.callback.value(data);
            // }
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    // forEach() 方法对数组的每个元素执行一次提供的函数
                    item.value(data);
                    // console.log(data);
                })
            });
        }
        //reject函数
        function reject(data) {
            // 判断状态，只能修改一次的状态
            if (self.PromiseState !== 'pending') return;
            // 1、修改对象状态 【PromiseState】
            self.PromiseState = "rejected";
            // 2、设置对象结果值 【PromiseResult】
            self.PromiseResult = data;
            // 异步任务下 调用失败的回调函数
            // if (self.callback.reason) {
            //     self.callback.reason(data);
            // }
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    // forEach() 方法对数组的每个元素执行一次提供的函数
                    item.reason(data);
                })
            });
        }
        //用try catch 在executor 执行的时候能接受throw抛出异常并改变对象的状态和值
        try {
            //同步调用 executor执行器函数
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    // then方法
    then(value, reason) {
        // 保存当前this指向的值
        const self = this;
        // 如果未传递值，也要保证能正常往下运行
        if (typeof value !== "function") {
            value = value => { value };//ES6花括号简写 === value => {return value}
        }
        //如果只传递了第一个值 要设置异常穿透
        if (typeof reason !== 'function') {
            reason = reason => {
                throw reason;
            }
        }
        // 设置then()方法的返回数据
        return new Promise((resolve, reject) => {
            // 封装同步任务 成功/失败的回调
            function callBack(type) {
                try {
                    // 接收对象状态的结果
                    let result = type(self.PromiseResult);
                    //判断是否为Promise对象
                    if (result instanceof Promise) {
                        // 如果返回的是promise对象 在根据里层的promise判断
                        result.then(v => {
                            // 如果返回的结果为成功，改变then()方法返回的Promise对象的状态和值
                            resolve(v);
                        }, r => {
                            // 如果返回的结果为失败，改变then()方法返回的Promise对象的状态和值
                            reject(r);
                        }
                        )
                    } else {
                        //如果返回的不是Promise对象，返回结果状态为成功，值为result
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }
            //根据成功状态 调用回调函数
            if (this.PromiseState === "resolved") {
                setTimeout(() => {
                    callBack(value);
                });
            }
            //根据失败状态 调用回调函数
            if (this.PromiseState === "rejected") {
                setTimeout(() => {
                    callBack(reason);
                });
            }
            // 如果有异步任务PromiseState值并不会改变 先用callback保存起来，在对象中再使用
            if (this.PromiseState === "pending") {
                // 异步任务下 可能指定多个回调 用push()放进数组里
                this.callbacks.push(
                    {
                        //function (data) 这个data只是形参 具体会在forEach内被调用
                        value: function () {
                            callBack(value);
                        },
                        reason: function () {
                            callBack(reason);
                        }
                    }
                )
            }
        })
    }
    //catch方法
    catch(reason) {
        // console.log(this);
        // 在catch方法里面调用当前Promise对象里面的then方法
        // 而then方法会返回一个promise对象，所以catch方法也会返回promise对象
        return this.then(undefined, reason);
    }

    // resolve方法
    static resolve(value) {
        // resolve方法会返回一个Promise对象
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                })
            } else {
                resolve(value);
            }
        })
    }

    // reject方法
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    //all方法
    static all(promises) {
        return new Promise((resolve, reject) => {
            // 定义变量
            let count = 0;
            let arr = [];
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(
                    v => {
                        arr[i] = v;
                        count++;
                        // 只有当所有promise对象都为成功后才能改变状态
                        if (count == promises.length) {
                            resolve(arr);
                        }
                    }, r => {
                        reject(r);
                    }
                )
            }
        })
    }
    //race方法
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                //谁先运行，谁就能先决定结果
                promises[i].then(
                    v => { resolve(v) }, r => { reject(r) }
                )
            }
        })
    }

}
/*未封装成class之前
// 声明构造函数
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = []; //可能会指定多个回调 使用数组保存
    // 保存当前this指向的值
    const self = this;

    //resolve函数
    function resolve(data) {
        // 判断状态，只能修改一次的状态
        if (self.PromiseState !== 'pending') return;
        // 1、修改对象状态 【PromiseState】
        self.PromiseState = "resolved";
        // 2、设置对象结果值 【PromiseResult】
        self.PromiseResult = data;
        // 异步任务下 调用成功的回调函数
        // if (self.callback.value) {
        //     self.callback.value(data);
        // }
        setTimeout(() => {
            self.callbacks.forEach(item => {
                // forEach() 方法对数组的每个元素执行一次提供的函数
                item.value(data);
                // console.log(data);
            })
        });
    }
    //reject函数
    function reject(data) {
        // 判断状态，只能修改一次的状态
        if (self.PromiseState !== 'pending') return;
        // 1、修改对象状态 【PromiseState】
        self.PromiseState = "rejected";
        // 2、设置对象结果值 【PromiseResult】
        self.PromiseResult = data;
        // 异步任务下 调用失败的回调函数
        // if (self.callback.reason) {
        //     self.callback.reason(data);
        // }
        setTimeout(() => {
            self.callbacks.forEach(item => {
                // forEach() 方法对数组的每个元素执行一次提供的函数
                item.reason(data);
            })
        });
    }
    //用try catch 在executor 执行的时候能接受throw抛出异常并改变对象的状态和值
    try {
        //同步调用 executor执行器函数
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

// 为自定义的Promise添加then方法
// prototype属性向对象添加属性和方法。
Promise.prototype.then = function (value, reason) {
    // 保存当前this指向的值
    const self = this;
    // 如果未传递值，也要保证能正常往下运行
    if (typeof value !== "function") {
        value = value => { value };//ES6花括号简写 === value => {return value}
    }
    //如果只传递了第一个值 要设置异常穿透
    if (typeof reason !== 'function') {
        reason = reason => {
            throw reason;
        }
    }
    // 设置then()方法的返回数据
    return new Promise((resolve, reject) => {
        // 封装同步任务 成功/失败的回调
        function callBack(type) {
            try {
                // 接收对象状态的结果
                let result = type(self.PromiseResult);
                //判断是否为Promise对象
                if (result instanceof Promise) {
                    // 如果返回的是promise对象 在根据里层的promise判断
                    result.then(v => {
                        // 如果返回的结果为成功，改变then()方法返回的Promise对象的状态和值
                        resolve(v);
                    }, r => {
                        // 如果返回的结果为失败，改变then()方法返回的Promise对象的状态和值
                        reject(r);
                    }
                    )
                } else {
                    //如果返回的不是Promise对象，返回结果状态为成功，值为result
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        }
        //根据成功状态 调用回调函数
        if (this.PromiseState === "resolved") {
            setTimeout(() => {
                callBack(value);
            });
        }
        //根据失败状态 调用回调函数
        if (this.PromiseState === "rejected") {
            setTimeout(() => {
                callBack(reason);
            });
        }
        // 如果有异步任务PromiseState值并不会改变 先用callback保存起来，在对象中再使用
        if (this.PromiseState === "pending") {
            // 异步任务下 可能指定多个回调 用push()放进数组里
            this.callbacks.push(
                {
                    //function (data) 这个data只是形参 具体会在forEach内被调用
                    value: function () {
                        callBack(value);
                    },
                    reason: function () {
                        callBack(reason);
                    }
                }
            )
        }
    })
}

// 为自定义的Promise添加catch方法
Promise.prototype.catch = function (reason) {
    // console.log(this);
    // 在catch方法里面调用当前Promise对象里面的then方法
    // 而then方法会返回一个promise对象，所以catch方法也会返回promise对象
    return this.then(undefined, reason);
}

// 为自定义的Promise添加resolve方法
// 注意resolve方法为函数对象，不是实例对象
Promise.resolve = function (value) {
    // resolve方法会返回一个Promise对象
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        } else {
            resolve(value);
        }
    })
}

// 为自定义的Promise添加reject方法
// 注意reject方法为函数对象，不是实例对象 reject方法的返回状态永远都是错的
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}

// 为自定义的Promise添加all方法
// all方法:如果传入的promise对象状态全为成功，返回的状态为成功，值为传入值的数组形式返回
//         如果传入的有一个状态为失败，返回的状态为失败，值为那个错误对象的值
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        // 定义变量
        let count = 0;
        let arr = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(
                v => {
                    arr[i] = v;
                    count++;
                    // 只有当所有promise对象都为成功后才能改变状态
                    if (count == promises.length) {
                        resolve(arr);
                    }
                }, r => {
                    reject(r);
                }
            )
        }
    })
}

// 为自定义的Promise添加race方法
// race方法：返回根据第一个传入的对象的状态和值改变 如果第一个值是异步任务，则会给同步任务让路
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            //谁先运行，谁就能先决定结果
            promises[i].then(
                v => { resolve(v) }, r => { reject(r) }
            )
        }
    })
}
*/