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


    //�������
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
    //���Ҽ�ͷ��ʾ����
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
    //�Ҽ�ͷ���
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
    //���ͷ���

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
    //�Զ��ֲ�
    timer = setInterval(function () {
        a_right.onclick();
    }, 2000)


}
//�� ������� �� ������ֵ���� �ı�Ϊ �����Ŀ��ֵ
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacityҪ���⴦��
                //opacityû�е�λ ���������Զ�ת������ֵ ���Բ���parsetInt
                //ȡֵ��Χ 0-1 0.1 0.33 33 Ϊ������ǰ�ļ��㹫ʽ��Ч Ҫ����100��
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = (leader + step);
                obj.style[k] = leader / 100;//opacityû�е�λ
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//�㼶����Ҫ���� ֱ�����ü���
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
//ȫ�����Զ�����Ŀ��ֵ�������
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}