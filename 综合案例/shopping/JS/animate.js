function move(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长公式 （目标值-现在位置）/10 注意把步长取整 
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //  当box1往右走向上取整 当box1往左走向下取整
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
            // console.log(step);
        }
    }, 15);
}