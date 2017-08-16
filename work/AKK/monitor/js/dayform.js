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
    var myTime;                                 //  日期
    var navText;                                //  定义最终选择字符
    // 监测类型按钮
    function btn(){
        var h6_text = $('.test_nav h6').text(); // 第三级字符
        var h5_text = $('.test_nav h5').text(); // 第二季字符
        if (h6_text == "无") {
            navText = h5_text;                  // 第二级字符传到最终字符
        }else{
            navText = h6_text;                  // 第三级字符传到最终字符
        }
    }
    var navLi;                                  // 请求设备名称
    // ajax提交
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
                if(json.data.length > 0){
                    $("#form_content").html("");
                    $(".loading").hide();
                    for(var i = 0; i < json.data.length; i++){
                        $("#form_content").append('<div class="data_sheet"><h2>'
                            +json.data[i].variablename+
                            '</h2><ul class="flex sheet_title"><li class="f1">时间点</li><li class="f1">数值(V)</li><li class="f1">时间点</li><li class="f1">数值(V)</li></ul><div class="data_form"><ul class="form_left"><li>00:00</li><li>'
                            +json.data[i].value0000+
                            '</li><li>01:00</li><li>'
                            +json.data[i].value0100+
                            '</li><li>02:00</li><li>'
                            +json.data[i].value0200+
                            '</li><li>03:00</li><li>'
                            +json.data[i].value0300+
                            '</li><li>04:00</li><li>'
                            +json.data[i].value0400+
                            '</li><li>05:00</li><li>'
                            +json.data[i].value0500+
                            '</li><li>06:00</li><li>'
                            +json.data[i].value0600+
                            '</li><li>07:00</li><li>'
                            +json.data[i].value0700+
                            '</li><li>08:00</li><li>'
                            +json.data[i].value0800+
                            '</li><li>09:00</li><li>'
                            +json.data[i].value0900+
                            '</li><li>10:00</li><li>'
                            +json.data[i].value1000+
                            '</li><li>11:00</li><li>'
                            +json.data[i].value1100+
                            '</li><li>12:00</li><li>'
                            +json.data[i].value1200+
                            '</li></ul><ul class="form_right"><li>13:00</li><li>'
                            +json.data[i].value1300+
                            '</li><li>14:00</li><li>'
                            +json.data[i].value1400+
                            '</li><li>15:00</li><li>'
                            +json.data[i].value1500+
                            '</li><li>16:00</li><li>'
                            +json.data[i].value1600+
                            '</li><li>17:00</li><li>'
                            +json.data[i].value1700+
                            '</li><li>18:00</li><li>'
                            +json.data[i].value1800+
                            '</li><li>19:00</li><li>'
                            +json.data[i].value1900+
                            '</li><li>20:00</li><li>'
                            +json.data[i].value2000+
                            '</li><li>21:00</li><li>'
                            +json.data[i].value2100+
                            '</li><li>22:00</li><li>'
                            +json.data[i].value2200+
                            '</li><li>23:00</li><li>'
                            +json.data[i].value2300+
                            '</li></ul></div></div>');
                    }
                }else{
                    $(".loading").show();
                    $("#form_content").html("");
                    $(".loading").text("暂无数据！")
                }
               
            }
        })
    }
    // 电压按钮
    $(".test_Dcontent li").eq(0).click(function(){
        $(".test_Dcontent li").removeClass('li_hover');
        $(this).addClass('li_hover');
        btn();                      // 获取最终字符
        console.log(navText);                               
        myTime = $("#star").val().split("-");
        navLi = {
            "url":"app/FAST!getHistoryByDayInHour.do",
            "year":myTime[0],
            "month":myTime[1],
            "day":myTime[2],
            "name":"findRtVarData;"
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
        console.log(navText);                               
        myTime = $("#star").val().split("-");
        navLi = {
            "url":"app/FAST!getHistoryByDayInHour.do",
            "year":myTime[0],
            "month":myTime[1],
            "day":myTime[2],
            "name":"findRtVarData;"
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
        console.log(navText);                               
        myTime = $("#star").val().split("-");
        navLi = {
            "url":"app/FAST!getHistoryByDayInHour.do",
            "year":myTime[0],
            "month":myTime[1],
            "day":myTime[2],
            "name":"findRtVarData;" 
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
        console.log(navText);                               
        myTime = $("#star").val().split("-");
        navLi = {
            "url":"app/FAST!getHistoryByDayInHour.do",
            "year":myTime[0],
            "month":myTime[1],
            "day":myTime[2],
            "name":"findRtVarData;"
            +navText+".频率;"
        }
        monitoring(navLi);
    });
    // 功率按钮
    $(".test_Dcontent li").eq(4).click(function(){
        $(".test_Dcontent li").removeClass('li_hover');
        $(this).addClass('li_hover');
        btn();                      // 获取最终字符
        console.log(navText);                               
        myTime = $("#star").val().split("-");
        navLi = {
            "url":"app/FAST!getHistoryByDayInHour.do",
            "year":myTime[0],
            "month":myTime[1],
            "day":myTime[2],
            "name":"findRtVarData;"
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
        console.log(navText);                               
        myTime = $("#star").val().split("-");
        navLi = {
            "url":"app/FAST!getHistoryByDayInHour.do",
            "year":myTime[0],
            "month":myTime[1],
            "day":myTime[2],
            "name":"findRtVarData;"
            +navText+".总功率因素;"
            +navText+".A相功率因素;"
            +navText+".B相功率因素;"
            +navText+".C相功率因素;"
        }
        monitoring(navLi);
    });
}
dataSwitch();