// 监测类型滑动事件
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    freeMode: true
});

// 切换视图
$('.test_class span').click(function(){
		var whatTab = $(this).index();
		$(this).addClass('test_class_hover').siblings().removeClass('test_class_hover');
		$('.test_data .test_Dcontent').hide();
		$('.test_data .test_Dcontent').eq(whatTab).show();
		if (whatTab == 1) {
			$(".test_nav").hide();
		}if(whatTab == 0){
			$(".test_nav").show();
		}
});

// 实时监测多级菜单事件
function list(){
	// 展开一级菜单列表
	$('.test_nav h3,.test_nav h4').click(function(){
		$('.list_ul').hide();
		$('.h4_ul').show();
	});
	// 展开二级菜单列表
	$('.test_nav h5').click(function(){
		$('.list_ul').hide();
		$('.h5_ul').show();
	});
	$(document).bind("click",function(e){
	    //class为list_ul的是菜单，class为test_nav的是打开菜单的按钮
	    if($(e.target).closest(".list_ul").length == 0 && $(e.target).closest(".test_nav").length == 0){
	    	//点击 class为list_ul 之外且class不是不是test_nav，则触发
	        $('.list_ul').hide();
	    }
	});
}
 //  实时监测多级菜单
function nav_left(json,i){
		$(".h4_ul").append("<li>"+json[0].children[i].text+"</li>");
		$('.h4_ul li').click(function(){ // 一级菜单点击
			list();
			var $list_h4 = $(this).text();
			$('.test_nav h4').text($list_h4);
			$('.h4_ul').hide(); 	// 当前的消失
			$('.h5_ul').show(); 	// 对应的显示
			var $h4 = $(this).index();  	//当前选项
			$(".h5_ul").html(""); 			// 先清空选项
			if (json[0].children[$h4].children.length > 0) { // 判断是否存在子选项
				// console.log(json[0].children[$h4].children.length);
				for(var h5_i = 0; h5_i < json[0].children[$h4].children.length; h5_i++){ //二级菜单循环
					$(".h5_ul").append("<li>"+json[0].children[$h4].children[h5_i].text+"</li>"); //添加内容到二级菜单
					 $('.h5_ul li').click(function(){ // 二级菜单点击
					 	list();
						var $list2 = $(this).text();
						$('.test_nav h5').text($list2);
						$('.h5_ul').hide();
						$('.h6_ul').show();
						var $h5 = $(this).index();
						$('.h6_ul').html("");
						// console.log(json[0].children[$h4].children[$h5].children.length);
						if (json[0].children[$h4].children[$h5].children.length > 0 ) {
							// console.log("有");
							for(var h6_i = 0; h6_i < json[0].children[$h4].children[$h5].children.length; h6_i++){ //三级菜单循环
								$(".h6_ul").append("<li>"+json[0].children[$h4].children[$h5].children[h6_i].text+"</li>"); //添加内容到最后内容
								$('.h6_ul li').click(function(){ // 三级菜单
									list();
									$('.list_ul').hide();
									var $list3 = $(this).text();
									$('.test_nav h6').text($list3);
								});
							}
						}else{
							$('.test_nav h6').text("无");
						}
					});// 二级菜单点击结束
				}
			}else{
				$('.test_nav h5').text("无");
			}
	}); // 一级菜单点击结束
}
var apiNo = sessionStorage.getItem("apiNo");
console.log(apiNo);
// 5.4.1获取实时监测左侧树
function testNav(){
	 $.ajax({
	 	url: $url+"/iom_app_server/api/third/getTreeData",
		data:  {url:"pcm/Tree.do",dtype:"设备列表",unitNo:apiNo},
		dataTyp: 'json',
		type: 'get',
		xhrFields:{ // 跨域cookie打开
			withCredentials: true
		},
    	crossDomain: true,
    	success:function(data){
    		var json = (new Function("return " + data))();  // 转换json标准格式
    		console.log(json);
    		$(".test_nav h3").text(json[0].text);
    		list();
    		for(var i = 0; i < json[0].children.length; i++){
    			nav_left(json,i)
    		}
    	}
	 })
}testNav();

// 按钮切换功能
function dataSwitch(){
	var navText; 								// 定义最终选择字符
	// 监测类型按钮
	function btn(){
		var h5_text = $('.test_nav h5').text();	// 第三级字符
		var h4_text = $('.test_nav h4').text();	// 第二季字符
		if (h5_text == "无") {
			navText = h4_text;					// 第二级字符传到最终字符
		}else{
			navText = h5_text;					// 第三级字符传到最终字符
		}
	}
	var navLi; 									// 请求变量
	// 监测类型ajax提交
	function monitoring(navLi){
		$.ajax({
			url: $url+"iom_app_server/api/third/getData",
			data:  navLi,
			dataTyp: 'json',
			type: 'get',
			xhrFields:{ // 跨域cookie打开
				withCredentials: true
			},
	    	crossDomain: true,
	    	success:function(data){
	    		var json = (new Function("return " + data))();  // 转换json标准格式
	    		console.log(json);
	    		var myList = json.data.data.split(";");  		// 先以';'拆分数据
	    		for(var i = 0; i < myList.length; i++){
	    			myList[i] = myList[i].split(":");
	    		}
	    		console.log(myList);
	    	}
		})
	}
	// 电压按钮
	$(".test_Dcontent li").eq(0).click(function(){
		$(".test_Dcontent li").removeClass('li_hover');
		$(this).addClass('li_hover');
		btn(); 						// 获取最终字符
		console.log(navText);
		navLi = {
			"url":"app/variable!getMacRealValue.do",
			"data":"findRtVarData;"
			+navText+".A相电压;"
			+navText+".B相电压;"
			+navText+".C相电压;"
			+navText+".AB线电压;"
			+navText+".BC线电压;"
			+navText+".CA线电压;"
		}
		monitoring(navLi);
	});
	// 电流按钮
	$(".test_Dcontent li").eq(1).click(function(){
		$(".test_Dcontent li").removeClass('li_hover');
		$(this).addClass('li_hover');
		btn(); 						// 获取最终字符
		console.log(navText);
		navLi = {
			"url":"app/variable!getMacRealValue.do",
			"data":"findRtVarData;"
			+navText+".A相电流;"
			+navText+".B相电流;"
			+navText+".C相电流;"
			+navText+".零序电流;"
		}
		monitoring(navLi);
	});
	// 电能按钮
	$(".test_Dcontent li").eq(2).click(function(){
		$(".test_Dcontent li").removeClass('li_hover');
		$(this).addClass('li_hover');
		btn(); 						// 获取最终字符
		console.log(navText);
		navLi = {
			"url":"app/variable!getMacRealValue.do",
			"data":"findRtVarData;"
			+navText+".有功电能总和;"
			+navText+".无功电能总和;"
		}
		monitoring(navLi);
	});
	// 频率按钮
	$(".test_Dcontent li").eq(3).click(function(){
		$(".test_Dcontent li").removeClass('li_hover');
		$(this).addClass('li_hover');
		btn(); 						// 获取最终字符
		console.log(navText);
		navLi = {
			"url":"app/variable!getMacRealValue.do",
			"data":"findRtVarData;"
			+navText+".频率;"
		}
		monitoring(navLi);
	});
	// 功率按钮
	$(".test_Dcontent li").eq(4).click(function(){
		$(".test_Dcontent li").removeClass('li_hover');
		$(this).addClass('li_hover');
		btn(); 						// 获取最终字符
		console.log(navText);
		navLi = {
			"url":"app/variable!getMacRealValue.do",
			"data":"findRtVarData;"
			+navText+".总有功功率;"+navText+".总无功功率;"
			+navText+".A相有功功率;"+navText+".B相有功功率;"
			+navText+".C相有功功率;"+navText+".A相无功功率;"
			+navText+".B相无功功率;"+navText+".C相无功功率;"
		}
		monitoring(navLi);
	});
	// 功率因素按钮
	$(".test_Dcontent li").eq(5).click(function(){
		$(".test_Dcontent li").removeClass('li_hover');
		$(this).addClass('li_hover');
		btn(); 						// 获取最终字符
		console.log(navText);
		navLi = {
			"url":"app/variable!getMacRealValue.do",
			"data":"findRtVarData;"
			+navText+".总功率因素;"
			+navText+".A相功率因素;"
			+navText+".B相功率因素;"
			+navText+".C相功率因素;"
		}
		monitoring(navLi);
	});
}
dataSwitch();
// 接线图列表
function chartMenu(){
	// 展开一级菜单列表
	$('.chart_nav h2,.chart_nav h4').click(function(){
		$('.chart_list').hide();
		$('.chart_h4').show();
	});
	// 展开二级菜单列表
	$('.chart_nav h5').click(function(){
		$('.chart_list').hide();
		$('.chart_h5').show();
	});
	$(document).bind("click",function(e){
	    if($(e.target).closest(".chart_list").length == 0 && $(e.target).closest(".chart_nav").length == 0){
	        $('.chart_list').hide();
	    }
	});
}
// 5.4.6接线图数据
function svgData(json,chartName){
	var devi = {
		"url":"pcm/WebSocket!send.do",
		"data":"findRtVarData;"
		+chartName+
		"进线柜.电流A;"
		+chartName+
		"电容柜.电流A;"
		+chartName+
		"D3回路1.电流A;"
		+chartName+
		"D3回路2.电流A;"
		+chartName+
		"D3回路3.电流A;"
		+chartName+
		"D3回路4.电流A;"
		+chartName+
		"D3回路5.电流A;"
		+chartName+
		"D4回路1.电流A;"
		+chartName+
		"D4回路2.电流A;"
		+chartName+
		"D4回路3.电流A;"
		+chartName+
		"D4回路4.电流A;"
		+chartName+
		"D4回路5.电流A;"
		+chartName+
		"D4回路6.电流A;"
		+chartName+
		"进线柜.电流B;"
		+chartName+
		"电容柜.电流B;"
		+chartName+
		"D3回路1.电流B;"
		+chartName+
		"D3回路2.电流B;"
		+chartName+
		"D3回路3.电流B;"
	}
	$.ajax({
		url: $url+"iom_app_server/api/third/getData",
		data: devi,
		dataTyp: 'json',
		type: 'get',
		xhrFields:{ // 跨域cookie打开
			withCredentials: true
		},
    	crossDomain: true,
    	success:function(data){
    		var json = (new Function("return " + data))();  // 转换json标准格式
    		console.log(json);
    	}
	})
}
// 请求wdr文件
function chart_wdr(chartName){
	console.log(chartName);
	var chart_svg = {
		"url":"/pcm/svg!get.do",
		"pageId":chartName+".wdr"
	}
	$.ajax({
		url: $url+"iom_app_server/api/third/getSvgData",
		data:  chart_svg,
		dataTyp: 'json',
		type: 'get',
		xhrFields:{ // 跨域cookie打开
			withCredentials: true
		},
    	crossDomain: true,
    	success:function(data){
    		var json = (new Function("return " + data))();  // 转换json标准格式
    		console.log(json,chartName);
    		svgData(json,chartName);
        $("#jxt embed").attr('src',$url+json.data);
        var w = $(window).width();//窗口宽度
        $("#jxt").css({ height: w,width:"8rem"});
    	}
	})
}
// 接线图多级菜单
function nav_right(json,i){
	var chartName;
	// 展开一级菜单列表
	chartMenu();
	$(".chart_h4").append("<p>"+json[0].children[i].text+"</p>");
	$(".chart_h4 p").click(function(){		//	一级菜单展开
		$('.chart_nav h4').text($(this).text());
		$('.chart_h4').hide(); 				// 当前的消失
		$('.chart_h5').show(); 				// 对应的显示
		var $h4 = $(this).index();  		//当前选项
		$(".chart_h5").text(""); 			// 先清空选项
      chartName = $(".chart_nav h4").text();
      if(json[0].children[$h4].children.length > 1){
         for(var j = 0; j < json[0].children[$h4].children.length; j++){
            chartMenu();
            $(".chart_h5").append("<p>"+json[0].children[$h4].children[j].text+"</p>");
            $(".chart_h5 p").click(function(){		// 二级菜单
               chartMenu();
               $('.chart_nav h5').text($(this).text());
               $('.chart_h5').hide(); 				// 当前的消失
               chartName = $(".chart_nav h5").text();
               console.log(chartName);
            })
         }
      }else{
         $(".chart_nav h5").text("无");
      }
      console.log(chartName);
	})
}
// 接线图 5.4.4获取接线图所有的树形列表.wdr数据
function chart_nav(){
	$.ajax({
	 	url: $url+"/iom_app_server/api/third/getSvgTreeData",
		data:  {url:"pcm/Tree.do",dtype:"图形列表",unitNo:apiNo},
		dataTyp: 'json',
		type: 'get',
		xhrFields:{ // 跨域cookie打开
			withCredentials: true
		},
    	crossDomain: true,
    	success:function(data){
    		var json = (new Function("return " + data))();  // 转换json标准格式
    	// 	console.log(json);
    		$(".chart_nav h2").text(json[0].text);
    		for(var i = 0; i < json[0].children.length; i++){
    			nav_right(json,i)
    		}
    	}
	 })
}
chart_nav();



// 图表
function chart(){
	var myChart = echarts.init(document.getElementById('main'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	    color:['#d87a80','#76d576','#f5a05b','#5bb1ef','#bd94e3','#2dd4d6'],
	    legend: {
	        orient: 'horizontal',
	        x: 'center',
	        y : '75%',
	        itemGap: 5,
	        itemWidth: 10,
	        itemHeight: 5,
	        textStyle: {
	            fontSize: 12,
	        },
	        data:['AB线电压','A相电压','BC线电压','B相电压','CA线电压','C相电压']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        top: '10%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['11:58:32','','11:58:32','','11:58:32','','11:58:32','','11:58:32']
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [
	        {
	            name:'AB线电压',
	            type:'line',
	            stack: '总量',
	            data:[120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
	        },
	        {
	            name:'A相电压',
	            type:'line',
	            stack: '总量',
	            data:[220, 182, 191, 234, 290, 330, 310, 190, 230, 210]
	        },
	        {
	            name:'BC线电压',
	            type:'line',
	            stack: '总量',
	            data:[150, 232, 201, 154, 190, 330, 410, 120, 30, 210]
	        },
	        {
	            name:'B相电压',
	            type:'line',
	            stack: '总量',
	            data:[320, 332, 301, 334, 390, 330, 320, 200, 130, 110]
	        },
	        {
	            name:'CA线电压',
	            type:'line',
	            stack: '总量',
	            data:[820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934]
	        },
	        {
	            name:'C相电压',
	            type:'line',
	            stack: '总量',
	            data:[120, 92, 501, 934, 1290, 1330, 1320,120, 92, 501]
	        }
	    ]
	};
	myChart.setOption(option);
}
chart();
// 时间表
window.onload = function() {
  var show = document.getElementById("time_data");
  setInterval(function() {
	   var time = new Date();
	   // 程序计时的月从0开始取值后+1
	   var m = time.getMonth() + 1;
	   var t = "时间：" + time.getFullYear() + "-" + m + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
	   show.innerHTML ='<h5>状态：正常</h5>' + t;
	  }, 1000);
 };
