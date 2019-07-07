/*进度条*/
$(document).ajaxStart(function(){
    NProgress.start();
});
$(document).ajaxStop(function(){
    NProgress.done();
});




// 登陆拦截
if ( location.href.indexOf("login.html") === -1 ) {
    // 地址栏中没有 login.html, 说明不是登录页, 需要进行登录拦截
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        dataType: "json",
        success: function( info ) {
            console.log( info )
            if ( info.success ) {
                // 已登录, 让用户继续访问
                console.log("用户已登录")
            }

            if ( info.error === 400 ) {
                // 未登录, 拦截到登录页
                location.href = "login.html";
            }
        }
    })
}


$(function(){
    /*1-分类管理的切换功能*/
    $('.nav .category').click(function(){
        $('.nav .child').stop().slideToggle();
    });



    /*2-左侧侧边栏切换功能*/
$('.icon_menu').click(function(){
 $('.lt_aside').toggleClass("hidemenu");
 $('.lt_main').toggleClass("hidemenu");
 $('.lt_topbar').toggleClass("hidemenu");
});

    /*3-点击topbar弹出模态框*/
$('.icon_logout').click(function(){
        $('#logoutModal').modal("show");
    });

    /*4-点击退出按钮登出*/
$('#logoutBtn').click(function(){
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        dataType: "json",
        success: function( info ) {
            console.log( info );
            if ( info.success ) {
                // 退出成功, 跳转到登录页了
                location.href = "login.html";
            }
        }
    })
});
});