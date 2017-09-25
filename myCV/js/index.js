var box = document.getElementById('wrap');
window.onload = function () {
  box.querySelector('.loding').classList.add('loding_hide');
  setTimeout(function(){
    box.removeChild(box.querySelector('.loding'));
    document.body.style.overflowY = 'auto';
  },500);
  var leftH2 = box.querySelector('.left_top');
  var rightH2 = box.querySelector('.right_bottom');
  var textP = box.querySelectorAll('.text_from p');
  setTimeout(function () {
    leftH2.classList.remove('inleft');
    rightH2.classList.remove('inright');
    setTimeout(function () {
      for (var i = 0; i < textP.length; i++) {
        (function (j) {
          setTimeout(function () {
            textP[j].classList.add('p_translate');
          }, 200 + 200 * j);
        })(i)
      }
    }, 700);
  }, 700);
};
// 窗口变动改变尺寸
window.onresize = function(){

}
