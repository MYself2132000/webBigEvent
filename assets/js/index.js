$(function() {

    // 导入 layer
    var layer = layui.layer;


    //获取用户的基本信息
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
        // // ajax 失败时会调用 error 函数
        // // ajax 无论成功还是失败，都会调用 complate 函数
        // complete: function(res) {
        //     // console.log('complete', res);
        //     if (res.responseJSON.status !== '0' && res.responseJSON.message !== '获取用户基本信息成功！') {
        //         //清空token，这样可以清空用户录入的假token
        //         localStorage.removeItem('token');
        //         // 跳转到 登录页
        //         location.href = '/login.html';
        //     }
        // }
    })


    // 渲染用户头像
    function renderAvatar(user) {
        // 设置欢迎文本
        // 如果有 昵称，就使用昵称，如果没有昵称，就是用用户名
        var name = user.nickname || user.username;
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        //渲染用户头像
        if (user.user_pic !== null) {
            // 将 用户头像渲染 并显示
            $('.layui-nav-img').attr('src', user.user_pic).show();
            //将 文字头像隐藏
            $('.text-avatar').hide();
        } else {
            // 将图片头像隐藏
            $('.layui-nav-img').hide();
            // 获取到 用户名称（昵称或者是用户名）
            var first = name[0].toUpperCase();
            // 将文字图像显示
            $('.text-avatar').html(first).show();
        }
    }

    // 退出操作
    $('#btnLogout').on('click', function() {
        //询问框
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function(index) {
            // 将本地的 localStorage 清空
            localStorage.removeItem('token');
            location.href = '/login.html'

            layer.close(index);
        });
    })
})