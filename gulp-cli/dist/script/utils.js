// 获取元素样式，兼容谷、歌火狐、IE678
function getStyle(dom,attr){
    if (dom.currentStyle) {//IE
        return dom.currentStyle[attr];
    } else {
        return getComputedStyle(dom,null)[attr];
    }
}

// 获取下一个兄弟节点
function getNextNode(dom){
    if (dom.nextElementSibling) {
        return dom.nextElementSibling;
    } else {
        return dom.nextSibling;
    }
}

// 获取上一个兄弟节点
function getPrevNode(dom){
    if (dom.previousElementSibling) {
        return dom.previousElementSibling;
    } else {
        return dom.previousSibling;
    }
}

// 生成6位随机验证码（数字、字母（大小））
function randomCode(){
    var arr = [1,1,1,1,1,1];
    for (var i in arr){
        do {
            var ascii = randomInt(48,122);
        } while((ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97));
        arr[i] = String.fromCharCode(ascii);
    }
    return arr.join('');
}

// 生成区间随机整数
function randomInt(min,max){
    return Math.round(Math.random()*(max-min))+min;
}

// 生成随机的十六进制颜色值 # 
function randomColor(){
    var str = '0123456789abcdef';
    var col = '#';
    for (var i = 0; i < 6; i++){
        var index = randomInt(0,15);
        col += str[index];
    }
    return col;
}

// 添加事件监听（兼容低版本浏览器）
function addEvent(dom,type,cb){
    if (dom.attachEvent) {
        dom.attachEvent('on'+type,cb);
    } else {
        dom.addEventListener(type,cb);
    }
}

// 移除事件监听（兼容低版本浏览器）
function removeEvent(dom,type,cbName){
    if (dom.detachEvent) {
        dom.detachEvent('on'+type,cbName);
    } else {
        dom.removeEventListener(type,cbName);
    }
}

// 支持的属性：left  top   right  bottom  width  height  marginLeft  marginTop  ... 属性值带单位px的属性
// 支持 透明度切换，支持 scrollLeft  scrollTop
// 支持多属性同时运动
// function animate(dom,attr,target){// 单属性  当前值 -> 目标值
function animate(dom,attr_obj,callback){// 多属性  当前值 -> 目标值
    // 获取每一个属性的current和target，重新整理attr_obj对象
    // attr_obj = {
    //     'width': {
    //         'current': 属性当前值,
    //         'target': 300
    //     },
    //     'height': {
    //         'current': 属性当前值,
    //         'target': 300
    //     },
    //     ...
    // }
    for (var attr in attr_obj){
        // 获取当前值和目标值
        if (attr === 'opacity') {
            var current = parseInt( getComputedStyle(dom,null)[attr]*100 );
            var target = attr_obj[attr]*100;
        } else if ( attr.indexOf('scroll') !== -1 ) {
            var current = dom[attr];
            var target = attr_obj[attr];
        } else {
            var current = parseInt( getComputedStyle(dom,null)[attr] );
            var target = attr_obj[attr];
        }
        attr_obj[attr] = {
            'current': current,
            'target': target
        }
    }
    
    clearInterval(dom.timer);
    dom.timer = setInterval(function (){
        for (var attr in attr_obj){
            var current = attr_obj[attr].current;
            var target = attr_obj[attr].target;
            // 不断变化的速度
            var speed = (target - current) / 10;
            // 小数计算有误差，容易造成数据丢失 => 取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 判断到达目的地：剩余运动量 <= 每次的运动量
            if (Math.abs(target - current) <= Math.abs(speed)) {
                if (attr === 'opacity') {
                    dom.style[attr] = target / 100;
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = target;
                } else {
                    dom.style[attr] = target + 'px';
                }
                // 从attr_obj对象中删除已完成运动的属性
                delete attr_obj[attr];

                // 如果对象中还有其他属性，此时不应该终止计时器
                for (var key in attr_obj){
                    // 有其他属性未完成动画
                    return;
                }

                // console.log( '运动结束' );
                clearInterval(dom.timer);//终止计时器
                // if (callback) {
                //     callback();
                // }
                // callback ? callback() : '';
                typeof callback === 'function' ? callback() : '';
            } else {
                // 此时不能直接使用current，因为它是一个临时变量
                // current += speed;
                // 使用对象中的数据进行累加
                attr_obj[attr].current += speed;
                if (attr === 'opacity') {
                    dom.style[attr] = attr_obj[attr].current / 100;
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = attr_obj[attr].current;
                } else {
                    dom.style[attr] = attr_obj[attr].current + 'px';
                }
            }
        }
    },20);
}

// dom.offsetParent 指向离他最近定位父级
// 获取元素到body的距离(包含父级边框)
function offset(dom,bool){
    var l = 0, t = 0;
    var bdleft = dom.clientLeft;//初始元素的左边框
    var bdtop = dom.clientTop;//初始元素的上边框
    while(dom){
        l = l + dom.offsetLeft + dom.clientLeft;
        t = t + dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }
    if (bool) {
        // 元素边框外侧到body的距离
        return {left: l-bdleft, top: t-bdtop};
    } else {
        // 元素内容外侧到body的距离
        return {left: l, top: t};
    }
    
}
