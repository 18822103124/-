$('.nav_inp input').blur(function(){
    if($(this).val()==''){
        $('.nav_tt .zh').text('请输入用户名');
    }else{
        $('.nav_tt .zh').text('');
    }
})

$('.nav_iup input').blur(function(){
    if($(this).val()==''){
        $('.nav_tt .mm').text('请输入密码');
    }else{
        $('.nav_tt .mm').text('');
    }
})

$('.nav_d a').click(function(){
    if($('.nav_tt .zh').text()=='' && $('.nav_tt .mm').text()==''){
        if(getCookie($('.nav_inp input').val())==$('.nav_iup input').val()){
            alert('登录成功');
            $('.nav_d a').prop('href','./index.html');
        }else{
            alert('账号或密码错误');
            return;
        }
        
    }else{
        alert('请输入账号或密码');
    }
})