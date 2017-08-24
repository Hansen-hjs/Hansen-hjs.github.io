// 监测类型
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    freeMode: true
});
// 创建开始时间的组件
var calendardatetime = new lCalendar();
calendardatetime.init({
    'trigger': '#star',
    'type': 'date'
});
// 初始化时间
function time(){
    var yTime = new Date(new Date()-24*60*60*1000);             // 昨天时间
    var yMonth = ("0"+(yTime.getMonth()+ 1)).slice(-2);         // 昨天月份
    var yDay = ("0"+yTime.getDate()).slice(-2);                 // 昨天日期
    calendardatetime.trigger.value = yTime.getFullYear() + "-" + yMonth + "-" + yDay;
}time();
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
    $(document).bind("click",function(e){
        //class为list_ul的是菜单，class为test_nav的是打开菜单的按钮
        if($(e.target).closest(".list_ul").length == 0 && $(e.target).closest(".test_nav").length == 0){
            //点击 class为list_ul 之外且class不是不是test_nav，则触发
            $('.list_ul').hide();
        }
    });
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
                // console.log(json);
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

// 按钮切换功能
function dataSwitch(){
    var myTime = calendardatetime.trigger.value.split("-"); //  日期
    var navText;                                // 定义最终选择字符
    // 监测类型按钮
    function btn(){
      let h5_text = $('.test_nav h5').text(); // 第二季字符
      let h4_text = $('.test_nav h4').text();
      if (h5_text == "无") {
           navText = h4_text;                  // 第二级字符传到最终字符
      }else{
           navText = h5_text;                  // 第三级字符传到最终字符
      }
    }
    var navLi;                                  // 请求变量
    // 图表title
    var chart_name = [];
    // 图表天数
    var chart_day = [];
    // 图表value
    var chart_value = [];
    // 按钮值
    var btnIndex = 0;
    // 监测类型ajax提交
    function monitoring(navLi,btnIndex){
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
               // 对象的长度
                var jsonLength = 0;
                for(var item in json.data[0]){
                   jsonLength++;
                }
                  // 获取图表名称
                 chart_name = [];    // 先清空
                 for (let i = 0; i < json.data.length; i++) {
                     let myList = json.data[i].variablename.split(".");
                     chart_name.push(myList[1]);
                 }
                 // 图表天数
                 chart_day = [];
                 for(let i = 1; i < jsonLength;i++){
                    chart_day.push(i);
                 }
                 // 定义一个数组存放
                 let json_value = [];
                 json.data.forEach(function(dataItem, index) {
                   let keyArr = Object.keys(dataItem);
                  //   去掉variablename的值
                    keyArr.splice(keyArr.indexOf('variablename'), 1);
                    json_value['data_value' + (index + 1)] = [];
                    for(let key of keyArr) {
                         // console.log(key, dataItem[key]);
                        json_value['data_value' + (index + 1)].push(dataItem[key]);
                    }
                 });
                 // 最终得出data_value
                 chart_value = [];
                 chart_name.forEach(function(item, index) {
                    chart_value.push({
                      name: item,
                      type: 'line',
                      data: json_value['data_value' + (index + 1)]
                    })
                 });
               //   console.log(json,chart_name,chart_day,chart_value);
               montchart(chart_name,chart_day,chart_value)
            }
        })
    }

    // 电压按钮
    $(".test_Dcontent li").click(function(){
        $(this).addClass('li_hover').siblings().removeClass('li_hover');
        btnIndex = $(this).index();
      //   console.log(btnIndex);
        class_btn();
     })
    // 按钮功能
    function class_btn(){
      // 电压
      if (btnIndex == 0) {
         btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
        navLi = {
           "url":"app/MAC!getHistoryByMonthInAvg.do",
           "year":myTime[0],
           "month":myTime[1],
           "name":
           navText+".A相电压;"
           +navText+".B相电压;"
           +navText+".C相电压;"
           +navText+".AB线电压;"
           +navText+".BC线电压;"
           +navText+".CA线电压;"
        }
        monitoring(navLi,btnIndex);
      }
      // 电流按钮
      if (btnIndex == 1) {
         btn();                      // 获取最终字符
         myTime = calendardatetime.trigger.value.split("-");
         navLi = {
             "url":"app/MAC!getHistoryByMonthInAvg.do",
             "year":myTime[0],
             "month":myTime[1],
             "name": navText+".A相电流;"
             +navText+".B相电流;"
             +navText+".C相电流;"
             +navText+".零序电流;"
         }
         monitoring(navLi,btnIndex);
      }
      // 电能按钮
      if (btnIndex == 2) {
         btn();                      // 获取最终字符
         myTime = calendardatetime.trigger.value.split("-");
         navLi = {
             "url":"app/MAC!getHistoryByMonthInAvg.do",
             "year":myTime[0],
             "month":myTime[1],
             "name": navText+".反向有功电能;"
             +navText+".总无功电能;"
             +navText+".总有功电能;"
             +navText+".正向有功电能;"
             +navText+".反向无功电能;"
             +navText+".正向无功电能;"
         }
         monitoring(navLi,btnIndex);
      }
      // 频率按钮
      if (btnIndex == 3) {
         btn();                      // 获取最终字符
         myTime = calendardatetime.trigger.value.split("-");
         navLi = {
             "url":"app/MAC!getHistoryByMonthInAvg.do",
             "year":myTime[0],
             "month":myTime[1],
             "name":navText+".频率;"
         }
         monitoring(navLi,btnIndex);
      }
      // 功率按钮
      if (btnIndex == 4) {
         btn();                      // 获取最终字符
         myTime = calendardatetime.trigger.value.split("-");
         navLi = {
             "url":"app/MAC!getHistoryByMonthInAvg.do",
             "year":myTime[0],
             "month":myTime[1],
             "name": navText+".总有功功率;"+navText+".总无功功率;"
             +navText+".A相有功功率;"+navText+".B相有功功率;"
             +navText+".C相有功功率;"+navText+".A相无功功率;"
             +navText+".B相无功功率;"+navText+".C相无功功率;"
         }
         monitoring(navLi,btnIndex);
      }
      // 功率因数按钮
      if (btnIndex == 5) {
         btn();                      // 获取最终字符
         myTime = calendardatetime.trigger.value.split("-");
         navLi = {
             "url":"app/MAC!getHistoryByMonthInAvg.do",
             "year":myTime[0],
             "month":myTime[1],
             "name":
             navText+".总功率因数;"
         }
         monitoring(navLi,btnIndex);
      }

   }
}
dataSwitch();
// 月趋势图
function montchart(chart_name,chart_day,chart_value){
   var myChart5 = echarts.init(document.getElementById('main2'));
   option5 = {
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
           data:chart_name
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
           data: chart_day
       },
       yAxis: [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
       series: chart_value
   };
   myChart5.setOption(option5,true);
}
