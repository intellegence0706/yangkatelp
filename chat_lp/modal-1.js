

/*   マウス位置補足 */
// Window上のマウス座標を取得する
window.onmousemove = function (e) {
    if (
        navigator.userAgent.indexOf('iPhone') > 0 ||
        navigator.userAgent.indexOf('iPad') > 0 ||
        navigator.userAgent.indexOf('iPod') > 0 ||
        navigator.userAgent.indexOf('Android') > 0) { return; }

    var mouseX, mouseY;
    if (e) {
        mouseY = e.pageY;
    } else {
        mouseY = event.pageY + document.body.scrollTop;
    }

    //mouseY はマウスのページ上部からの座標

    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var mouseY = mouseY - scrollY;

    if (mouseY <= 60) {
        open_stop_overlay1_oncheck();
    }

}




//history.replaceState(null, null, null)
history.pushState(null, null, location.href);
window.addEventListener('popstate', (e) => {
    //history.go(1);
    //open_stop_overlay1_oncheck();
});

/*
$(window).on('pageshow', function (event) {
    document.getElementById("stop_overlay1_check").checked = true;
    history.go(1);

});
*/








