window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseover', function () {
        // 鼠标移动到轮播图上 显示左右箭头
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer); //鼠标移动到导航栏清除定时器
        timer = null; //释放定时器
    })
    focus.addEventListener('mouseout', function () {
        // 鼠标离开到轮播图上 隐藏左右箭头
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        clearInterval(timer); //鼠标移动到导航栏清除定时器
        timer = setInterval(function () {  //开启定时器
            arrow_r.click(); //电脑调用点击事件
        }, 2000);

    })
    // 动态生成小圆圈 有多少轮播图生成多少个圆圈
    var ul = focus.querySelector('ul'); //指定获取focus下的ul
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i); //为每个li设置索引号
        ol.appendChild(li);//在ol里添加一个li
        li.addEventListener('click', function () {
            // li绑定点击事件，做排他算法
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''; //先清除所有的类名
            }
            this.className = 'current'; //为当前li设置current类
            // console.log(this.getAttribute('index'));
            //点击小圆圈移动图片 移动的对象为ul  移动距离为 圆圈的索引号*图片宽度 为负值
            //索引号通过getAttribute('index') 获得
            var index = this.getAttribute('index');
            // 当点击了li 将索引号给 num和circle
            num = index;
            circle = index;
            move(ul, -focusWidth * index);  //调用animate下的move函数
        })
    }
    ol.children[0].className = 'current'; // 默认第一个轮播图为选中状态
    // 左右箭头移动图片 无缝滚动
    // 克隆第一张图 放到ul后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first); //将第一张插入到ul最后的li 实现无缝
    //实现按钮跳转
    var num = 0;
    var circle = 0;  //控制小圆圈跟着箭头跳转
    var flag = true;   // 节流阀控制
    arrow_r.addEventListener('click', function () { // 右侧按钮
        // 如果跳到了最后一张复制的图片 ，此时ul要快速复原left改为0
        if (flag == true) {
            flag = false; //关闭节流阀
            if (num == ol.children.length) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            // 当circle走到最后一个 归0 重新计数
            if (circle == ol.children.length) {
                circle = 0;
            }
            move(ul, num * -focusWidth, function () {
                flag = true; //开启节流阀 不让动画播放过快
            });
            circleChange();
        }

    })
    arrow_l.addEventListener('click', function () {  // 左侧按钮
        if (flag == true) {
            flag = false; //关闭节流阀
            circle--;
            // 当circle<0 说明走到第一张了 所以跳到最后一个圆点
            if (circle < 0) {
                circle = ol.children.length - 1;
                console.log(circle);
            }
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = num * focusWidth + 'px';
            }
            num--;
            circleChange();
            console.log(circle);
            move(ul, num * -focusWidth, function () {
                flag = true; //开启节流阀 不让动画播放过快
            });
        }
    })

    // 封装圆点排他算法函数
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            // console.log(ol.children.length);
            ol.children[i].className = '';
        }
        //跟随按钮跳转圆圈
        ol.children[circle].className = 'current';
    }

    //进入网页轮播图自动播放
    var timer = setInterval(function () {
        arrow_r.click(); //电脑调用点击事件
    }, 2000);
})