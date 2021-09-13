package.json 中scripts脚本
    添加格式 "对象": "内容(注意路径)"  内容同时运行两个js脚本 &为并行 &&为串行
    使用{npm run 对象} 运行  start、test为特殊对象 不需要加run就能运行

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。
    通过 npm_package_ 前缀，npm脚本可以拿到 package.json 里面的字段。 只能用npm运行 用node拿不到值
    通过环境变量 process.env 对象，拿到 package.json 的字段值.具体为：process.env.npm_package_字段