$('.head').load('./head.html');
$('.bom').load('./bottom.html');


$('.pt span').click(function(){
        var a=$(this).index('.pt span');
        $('.pt span').removeClass('show');
        $(this).addClass('show');
        $.ajax({
            url:'../data/details.json',
            type:'get',
            dataType:'json',
            success:function(json){
                let str1=`
                    <h1>${json[a].title}</h1>
                    <div class="con_c">
                        <p>${json[a].test}</p>
                        <span>收藏</span>
                    </div>`;
                let str2=`
                    <p class="pri">商城价：</p>
                    <p class="price"><span>${json[a].price}<i>元</i></span></p>
                    <em>手机购买</em>`;

                $('.con_right .con_right_t').html(str1);
                $('.con_right .con_bot').html(str2);
            }
        })
    })

$('.con_bo .ridus').click(function(){
    $('.con_bo .ridus').removeClass('ridus_col');
    $(this).addClass('ridus_col');
    $('.con_img img').prop('src',$(this).children('img').prop('src'));
})

$('.con_jj .toop').click(function(){
    var a=$('.con_num input').prop('value');
    var b=Number(a);
    b+=1;
    $('.con_num input').prop('value',b);
})
$('.con_jj .boom').click(function(){
    var a=$('.con_num input').prop('value');
    var b=Number(a);
    b-=1;
    if(b<=1){
        b=1;
    }
    $('.con_num input').prop('value',b);
})