window.onload = function () {
    tab();
};
//tab¿∏«–ªª
function tab() {
    var l_ul = document.getElementById("p_left").children[1];
    var r_ul = document.getElementById("p_right");
    var l_lis = l_ul.children;
    var r_lis = r_ul.children;
    for (var i = 0; i < l_lis.length; i++) {
        l_lis[i].index = i;
        l_lis[i].onclick = function () {
            for (var j = 0; j < r_lis.length; j++) {
                r_lis[j].classList.remove("current");
            }
            r_lis[this.index].classList.add("current");
            //console.log(this.index);
        };
    }

}