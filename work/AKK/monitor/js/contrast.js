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
    var tTime = new Date();                                     // 今天时间
    var tMonth = ("0"+(tTime.getMonth()+ 1)).slice(-2);         // 今天月份
    var tDay = ("0"+tTime.getDate()).slice(-2);                 // 今天日期
    calendardatetime.trigger.value = tTime.getFullYear() + "-" + tMonth + "-" + tDay;
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
function dataSwitch(){
   var myTime = calendardatetime.trigger.value.split("-"); //  日期
    var navText;                            // 定义最终选择字符
    // 监测类型按钮
    function btn(){
        var h6_text = $('.test_nav h6').text(); // 第三级字符
        var h5_text = $('.test_nav h5').text(); // 第二季字符
        if (h6_text == "无") {
            navText = h5_text;                  // 第二级字符传到最终字符
        }else{
            navText = h6_text;                  // 第三级字符传到最终字符
        }
        // console.log(navText);
    }
    var navLi;                              // 请求变量
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
            }
        })
    }
    // 电压按钮
    $(".test_Dcontent li").eq(0).click(function(){
        $(".test_Dcontent li").removeClass('li_hover');
        $(this).addClass('li_hover');
        btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
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
        btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
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
        btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
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
        btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
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
        btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
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
        btn();                      // 获取最终字符
        myTime = calendardatetime.trigger.value.split("-");
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


// 对比分析
var myChart1 = echarts.init(document.getElementById('analysis'));
    option1 = {
    tooltip : {
        trigger: 'axis'
    },
    color:['#3ccbcd','#48acf8','#f5a461'],
    grid: {
        left: '3%',
        right: '5%',
        top: '5%',
        containLabel: true
    },
    legend: {
      orient: 'horizontal',
        x: 'center',
        y : '80%',
        itemGap: 20,
        itemWidth: 10,
        itemHeight: 5,
        textStyle: {
            fontSize: 12,
        },
        data:['2017-1-1','2017-1-2','2017-1-3']
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['0','4:00','8:00','12:00','16:00','20:00','23:59']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'2017-1-1',
            type:'line',
            stack: '总量',
            data:[20, 132, 101, 134, 90, 130, 210]
        },
        {
            name:'2017-1-2',
            type:'line',
            stack: '总量',
            data:[120, 182, 151, 34, 190, 30, 110]
        },
        {
            name:'2017-1-3',
            type:'line',
            stack: '总量',
            data:[50, 132, 101, 154, 190, 130, 10]
        }
    ]
};
myChart1.setOption(option1);

