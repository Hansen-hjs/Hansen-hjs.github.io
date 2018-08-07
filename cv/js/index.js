var ver = (function () {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
})();
if (ver > -1) {
    if (ver < 10) {
        window.location.href = 'http://modesign.cc/outdatedbrowser/';
    } else {
        console.log('当前IE浏览版本为：', ver);
    }
}