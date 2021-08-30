window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // var lis = focus.querySelector('ul').querySelectorAll('li');
    // 获取当前focus宽度 
    var focus_width = focus.offsetWidth;
    var key = 0;
    timer = setInterval(function () {
        key++;
        var translatex = -key * focus_width;
        // 给ul添加图片过渡效果
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 由于ul使用了图片过渡 要等到过渡完成在进行判断是否到结尾 用到 transitionend事件
    ul.addEventListener('transitionend', function () {
        // 在每次过渡完 都会触发事件 判断
        // 注：切换页面会导致transitionend无法触发 所以key >= 3
        if (key >= 3) {
            key = 0;
            ul.style.transition = 'none';
            // 在定时器中translatex的值已超长度 需要重新计算赋值
            var reset = -key * focus_width;
            // 执行时 translateX跳到0px 在定时器下一次会变成第二张图
            ul.style.transform = 'translateX(' + reset + 'px)';
        } else if (key < 0) {
            key = 2;
            ul.style.transition = 'none';
            var reset = key * focus_width;
            ul.style.transform = 'translateX(' + reset + 'px)';
        }
        // 圆点跟随变化
        // 1、在ol中选中带有tag类的li 并删除
        ol.querySelector('.tag').classList.remove('tag');
        // 2、根据key决定让哪个li 添加tag类
        ol.children[key].classList.add('tag');
    });
    // 手指滑动轮播图  1、触摸元素并获取初始坐标 2、移动元素 计算移动的距离并移动盒子
    var starx = 0;
    var movex = 0;
    var flag = false;  // 查看是否有拖动屏幕
    ul.addEventListener('touchstart', function (e) {
        starx = e.targetTouches[0].pageX;
        clearInterval(timer); // 手指触碰元素 去掉定时器
    })
    ul.addEventListener('touchmove', function (e) {
        // 计算移动的距离
        movex = e.targetTouches[0].pageX - starx;
        console.log(movex);
        // 移动盒子
        var translatex = -key * focus_width + movex;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();  //取消默认事件 防止页面滚动
    })
    ul.addEventListener('touchend', function (e) {
        // 手指离开 根据移动距离去判断是回弹还是切换图片
        if (Math.abs(movex) > 50) {
            // 如果movex是正值 右划 切换上一张 || 如果movex是负值 左划 切换下一张
            if (movex > 0) {
                key--;
            }
            else {
                key++;
            }
            if (key < 0) {
                key = 2;
                console.log(key);
                ul.style.transition = 'all 0.01s';
                var reset = -key * focus_width;
                ul.style.transform = 'translateX(' + reset + 'px)';
            } else {
                var translatex = -key * focus_width;
                ul.style.transition = 'all .5s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }

        } else {
            var translatex = -key * focus_width;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 手指离开重新启动定时器
        clearInterval(timer);
        timer = setInterval(function () {
            key++;
            var translatex = -key * focus_width;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })
})