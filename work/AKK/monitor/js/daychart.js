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
}
time();
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
                // console.log(json[0].children.length);
            }
     })
}testNav();

// 按钮切换功能
var myTime = calendardatetime.trigger.value.split("-"); //  日期
var navText;                            // 定义最终选择字符
// 监测类型按钮
function btn(){
  let h6_text = $('.test_nav h6').text(); // 第三级字符
  let h5_text = $('.test_nav h5').text(); // 第二季字符
  if (h6_text == "无") {
      navText = h5_text;                  // 第二级字符传到最终字符
  }else{
      navText = h6_text;                  // 第三级字符传到最终字符
  }
}
var navLi;                                  // 请求变量
// 按钮值
var btnIndex = 0;
// 初始化时间间隔按钮
var time_on = 0;
// ajax提交
function monitoring(navLi,btnIndex,time_on){
  // debugger
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
          console.log(json,btnIndex,time_on);
          // 图表名称
          let chart_name = [];
          // 图表时间
          let chart_day = [];
          // 图表value
          let chart_value = [];
          // 获取图表名称
          for (let i = 0; i < json.data.length; i++) {
              let myList = json.data[i].variablename.split(".");
              chart_name.push(myList[1]);
          }
          // 定义一个数组存放
          let json_value = [];

          // 5分钟，默认
          if (time_on == 0) {
              chart_day = timeInterval(5);
              // 定义一个数组存放
              json.data.forEach(function(dataItem, index) {
                let keyArr = Object.keys(dataItem);
               //   去掉variablename的值
                 keyArr.splice(keyArr.indexOf('variablename'), 1);
               //   去掉day的值
                 keyArr.splice(keyArr.indexOf('day'), 1);
                 json_value['data_value' + (index + 1)] = [];
                 for(let key of keyArr) {
                      // console.log(key, dataItem[key]);
                     json_value['data_value' + (index + 1)].push(dataItem[key]);
                 }
              });
              // 最终得出data_value
              chart_name.forEach(function(item, index) {
                 chart_value.push({
                   name: item,
                   type: 'line',
                   data: json_value['data_value' + (index + 1)]
                 })
              });
              daychart(chart_name,chart_day,chart_value);
          }
          // 15分钟
          if (time_on == 1) {
              chart_day = timeInterval(15);
              // 定义一个数组存放
              json.data.forEach(function(dataItem, index) {
                let num = 0;
                let keyArr = Object.keys(dataItem);
               //   去掉variablename的值
                 keyArr.splice(keyArr.indexOf('variablename'), 1);
               //   去掉day的值
                 keyArr.splice(keyArr.indexOf('day'), 1);
                 json_value['data_value' + (index + 1)] = [];
                 for(let key of keyArr) {
                      // console.log(key, dataItem[key]);
                      // 判断15分钟间隔
                      if(num % 3 == 0){
                         json_value['data_value' + (index + 1)].push(dataItem[key]);
                      }
                      num++
                 }
              });
              // 最终得出data_value
              chart_name.forEach(function(item, index) {
                 chart_value.push({
                   name: item,
                   type: 'line',
                   data: json_value['data_value' + (index + 1)]
                 })
              });
              daychart(chart_name,chart_day,chart_value);
          }
          // 30分钟
          if (time_on == 2) {
              chart_day = timeInterval(30);
              // 定义一个数组存放
              json.data.forEach(function(dataItem, index) {
                let num = 0;
                let keyArr = Object.keys(dataItem);
                 //   去掉variablename的值
                  keyArr.splice(keyArr.indexOf('variablename'), 1);
                //   去掉day的值
                  keyArr.splice(keyArr.indexOf('day'), 1);
                 json_value['data_value' + (index + 1)] = [];
                 for(let key of keyArr) {
                      // console.log(key, dataItem[key]);
                      // 判断30分钟间隔
                      if(num % 6 == 0){
                         json_value['data_value' + (index + 1)].push(dataItem[key]);
                      }
                      num++
                 }
              });
              // 最终得出data_value
              chart_name.forEach(function(item, index) {
                 chart_value.push({
                   name: item,
                   type: 'line',
                   data: json_value['data_value' + (index + 1)]
                 })
              });
              daychart(chart_name,chart_day,chart_value);

          }
          // 60分钟
          if (time_on == 3) {
              chart_day = timeInterval(60);
              // 定义一个数组存放
              json.data.forEach(function(dataItem, index) {
                let num = 0;
                let keyArr = Object.keys(dataItem);
                 //   去掉variablename的值
                  keyArr.splice(keyArr.indexOf('variablename'), 1);
                //   去掉day的值
                  keyArr.splice(keyArr.indexOf('day'), 1);
                 json_value['data_value' + (index + 1)] = [];
                 for(let key of keyArr) {
                      // console.log(key, dataItem[key]);
                      // 判断30分钟间隔
                      if(num % 12 == 0){
                         json_value['data_value' + (index + 1)].push(dataItem[key]);
                      }
                      num++
                 }
              });
              // 最终得出data_value
              chart_name.forEach(function(item, index) {
                 chart_value.push({
                   name: item,
                   type: 'line',
                   data: json_value['data_value' + (index + 1)]
                 })
              });
              daychart(chart_name,chart_day,chart_value);
          }

          console.log(chart_name,chart_day,chart_value);

      }
  })
}
// 切换监测类型
$(".test_Dcontent li").click(function(){
     $(".test_Dcontent li").removeClass('li_hover');
     $(this).addClass('li_hover');
     btnIndex = $(this).index();
     class_btn();      // 获取navLi
     $('.time_nav span').eq(0).addClass('time_lihover').siblings().removeClass('time_lihover');
     time_on = 0;
     monitoring(navLi,btnIndex,time_on);
   //   console.log(btnIndex,navLi);
});
// 切换时间菜单
$('.time_nav span').click(function(){
     $(this).addClass('time_lihover').siblings().removeClass('time_lihover');
     time_on = $(this).index();
     class_btn();      // 获取navLi
     monitoring(navLi,btnIndex,time_on);
   //   console.log(btnIndex,time_on,navLi);
});
function class_btn(){
  // 电压按钮
  if (btnIndex == 0) {
      btn();                      // 获取最终字符
      myTime = calendardatetime.trigger.value.split("-");
      console.log(navText);
      navLi = {
          "url":"app/MAC!getHistoryByDay.do",
          "year":myTime[0],
          "month":myTime[1],
          "day":myTime[2],
          "name": navText+".A相电压;"
          +navText+".B相电压;"
          +navText+".C相电压;"
          +navText+".AB线电压;"
          +navText+".BC线电压;"
          +navText+".CA线电压;"
      }
  }
  // 电流按钮
  if(btnIndex == 1){
      btn();                      // 获取最终字符
      myTime = calendardatetime.trigger.value.split("-");
      console.log(navText);
      navLi = {
          "url":"app/MAC!getHistoryByDay.do",
          "year":myTime[0],
          "month":myTime[1],
          "day":myTime[2],
          "name": navText+".A相电流;"
          +navText+".B相电流;"
          +navText+".C相电流;"
          +navText+".零序电流;"
      }
  }
  // 电能按钮
  if(btnIndex == 2){
      btn();                      // 获取最终字符
      myTime = calendardatetime.trigger.value.split("-");
      console.log(navText);
      navLi = {
          "url":"app/MAC!getHistoryByDay.do",
          "year":myTime[0],
          "month":myTime[1],
          "day":myTime[2],
          "name": navText+".反向有功电能;"
          +navText+".总无功电能;"
          +navText+".总有功电能;"
          +navText+".正向有功电能;"
          +navText+".反向无功电能;"
          +navText+".正向无功电能;"

      }
  }
  // 频率按钮
  if(btnIndex == 3){
      btn();                      // 获取最终字符
      myTime = calendardatetime.trigger.value.split("-");
      console.log(navText);
      navLi = {
          "url":"app/MAC!getHistoryByDay.do",
          "year":myTime[0],
          "month":myTime[1],
          "day":myTime[2],
          "name": navText+".频率;"
      }
  }
  // 功率按钮
  if(btnIndex == 4){
       btn();                      // 获取最终字符
      myTime = calendardatetime.trigger.value.split("-");
      console.log(navText);
      navLi = {
          "url":"app/MAC!getHistoryByDay.do",
          "year":myTime[0],
          "month":myTime[1],
          "day":myTime[2],
          "name": navText+".总有功功率;"+navText+".总无功功率;"
          +navText+".A相有功功率;"+navText+".B相有功功率;"
          +navText+".C相有功功率;"+navText+".A相无功功率;"
          +navText+".B相无功功率;"+navText+".C相无功功率;"
      }
  }
  // 功率因数按钮
  if(btnIndex == 5){
       btn();                      // 获取最终字符
      myTime = calendardatetime.trigger.value.split("-");
      console.log(navText);
      navLi = {
          "url":"app/MAC!getHistoryByDay.do",
          "year":myTime[0],
          "month":myTime[1],
          "day":myTime[2],
          "name": navText+".总功率因数;"
      }
  }
}

// 日趋势图
function daychart(chart_name,chart_day,chart_value){
    // 图表
    var myChart4 = echarts.init(document.getElementById('main'));
    option4 = {
        tooltip: {
            trigger: 'axis'
        },
        color:['#d87a80','#76d576','#f5a05b','#5bb1ef','#bd94e3','#2dd4d6'],
        legend: {
            orient: 'horizontal',
            x: 'center',
            y : '80%',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 5,
            textStyle: {
                fontSize: 12,
            },
            data:chart_name
        },
        toolbox: { // 工具箱，切换视图
            show : true,
            y: 'top',
            x: 'right',
            z: 100,
            borderColor: '#000',
            feature : {
                magicType : {show: true, type: ['line', 'bar']},
            }
        },
        calculable : true,
        grid: {
            left: '3%',
            right: '4%',
            top: '15%',
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
    myChart4.setOption(option4,true);
}
//
function timeInterval(minInterval) {
   var arr = [];
   var minTotal = 0;
   while (minTotal < 1440) {
     var str = '';
     var hour = parseInt(minTotal / 60);
     var min = parseInt(minTotal % 60);
     hour = hour < 10 ? `0${hour}` : hour;
     min = min < 10 ? `0${min}` : min;
     arr.push(`${hour}:${min}`);
     minTotal += minInterval;
   }
   return arr;
 }
 // var arr = timeInterval(15);
 // console.log(arr);
