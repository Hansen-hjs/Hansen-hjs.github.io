// (function(){
//   var userAgent = window.navigator.userAgent.toLowerCase();
//   $.browser.msie10 = $.browser.msie && /msie 10\.0/i.test(userAgent);
//   $.browser.msie9 = $.browser.msie && /msie 9\.0/i.test(userAgent);
//   $.browser.msie8 = $.browser.msie && /msie 8\.0/i.test(userAgent);
//   $.browser.msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
//   $.browser.msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);
//   if($.browser.msie6){
//      window.location.href="http://modesign.cc/outdatedbrowser/";
//   }if($.browser.msie7){
//      window.location.href="http://modesign.cc/outdatedbrowser/";
//   }if($.browser.msie8){
//      window.location.href="http://modesign.cc/outdatedbrowser/";
//   }if($.browser.msie9){
//      window.location.href="http://modesign.cc/outdatedbrowser/";
//   }
// })();
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
};
// 窗口变动改变尺寸
window.onresize = function(){

}
// 返回顶部
function gobackTop(btn){
	var goback = document.getElementById(btn);
	var documentH = document.body.scrollHeight;  // 文档高度
	var scrollTop;
	var t1;
	var isExecuted = true;                       // 鼠标重复点击
	// console.log(documentH);
	//窗口滚动时
	window.onscroll = function(){
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//谷歌不可以就换IE
		if(scrollTop > (documentH/2.5)){
			goback.style.visibility = 'visible';
		}else{
			goback.style.visibility = 'hidden';
		}
	}
	// 滚滚动条缓动事件
	function move(){
		var speed;
		//speed=（目标-现在的位置）除以 数值
		speed = (0-scrollTop)/10;
		if (scrollTop <= 0) {
			clearInterval(t1);
		}else{
			document.body.scrollTop = scrollTop + speed;
			document.documentElement.scrollTop = scrollTop + speed;//滚动时也要用到IE的值
		}
	}
	// 滚轮事件
	document.body.onmousewheel = function(event){//清楚缓动
		clearInterval(t1);
	}
	// 点击事件
   goback.onclick = function(){
      if (isExecuted === true){
         //改变滚动条的值
         t1 = setInterval(move,1);
         isExecuted = false;
      }
      setTimeout(function(){
         isExecuted = true;
      },500);
   }
}
gobackTop("gotop");
