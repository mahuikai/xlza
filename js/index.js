window.onload = function () {
    banner();
};
function banner() {
    var banner = document.querySelector('.banner>.cantainer');
    var ul = banner.getElementsByTagName('ul')[0];
    var ulLis = ul.children;
    var ol = banner.children[1];
    //var olLis = ol.children;
    var width = banner.offsetWidth;
    var arr = document.getElementById("arr");
    var a_left = arr.children[0];
    var a_right = arr.children[1];
    var timer = null;

    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement("li");
        ol.appendChild(li);

    }
    var clone = ulLis[0].cloneNode(true);
    ul.appendChild(clone);
    var olLis = ol.children;
    olLis[0].classList.add("current");


    //序号排他
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].index = i;
        olLis[i].onmouseover = function () {
            for (var i = 0; i < olLis.length; i++) {
                olLis[i].classList.remove("current");
            }
            this.classList.add("current");

            animate(ul, {left: -this.index * width})
            pic = cur = this.index;

        }
    }
    //左右箭头显示隐藏
    banner.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timer);
    };
    banner.onmouseout = function () {
        arr.style.display = "none";
        timer = setInterval(function () {
            a_right.onclick();
        }, 2000)

    }
    //右箭头点击
    var pic = 0;
    var cur = 0;

    a_right.onclick = function () {
        if (pic === ulLis.length - 1) {
            pic = 0;
            ul.style.left = 0;
        }
        pic++;
        animate(ul, {left: -pic * width})

        if (cur < olLis.length - 1) {
            cur++;
        } else {
            cur = 0;
        }
        for (var j = 0; j < olLis.length; j++) {
            olLis[j].classList.remove("current");
        }
        olLis[cur].classList.add("current")
        console.log(cur);


    }
    //左箭头点击

    a_left.onclick = function () {
        if (pic === 0) {
            pic = ulLis.length - 1;
            ul.style.left = -(ulLis.length - 1) * width + "px";
        }
        pic--;
        animate(ul, {left: -pic * width})

        if (cur > 0) {
            cur--;
        } else {
            cur = olLis.length - 1;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].classList.remove("current");
        }
        olLis[cur].classList.add("current");


    }
    //自动轮播
    timer = setInterval(function () {
        a_right.onclick();
    }, 2000)


}
//把 任意对象 的 任意数值属性 改变为 任意的目标值
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacity要特殊处理
                //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = (leader + step);
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
//全部属性都到达目标值才能清空
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}