// 任务列表事件
// 对应隐患工单点击
function goJobDanger(json,taskDetails){
	$('.news li').click(function(){
		var $this = $(this).index();
		var $orderNo = json.troublePatrolTaskList[$this].orderNo; // 工单编号
		sessionStorage.setItem("orderNo",$orderNo);
		sessionStorage.setItem("taskDetails",taskDetails);
		// console.log($orderNo,taskDetails);
		location.href = "job.html";
	});
}
// 对应检修工单点击
function goJobOverhaul(json,taskDetails){
	$('.news li').click(function(){
		var $this = $(this).index();
		var $orderNo = json.maintainPatrolTaskList[$this].orderNo; // 工单编号
		sessionStorage.setItem("orderNo",$orderNo);
		sessionStorage.setItem("taskDetails",taskDetails);
		// console.log($orderNo,taskDetails);
		location.href = "job.html";
	});
}
// 隐患工单
function danger(json,taskType,taskDetails){
	 for (var i = 0; i < json.troublePatrolTaskList.length; i++){
    	if(taskType==1){							// 已完成
    		$("#unfinished_content h2").text("已完成");
    		$("#unfinished_content h2").css({backgroundImage: "url(../img/icon_confirm.png)"});
        	$(".news").append('<li><span class="news_left"><img src="../img/ywc.png" alt=""></span><p class="time_p">'
        		+json.troublePatrolTaskList[i].startTime+
        		'</p><p class="title_p">'
        		+json.troublePatrolTaskList[i].launchPerson+
        		'</p><p>'
        		+json.troublePatrolTaskList[i].troubleDescription+
        		'</p><p class="p_complete"><span>已完成</span></p></li>');
        }if(taskType==2){							// 巡检中
        	$("#unfinished_content h2").text("巡检中");
    		$("#unfinished_content h2").css({backgroundImage: "url(../img/icon_patrol.png)"});
        	$(".news").append('<li><span class="news_left"><img src="../img/icon_shift_alarm_yellow.png" alt=""></span><p class="time_p">'
        		+json.troublePatrolTaskList[i].startTime+
        		'</p><p class="title_p">'
        		+json.troublePatrolTaskList[i].launchPerson+
        		'</p><p>'
        		+json.troublePatrolTaskList[i].troubleDescription+
        		'</p><p class="p_patrol"><span>巡检中</span></p></li>');
        }if(taskType==3){							// 未完成
        	$("#unfinished_content h2").text("未完成");
    		$("#unfinished_content h2").css({backgroundImage: "url(../img/icon_uncomplete.png)"});
        	$(".news").append('<li><span class="news_left"><img src="../img/icon_shift_alarm_red.png" alt=""></span><p class="time_p">'
        		+json.troublePatrolTaskList[i].startTime+
        		'</p><p class="title_p">'
        		+json.troublePatrolTaskList[i].launchPerson+
        		'</p><p>'
        		+json.troublePatrolTaskList[i].troubleDescription+
        		'</p><p class="p_unfinished"><span>未完成</span></p></li>');
        }

    }
    // 判断是否有数据
    if(json.troublePatrolTaskList.length>0){
    	$("#unfinished_content h3").hide();
    }else{
    	$("#unfinished_content h3").show();
    }
    setTimeout(goJobDanger(json,taskDetails),200) // 执行点击事件
}
// 检修工单
function overhaul(json,taskType,taskDetails){
	 for (var i = 0; i < json.maintainPatrolTaskList.length; i++){
    	if(taskType==1){							// 已完成
    		$("#unfinished_content h2").text("已完成");
    		$("#unfinished_content h2").css({backgroundImage: "url(../img/icon_confirm.png)"});
        	$(".news").append('<li><span class="news_left"><img src="../img/ywc.png" alt=""></span><p class="time_p">'
        		+json.maintainPatrolTaskList[i].startTime+
        		'</p><p class="title_p">'
        		+json.maintainPatrolTaskList[i].launchPerson+
        		'</p><p>'
        		+json.maintainPatrolTaskList[i].overhaulContent+
        		'</p><p class="p_complete"><span>已完成</span></p></li>');
        }if(taskType==2){							// 巡检中
        	$("#unfinished_content h2").text("巡检中");
    		$("#unfinished_content h2").css({backgroundImage: "url(../img/icon_patrol.png)"});
        	$(".news").append('<li><span class="news_left"><img src="../img/icon_shift_alarm_yellow.png" alt=""></span><p class="time_p">'
        		+json.maintainPatrolTaskList[i].startTime+
        		'</p><p class="title_p">'
        		+json.maintainPatrolTaskList[i].launchPerson+
        		'</p><p>'
        		+json.maintainPatrolTaskList[i].overhaulContent+
        		'</p><p class="p_patrol"><span>巡检中</span></p></li>');
        }if(taskType==3){							// 未完成
        	$("#unfinished_content h2").text("未完成");
    		$("#unfinished_content h2").css({backgroundImage: "url(../img/icon_uncomplete.png)"});
        	$(".news").append('<li><span class="news_left"><img src="../img/icon_shift_alarm_red.png" alt=""></span><p class="time_p">'
        		+json.maintainPatrolTaskList[i].startTime+
        		'</p><p class="title_p">'
        		+json.maintainPatrolTaskList[i].launchPerson+
        		'</p><p>'
        		+json.maintainPatrolTaskList[i].overhaulContent+
        		'</p><p class="p_unfinished"><span>未完成</span></p></li>');
        }

    }
    // 判断是否有数据
    if(json.maintainPatrolTaskList.length>0){
    	$("#unfinished_content h3").hide();
    }else{
    	$("#unfinished_content h3").show();
    }
    setTimeout(goJobOverhaul(json,taskDetails),200) // 执行点击事件
}
// 创建开始时间的组件
var calendardatetime = new lCalendar();
calendardatetime.init({
	'trigger': '#star',
	'type': 'datetime'
});
// 创建结束时间的组件
var calendardatetime2 = new lCalendar();
calendardatetime2.init({
	'trigger': '#end',
	'type': 'datetime'
});
$('#working li').click(function(){
	location.href = "job.html";
});
// 5.5.2巡检任务列表
function unfinished(){
	var taskType = $("#task_type").val();                  // 巡检类型
  var taskDetails = $("#task_details").val();             // 工单详情
	var tTime = new Date();                                     // 今天时间
	var tMonth = ("0"+(tTime.getMonth()+ 1)).slice(-2);         // 今天月份
	var tDay = ("0"+tTime.getDate()).slice(-2);                 // 今天日期

	var yTime = new Date(new Date()-24*60*60*1000);             // 昨天时间
	var yMonth = ("0"+(yTime.getMonth()+ 1)).slice(-2);         // 昨天月份
	var yDay = ("0"+yTime.getDate()).slice(-2);                 // 昨天日期

	// calendardatetime.trigger.value;						// 开始时间
	// calendardatetime2.trigger.value;						// 结束时间
	calendardatetime.trigger.value = yTime.getFullYear() + "-" + yMonth + "-" + yDay+" 00:00";
	calendardatetime2.trigger.value = tTime.getFullYear() + "-" + tMonth + "-" + tDay+" 00:00";

	// 请求数据
	function send(taskDetails,taskType){
		$.ajax({
	        url: $url+"iom_app_server/api/order/patrolTaskList",
	        data: {
				"orderStatus":taskDetails,
				"patrolType":taskType,
				"startTime":calendardatetime.trigger.value+":00",
				"endTime":calendardatetime2.trigger.value+":00",
				"start":0,
				"limit":10
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
	            if(taskDetails==1){
	            	danger(json,taskType,taskDetails);
	            }if(taskDetails==2){
	            	overhaul(json,taskType,taskDetails);
	            }

	        }
	    })
	}send(taskDetails,taskType);

	// 查询按钮
	$("#find").click(function(){
		taskType = $("#task_type").val();
		taskDetails = $("#task_details").val();
		// console.log(taskType,taskDetails,calendardatetime.trigger.value+":00",calendardatetime2.trigger.value+":00");
		$(".news").html("");
		send(taskDetails,taskType);
	})
	// 重置按钮
	$("#reset").click(function(){
		$("#task_type").val("0");
		$("#task_details").val("0");
		calendardatetime.trigger.value= tDay;
		calendardatetime2.trigger.value= yDay;
	})
}
unfinished();
