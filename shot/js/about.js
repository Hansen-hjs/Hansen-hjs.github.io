var _isClick = false;
// 判断元素出现
function elMoveShow() {
    var _els = document.querySelectorAll('.startMove');
    if (!_els.length) return;
    for (var k = 0; k < _els.length; k++) {
        if (Math.floor(_els[k].getBoundingClientRect().top) <= Math.floor(window.innerHeight || document.documentElement.clientHeight) - 50) {
            _els[k].classList.add('reset');
            (function (j) {
                setTimeout(function () {
                    _els[j].classList.remove('startMove');
                    _els[j].classList.add('transition');
                },800);
            })(k);
        }
    }
}
function codeShow(el) {
    if (_isClick) return;
    _isClick = true;
    document.querySelector('.qrcode').classList.add('reset');
    el.innerHTML = '<em class="iconfont icon-iconfontweixin em_cursor"></em>已显示二维码'
}
window.addEventListener('load',function() {
    var _load = document.querySelector('.loading'),
        _maxbox = document.querySelector('.content');
    _load.classList.add('loading_hide');
    // 默认执行一次
    setTimeout(function(){
        document.querySelector('html').style.overflowY = 'auto';
        _load.parentNode.removeChild(_load);
        elMoveShow();
        _headerSwitch(_maxbox);
    },400);
    // 滚动条事件
    window.addEventListener('scroll', function() {
        elMoveShow();
        _headerSwitch(_maxbox);
    });
});