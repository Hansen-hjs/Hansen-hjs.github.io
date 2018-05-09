document.oncontextmenu = new Function("event.returnValue=false;");
document.onselectstart = new Function("event.returnValue=false;");
// 检测浏览器版本
function getIEVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}
function checkVersion() {
    var ver = getIEVersion();
    if (ver > -1) {
        if (ver < 9.0) {
            window.location.href = "http://modesign.cc/outdatedbrowser/";
        }
    }
}
checkVersion();
var _isMenuMove = false;
// 手机导航切换
function phoneMenu(el) {
    if (_isMenuMove) return ;
    _isMenuMove = true;
    if (el.parentNode.classList.contains('phone_header_hover')) {
        el.parentNode.querySelector('.menu').classList.remove('menu_hover')
        setTimeout(function () {
            el.parentNode.classList.remove('phone_header_hover');
            _isMenuMove = false;
        },400);
    }else {
        el.parentNode.classList.add('phone_header_hover');
        setTimeout(function () {
            el.parentNode.querySelector('.menu').classList.add('menu_hover')
            _isMenuMove = false;
        },400);
    }
}
// 头部样式判断切换
function _headerSwitch(_el) {
    var _top = _el.getBoundingClientRect().top;
    // console.log(_rootNode,_top);
    if (_top < 80) {
        document.querySelector('.pc_header').classList.add('pc_header_hover');
        document.querySelector('.logo').classList.add('logo_hover');
    }else {
        document.querySelector('.pc_header').classList.remove('pc_header_hover');
        document.querySelector('.logo').classList.remove('logo_hover');
    }
}
