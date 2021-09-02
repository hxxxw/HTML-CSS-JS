window.addEventListener('load', function () {
    var submit_enter = document.querySelector('#submit_enter');
    var ul = document.querySelector('.list');
    var time = new Date();
    var Month = time.getMonth();
    var Day = time.getDay();
    var Hours = time.getHours();
    var Minutes = time.getMinutes();
    var Seconds = time.getSeconds();
    console.log(time.getTime());
    submit_enter.addEventListener('keyup', function (e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            var val = submit_enter.value;
            localStorage.setItem('matter', val);
            console.log(localStorage.getItem('matter'));
            if (localStorage.getItem('matter') == '') {
                alert('请输入内容');
            } else {
                var li = document.createElement('li');
                li.innerHTML = localStorage.getItem('matter') + "<a>删除</a>" + "<span>" + Month + '月' + Day + '日' + ' ' + Hours + ':' + Minutes + ':' + Seconds + "</span>";
                ul.appendChild(li);
            }
            var as = ul.querySelectorAll('a');
            for (var i = 0; i < as.length; i++) {
                as[i].onclick = function () {
                    ul.removeChild(this.parentNode);
                }
            }
        }
    })
})