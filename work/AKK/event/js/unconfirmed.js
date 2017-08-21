// 5.7.2获取事件类型列表
function option(){
	$.ajax({
		url: $url+"iom_app_server/api/third/getData",
        data: {
        	"url":"/app/event!getEventsTypeList.do",
        },
        dataTyp: "json",
        type: "get",
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
        	var json = (new Function("return" + data))();  // 转换json标准格式
        	// console.log(json.data);
        	for(var i = 0; i < json.data.length; i++){
        		$("#task_type").append('<option value ='+json.data[i].no+'>'+json.data[i].name+'</option>')
        	}
        }
	})
}
option();
var calendardatetime = new lCalendar();
calendardatetime.init({
	'trigger': '#star',
	'type': 'date'
});

var calendardatetime2 = new lCalendar();
calendardatetime2.init({
	'trigger': '#end',
	'type': 'date'
});
// 确认
function confirm(json,taskDetails){
	for(var i = 0; i < json.data.length; i++){
		if(taskDetails==0){
			$("#unconfirmed_content h2").text("已确认事件");
    		$("#unconfirmed_content h2").css({backgroundImage: "url(../img/icon_confirm.png)"});
    		$(".news").append('<li><span class="news_left"><img src="../img/ywc.png" alt=""></span><p class="time_p">'
        		+json.data[i].time+
        		'</p><p class="title_p">'
        		+json.data[i].object+
        		'</p><p>'
        		+json.data[i].data+
        		'</p><p class="p_complete"><span>已确认</span></p></li>');
		}else{
			$("#unconfirmed_content h2").text("未确认事件");
    		$("#unconfirmed_content h2").css({backgroundImage: "url(../img/icon_unconfirmed.png)"});
    		$(".news").append('<li><span class="news_left"><img src="../img/icon_shift_alarm_red.png" alt=""></span><p class="time_p">'
        		+json.data[i].time+
        		'</p><p class="title_p">'
        		+json.data[i].object+
        		'</p><p>'
        		+json.data[i].data+
        		'</p><p class="p_unconfirmed"><span>未确认</span></p></li>');
		}
	}
	// 判断是否有数据
    if(json.data.length > 0){
    	$("#unconfirmed_content h3").hide();
    }else{
    	$("#unconfirmed_content h3").show();
    }
}

	const userID = sessionStorage.getItem("userID");  // 用户ID

	let taskType = $("#task_type").val();                  // 巡检类型
   let taskDetails = $("#task_details").val();             // 工单详情
	let tTime = new Date();                                     // 今天时间
	let tMonth = ("0"+(tTime.getMonth()+ 1)).slice(-2);         // 今天月份
	let tDay = ("0"+tTime.getDate()).slice(-2);                 // 今天日期

	let yTime = new Date(new Date()-24*60*60*1000);             // 昨天时间
	let yMonth = ("0"+(yTime.getMonth()+ 1)).slice(-2);         // 昨天月份
	let yDay = ("0"+yTime.getDate()).slice(-2);                 // 昨天日期

	// calendardatetime.trigger.value;						// 开始时间
	// calendardatetime2.trigger.value;						// 结束时间
	calendardatetime.trigger.value = yTime.getFullYear() + "-" + yMonth + "-" + yDay;
	calendardatetime2.trigger.value = tTime.getFullYear() + "-" + tMonth + "-" + tDay;
	let bgsize = 0;	// 初始化条数值
    // 请求数据
	function send(taskDetails,taskType){
		$.ajax({
	        url: $url+"iom_app_server/api/third/getData",
	        data: {
	        	"url":"/app/event!getEventsByDeviceBetween.do",
	        	"unitno":userID,
				"isconfirmed":taskDetails,
				"type":taskType,
				"bgdate":calendardatetime.trigger.value+" 00:00",
				"enddate":calendardatetime2.trigger.value+" 00:00",
				"bgsize":bgsize,
				"len":10,
				"devicename":""
	        },
	        dataTyp: "json",
	        type: "get",
	        xhrFields:{ // 跨域cookie打开
	            withCredentials: true
	        },
	        crossDomain: true,
	        success:function(data){
	            var json = (new Function("return" + data))();  // 转换json标准格式
	            if(taskDetails==0){
	            	confirm(json,taskDetails);
	            }else{
	            	confirm(json,taskDetails)
	            	list_click(json);
	            }
	        }
	    })
	}send(taskDetails,taskType);
	// 滑动到底部时增加条数
	$(window).scroll(function() {
		 if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
 				$.ajax({
 			        url: $url+"iom_app_server/api/third/getData",
 			        data: {
 			        	"url":"/app/event!getEventsByDeviceBetween.do",
 			        	"unitno":userID,
 						"isconfirmed":taskDetails,
 						"type":taskType,
 						"bgdate":calendardatetime.trigger.value+":00",
 						"enddate":calendardatetime2.trigger.value+":00",
 						"bgsize":bgsize,
 						"len":10,
 						"devicename":""
 			        },
 			        dataTyp: "json",
 			        type: "get",
 			        xhrFields:{ // 跨域cookie打开
 			            withCredentials: true
 			        },
 			        crossDomain: true,
 			        success:function(data){
 			            var json = (new Function("return" + data))();  // 转换json标准格式
 			            console.log(json);
							if(json.data.length>0){
	 			            if(taskDetails==0){
	 			            	confirm(json,taskDetails);
	 			            }else{
	 			            	confirm(json,taskDetails);
									list_click(json)
	 			            }
	 							bgsize += json.data.length
 								console.log(bgsize);
							}else{
								$(".msg").text("没有数据了");
								boxShow()
							}
 			        }
 			    })
		}
	});
	// 查询按钮
	$("#find").click(function(){
		bgsize = 0;
		taskType = $("#task_type").val();
		taskDetails = $("#task_details").val();
		$(".news").html("");
		send(taskDetails,taskType);
	})
	// 重置按钮
	$("#reset").click(function(){
		$("#task_type").val("0");
		$("#task_details").val("0");
		calendardatetime.trigger.value = yTime.getFullYear() + "-" + yMonth + "-" + yDay;
		calendardatetime2.trigger.value = tTime.getFullYear() + "-" + tMonth + "-" + tDay;
		$("#unconfirmed_content").html("");
	})


// 5.7.3确认事件
function warnning(noNum){
	$.ajax({
		url: $url+"iom_app_server/api/third/getData",
        data: {
        	"url":"/app/event!updateEvents.do",
        	"no":noNum
        },
        dataTyp: "json",
        type: "get",
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
        	var json = (new Function("return" + data))();  // 转换json标准格式
            console.log(json);
            if(json.data==""){
					$(".msg").text(json.msg);
					boxShow()
            }else{
					$(".msg").text(json.data);
					boxShow()
            }

        }
	})
}
// 点击列表事件
function list_click(json){
	$(".news li").click(function(){
		let list_index = $(this).index();
		let newsIndex = $(this).index();
		if(newsIndex >= json.data.length){
			newsIndex -= (bgsize-json.data.length)
		}
		if(newsIndex >= 0){
			noNum = json.data[newsIndex].no;
  	    	warnning(noNum);
		}else{
			$(".msg").text("你已经点过了");
			boxShow()
		}
	    $(".p_unconfirmed span").eq(newsIndex).text("已确认").css({background:"#48acf8"});
	})
}
// 提示框动画出现
function boxShow(){
	$(".msg").css({opacity:1,zIndex:1})
	setTimeout(function(){
		$(".msg").css({opacity:0,zIndex:"-10"})
	},1000)
}
