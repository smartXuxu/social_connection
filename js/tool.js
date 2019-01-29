/**
 * Created by Administrator on 2019/1/19.
 */
/*
* 验证身份证*/
// 正则表达式：
var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9Xx])$/;

//验证 身份证号
function isCardNo(card)
{
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false)
    {
        alert("身份证输入不合法");
        //$("#Idcard").val("");
        return false;
    }
}
//验证手机号
function checkTelNum(telNum){
    if(!/^1[0-9]{10}$/.test(telNum)){
        return false;
    }
    return true;
}
//验证不为空
function isNotBlank(data) {
    return (data == "" || typeof(data)  == "undefined"|| data == null ) ? false : true;
}
//校验密码：只能输入6-20个字母、数字、下划线
function isPasswd(s)
 {
    var patrn=/^(\w){6,20}$/;
    if (!patrn.exec(s)) return false
    return true
    }
//h5上传更换背景图片*/
function html5Reader(file,ele){
    /* var file1 = file[0].size;
     console.log(file1);*/
    var reader = new FileReader();
    // reader.readAsDataURL(file); //判断上传的图片大小
    /*var fileData = file[0].size;*/

    /* var size = file[0].size;
     //console.log(size);//注意，这里读到的是字节数
     var isAllow = false;
     if (!size) isAllow = false;
     var maxSize = 2048;
     maxSize = maxSize * 1024;   //转化为字节
     isAllow = size <= maxSize;
     if (!isAllow) {
     alert("大小超过2 M，请重新上传");
     return false;
     }*/
    reader.readAsDataURL(file[0]);
    reader.onload = function (e) {
        var pic = document.querySelector(ele);
        // console.log(reader.result);
        //pic.setAttribute("src",reader.result) ;
        pic.style.backgroundImage = "url(" + reader.result + ")";
    }
}

var regu = "^1[0-9]{10}$";
var re = new RegExp(regu);
var tel=new RegExp('^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$');
// 上传file 类型的文件  https://www.cnblogs.com/LoveTX/p/7081515.html
//网站  http://wx.senboedu.com/ 森博在线教育   http://www.senboedu.com/Web/Index 森博教育

