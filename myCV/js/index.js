// if (ieVer <= 9) {
//   window.location.href="http://modesign.cc/outdatedbrowser/";
// }
const box = document.getElementById('wrap');
window.addEventListener('load', () => {
  box.querySelector('.loding').classList.add('loding_hide');
  setTimeout(() => {
    box.removeChild(box.querySelector('.loding'));
    document.body.style.overflowY = 'auto';
  },500);
  let leftH2 = box.querySelector('.left_top');
  let rightH2 = box.querySelector('.right_bottom');
  let textLi = box.querySelectorAll('.text_from li');
  setTimeout(() => {
    leftH2.classList.remove('inleft');
    rightH2.classList.remove('inright');
    setTimeout(() => {
      for (let i = 0; i < textLi.length; i++) {
        setTimeout(function () {
          textLi[i].classList.add('li_translate');
        },200+200 * i);
      }
    }, 500);
    // setTimeout(function() {
    //   for (var i = 0; i < textLi.length; i++) {
    //     (function (j) {
    //       setTimeout(function () {
    //         textLi[j].classList.add('li_translate');
    //       }, 200 + 200 * j);
    //     })(i)
    //   }
    // }, 500);
  }, 500);
  // swiper
  var mySwiper = new Swiper ('#akk', {
    direction: 'horizontal',
    autoplay : 3000,
    autoplayDisableOnInteraction : false,
    lazyLoading : true,
    lazyLoadingInPrevNext : true,
    loop: true
  });
  var mySwiper = new Swiper ('#aikang', {
    direction: 'horizontal',
    autoplay : 3000,
    autoplayDisableOnInteraction : false,
    lazyLoading : true,
    lazyLoadingInPrevNext : true,
    loop: true
  });
  var mySwiper = new Swiper ('#shot', {
    direction: 'horizontal',
    autoplay : 7000,
    autoplayDisableOnInteraction : false,
    lazyLoading : true,
    lazyLoadingInPrevNext : true,
    loop: true
  });
  var mySwiper = new Swiper ('#aikang_pc', {
    direction: 'horizontal',
    autoplay : 7000,
    autoplayDisableOnInteraction : false,
    lazyLoading : true,
    lazyLoadingInPrevNext : true,
    loop: true
  });
});
// 窗口变动改变尺寸
// window.onresize = function(){
//
// }

var goTop = (clickEleSelector) => {
	var clickEle = document.querySelector(clickEleSelector);
	var intervalId = null;
  var isExecuted = true;  // 重复点击
  var rootNode = document.body.scrollTop === 0 ? document.documentElement : document.body;
  window.addEventListener('scroll', () => {
		if(rootNode.scrollTop > (document.body.scrollHeight / 2)){
			clickEle.style.visibility = 'visible';
		}else{
			clickEle.style.visibility = 'hidden';
		}
	});
  // 滚轮事件
	document.body.addEventListener('mousewheel', () => {
		clearInterval(intervalId);
	});
  // 点击事件
	clickEle.addEventListener('click', () => {
    if (isExecuted) {
      isExecuted = false;
      intervalId = setInterval(() => {
        rootNode.scrollTop = rootNode.scrollTop - rootNode.scrollTop * 0.1;
        if(rootNode.scrollTop <= 0){
          clearInterval(intervalId)
        }
      }, 10);
    }
    setTimeout(() => isExecuted = true ,500);
	});
}
goTop('#gotop');
