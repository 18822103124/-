$('.head').load('./head.html');
$('.bom').load('./bottom.html');

(function(){
    let a = localStorage.getItem('index');
    $.ajax({
        url:'../data/del.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let str = `
            <div class="con_left">
            <div class="con_img"><img src=${json[a].img1} alt=""></div>
            <div class="con_bo">
                <span class="ridus ridus_col"><img src=${json[a].img1} alt=""></span>
                <span class="ridus"><img src=${json[a].img2} alt=""></span>
                <span class="ridus"><img src=${json[a].img3} alt=""></span>
                <span class="ridus"><img src=${json[a].img4} alt=""></span>
                <span class="ridus"><img src=${json[a].img5} alt=""></span>
            </div>
        </div>

        <div class="con_right">
            <div class="con_right_t">
                <h1>${json[a].title}</h1>
                <div class="con_c">
                    <p>${json[a].test}</p>
                    <span>收藏</span>
                </div>
            </div>
            <div class="con_bot">
                <p class="pri">商城价：</p>
                <p class="price"><span>${json[a].price}<i>元</i></span></p>
                <em>手机购买</em>
            </div>
            <div class="con_cn">
                <p>C68系列</p>
                <div class="pt">
                    <span>${json[a].i1}</span>
                    <span class="show">${json[a].i2}</span>
                    <span>${json[a].i3}</span>
                </div>
            </div>
            <div class="con_bott">
                <div class="con_num">
                    <input type="text" value="1">
                    <div class="con_jj">
                        <span class="toop">+</span>
                        <span class="boom">-</span>
                    </div>
                </div>
                <div class="con_bott_g">
                    <p class="con_gt">立即购买</p>
                    <p class="con_lt">加入购物车</p>
                </div>
            </div>
            <div class="tet">
                <span>配送到：</span>
                <select name="" id="">
                    <option value="">广东省 深圳市 宝安区 西乡街道</option>
                </select>
                <i>有货</i>
                <em>运费￥00.0</em>
            </div>
            <div class="ls">
                <span>服务：</span>
                <i>全国联保</i>|
                <i>7天退换货</i>|
                <i>包邮(偏远地区除外)</i>
            </div>
        </div>                  
            `
            $('.content_c').html(str);
            $('.con_bo span').each(function(){
                // console.log($(this).find('img').attr('src')=='undefined');
                if($(this).find('img').attr('src')=='undefined'){
                    $(this).remove();
                }
            })
        }
    })
    



})();

$('.content_c').on('click','.pt span',function(){
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
});

$('.content_c').on('click','.con_bo .ridus',function(){
    $('.con_bo .ridus').removeClass('ridus_col');
    $(this).addClass('ridus_col');
    $('.con_img img').prop('src',$(this).children('img').prop('src'));
})


$('.content_c').on('click','.con_jj .toop',function(){
    var a=$('.con_num input').prop('value');
    var b=Number(a);
    b+=1;
    $('.con_num input').prop('value',b);
})


$('.content_c').on('click','.con_jj .boom',function(){
    var a=$('.con_num input').prop('value');
    var b=Number(a);
    b-=1;
    if(b<=1){
        b=1;
    }
    $('.con_num input').prop('value',b);
})

