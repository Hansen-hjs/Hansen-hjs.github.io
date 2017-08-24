// 巡检任务已完成
$('#complete').click(function(){
	location.href = "complete.html";
});
// 巡检任务巡检中
$('#patrol').click(function(){
	location.href = "patrol.html";
});
// 巡检任务未完成
$('#unfinished').click(function(){
	location.href = "unfinished.html";
});
// 巡检任务已确认
$('#confirm').click(function(){
	location.href = "confirm.html";
});
// 巡检任务未确认
$('#unconfirmed').click(function(){
	location.href = "unconfirmed.html";
});
// 获取首页的数据
var userID = sessionStorage.getItem("userID");  // 用户ID
var teskId = sessionStorage.getItem("teskId");
// var unApino = sessionStorage.getItem("unApino"); 	// 未确认数字
var un = sessionStorage.getItem("un");		// 首页传过来的值 未确认
var com = sessionStorage.getItem("com");		// 首页传过来的值 已确认
// console.log(un,com);

$("#confirm h4").text(com);
$("#unconfirmed h4").text(un);
// 5.3.5获取一个企业下的未确认事件数据
// function unconfirmed(){
// 	$.ajax({
// 		url: $url+"iom_app_server/api/third/getData",
//         data: {
//         	"url":"/app/event!getUnconfirmedEventCount.do",
//         	"unitid":unApino
//         },
//         dataTyp: "json",
//         type: "get",
//         xhrFields:{ // 跨域cookie打开
//             withCredentials: true
//         },
//         crossDomain: true,
//         success:function(data){
//         	var json = (new Function("return" + data))();  // 转换json标准格式
//        	//  	console.log(json);
//         		$("#unconfirmed h4").text(json.all);
//             $("#confirm h4").text(json.allconfirmed);
//             newsChart(json)
//         }
// 	})
// }
// unconfirmed()
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
            	alert(json.msg);
            }else{
            	alert(json.data);
            }

        }
	})
}
let bg = 0;  // 初始化开始条数
// 最新事件
function newEvent(userID){
     var eventData = {
        "url":"/app/event!searchEventsByUnit.do",
        "unitid": userID,
        "bg": bg,
        "len": "10"
    }
    $.ajax({
        url:  $url+"iom_app_server/api/third/getData",
        data: eventData,
        dataTyp: 'json',
        type: 'post',
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            var json = (new Function("return " + data))();  // 转换json标准格式
            for (var i = 0; i < json.data.length; i++) {
                var titleText = json.data[i].object.substr(12);
                $(".news_list").append('<li><span><i></i></span><p class="time_p">'+json.data[i].time+'</p><p class="title_p">'+titleText+'</p><p>'+json.data[i].data+'</p></li>');
            }
            $(".news_list li").click(function(){
	        		var newsIndex = $(this).index();
	        		noNum = json.data[newsIndex].no;
	                // sessionStorage.setItem("noNum",noNum);
	        		warnning(noNum)
	        	})
				bg += 10;
				console.log(json,bg);
        }
    })
}
newEvent(userID);
// 滑动到底部时增加条数
$(window).scroll(function() {
	 if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
		newEvent(userID);
	}
});

// 巡检任务
function task(){
    $.ajax({
        url: $url+"iom_app_server/api/order/getInformInfo",
        data: "", 			// "enterpriseId="+teskId
        dataTyp: "json",
        type: "get",
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            var json = (new Function("return " + data))();  // 转换json标准格式
            // console.log(json);
            $("#complete h4").text(json.alreadyAccomplish);
            $("#patrol h4").text(json.patrolCentre);
            $("#unfinished h4").text(json.notAccomplish);
            var standard = json.alreadyAccomplish + json.patrolCentre + json.notAccomplish;  	// 总值 Math.round(x)取整
            var completePercentage =  Math.round(json.alreadyAccomplish / standard * 100);    // 已完成的百分比
            var patrolPercentage =  Math.round(json.patrolCentre / standard * 100);			  // 巡检中的百分比
            var unfinishedPercentage =  Math.round(json.notAccomplish / standard * 100);	  // 未完成的百分比
            // console.log(completePercentage,patrolPercentage,unfinishedPercentage);
            if(standard > 0){
            	inspection(standard,completePercentage,patrolPercentage,unfinishedPercentage,json);	// 图表
            }else{
            	$("#task h2").text("暂无数据");
            }

        }
    })
}
task();
// 巡检任务图表
function inspection(standard,completePercentage,patrolPercentage,unfinishedPercentage,json){
	var myChart = echarts.init(document.getElementById('task'));
	var dataStyle = {
	    normal: {
	        label: {show:false},
	        labelLine: {show:false}
	    }
	};
	var placeHolderStyle = {
	    normal : {
	        color: 'rgba(0,0,0,0)',
	        label: {show:false},
	        labelLine: {show:false}
	    },
	    emphasis : {
	        color: 'rgba(0,0,0,0)'
	    }
	};
	option = {
	    title: {
	        text: '巡检任务',
	        x: 'center',
	        y: 'center',
	        itemGap: 20,
	        textStyle : {
	            color : 'rgb(72,172,248)',
	            fontFamily : '微软雅黑',
	            fontSize : 15,
	            fontWeight : 'bolder'
	        }
	    },
	    tooltip : {
	        show: true,
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    color:['rgb(72,172,248','rgb(3,207,166','rgb(245,155,39'],
	    legend: {
	        orient : 'vertical',
	        x : '90',
	        y : 0,
	        itemGap: 0,
	        itemWidth: 10,
	        itemHeight: 5,
	        textStyle: {
	            fontSize: 12,
	        },
	        data:[completePercentage + '%已完成',patrolPercentage + '%巡检中',unfinishedPercentage + '%未完成']
	    },
	    series : [
	        {
	            name:'1',
	            type:'pie',
	            clockWise:false,
	            radius : [62, 75],
	            itemStyle : dataStyle,
	            data:[
	                {
	                    value:json.alreadyAccomplish,
	                    name:completePercentage + '%已完成'
	                },
	                {
	                    value: standard - json.alreadyAccomplish,
	                    name:'invisible',
	                    itemStyle : placeHolderStyle
	                }
	            ]
	        },
	        {
	            name:'2',
	            type:'pie',
	            clockWise:false,
	            radius : [50, 62],
	            itemStyle : dataStyle,
	            data:[
	                {
	                    value:json.patrolCentre,
	                    name:patrolPercentage + '%巡检中'
	                },
	                {
	                    value: standard - json.patrolCentre,
	                    name:'invisible',
	                    itemStyle : placeHolderStyle
	                }
	            ]
	        },
	        {
	            name:'3',
	            type:'pie',
	            clockWise:false,
	            radius : [37, 50],
	            itemStyle : dataStyle,
	            data:[
	                {
	                    value:json.notAccomplish,
	                    name:unfinishedPercentage + '%未完成'
	                },
	                {
	                    value: standard - json.notAccomplish,
	                    name:'invisible',
	                    itemStyle : placeHolderStyle
	                }
	            ]
	        }
	    ]
	};
	myChart.setOption(option);
}

// 最新事件图表
function newsChart(un,com){
    var myChart2 = echarts.init(document.getElementById('warning'));
    option2 = {
        title: {
            text: '报警信息',
            x: 'center',
            y: 'center',
            itemGap: 5,
            textStyle : {
                color : 'rgb(72,172,248)',
                fontFamily : '微软雅黑',
                fontSize : 15,
                fontWeight : 'bolder'
            }
        },
        color:['rgb(245,155,39','rgb(72,172,248'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show:false,
            orient: 'vertical',
            x: 'left',
            data:['已确认','未确认']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '16',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:un, name:'已确认'},
                    {value:com, name:'未确认'}
                ]
            }
        ]
    };
    myChart2.setOption(option2);
}
newsChart(un,com);
