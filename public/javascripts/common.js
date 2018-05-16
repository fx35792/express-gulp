/***************服务器接口地址配置*******************/
var serv = 'https://192.168.6.120/';//本地地址
// var serv ='https://www.test.com/';//测试地址
// var serv ='https://www.pre.com/';//准生产地址
// var serv ='https://www.normal.com/';//正式地址

/***************全局变量定义*******************/
var VERSION = '0.0.1';//版本号
var CLIENT = 'H5';//客服端来源

/***************公共方法定义*******************/
//1.获取url字段的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//2.定义 提示弹窗
function popUpDiv(text) {
    var textClass = $('.s-up');
    textClass.stop().fadeIn(300).html("<div>" + text + "</div>").delay(1500).fadeOut(300);
}

//3.密码验证 数字和字母
function checkPwd(password) {
    var reg = /^[0-9a-zA-Z]+$/;
    if (password.length < 6 || password.length > 18) {
        return false;
    } else if (reg.test(password)) {
        return true;
    }
}

//4.验证码验证
function checkVerifyCode(verifyCode) {
    var reg = /^[0-9]+$/;
    if (verifyCode.length < 6) {
        return false
    } else if (reg.test(verifyCode)) {
        return true;
    }
}

//5.手机验证
function checkPhone(phone) {
    var reg = /^0?1[3|4|5|6|8|7|9][0-9]\d{8}$/;
    if (reg.test(phone)) {
        return true;
    } else {
        return false;
    }
}

//6.ajax接口封装
jQuery.axse = function (url, data, successfn, errorfn) {
    data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
    $.ajax({
        type: "post",
        async: false,
        data: JSON.stringify(data),
        cache: false,
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (d) {
            successfn(d);
        },
        error: function (e) {
            errorfn(e);
        }
    });
};
