
// var $user = sessionStorage.getItem("customerId");
// console.log($user);
// ?username=admin&password=admin
// 5.1.2获取用户基本信息接口


function home(){
	$.ajax({
		url:  $url+"iom_app_server/api/user/getBasicInfo",
		data: "",
		dataType: "json",
		type: "get",
		xhrFields: { // 跨域cookie打开
	    	withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	    	var $apiNo;
			var $entryId;
	    	var $enterpriseName;
	    	var $teskId;
	    	var $userID = data.user.id;
			var entryIdArr = [];	 		// 请求次数数组
			var uncomfirmedArr = [];	// 未确认数组
			var comfirmedArr = [];		// 已确认数组
	    	sessionStorage.setItem("userID",$userID); // 用户id储存到本地
	    	// 搜索框事件
	    	console.log(data)
	    	for(var i= 0; i < data.enterprise.length; i++){
	    		$("#searchResultPanel ul").append('<li><h6>'+data.enterprise[i].province+'</h6><p>'+data.enterprise[i].enterpriseName+'</p></li>'); // 初始化获得企业名称
	    		$("#map_data").append('<h2>'+data.enterprise[i].enterpriseName+'</h2><h3>'+data.enterprise[i].longitude+'</h3><h4>'+data.enterprise[i].latitude+'</h4>'); // 保存位置数据
				if (data.enterprise[i].entryId != undefined) {
					entryIdArr.push(data.enterprise[i].entryId);
				}
			}
			// 确认事件
			for (let i = 0; i < entryIdArr.length; i++) {
				let allentryId = entryIdArr[i]
				// 报警信息
			  	warning(allentryId,uncomfirmedArr,comfirmedArr);

			}

	    	$("#search_box").bind("keyup",function(){
	    		$("#searchResultPanel").show();
	    		var searchText = $.trim($("#search_box").val().toString()); // 去掉两头空格
	    		if(searchText == ''){ // 如果搜索框输入为空
	                $("#searchResultPanel li").hide();  // 先让p和h6消失
	                add_overlay($teskId,$apiNo,$enterpriseName);
	                return false;
	            }
	            $("#searchResultPanel li").hide();
	            $("#searchResultPanel li:contains('"+searchText+"')").show(); //  对应的显示出来
	    	});
	    	$("#searchResultPanel li").click(function () {  //  点击项
	    		$("#search_box").val($(this).text());
	    		var sIndex = $(this).index();  // 点击位置
	    		// console.log(sIndex);
	    		remove_overlay();  // 清除所有标注物
	    		search_point(sIndex);
			});

			$(document).bind("click",function(e){
			    if($(e.target).closest("#searchResultPanel").length == 0 && $(e.target).closest("#search_box").length == 0){
			        $('#searchResultPanel').hide();
			    }
			});

			// 地图
	    	var map = new BMap.Map("map_box");
	    	var pW = data.enterprise[0].latitude; // 初始化维度
	    	var pJ = data.enterprise[0].longitude;	// 初始化经度
			var point = new BMap.Point(pJ,pW); // 创建点坐标
			map.centerAndZoom(point,6);  //地图的放大倍数

			var point = new Array(); //存放标注点经纬信息的数组
			var marker = new Array(); //存放标注点对象的数组
			var info = new Array(); //存放提示信息窗口对象的数组

			function add_overlay(){  // 添加标注点
				for (var i = 0; i < data.enterprise.length; i++) {
				    var p0 = data.enterprise[i].latitude; // 纬度
				    var p1 = data.enterprise[i].longitude; // 经度
				    point[i] = new window.BMap.Point(p1,p0); //循环生成新的地图点
				    marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
				    map.addOverlay(marker[i]);
				    // marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				    var label = new window.BMap.Label(data.enterprise[i].enterpriseName, { offset: new window.BMap.Size(20, -15) });
				    marker[i].setLabel(label);
				    // 多个点绑定点击事件
				    marker[i].index = i;		// 在点击事件的外层赋值 位置！
				    marker[i].addEventListener("click",function(){
				    	// console.log(this.index)
				  		$apiNo = data.enterprise[this.index].apiNo;
						$entryId = data.enterprise[this.index].entryId;
						$enterpriseName = data.enterprise[this.index].enterpriseName;
						$teskId = data.enterprise[this.index].id;

						sessionStorage.setItem("apiNo",$apiNo);
						sessionStorage.setItem("entryId",$entryId);
		    			sessionStorage.setItem("enterpriseName",$enterpriseName);
						sessionStorage.setItem("teskId",$teskId);
						console.log($apiNo,$entryId);
						location.href = "company.html";
				    })
				}
			}
			add_overlay();
			function remove_overlay(){  // 清除标注点
				map.clearOverlays();
			}
			function search_point(sIndex,$apiNo,$enterpriseName){	// 搜索的标注物
	    		var p_sarch0 = data.enterprise[sIndex].latitude;
				var p_sarch1 = data.enterprise[sIndex].longitude;
				// console.log(sIndex);
				point = new window.BMap.Point(p_sarch1,p_sarch0);
				marker = new window.BMap.Marker(point);
				map.addOverlay(marker);
				var label = new window.BMap.Label(data.enterprise[sIndex].enterpriseName, { offset: new window.BMap.Size(20, -15) });
				marker.setLabel(label);
				//绑定点击事件
				marker.addEventListener("click",function(){
					$apiNo = data.enterprise[sIndex].apiNo;
					$entryId = data.enterprise[sIndex].entryId;
					$enterpriseName = data.enterprise[sIndex].enterpriseName;
					$teskId = data.enterprise[sIndex].id;
					// 储存红点的位置数据到本地
					sessionStorage.setItem("apiNo",$apiNo);
					sessionStorage.setItem("entryId",$entryId);
	    			sessionStorage.setItem("enterpriseName",$enterpriseName);
					sessionStorage.setItem("teskId",$teskId);
					// console.log($apiNo,$enterpriseName);
					location.href = "company.html";
				});

			}
			// 启用滚轮放大缩小
			map.enableScrollWheelZoom();
			// 地图类型控件
			var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_LEFT});
			map.addControl(mapType2);          //左上角，默认地图控件


	   }  // 成功方法结束
	}); //  ajax结束
}
home();
// 巡检任务列表
function task(){
	$.ajax({
		url: $url+"iom_app_server/api/order/getInformInfo",
		data: "",
		dataTyp: "json",
		type: "get",
		xhrFields:{ // 跨域cookie打开
			withCredentials: true
		},
		crossDomain: true,
		success:function(data){
			var json = (new Function("return " + data))();  // 转换json标准格式
			// console.log(json);
			$("#alreadyAccomplish").text(json.alreadyAccomplish);
			$("#notAccomplish").text(json.notAccomplish);
			$("#patrolCentre").text(json.patrolCentre);
		}
	});
	$(".task").click(function(){
		location.href = "../event/event.html";
	})
}
task();

// 报警事件
function warning(allentryId,uncomfirmedArr,comfirmedArr){
	$.ajax({
		url: $url+"iom_app_server/api/third/getData",
        data: {
        	"url":"/app/event!getUnconfirmedEventCount.do",
        	"unitid":allentryId
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
        		uncomfirmedArr.push(json.all);
            comfirmedArr.push(json.allconfirmed);
				console.log(allentryId,uncomfirmedArr,comfirmedArr);
					// 未确认
					let un = 0;
					for (let i = 0; i < uncomfirmedArr.length; i++){
						un += parseInt(uncomfirmedArr[i]);
					}
					// 已确认
					let com = 0;
					for (let i = 0; i < comfirmedArr.length; i++){
						com += parseInt(comfirmedArr[i]);
					}
					// console.log(un,com);
					$("#comfirmed").text(com);
					$("#uncomfirmed").text(un);
					// 将这两个数据储存到本地
					sessionStorage.setItem("com",com);
					sessionStorage.setItem("un",un);

        }
	})
}
