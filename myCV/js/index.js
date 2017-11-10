// if (ieVer <= 9) {
//   window.location.href="http://modesign.cc/outdatedbrowser/";
// }
var box = document.getElementById('wrap');
window.onload = function () {
  box.querySelector('.loding').classList.add('loding_hide');
  setTimeout(function(){
    box.removeChild(box.querySelector('.loding'));
    document.body.style.overflowY = 'auto';
  },500);
  var leftH2 = box.querySelector('.left_top');
  var rightH2 = box.querySelector('.right_bottom');
  var textLi = box.querySelectorAll('.text_from li');
  setTimeout(function () {
    leftH2.classList.remove('inleft');
    rightH2.classList.remove('inright');
    setTimeout(function () {
      for (var i = 0; i < textLi.length; i++) {
        (function (j) {
          setTimeout(function () {
            textLi[j].classList.add('li_translate');
          }, 200 + 200 * j);
        })(i)
      }
    }, 500);
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
};
// 窗口变动改变尺寸
// window.onresize = function(){
//
// }

function goTop(clickEleSelector){
	var clickEle = document.querySelector(clickEleSelector);
	var intervalId = null;
  var isExecuted = true;  // 重复点击
  var rootNode = document.body.scrollTop === 0 ? document.documentElement : document.body;
  window.addEventListener('scroll', function(){
		if(rootNode.scrollTop > (document.body.scrollHeight/2)){
			clickEle.style.visibility = 'visible';
		}else{
			clickEle.style.visibility = 'hidden';
		}
	});
	clickEle.addEventListener('click', function () {
    if (isExecuted) {
      isExecuted = false;
      intervalId = setInterval(function () {
        rootNode.scrollTop = rootNode.scrollTop - rootNode.scrollTop * 0.1;
        if(rootNode.scrollTop <= 0){
          clearInterval(intervalId)
        }
      }, 10);
    }
    setTimeout(function () {
       isExecuted = true;
    },500);
	});
}
goTop('#gotop')
