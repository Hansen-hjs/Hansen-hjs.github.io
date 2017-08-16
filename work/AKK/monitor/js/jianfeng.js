// 多选列表事件
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
    // 展开三级菜单列表
    $('.test_nav h6').click(function(){ 
        $('.list_ul').hide();
        $('.h6_ul').show();
    });
    $(document).bind("click",function(e){
        //class为list_ul的是菜单，class为test_nav的是打开菜单的按钮            
        if($(e.target).closest(".list_ul").length == 0 && $(e.target).closest(".test_nav").length == 0){
            //点击 class为list_ul 之外且class不是不是test_nav，则触发
            $('.list_ul').hide();
        }
    });
}
// 设备编号保存
var deviceno = 0;
// 5.4.1获取实时监测左侧树
function testNav(){
     $.ajax({
        url: $url+"/iom_app_server/api/third/getTreeData",
            data:  {url:"pcm/Tree.do",dtype:"设备列表"},
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
                    $(".h4_ul").append("<li>"+json[0].children[i].text+"</li>");
                    $('.h4_ul li').click(function(){ // 一级菜单点击
                        list();
                        var $list_h4 = $(this).text();
                        $('.test_nav h4').text($list_h4);
                        $('.h4_ul').hide(); // 当前的消失
                        $('.h5_ul').show(); // 对应的显示
                        var $h4 = $(this).index();  //当前选项
                        $(".h5_ul").html(""); // 先清空选项                      
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
                                    deviceno = json[0].children[$h4].children[$h5].id;
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
                                                var $h6 = $(this).index(); 
                                                deviceno = json[0].children[$h4].children[$h5].children[$h6].id;
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
                // console.log(json[0].children.length);
            }
     })
}testNav();
// 时间按钮切换功能
function dataSwitch(){
    var yTime = new Date(new Date()-24*60*60*1000);             // 昨天时间
    var yMonth = ("0"+(yTime.getMonth()+ 1)).slice(-2);         // 昨天月份
    var yDay = ("0"+yTime.getDate()).slice(-2);                 // 昨天日期
    var tTime = new Date();                                     // 今天时间
    var tMonth = ("0"+(tTime.getMonth()+ 1)).slice(-2);         // 今天月份
    var tDay = ("0"+tTime.getDate()).slice(-2);                 // 今天日期
    var bg;                                     // 开始时间
    var end;                                    // 开始时间
    $(".time_ul li").click(function(){
        var timeIndex = $(this).index();
        $(this).addClass('li_hover').siblings().removeClass('li_hover');
        if (timeIndex == 0) {                   //  昨日按钮
            bg = yTime.getFullYear()+"-"+yMonth+"-"+yDay;
            end = tTime.getFullYear()+"-"+tMonth+"-"+tDay;
        }if(timeIndex == 1){                    // 上月按钮
            bg = tTime.getFullYear()+"-"+tTime.getMonth()+"-01";
            end = tTime.getFullYear()+"-"+tMonth+"-01";
        }if(timeIndex == 2){                    // 本月按钮
            bg = tTime.getFullYear()+"-"+tMonth+"-01";
            end = tTime.getFullYear()+"-"+tMonth+"-"+yDay;
        }if(timeIndex == 3){                    // 今年按钮
            bg = tTime.getFullYear()+"-01-01";
            end = tTime.getFullYear()+"-"+tMonth+"-"+yDay;;
        }
        console.log(deviceno,bg,end);
        send(deviceno,bg,end);
    })
}
dataSwitch();
// 发送请求
function send(navText,bg,end){
    $.ajax({
        url: $url+"iom_app_server/api/third/getData",
        data:  {"url":"app/FAST!getPinggupeakByDeviceNoAndTimeAndUnitid.do","deviceno":deviceno,"bg":bg,"end":end},
        dataTyp: 'json',
        type: 'get',
        xhrFields:{ // 跨域cookie打开
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            var json = (new Function("return " + data))();  // 转换json标准格式
            console.log(json);
            // 总电费
            var cost = (json.data[0].value*json.data[0].price+json.data[1].value*json.data[1].price+json.data[2].value*json.data[2].price).toFixed(2);
            
            if (json.data.length > 0) {
                electricity(json);                                      // 电量
                fees(json,cost);                                        // 电费
                trend(json);                                            // 累计趋势
                $("#summary_form").html("");
                $("#summary_form").append('<ul class="flex summary_text"><li class="f1">'
                    +json.data[0].name+
                    '</li><li class="f1">'
                    +json.data[0].value+
                    '</li><li class="f1">'
                    +json.data[0].price+
                    '</li><li class="f1">'
                    +(json.data[0].price*json.data[0].value).toFixed(2)+
                    '</li></ul><ul class="flex summary_text"><li class="f1">'
                    +json.data[1].name+
                    '</li><li class="f1">'
                    +json.data[1].value+
                    '</li><li class="f1">'
                    +json.data[1].price+
                    '</li><li class="f1">'
                    +(json.data[1].price*json.data[1].value).toFixed(2)+
                    '</li></ul><ul class="flex summary_text"><li class="f1">'
                    +json.data[2].name+
                    '</li><li class="f1">'
                    +json.data[2].value+
                    '</li><li class="f1">'
                    +json.data[2].price+
                    '</li><li class="f1">'
                    +(json.data[2].price*json.data[2].value).toFixed(2)+
                    '</li></ul><ul class="flex summary_text"><li class="f1">'
                    +json.data[4].name+
                    '</li><li class="f1">'
                    +json.data[4].value+
                    '</li><li class="f1">'
                    +json.data[4].price+
                    '</li><li class="f1">'
                    +(json.data[4].price*json.data[4].value).toFixed(2)+
                    '</li></ul><ul class="flex summary_text"><li class="f1">'
                    +json.data[3].name+
                    '</li><li class="f1">'
                    +json.data[3].value+
                    '</li><li class="f1">'
                    +json.data[3].price+
                    '</li><li class="f1">'
                    +cost+
                    '</li></ul>')
            }else{
                $("#electricity h6").text("暂无数据");
                $("#fees h6").text("暂无数据");
                $("#trend h6").text("暂无数据");
            }
           
        }
    })
}
//尖峰平谷
function trend(json){
    var myChart = echarts.init(document.getElementById('trend'));
    option = {
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 20,
            y2: 20,
            x:50
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['峰', '平', '谷', '未统计', '峰', '平', '谷']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: true
            }
        ],
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#d87a80','#2ec7c9','#48acf8','#fcea1b',
                              '#d87a80','#2ec7c9','#48acf8'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: [json.data[0].value,json.data[1].value,json.data[2].value,json.data[4].value,json.data[0].value*json.data[0].price,json.data[1].value*json.data[1].price,json.data[2].value*json.data[2].price],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function(params){
                            return '<img src="' 
                                    + params.data.symbol.replace('image://', '')
                                    + '"/>';
                        }
                    },
                    data: [
                        {xAxis:0, y: 350,symbol: 'image://../asset/ico/折线图.png'},
                        {xAxis:1, y: 350, symbol: 'image://../asset/ico/柱状图.png'},
                        {xAxis:2, y: 350, symbol: 'image://../asset/ico/散点图.png'},
                        {xAxis:3, y: 350, symbol: 'image://../asset/ico/K线图.png'},
                        {xAxis:4, y: 350, symbol: 'image://../asset/ico/饼状图.png'},
                        {xAxis:5, y: 350, symbol: 'image://../asset/ico/雷达图.png'},
                        {xAxis:6, y: 350,symbol: 'image://../asset/ico/和弦图.png'},
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}
// 电量
function electricity(json){
    var myChart2 = echarts.init(document.getElementById('electricity'));
    option2 = {
        title: {
            text: json.data[3].value+'kWh',
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
            y : '88%',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 5,
            textStyle: {
                fontSize: 12,
            },
            data:[json.data[0].name,json.data[1].name,json.data[2].name,json.data[4].name]
        },
        color:['rgb(46,199,201','rgb(72,172,248','rgb(252,234,27','rgb(216,122,128'],
        series: [
            {
                type:'pie',
                radius: ['60%', '80%'],
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
                data:[
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

// 电费
function fees(json,cost){
    var myChart3 = echarts.init(document.getElementById('fees'));
    option3 = {
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
            y : '88%',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 5,
            textStyle: {
                fontSize: 12,
            },
            data:[json.data[0].name,json.data[1].name,json.data[2].name,json.data[4].name]
        },
        color:['rgb(46,199,201','rgb(72,172,248','rgb(252,234,27','rgb(216,122,128'],
        series: [
            {
                type:'pie',
                radius: ['60%', '80%'],
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
                data:[
                    {value:json.data[0].value,name:json.data[0].name},
                    {value:json.data[1].value,name:json.data[1].name},
                    {value:json.data[2].value,name:json.data[2].name},
                    {value:json.data[4].value,name:json.data[4].name}
                ]
            }
        ]
    };
    myChart3.setOption(option3);
}
