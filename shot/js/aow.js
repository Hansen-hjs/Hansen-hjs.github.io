var _nodata = false;
var _list = ['./image/p1.jpg', './image/p2.jpg', './image/aow8.jpg', './image/aow9.jpg', './image/aow10.jpg', './image/aow11.jpg', './image/aow12.jpg', './image/aow13.jpg', './image/aow14.jpg'];
function addList() {
    if (_nodata) return;
    _nodata = true;
    document.querySelector('.content .load').innerHTML = '没有更多了<span class="line transition"></span>';
    for (var i = 0; i < _list.length; i++) {
        var _li = document.createElement('li');
        _li.setAttribute('data-move', '');
        _li.innerHTML = '<img src="' + _list[i] + '" alt="">';
        _li.className = 'startMove spread';
        document.querySelector('.works').appendChild(_li);
    }
    setTimeout(elMoveShow, 100);
}
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
                    el.className = '';
                }, 800);
            })(_els[k]);
        }
    }
}
window.addEventListener('load', function () {
    var _load = document.querySelector('.loading'),
        _maxbox = document.querySelector('.works');
    _load.classList.add('loading_hide');
    // 默认执行一次
    setTimeout(function () {
        document.querySelector('html').style.overflowY = 'auto';
        _load.parentNode.removeChild(_load);
        setTimeout(function () {
            document.querySelector('.banner_text').classList.remove('spread');
            setTimeout(function () {
                document.querySelector('.banner_text h2').classList.add('h2_hover');
                document.querySelector('.banner_text p').classList.add('p_hover');
            }, 800);
        }, 300);
        _headerSwitch(_maxbox);
        elMoveShow();
    }, 400);
    // 滚动条事件
    window.addEventListener('scroll', function () {
        _headerSwitch(_maxbox);
        elMoveShow();
    });
});