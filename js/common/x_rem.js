/**
 * Created by asus on 2017/9/29.
 */

/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
var html = document.getElementsByTagName('html')[0];
//console.log(html);
/*取到屏幕的宽度*/
var width = window.innerWidth;
//console.log(width);
/* 640 100  320 50 */
var fontSize = 100/750*width;
//console.log(fontSize);
/*设置fontsize*/

html.style.fontSize = fontSize +'px';
window.onresize = function(){
        var html = document.getElementsByTagName('html')[0];
        //console.log(html);
        /*取到屏幕的宽度*/
        var width = window.innerWidth;
        //console.log(width);
        /* 640 100  320 50 */
        var fontSize = 100/750 * width;
        //console.log(fontSize);
        /*设置fontsize*/
        html.style.fontSize = fontSize +'px';

    }
function back(){
       history.go(-1);
}

/*带dpr的rem*/
/*
* /**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
/*!function (window) {

    /!* 设计图文档宽度 *!/
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /!* 8.55：小于320px不再缩小，11.2：大于420px不再放大 *!/
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) *3 + 'px';

        return refreshRem;
    })();

    /!* 添加倍屏标识，安卓倍屏为1 *!/
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /!* 添加IOS标识 *!/
        doc.documentElement.classList.add('ios');
        /!* IOS8以上给html添加hairline样式，以便特殊处理 *!/
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);*/