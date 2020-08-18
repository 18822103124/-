$('.nav_inp input').blur(function(){
    var str1 = $(this).val();
    if($(this).val()==''){
        $('.nav_tt .zh').text('账号不能为空');
        return;
    }else {
        $('.nav_tt .zh').text('');
    }
    if(str1.length<6||str1.length>12){
        $('.nav_tt .zh').text('账号长度在6-12字');
    }else{
        $('.nav_tt .zh').text('');
    }
})

$('.nav_iup input').blur(function(){
    var str2=$(this).val();
    var reg2=/[0-9]/g;
    var reg3=/[a-zA-Z]/g;
    var reg4=/[^\d0-9a-zA-Z]/g;
    var num=reg2.test(str2)+reg3.test(str2)+reg4.test(str2);
    if($(this).val()==''){
        $('.nav_tt .mm').text('密码不能为空');
        return;
    }else{
        $('.nav_tt .mm').text('');
    }
    if(str2.length<6||str2.length>11){
        $('.nav_tt .mm').text('密码长度在6-11字');
        return;
    }else{
        $('.nav_tt .mm').text('');
    }
    if(num>=2){
        $('.nav_tt .mm').text('');
    }else{
        $('.nav_tt .mm').text('必须包含数字、字母或其他字符中的两种以上');
    }
})

$('.nav_d a').click(function(){
    if($('.nav_tt .zh').text()=='' && $('.nav_tt .mm').text()==''){
        if($('.nav_inp input').val()=='' || $('.nav_iup input').val()==''){
            alert('账号或密码不能为空');
            return;
        }
        if(getCookie($('.nav_inp input').val())){
            alert('此账号已被注册');
            return;
        }
        setCookie({
            key:$('.nav_inp input').val(),
            val:$('.nav_iup input').val(),
            days:0
        })
        alert('注册成功');
        $('.nav_d a').prop('href','./register.html');
    }else{
        alert('账号或密码不符合规范');
    }
})