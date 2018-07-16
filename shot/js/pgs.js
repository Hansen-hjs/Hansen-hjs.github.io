// 判断元素出现
function elMoveShow() {
    var _els = document.querySelectorAll('[data-move]');
    if (!_els.length) return;
    for (var k = 0; k < _els.length; k++) {
        if (Math.floor(_els[k].getBoundingClientRect().top) <= Math.floor(window.innerHeight || document.documentElement.clientHeight) - 50) {
            _els[k].classList.add('reset');
            _els[k].removeAttribute('data-move');
            (function (el) {
                setTimeout(function () {
                    el.classList.remove('startMove');
                    el.classList.add('transition');
                }, 800);
            })(_els[k]);
        }
    }
}
window.addEventListener('load', function () {
    var _load = document.querySelector('.loading'),
        _maxbox = document.querySelector('.content');
    _load.classList.add('loading_hide');
    // 默认执行一次
    setTimeout(function () {
        document.querySelector('html').style.overflowY = 'auto';
        _load.parentNode.removeChild(_load);
        document.querySelector('.banner_text').classList.remove('spread');
        setTimeout(function () {
            document.querySelector('.icon-xiangji-copy').classList.remove('i_hover');
        }, 500);
        _headerSwitch(_maxbox);
        elMoveShow()
    }, 400);
    // 滚动条事件
    window.addEventListener('scroll', function () {
        _headerSwitch(_maxbox);
        elMoveShow()
    });
});