$('.head').load('./head.html');
$('.bom').load('./bottom.html');
var imgs=document.querySelectorAll('.lun_img img');
var nums=document.querySelectorAll('.num li');
var preve=document.querySelector('.preve');
var active=document.querySelector('.active');
var timer;
// 当前显示图片的下标
var showIndex = 0;
// 上次显示图片的下标
var prevIndex = 0;

animate(imgs[showIndex],{'opacity':1},function(){
    timer=setInterval(function(){
        moveNext();
    },5000);
});

function moveNext(){
    imgs[prevIndex].className='';
    nums[prevIndex].className='';
    imgs[prevIndex].style.opacity=0.02;

    showIndex++;
    if(showIndex>=imgs.length){
        showIndex=0;
    }
    imgs[showIndex].className='show';
    nums[showIndex].className='acc';
    prevIndex=showIndex;

    animate(imgs[showIndex],{'opacity':1});
}
function movePrev(){
    imgs[prevIndex].className='';
    nums[prevIndex].className='';
    imgs[prevIndex].style.opacity=0.02;

    showIndex--;
    if(showIndex<0){
        showIndex=imgs.length-1;
    }
    imgs[showIndex].className='show';
    nums[showIndex].className='acc';
    prevIndex=showIndex;

    animate(imgs[showIndex],{'opacity':1});
}

preve.onclick=function(){
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);
    movePrev();
    timer=setInterval(function(){
        movePrev();
    },5000);
}
active.onclick=function(){
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);
    moveNext();
    timer=setInterval(function(){
        moveNext();
    },5000);
}
