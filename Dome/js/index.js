window.addEventListener('load', function () {
    var signInBtn = document.querySelector("#signIn");
    var signUpBtn = document.querySelector("#signUp");
    var firstForm = document.querySelector("#form1");
    var secondForm = document.querySelector("#form2");
    var container = document.querySelector(".container");
    var getcode = document.querySelector('.getcode');
    var register = document.querySelector('#register');
    var count = 60; //发送验证码倒计时
    var registerFlag = false;
    signInBtn.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
        formReset();
    });

    signUpBtn.addEventListener("click", () => {
        container.classList.add("right-panel-active");
        formReset();
    });
    getcode.addEventListener('click', () => {
        if (registerFlag) {
            // 发送验证码定时器
            getcode.className = ' getcode clock';
            sendEmail(firstForm.children[5].value); //发送邮件
            var countDown = setInterval(function () {
                if (count == 0) {
                    clearInterval(countDown);
                    getcode.innerHTML = '重新获取';
                    count = 60;
                    getcode.className = ' getcode';
                } else {
                    getcode.innerHTML = '剩余' + count + '秒';
                    count--;
                }
            }, 1000)

        } else {
            firstForm.children[6].style.color = 'red';
            alert('邮箱格式错误');
            return false;
        }

    })
    firstForm.children[1].addEventListener('blur', function () {
        if (!firstForm.children[1].value) {
            firstForm.children[2].innerHTML = '名称不能为空';
            firstForm.children[2].style.color = '#dd1313';
            registerFlag = false;
        } else {
            firstForm.children[2].innerHTML = '';
            firstForm.children[2].style.color = '#13dd24';
            registerFlag = true;
        }
    })
    firstForm.children[3].addEventListener('blur', function () {
        if (!firstForm.children[3].value) {
            firstForm.children[4].innerHTML = '密码不能为空';
            firstForm.children[4].style.color = '#dd1313';
            registerFlag = false;
        } else {
            firstForm.children[4].innerHTML = '';
            firstForm.children[4].style.color = '#13dd24';
            registerFlag = true;

        }
    })
    firstForm.children[5].addEventListener('blur', function () {
        var emailvalue = firstForm.children[5].value;
        var aPos = emailvalue.indexOf("@", 1);
        if (aPos < 0 || emailvalue.indexOf(".", aPos + 2) < 0) {
            firstForm.children[6].innerHTML = '邮箱格式错误';
            firstForm.children[6].style.color = '#dd1313';
            registerFlag = false;
        } else {
            firstForm.children[6].innerHTML = '';
            firstForm.children[6].style.color = '#13dd24';
            registerFlag = true;
        }
    })
    // 注册提交表单
    register.addEventListener('click', function () {
        if (registerFlag) {
            var result = firstForm.children[1].value;
            var password = firstForm.children[3].value
            var userData = result + "|" + password;
            var token = encrypt(userData);
            alert(userData);
            login(token);
        } else {
            alert('请填写完信息');
            return false;
        }
        container.classList.remove("right-panel-active");
        formReset();

    })
    firstForm.addEventListener("submit", (e) => e.preventDefault());
    secondForm.addEventListener("submit", (e) => e.preventDefault());

    //清除表单内容
    function formReset() {
        firstForm.reset();
        secondForm.reset();
        firstForm.children[2].innerHTML = ' ';
        firstForm.children[4].innerHTML = ' ';
        firstForm.children[6].innerHTML = ' ';
    }

})