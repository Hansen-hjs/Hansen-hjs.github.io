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
               //  console.log(json);
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
    var myTime;                                 //  日期
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
        // console.log(navText);
    }
    var navLi;                              // 请求变量
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
                                '</h2><ul class="flex sheet_title"><li class="f1">日期</li><li class="f1">数值(V)</li><li class="f1">日期</li><li class="f1">数值(V)</li></ul><div class="data_form"><ul class="form_left"><li>01</li><li>'
                                +json.data[i].value1+
                                '</li><li>02</li><li>'
                                +json.data[i].value2+
                                '</li><li>03</li><li>'
                                +json.data[i].value3+
                                '</li><li>04</li><li>'
                                +json.data[i].value4+
                                '</li><li>05</li><li>'
                                +json.data[i].value5+
                                '</li><li>06</li><li>'
                                +json.data[i].value6+
                                '</li><li>07</li><li>'
                                +json.data[i].value7+
                                '</li><li>08</li><li>'
                                +json.data[i].value8+
                                '</li><li>9</li><li>'
                                +json.data[i].value9+
                                '</li><li>10</li><li>'
                                +json.data[i].value10+
                                '</li><li>11</li><li>'
                                +json.data[i].value11+
                                '</li><li>12</li><li>'
                                +json.data[i].value12+
                                '</li><li>13</li><li>'
                                +json.data[i].value13+
                                '</li><li>14</li><li>'
                                +json.data[i].value14+
                                '</li><li>15</li><li>'
                                +json.data[i].value15+
                                '</li><li>16</li><li>'
                                +json.data[i].value16+
                                '</li></ul><ul class="form_right"><li>17</li><li>'
                                +json.data[i].value17+
                                '</li><li>18</li><li>'
                                +json.data[i].value18+
                                '</li><li>19</li><li>'
                                +json.data[i].value19+
                                '</li><li>20</li><li>'
                                +json.data[i].value20+
                                '</li><li>21</li><li>'
                                +json.data[i].value21+
                                '</li><li>22</li><li>'
                                +json.data[i].value22+
                                '</li><li>23</li><li>'
                                +json.data[i].value23+
                                '</li><li>24</li><li>'
                                +json.data[i].value24+
                                '</li><li>25</li><li>'
                                +json.data[i].value25+
                                '</li><li>26</li><li>'
                                +json.data[i].value26+
                                '</li><li>27</li><li>'
                                +json.data[i].value27+
                                '</li><li>28</li><li>'
                                +json.data[i].value28+
                                '</li><li>29</li><li>'
                                +json.data[i].value29+
                                '</li><li>30</li><li>'
                                +json.data[i].value30+
                                '</li><li>31</li><li>'
                                +json.data[i].value31+
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
            "url":"app/MAC!getHistoryByMonth.do",
            "year":myTime[0],
            "month":myTime[1],
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
            "url":"app/MAC!getHistoryByMonth.do",
            "year":myTime[0],
            "month":myTime[1],
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
            "url":"app/MAC!getHistoryByMonth.do",
            "year":myTime[0],
            "month":myTime[1],
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
            "url":"app/MAC!getHistoryByMonth.do",
            "year":myTime[0],
            "month":myTime[1],
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
            "url":"app/MAC!getHistoryByMonth.do",
            "year":myTime[0],
            "month":myTime[1],
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
            "url":"app/MAC!getHistoryByMonth.do",
            "year":myTime[0],
            "month":myTime[1],
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
