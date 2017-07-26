$(window).load(function(){
	//加载页事件
	$('.loading').addClass('loading_hide');
	$('html').css({overflowY: 'auto'})
	setTimeout(function(){$('.loading').remove()},500);//删除加载页

	var wTop = $(window).scrollTop();//文档对顶部偏移
	var wHeight = $(window).height();//窗口高度
	var value = 2;//焦点图的比值
	var w = $(window).width();//窗口宽度
	function windowSize(){
		if (w > 930 ){
			value = 2
		}if (w < 930) {
			value = 1.5
		}if ( w < 600) {
			value = 1
		}
	}
	windowSize();
	var h = w/value;

	$('.banner').css({height: h});//焦点图
	//窗口变动事件
	$(window).resize(function(){
		wTop = $(window).scrollTop();
		wHeight = $(window).height();
		w = $(window).width();
		windowSize();
		h = w/value;
		$('.banner').css({height:h});
	})
	//手机按钮事件
	$(".menu_btn").toggle(
	  function () {
	  	$(".menu_btn").css({ width: "100%", height: "auto" })
	    $(".menu_btn i").removeClass("icon-cai").addClass("btn_hover icon-guanbi");
	    setTimeout(function(){$('.phone_menu').show()},400);
	    setTimeout(function(){$('.phone_menu').addClass('menu_hover')},450);
	  },
	  function () {
	    $('.phone_menu').removeClass('menu_hover');
	    setTimeout(function(){
	    	$(".menu_btn i").removeClass("icon-guanbi btn_hover").addClass("icon-cai");
	    	$(".menu_btn").css({width: "46px", height: "46px"})
	    },400)
	    setTimeout(function(){$('.phone_menu').hide()},410); 
	  }
	)
	//导航事件
	function menu(){
		if (wTop > h-100) {
			$('header').addClass('header');
			$('#logo').css({padding:'0px 30px'});
		}else{
			$('header').removeClass('header');
			$('#logo').css({padding:'15px 30px'});
		}
	}
	menu();
	//banner事件
	function banner(bannerLi,bannerSpan){
		var bLi = 0;
		setInterval(function () {
			var liLength = $(bannerLi).length;
			bLi++;
			if (bLi > liLength-1) {
				bLi = 0
			}if (bLi < 0) {
				bLi = liLength-1
			}
			$(bannerLi).removeClass('index_hover');
			$(bannerLi).removeClass('index_b');
			$(bannerLi).eq(bLi-1).addClass('index_hover');
			setTimeout(function(){$(bannerLi).eq(bLi).addClass('index_b')},2000);	
			setTimeout(function(){//文字过渡
				$('.banner em').removeClass('em_move').eq(bLi).addClass('em_move');
				$(bannerSpan).addClass('text_h1').removeClass('text_h2');
				$(bannerSpan).eq(bLi-1).addClass('text_h2');
				$(bannerSpan).eq(bLi).removeClass('text_h1');
			},2500);
		},6000)
	}
	banner(".banner li",".banner span");
	setTimeout(function(){$('.banner em').addClass('em_move')},2500);
	//文字显示事件
	function text(){
			var $text = $('section .text');
			$text.each(function(index,span){
				if (wTop + wHeight > span.offsetTop) {//判断元素在下面出来时
					//console.log(span.offsetTop);
					span.classList.add('show');
				}
			})
	}
	setTimeout(text,800)
	//图片显示事件
	function photo(){
		var $photo = $('.photos span');
		$photo.each(function(index,span){
			if (wTop + wHeight > $(span).offset().top) {
				$(span).css({transform: "translate(0,0)", opacity: 1})
			}
		})
	}
	photo();
	//底部相册事件
	function album(){
		var album = $('#album li');
		album.each(function(index,li){
			if (wTop + wHeight > li.offsetTop) {
				li.classList.add('a_show')
			}
		})
	}
	album();
	//小图换大图
	(function () {
		var ind = 0;
		function move(){
			if (ind > 11) {
				ind = 0;
			}if (ind < 0) {
				ind = 11
			}
			var bjpg = ['index','index2','index3','index4','p1','p2','p3','album1','album2','album3','album4','album5']
			$(".big_album img").attr("src","img/"+bjpg[ind]+".jpg");
		}
		$('#album li').click(function(){
			ind = $('#album li').index(this);
			move();		
			$('.big_photos').css({display: 'block'});
			setTimeout(function(){$('.big_photos').addClass('bp_hover')},100)	
		});
		$('.big_photos li').click(function(){
			ind = $('.big_photos li').index(this);
			move();	
		});
		$('.album_close').click(function(){
			$('.big_photos').removeClass('bp_hover');
			setTimeout(function(){$('.big_photos').css({display: 'none'})},400)	
		});
		$('.album_left').click(function(){
			ind = ind-1;
			move();	
		});
		$('.album_right').click(function(){
			ind = ind+1;
			move();
		})
	})();
	//返回顶部事件
	function goback(){
		if (wTop > 500) {
			$('#goback').fadeIn();
		} else {
			$('#goback').fadeOut();
		}
	}
	goback();
	$('#goback').click(function(){
		$('body,html').animate({scrollTop: 0},300)
	});
	//滚动条事件
	$(document).scroll(function(){
		wTop = $(window).scrollTop();
		wHeight = $(window).height();
		w = $(window).width();
		windowSize();
		h = w/value;
		menu();
		text();
		photo();
		album();
		goback();
	});

})