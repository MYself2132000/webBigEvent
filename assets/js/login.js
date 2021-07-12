// 导入 layui form模块
var form = layui.form;
// 导入 layer 模块
var layer = layui.layer;



// 控制登录 注册的切换
$('#link_reg').on('click', function() {
    //登录表单隐藏
    $('.login-box').hide();
    //注册表单显示
    $('.reg-box').show();
})

$('#link_login').on('click', function() {
    //登录表单显示
    $('.login-box').show();
    //注册表单隐藏
    $('.reg-box').hide();
})

form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须不包含空格，且6~12位'],
    repwd: function(value) {
        //通过形参拿到的是确认密码框中的值
        //还需要拿到 密码框中的值
        //进行比较
        //如果判断失败，则return一个提示消息即可
        var pwd = $('.reg-box input[name=password]').val();
        if (pwd !== value) {
            return '两次密码不一致';
        }
    }
})


// 注册提交
$('#form_reg').submit(function(e) {
    e.preventDefault();
    // 获取数据
    let data = {
        username: $(this).find('[name=username]').val(),
        password: $(this).find('[name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
        if (res.status !== 0) {
            return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录！');
        // 模拟人的点击行为，直接跳转到 登录页面
        $('#link_login').click();
    })
})

// 登录提交
$('#form_login').on('submit', function(e) {
    // 阻止默认跳转
    e.preventDefault();
    // 发起ajax请求
    $.ajax({
        url: '/api/login',
        method: 'post',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！');
            }
            layer.msg('登录成功!');
            // 将 用于有权限接口的身份认证 的token保存在本地
            localStorage.setItem('token', res.token);
            // 跳转到后台首页
            location.href = '/index.html';

        }

    })

})