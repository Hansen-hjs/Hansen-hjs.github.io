$(window).load(function(){
	//加载页事件
	$('.loading').addClass('loading_hide');
	$('html').css({overflowY: 'auto'})
	setTimeout(function(){$('.loading').remove()},500);//删除加载页
	setTimeout(function(){$('.text').removeClass('text_hover')},800);
	setTimeout(function(){$('.text h2').addClass('h2_hover');$('.text p').addClass('p_hover')},1700);
});
function aow(){
	var wTop = $(window).scrollTop();//文档对顶部偏移
	var wHeight = $(window).height();//窗口高度
	var value = 2;//焦点图初始的比值
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
	});
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
		if (wTop > h-200) {
			$('header').addClass('header');
			$('#logo').css({padding:'0px 30px'});
		}else{
			$('header').removeClass('header');
			$('#logo').css({padding:'15px 30px'});
		}
	}
	menu();
	//内容事件
	function content(){
		var works_text = $('.works_text').height();
		$('.works li').each(function(index,li){
			if (wTop + wHeight > $(li).offset().top - works_text) {
				$(li).addClass('li_hover');
			}
		})
	}
	setTimeout(content,800);
	//加载事件
	$('.load').click(function(){
		var liHTML = '';
		var liData = [
			{ src: "img/p1.jpg" },
			{ src: "img/p2.jpg" },
			{ src: "img/aow8.jpg" },
			{ src: "img/aow9.jpg" },
			{ src: "img/aow10.jpg" },
			{ src: "img/aow11.jpg" },
			{ src: "img/aow12.jpg" },
			{ src: "img/aow13.jpg" },
			{ src: "img/aow14.jpg" },
		];
		//console.log(JSON.stringify(data));
		liData.forEach(function(item){
			liHTML = liHTML + '<li><img src="'+ item.src +'" alt=""></li>';
		});
		$('.works').append(liHTML);
		$(this).html('加载完全部了');
		$(this).append('<span class="line"></span>');
		$(this).unbind('click');//清除click事件
		content();//动态显示图片
	})
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
		content();
		goback();
	});
}
aow();