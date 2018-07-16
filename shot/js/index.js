// 相册列表
var _images = ['./image/index.jpg', './image/index2.jpg', './image/index3.jpg', './image/index4.jpg', './image/p1.jpg', './image/p2.jpg', './image/p3.jpg', './image/album1.jpg', './image/album2.jpg', './image/album3.jpg', './image/album4.jpg', './image/album5.jpg'];
// 当前相册位置
var _index = 0;
// 相册生成
function outputAlbum() {
    var _li = '';
    for (var i = 0; i < _images.length; i++) {
        _li += '<li data-move class="startMove spread" style="background-image: url(' + _images[i] + ')" onclick="showAlbum(' + i + ')"></li>';
    }
    document.querySelector('.Album_list').innerHTML = document.querySelector('.Album_menu').innerHTML = _li;
}
outputAlbum();
//  相册出现
function showAlbum(_key) {
    var _box = document.querySelector('.Album_big');
    if (_box.classList.contains('Album_big_hide')) {
        _box.classList.remove('Album_big_hide');
        document.querySelector('html').style.overflowY = 'hidden';
    }
    _index = _key;
    document.querySelector('.center_img img').src = _images[_index];
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
                    el.classList.remove('startMove');
                    el.classList.add('transition');
                }, 800);
            })(_els[k]);
        }
    }
}
// banner切换
function banner() {
    var _item = document.querySelectorAll('.banner .banner_item'),
        _index = 1,
        _back = 0;
    _item[0].querySelector('.banner_line span').classList.add('line_move');
    _item[0].querySelector('.banner_text').classList.remove('back');
    setInterval(function () {
        if (_index >= _item.length) _index = 0;
        _back = _index == 0 ? _item.length - 1 : _index - 1;
        // 当前样式过渡添加
        _item[_index].classList.add('item_show');
        _item[_index].classList.add('opacity');
        setTimeout(function () {
            _item[_index].querySelector('.banner_text').classList.remove('back');
            _item[_back].classList.remove('opacity');
        }, 800);
        _item[_index].querySelector('.banner_line span').classList.add('line_move');
        // 前一张样式重置
        _item[_back].classList.remove('item_show');
        _item[_back].querySelector('.banner_text').classList.add('next');
        setTimeout(function () {
            _item[_back].classList.remove('opacity');
            _item[_back].querySelector('.banner_line span').classList.remove('line_move');
            _item[_back].querySelector('.banner_text').classList.remove('next');
            _item[_back].querySelector('.banner_text').classList.add('back');
            _index++;
        }, 3000);
    }, 8000);
}
// 页面加载完成
window.addEventListener('load', function () {
    var _load = document.querySelector('.loading'),
        _maxbox = document.querySelector('.introduction');
    _load.classList.add('loading_hide');
    // 默认执行一次
    setTimeout(function () {
        document.querySelector('html').style.overflowY = 'auto';
        _load.parentNode.removeChild(_load);
        elMoveShow();
        _headerSwitch(_maxbox);
        banner();
    }, 400);
    // 滚动条事件
    window.addEventListener('scroll', function () {
        _headerSwitch(_maxbox);
        elMoveShow();
    });
    // 相册按钮事件
    document.querySelector('.Album_big .icon-close').addEventListener('click', function () {
        this.parentNode.classList.add('Album_big_hide');
        setTimeout(function () {
            document.querySelector('html').style.overflowY = 'auto';
        }, 400);
    });
    document.querySelector('.Album_big .icon-left').addEventListener('click', function () {
        if (!_index) _index = _images.length;
        _index--;
        showAlbum(_index);
    });
    document.querySelector('.Album_big .icon-right').addEventListener('click', function () {
        if (_index == _images.length - 1) _index = -1;
        _index++;
        showAlbum(_index);
    });
});
