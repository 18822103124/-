$('.nav_inp input').blur(function(){
    if($(this).val()==''){
        $('.nav_tt .zh').text('请输入用户名');
    }
})

$('.nav_iup input').blur(function(){
    if($(this).val()==''){
        $('.nav_tt .mm').text('请输入密码');
    }
})

$('.nav_d a').click(function(){
    if($('.nav_tt .zh').text()=='' && $('.nav_tt .mm').text()==''){
        if(getCookie($('.nav_inp input').val())==$('.nav_iup input').val()){
            $('.nav_d a').prop('href','./index.html');
        }else{
            alert('账号或密码错误');
        }
        
    }
})