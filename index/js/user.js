const key = "\x31\x32\x33\x34\x35\x36\x37\x38\x38\x37\x36\x35\x34\x33\x32\x31\x31\x32\x33\x34\x35\x36\x37\x38\x38\x37\x36\x35\x34\x61\x62\x63";
const url = "\x68\x74\x74\x70\x3a\x2f\x2f\x61\x70\x69\x2e\x6b\x6b\x73\x65\x72\x76\x65\x72\x2e\x74\x6f\x70\x3a\x39\x30";
async function login(token) {
    var api = url + "/api/users/login" + "?userToken=" + token;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', api, false);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200) {
            window.location.href = "http://www.kkserver.top:88";
        } else {
            alert("账号或密码错误!");
        }
    };
    httpRequest.send();
}

async function sendEmail(emailvalue) {

    var api = url + "/api/users/sendemail" + "?email=" + emailvalue;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', api, false);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200) {
            alert("发送成功!");
        } else {
            alert("发送失败!");
        }
    };
    httpRequest.send();
    waitEmail();
}

async function waitEmail() {
    var sleep = 30, interval = null;
    var btn = document.getElementById('getcodebtn');
    btn.onclick = function () {
        if (!interval) {
            this.style.backgroundColor = 'rgb(243, 182, 182)';
            this.disabled = "disabled";
            this.style.cursor = "wait";
            this.value = "重新发送 (" + sleep-- + ")";
            interval = setInterval(function () {
                if (sleep == 0) {
                    if (!!interval) {
                        clearInterval(interval);
                        interval = null;
                        sleep = 30;
                        btn.style.cursor = "pointer";
                        btn.removeAttribute('disabled');
                        btn.value = "获取验证码";
                        btn.style.backgroundColor = '';
                    }
                    return false;
                }
                btn.value = "重新发送 (" + sleep-- + ")";
            }, 1000);
        }
    }
}

/***************************************************** 
* AES加密 
* @param content 加密内容 
* @param key 加密密码，由字母或数字组成 
　　　　　　此方法使用AES-128-ECB加密模式，key需要为16位 
　　　　　　加密解密key必须相同，如：abcd1234abcd1234 
* @return 加密密文 
****************************************************/

function encrypt(content) {
    var sKey = CryptoJS.enc.Utf8.parse(key);
    var sContent = CryptoJS.enc.Utf8.parse(content);
    var encrypted = CryptoJS.AES.encrypt(sContent, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

/***************************************************** 
* AES解密 
* @param content 加密密文 
* @param key 加密密码，由字母或数字组成 
　　　　　　此方法使用AES-128-ECB加密模式，key需要为16位 
　　　　　　加密解密key必须相同，如：abcd1234abcd1234 
* @return 解密明文 
****************************************************/

function decrypt(content, key) {
    var sKey = CryptoJS.enc.Utf8.parse(key);
    var decrypt = CryptoJS.AES.decrypt(content, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}