$('.head').load('./head.html');
$('.bom').load('./bottom.html');

(function(){
    if(localStorage.getItem('id')==0){
        $.ajax({
            url:'../data/list1.json',
            type:'get',
            dataType:'json',
            success:function(json){
                // console.log(json.length);
                $.each(json,function(index,item){
                    let str=`
                        <li><a href="./details.html"><img src=${item.img} alt=""></a>
                            <div class="cont_b">
                            <strong>${item.title}</strong>
                            <p>${item.test}</p>
                            <i>${item.price}</i>
                            <a href="./details.html"><em>立即购买</em></a>
                            </div>
                        </li>`;
                    $('.cont_list ul').append(str);
                });
                
            }
        })
    }
    if(localStorage.getItem('id')==1){
        $.ajax({
            url:'../data/list2.json',
            type:'get',
            dataType:'json',
            success:function(json){
                // console.log(json.length);
                $.each(json,function(index,item){
                    let str=`
                        <li><a href="#"><img src=${item.img} alt=""></a>
                            <div class="cont_b">
                            <strong>${item.title}</strong>
                            <p>${item.test}</p>
                            <i>${item.price}</i>
                            <a href="#"><em>立即购买</em></a>
                            </div>
                        </li>`;
                    $('.cont_list ul').append(str);
                });
                
            }
        })
    }



})();

$('.cont_list ul ').on('click','li a',function(){
    // console.log(1);
    localStorage.setItem( 'index', $(this).closest('li').index());

})
