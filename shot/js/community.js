// 判断元素出现
function elMoveShow(str, state) {
    var _els = document.querySelectorAll(str);
    if (!_els.length) return;
    for (var k = 0; k < _els.length; k++) {
        if (Math.floor(_els[k].getBoundingClientRect().top) <= Math.floor(window.innerHeight || document.documentElement.clientHeight) - 50) {
            _els[k].classList.add('reset');
            (function (j) {
                setTimeout(function () {
                    if (state) _els[j].querySelector('.card').classList.remove('card_hide');
                    _els[j].classList.remove('startMove');
                    _els[j].classList.add('transition');
                },800);
            })(k);
        }
    }
}
window.addEventListener('load',function() {
    var _load = document.querySelector('.loading'),
        _maxbox = document.querySelector('.content');
    _load.classList.add('loading_hide');
    // 默认执行一次
    setTimeout(function(){
        document.querySelector('html').style.overflowY = 'auto';
        _load.parentNode.removeChild(_load);
        document.querySelector('.banner_text').classList.remove('text_hide');
        _headerSwitch(_maxbox);
        elMoveShow('.news .startMove', true);
        elMoveShow('.travels .startMove', false);
    },400);
    // 滚动条事件
    window.addEventListener('scroll', function() {
        _headerSwitch(_maxbox);
        elMoveShow('.news .startMove', true);
        elMoveShow('.travels .startMove', false);
    });
});