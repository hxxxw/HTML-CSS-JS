window.onload = function () {
    let bgslides = document.querySelector('body');
    let tds = document.querySelectorAll('td');
    let time = document.querySelector('.time');
    const inputTime = +new Date('2021-8-30 0:00:00');
    let nowTime = +new Date();
    //随机数 函数
    function rand(m, n) {
        return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
    }
    // 重构时间显示
    function getDate() {
        var now = new Date(); // 如果里面没有跟任何参数，则会创建系统当前时间 要调用Date内的函数方法必须先创建对象
        var year = now.getFullYear();//获取当前的年份
        var month = now.getMonth() + 1; // getMonth() 为0~11 所以需要+1 才能获取当前月份
        var nowdate = now.getDate();//获取 几号
        var day = now.getDay();//当前是周几 周一返回1 周六返回6 注意周日返回0
        var datearr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var hours = now.getHours();  //返回当前小时
        hours = hours < 10 ? '0' + hours : hours;
        var minute = now.getMinutes(); //返回当前分钟
        minute = minute < 10 ? '0' + minute : minute;
        var seconds = now.getSeconds(); //返回当前秒
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return year + '年' + month + '月' + nowdate + '号 ' + datearr[day];
    }
    let weekTimeDiffer = -parseInt((inputTime - nowTime) / 1000 / 60 / 60 / 24 / 7 - 1);
    console.log(weekTimeDiffer);
    let desktop = "url(D:/HTML/综合案例/schedule/img/bg";
    let Live = "url(img/bg";
    bgslides.style.background = desktop + rand(1, 5) + ".jpg)";
    // 背景切换
    setInterval(() => {
        bgslides.style.background = desktop + rand(1, 5) + ".jpg)";
    }, 20000);
    // 设置鼠标经过样式
    for (let i = 0; i < tds.length; i++) {
        tds[i].classList.add('cursor');
    }
    // 当前第几周
    time.innerHTML = getDate() + ' 当前是第' + weekTimeDiffer + '周';
}