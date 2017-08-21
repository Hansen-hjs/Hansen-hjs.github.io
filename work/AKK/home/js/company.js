$('.analysis i').click(function(){
    location.href = "../event/event.html";
});
// 获取首页的数据
var apiNoclass = sessionStorage.getItem("apiNoclass");
var entryId = sessionStorage.getItem("entryId");
var enterpriseName = sessionStorage.getItem("enterpriseName");
var teskId = sessionStorage.getItem("teskId");
console.log(apiNoclass);
// console.log(enterpriseName);
// console.log(teskId);
$('.top_class').html(enterpriseName); // 标题
if(entryId!="undefined"){
   warning();
}if(entryId=="undefined"){
   console.log("");
}
// 报警信息
function warning(){
   $.ajax({
      url: $url+"iom_app_server/api/third/getData",
        data: {
        	"url":"/app/event!getUnconfirmedEventCount.do",
        	"unitid":entryId
        },
        dataTyp: "json",
        type: "get",
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
        	var json = (new Function("return" + data))();  // 转换json标准格式
        	console.log(json,entryId);
            $("#uncomfirmed").text(json.all);
            $("#comfirmed").text(json.allconfirmed);
        }
   })
}

// 电能分析
function electric(){
    var time = new Date(new Date()-24*60*60*1000);
    var y_time = new Date(new Date()-24*60*60*1000*2);        // 昨天时间
    var t = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();  // 今天
    var y = y_time.getFullYear() + "-" + (y_time.getMonth() + 1) + "-" + y_time.getDate(); // 昨天
    // console.log(y)

    var Time = {
            "url":"/app/power!getClassPG.do",
            "unitno": apiNoclass,
            "bgdate": y,
            "enddate": t
        }
    $.ajax({
        url: $url+"iom_app_server/api/third/getData",
        data:  Time,
        dataTyp: 'json',
        type: 'post',
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            var json = (new Function("return " + data))();  // 转换json标准格式
            console.log(json);
            if (json.data.length > 0) {         //  有数据的时候开始执行图表计算
                ammeter(json);                          // 第一个图表（电量）
                price(json);                            // 第二个图表（电费）
            }else{                                      //  没有数据时候显示文字
                $("#ammeter h2").text("暂无数据");
                $("#price h2").text("暂无数据");
            }
        }
    })
}
electric();
// 巡检任务
function task(){
    $.ajax({
        url: $url+"iom_app_server/api/order/getInformInfo",
        data: "enterpriseId="+teskId,
        dataTyp: "json",
        type: "get",
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            var json = (new Function("return " + data))();  // 转换json标准格式
            console.log(json);
            $("#alreadyAccomplish").text(json.alreadyAccomplish);
            $("#notAccomplish").text(json.notAccomplish);
            $("#patrolCentre").text(json.patrolCentre);
        }
    })
}
task(teskId);
// 用电量图表
function ammeter(json){
    var myChart = echarts.init(document.getElementById('ammeter'));
    option = {
        title: {
            text: json.data[3].value+'kWh', // 36913.5kWh
            x: 'center',
            y: '35%',
            itemGap: 5,
            textStyle : {
                color : 'rgb(0,0,0)',
                fontFamily : '微软雅黑',
                fontSize : 16,
                fontWeight : ''
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y : '85%',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 5,
            textStyle: {
                fontSize: 12,
            },
            data: [json.data[0].name,json.data[1].name,json.data[2].name,json.data[4].name]
            // ["峰", "平", "谷", "总电量", "未统计电量"]
            // nameTest

        },
        color:['rgb(46,199,201','rgb(72,172,248','rgb(252,234,27','rgb(216,122,128'],
        series: [
            {
                type:'pie',
                radius: ['70%', '90%'],
                center:['50%','40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'normal'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:
                    [
                        {value:json.data[0].value,name:json.data[0].name},
                        {value:json.data[1].value,name:json.data[1].name},
                        {value:json.data[2].value,name:json.data[2].name},
                        {value:json.data[4].value,name:json.data[4].name}
                    ]
                    // valueTest
            }
        ]
    };
    myChart.setOption(option);
}
// 电费图表
function price(json){
    var cost = (json.data[0].value*json.data[0].price+json.data[1].value*json.data[1].price+json.data[2].value*json.data[2].price).toFixed(2);
    var myChart2 = echarts.init(document.getElementById('price'));
    option2 = {
        title: {
            text: cost+'元',
            x: 'center',
            y: '35%',
            itemGap: 5,
            textStyle : {
                color : 'rgb(0,0,0)',
                fontFamily : '微软雅黑',
                fontSize : 16,
                fontWeight : ''
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y : '85%',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 5,
            textStyle: {
                fontSize: 12,
            },
            data: [json.data[0].name,json.data[1].name,json.data[2].name,json.data[4].name]
            // ['平','谷','未统计','峰']
        },
        color:['rgb(46,199,201','rgb(72,172,248','rgb(252,234,27','rgb(216,122,128'],
        series: [
            {
                type:'pie',
                radius: ['70%', '90%'],
                center:['50%','40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'normal'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:
                [
                    {value:json.data[0].value,name:json.data[0].name},
                    {value:json.data[1].value,name:json.data[1].name},
                    {value:json.data[2].value,name:json.data[2].name},
                    {value:json.data[4].value,name:json.data[4].name}
                ]
            }
        ]
    };
    myChart2.setOption(option2);
}
// 最新事件
function newEvent(apiNoclass){
     var eventData = {
        "url":"/app/event!searchEventsByUnit.do",
        "unitno": apiNoclass,
        "bg": "0",
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
            // console.log(json);

            for (var i = 0; i < json.data.length; i++) {
                var titleText = json.data[i].object.substr(12);
                $(".news").append('<li><span><i></i></span><p class="time_p">'+json.data[i].time+'</p><p class="title_p">'+titleText+'</p><p>'+json.data[i].data+'</p></li>');
            }
        }
    })
}newEvent(apiNoclass);
