$(window).load(function(){ 
	//加载页事件
	$('.loading').addClass('loading_hide');
	$('html').css({overflowY: 'auto'})
	setTimeout(function(){$('.loading').remove()},500);//删除加载页
	//顶部字体动画
	setInterval(function(){$('.box_text').css({ top: '53%', opacity: 1 })},1000);
	setInterval(function(){$('.box_left').css({ left: '50%' });$('.box_right').css({ right: '50%' })},1500)

//导航特效
	$(".menu ul li").hover(
		function(){
			var w=$(".menu ul li").width();
			var whatTab = $(this).index();		 
			var howFar = w * whatTab;	 
			$(".slider").css({
				left: howFar + "px"
			});
		},function(){
			$(".slider").css({ left: 0});
		}	
	);
//窗口自适应
	var num= 2.56;
	var w= $(window).width();
	var h= w/num;
	$('#top').css({ height: h });
	var sw= $('.skill_ul li span').width();
	$('.skill_ul li span').css({ height: sw*1.1});
	$('.skill_ul li h1').css({ lineHeight: sw + 'px' });
$(window).resize(function(){//窗口变动时刷新css样式
		num= 2.56;
		w= $(window).width();
		h= w/num;
		$('#top').css({ height: h });
		sw= $('.skill_ul li span').width();
		$('.skill_ul li span').css({ height: sw*1.1 });
		$('.skill_ul li h1').css({ lineHeight: sw + 'px'});
});
//pc作品
	function pczp(){
		var ind=0;
		var b_li=$('#pc_box .demo_ul li');
		var w=$('#pc_box').width();
		//alert(b_li.length);
		function move(click){ 
			if(!click){
				ind++;
			}if (ind>b_li.length-1) {
				ind=0;
			}if (ind<0) {
				ind=b_li.length-1
			}		
			var tag_l=-w*ind; //去到x距离=宽*下一位置
			$('#pc_box .demo_ul').css({ transform:'translateX('+tag_l+'px)' });
			$('#pc_text li').removeClass('text_hover'); 
			$('#pc_text li').eq(ind).addClass('text_hover');	
		}
		$(window).resize(function(){
		 	w=$('#pc_box').width();
		 	move('1');
		});
		//左边按钮
		$('#pc_demo .pc_left').click(function(){
			ind=ind-1
			move('1');
		});
	//右边按钮
		$('#pc_demo .pc_right').click(function(){
			ind=ind+1
			move('1');
		});

	}
	//phone作品
	function phonezp(){
		var ind=0;
		var b_li=$('#phone_box .phone_ul li');
		var w=$('#phone_box').width();
		//alert(b_li.length);
		function move(click){ 
			if(!click){
				ind++;
			}if (ind>b_li.length-1) {
				ind=0;
			}if (ind<0) {
				ind=b_li.length-1
			}		
			var tag_l=-w*ind; //去到x距离=宽*下一位置
			$('#phone_box .phone_ul').css({ transform:'translateX('+tag_l+'px)' });
			$('#phone_text li').removeClass('text_hover'); 
			$('#phone_text li').eq(ind).addClass('text_hover');
		}
		//左边按钮
		$('#phone_demo .phone_left').click(function(){
			ind=ind-1
			move('1');
		});
	//右边按钮
		$('#phone_demo .phone_right').click(function(){
			ind=ind+1
			move('1');
		});

	}
	pczp();	
	phonezp();
//侧边导航
	$(window).scroll(function(){	
		if($(window).scrollTop()<300){
			$('.menu_side').fadeOut();
		}else{
			$('.menu_side').fadeIn();
		}
		var top1 = $('#top').offset().top;
		var top2 = $('#vitae').offset().top;
		var top3 = $('#works').offset().top;
		var top4 = $('#skill').offset().top;
		var top5 = $('#demand').offset().top;
		var top6 = $('#footer').offset().top;
	    var gun = $(document).scrollTop();

	    if (top1-gun <= 10) {
	    	$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(0).addClass('mhover');
	    }
	    if (top2-gun <= 100){
	    	$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(1).addClass('mhover');
	    }
	    if (top3-gun <= 100){
	    	$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(2).addClass('mhover');
	    }
	    if (top4-gun <= 100){
	    	$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(3).addClass('mhover');
	    }
	    if (top5-gun <= 100){
	    	$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(4).addClass('mhover');
	    }
	    if (top6-gun <= 20){
	    	$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(5).addClass('mhover');
	    }
	    if ($(document).scrollTop() >= $(document).height() - $(window).height()) {			
			$('.menu_side li').removeClass('mhover');
	      	$('.menu_side li').eq(5).addClass('mhover');
		}
	})
	$('#off').click(function(){
		$('.menu_side').css({width: 41,});
		$('#more').css({display:'block',});
		$(this).hide();
		$('.menu_side ul').hide();
	});
	$('#more').click(function(){
		$(this).hide();
		$('.menu_side ul').show();
		$('#off').css({display:'block',});
		$('.menu_side').css({width: 80,})
	});
	$('#top').on('click','li',function(e){
            var target = e.target;
            var id = $(target).data("to");
            $('html,body').stop().animate({scrollTop:$('#'+id).offset().top}, 700);
    });
    $('.menu_side').on('click','li',function(e){
            var target = e.target;
            var id = $(target).data("to");
            $('html,body').stop().animate({scrollTop:$('#'+id).offset().top}, 700);
    });
    $('#bd_btn').click(function(){
    	alert('因服务器内存原因，表单功能暂停用')
    });
});