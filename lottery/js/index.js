// 轮播图数组
const _list = ['./image/a7-1.jpg','./image/a7-2.jpg','./image/a7-3.jpg','./image/a7-4.jpg','./image/a7-5.jpg','./image/a7-6.jpg'];
// 创建轮播图 参数为：数组，是否需要圆点，回调函数
function createSwiper(list, isBtn, fn) {
    let [_swiper, _ul, _li, _btn] = [document.createElement('div'), document.createElement('ul'), '', document.createElement('div')];
    _swiper.className = 'swiper';
    _ul.className = 'swiper_list';
    _btn.className = 'swiper_pagination';
    list.forEach((item, index) => {
        _li += `<li class="swiper_slider"><img src="${ item }" onclick="openImgZoom(this)" alt=""></li>`
    });
    _ul.innerHTML = _li;
    _swiper.appendChild(_ul);
    if (isBtn) _swiper.appendChild(_btn);
    document.getElementById('app').insertBefore(_swiper, document.querySelector('.ball_content'));
    if (typeof fn === 'function') fn.call(this);
}
// 调用轮播图组件
createSwiper(_list, true, () => {
    window.onload = function () {
        new Swiper({
            el: '.swiper',
            pagination: true,
            autoPaly: true
        });
    };
});
// 手势操作插件
var _Zoom = new ImgZoom({
    pack: '.img-zoom',
    zoomImg: '.img-zoom-img'
});
function openImgZoom(el) {
    document.querySelector('.img-zoom').classList.add('img-zoom-show');
    _Zoom.init(el.src)
}
// 生成随机球 n是随机个数，min和max是数域
function createBall(n, min, max, _arr){
    for (let i = 0; i < n; i++) {
        _arr[i] = parseInt(Math.random()*(max-min+1)+min);
    }
    // 走多一次 如果有相同的数字就再随机多一次
    for (let k = 0; k < n; k++) {
        for (let j = k + 1; j < n; j++) {
            if (_arr[k] == _arr[j]) {
                // console.log('执行');
                createBall(n, min, max, _arr);
                return ;
            }
        }
    }
}
// 阻止重复点击
var _isClick = false;
// 输出彩色球
function outputBall(el, _type) {
    if (_isClick) return ;
    _isClick = true;
    let _ul = el.parentNode.querySelector('.ball_list');
    _ul.innerHTML = '';
    // 两种色球的数组
    let [redballs, blueballs] = [new Array(), new Array()];
    if (_type) {
        // 双色球
        createBall(6,1,33, redballs);
        createBall(1,1,16, blueballs);
        // console.log('双色球');
    }else {
        // 大乐透
        createBall(5, 1, 35, redballs);
        createBall(2, 1, 12, blueballs);
        // console.log('大乐透');
    }
    let _newList = [...redballs, ...blueballs];
    // console.log(redballs, blueballs, _newList);
    for (let i = 0; i < _newList.length; i++) {
        setTimeout(() => {
            let _li = document.createElement('li');
            _li.textContent = _newList[i];
            _ul.appendChild(_li);
            if (i == 6) _isClick = false;
        },200 + 100 * i);
    }
}
