/**
 * Created by Administrator on 2018/7/23.
 */


/*(function($, doc) {
    $.init();
    $.plusReady(function() {
        var backButtonPress = 0;
        $.back = function(event) {
            backButtonPress++;
            if (backButtonPress > 1) {
                plus.runtime.quit();
            } else {
                plus.nativeUI.toast('再按一次退出应用');
            }
            setTimeout(function() {
                backButtonPress = 0;
            }, 1000);
            return false;
        };
    });
}(mui, document));
//禁止 回退
if (window.history && window.history.pushState) {
    $(window).on('popstate', function () {
        window.history.forward(1);
    });
}
//禁止 回退结束*/
//var baseUrl="http://192.168.1.125:8080/" 老代;
//var baseUrl="http://39.104.127.252:8080/dongdong/";
//var baseUrl='http://192.168.1.181:8087' 海波;
//var baseUrl='http://39.104.127.252:8087';
//var baseUrl='http://39.104.127.252:8080/fkdp';
var baseUrl='http://192.168.0.126:8888';
//plus.screen.lockOrientation('portrait-primary');
//锁死屏幕方向为竖屏
function back(){
    history.go(-1);
}

function isUser(){
    var uName=localStorage.getItem('uName');
    if(uName){
        uName.replace(/\"/g,"");
        console.log("已经登录过了");
    }else{
        sweetAlert(
            "sorry",
            "您还没有登录，请您先登录",
            "error"
        ).then(function () {
                window.location.href="../register.html";
            })

    }
}
 /* mui.back = function(){
            if(!first) {
                first = new Date().getTime();
                //console.log(first);
                mui.toast('再按一次退出应用');
                setTimeout(function() {
                    first = null;
                }, 2000);
            } else {
                if(new Date().getTime() - first < 2000) {
                    plus.runtime.quit();
                }
            }
        };*/

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
//获取所有的头像
 function getAvatar(ele){
     $.ajax({
         xhrFields: {
             withCredentials: true
         },
         type: "post",
         //async:false,
         url: baseUrl+"/worker/updateAvatar",
         dataType: 'json',
         success:function(data){
             console.log(data);
             if(data.success==true){
                 var html=template("getPic",data);
                // localStorage.setItem('gitPic',data.message);
                 ele.html(html);
             }else{
                 var html=template("getPic",data);
                 // localStorage.setItem('gitPic',data.message);
                 ele.html(html);
             }

         },
         error:function(data){
             console.log(data);
         }
     })
 }
//获取侧边栏用户信息
function userInfo(ele){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "post",
        url: baseUrl+"/student/getStudent",
        dataType: 'json',
        success:function(data){
            console.log(data);
            var html=template("userInfo",data);
            ele.html(html);
        },
        error:function(data){
            console.log(data);
        }
    })
}


//多选 span active 函数
function getData(flag,ele){
    $(ele).click(function () {
        if(flag){
            $(this).addClass("active");
            flag=false;
        }else{
            $(this).removeClass("active");
            flag=true;
        }
    })
}
//获取 选中的span active的值
function forEach(ele,arr){
    $(ele).each(function () {
        arr.push($(this).text());
    })
    console.log(arr);
}
function myAjax(parm,callback){
    $.ajax({
        type:parm.type||'get',
        dataType:"JSON",
        data:parm.data,
        url:baseUrl+parm.url,
        xhrFields: {
            withCredentials: true
        },
      /*  headers:{
            //'Content-Type':'application/json',
           'Authorization':localStorage.getItem("cToken")
            //'Authorization':'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGxVc2VyIiwiaXNzIjoibmhiIiwidXNlcklkIjoyOSwiaWF0IjoxNTQ2NDgzMjMxLCJqdGkiOiJDQTg5MjgxOUQ0MkI0RjMwODdBNDdEMjYyRDEyMUNGRSJ9.RFAt7Trzz07-Gzxj7o4xb4srQrrdyZTLziu3TVw-exc'
        },*/
        async:parm.async||"true",
        success: function (data) {
            callback&&callback(data);
        },
        error: function (msg) {
            console.log(msg);
            sweetAlert(
                "sorry",
                "网络发生错误,请您重新登录",
                'error'
            ).then(function () {
                location.href="../login.html"
            })
        }
    })
}
/*
function ajax(url,data,type,callback){
    $.ajax({
        url:baseUrl+url,
        dataType:"JSON",
        data:data,
        type:type,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            callback()
        }

    })
}*/
//上拉加载
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
var _loadIndex =1,
    _loadState = 0;

function loadmore(element,url,successFn) {
    $(element).on("scroll",function(){
        //当前可视容器高度
        var _elementHeight = $(element).outerHeight(),
        //当前滚动区域高度
            _elementChildHeight = $(element).children().outerHeight(),
        //滚动条高度
            _elementScroll = $(element).scrollTop();
        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){
            //console.log('没到底')
        }else {
          // console.log('到底了')
            //当状态为0 的时候进行加载，防止重复加载
            if(_loadState == 0){
                //状态更新为1
                _loadState = 1;
                //增加页数
                _loadIndex += 1;
                //添加正在加载loadding
                $(element).append('<p class="nowLoad">加载中...</p>');
                //请求当前页数ajax
                ajaxLoad(_loadIndex);
            }
        }
    });
    //ajax请求
    function ajaxLoad(_loadIndex) {
        //更新发向服务器的数据，添加页数key值
       /* dataObj.page = page;
        dataObj.size = 4;
        dataObj.userId = userId;*/
        $.ajax({
            url:baseUrl+url,
            xhrFields:{
                withCredentials:true
            },
            type:"post",
            dataType:'json',
            async:false,
            data:{
                rows:6,
                page:_loadIndex,
            },
            success:function (data) {
               // console.log(data);

                //当数据不为空的时候，更新状态
                if(data.message.length > 0){
                    //更新状态 为 0、
                    // /数据渲染  ajajx回调
                    successFn(data);
                    _loadState = 0;
                    //删除正在加载loadding
                    $('.nowLoad').remove();
                   /* function hg(){
                        $(".nowLoad").remove();
                    }
                    setTimeout(hg,1200);*/
                }else {
                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
                    _loadState = 2;
                    //删除正在加载loadding
                    $('.nowLoad').remove();
                    //更换loadding为没有数据
                    $(element).append('<p class="endLoad">没有数据了...</p>');
                    function fg(){
                        $(".endLoad").remove();
                    }
                    setTimeout(fg,3000);
                }
            },
            error:function (err) {
                //请求失败loadding
                console.log(data);
                sweetAlert(
                   "sorry",
                    data.msg,
                    "error"
                )
            }
        })
    }
};
function loadmoreIndex(element,url,obj,successFn) {
    $(element).on("scroll",function(){
        //当前可视容器高度
        var _elementHeight = $(element).outerHeight(),
        //当前滚动区域高度
            _elementChildHeight = $(element).children().outerHeight(),
        //滚动条高度
            _elementScroll = $(element).scrollTop();
        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){
            //console.log('没到底')
        }else {
            //console.log('到底了')
            //当状态为0 的时候进行加载，防止重复加载
            if(_loadState == 0){
                //状态更新为1
                _loadState = 1;
                //增加页数
                _loadIndex += 1;
                //添加正在加载loadding
                $(element).append('<p class="nowLoad">加载中...</p>');
                //请求当前页数ajax
                ajaxLoadNew(obj);
            }
        }
    });
    //ajax请求
    function ajaxLoadNew(obj) {
        //更新发向服务器的数据，添加页数key值
       /* dataObj.page = page;
        dataObj.size = 4;
        dataObj.userId = userId;*/
        obj.page=_loadIndex;
        $.ajax({
            url:baseUrl+url,
            xhrFields:{
                withCredentials:true
            },
            type:"post",
            dataType:'json',
            async:false,
            data:obj,
            success:function (data) {
               // console.log(data);
                //数据渲染  ajajx回调

                //当数据不为空的时候，更新状态
                if(data.message.length > 0){
                    //更新状态 为 0
                    _loadState = 0;
                    //删除正在加载loadding
                    $('.nowLoad').remove();
                    successFn(data);
                   /* function hg(){
                        $(".nowLoad").remove();
                    }
                    setTimeout(hg,1200);*/
                }else {
                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
                    _loadState = 2;
                    //删除正在加载loadding
                    $('.nowLoad').remove();
                    //更换loadding为没有数据
                    $(element).append('<p class="endLoad">没有数据了...</p>');
                    function fg(){
                        $(".endLoad").remove();
                    }
                    setTimeout(fg,3000);
                }
            },
            error:function (err) {
                //请求失败loadding
                console.log(data);
                sweetAlert(
                   "sorry",
                    data.msg,
                    "error"
                )
            }
        })
    }
};
//上拉加载调用js
/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
 $.each(data.data.list,function (key,val) {
 $('#wrapper ul').append();
 });
 },function () {
 });*/
//* h5上传更换背景图片*/
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
        //console.log(reader.result);
        //pic.style.backgroundImage = "url(" + reader.result + ")";
        pic.setAttribute("src",reader.result) ;
    }
}
//123=i&34=89 地址栏传多个参数
function getRequest() {
    var url=window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//getRequest();//全部参数