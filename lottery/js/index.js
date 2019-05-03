/** 轮播图数组 */
const swiper_list = ['./image/a7-1.jpg', './image/a7-2.jpg', './image/a7-3.jpg', './image/a7-4.jpg', './image/a7-5.jpg', './image/a7-6.jpg'];

/**
 * 创建轮播图
 * @param {array} list 轮播图数组
 * @param {boolean} need_dot 是否需要圆点
 * @param {Function} callback 回调函数
 */
function createSwiper(list, need_dot, callback) {
    let swiper = document.createElement('div'),
        ul = document.createElement('div'),
        btn = document.createElement('div'),
        li = '';
    swiper.className = 'swiper';
    ul.className = 'swiper_list';
    btn.className = 'swiper_pagination';
    list.forEach(item => {
        li += `<li class="swiper_slider"><img src="${item}" onclick="openImgZoom(this)" alt=""></li>`
    });
    ul.innerHTML = li;
    swiper.appendChild(ul);
    if (need_dot) swiper.appendChild(btn);
    document.getElementById('app').insertBefore(swiper, document.querySelector('.ball_content'));
    if (typeof callback === 'function') callback();
}

// 调用轮播图组件
createSwiper(swiper_list, true, () => {
    swiper({
        el: '.swiper',
        pagination: true,
        autoPaly: true
    });
});

// 手势操作插件
const Zoom = new ImgZoom({
    pack: '.img-zoom',
    zoomImg: '.img-zoom-img'
});

/**
 * 打开相册
 * @param {Element} el 调用相册节点
 */
function openImgZoom(el) {
    document.querySelector('.img-zoom').classList.add('img-zoom-show');
    Zoom.init(el.src);
}

/**
 * 数组中随机取几个元素
 * @param {array} arr 数组
 * @param {number} count 元素个数
 */
function getRandomArrayElements(array, count) {
    /** 数组长度 */
    let length = array.length;
    /** 最小长度 */
    let min = length - count, temp, range;
    while (length-- > min) {
        range = Math.floor((length + 1) * Math.random());
        temp = array[range];
        array[range] = array[length];
        array[length] = temp;
    }
    return array.slice(min);
}

/** 是否点击 */
let isClick = false;

/**
 * 输出彩色球
 * @param {Element} el 按钮节点
 * @param {string} type 'ssq'|'dlt'|'ten' 彩票类型: 双色球 | 大乐透 | 快乐10分
 */
function outputBall(el, type) {
    if (isClick) return;
    isClick = true;

    /** 列表节点 */
    let list_node = el.parentNode.querySelector('.ball_list');
    list_node.innerHTML = '';

    /** 红球列表 双色球 */
    let red_ball_ssq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
    /** 蓝球列表 双色球 */
    let blue_ball_ssq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    /** 红球列表 大乐透 */
    let red_ball_dlt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    /** 蓝球列表 大乐透 */
    let blue_ball_dlt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    /** 快乐10分球数 */
    let ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    /** 生成球的数组列表 */
    let balls = [];

    switch (type) {
        case 'ssq':
            balls = [...getRandomArrayElements(red_ball_ssq, 6), ...getRandomArrayElements(blue_ball_ssq, 1)];
            break;
    
        case 'dlt':
            balls = [...getRandomArrayElements(red_ball_dlt, 5), ...getRandomArrayElements(blue_ball_dlt, 2)];
            break;
        case 'ten':
            balls = [...getRandomArrayElements(ten, 8)];
            break;
    }

    for (let i = 0; i < balls.length; i++) {
        setTimeout(() => {
            let li = document.createElement('li');
            li.textContent = balls[i];
            list_node.appendChild(li);
            if (i == balls.length - 1) isClick = false;
        }, 200 + 100 * i);
    }
}
