$(function () {
	$('#step_content').hide();
})

// 返回
$('#step').click(function(){
	$('.top_class').addClass('translate_hover');
	$('#step_content').hide();
	$('#start').show();
})
// ajax请求开始
function job(){
	var orderNo = sessionStorage.getItem("orderNo");      		// 工单编号
	var taskDetails = sessionStorage.getItem("taskDetails");		// 工单类型
	console.log(orderNo,taskDetails);
	//	5.5.3查询出工单详情
	$.ajax({
	        url: $url+"iom_app_server/api/order/orderParticulars",
	        data: {
				"orderType":taskDetails,
				"orderNo": orderNo
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
	            if(taskDetails==1){		// 隐患工单
	            	$("#box_title").text("隐患排查工单详情");
	            	$("#start_list").html('<li>发起日期：<span>'+json.data.startTime+'</span></li><li>隐患存在区域：<span>'+json.data.troubleAreaType+'</span></li><li>隐患具体地点：<span>'+json.data.troubleLocation+'</span></li><li>隐患等级：<span>'+json.data.troubleGrade+'</span></li><li>隐患描述：<span>'+json.data.troubleDescription+'</span></li>');
	            	if (json.flag==false) {
	            		$("#start h3").hide();
	            	}else {
	            		$("#start h3").show();
	            	}
	            }if(taskDetails==2){	// 检修工单
	            	$("#box_title").text("正常检修工单详情");
	            	$("#start_list").html('<li>发起日期：<span>'+json.data.startTime+'</span></li><li>检修类型：<span>'+json.data.overhaulType+'</span></li><li>检修编号：<span>'+json.data.overhaulNo+'</span></li><li>设备编号：<span>'+json.data.equipmentNo+'</span></li><li>设备名称：<span>'+json.data.equipmentName+'</span></li><li>安装位置：<span>'+json.data.installationPosition+'</span></li><li>检修内容：<span>'+json.data.overhaulContent+'</span></li>');
	            	if (json.flag==false) {
	            		$("#start h3").hide();
	            	}else {
	            		$("#start h3").show();
	            		$("#start h3").click(function(){
	            			start(orderNo);
	            		})
	            	}
	            }
	        }
	    })
}
job();

// 开始巡检 5.8.1特殊工单详情
function start(orderNo){
	$.ajax({
		url: $url+"iom_app_server/api/order/specialOrderParticulars",
        data: {
					"orderNo": orderNo
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
					$('.top_class').removeClass('translate_hover');
					$('#start').hide();
					$('#step_content').show();
					var flowId;
					// 工单巡检第一步
					if(json.data.executeStatus==1){
						flowId=1;
						step_1(orderNo,json,flowId);
					}
					// 工单巡检第二步
					if (json.data.executeStatus==2) {
						flowId=2;
						step_2(orderNo,json,flowId);
					}
					// 工单巡检第三步
					if (json.data.executeStatus==3) {
						flowId=3;
						step_3(orderNo,json,flowId);
					}
					// 工单巡检第四步
					if (json.data.executeStatus==4) {
						flowId=4;
						step_4(orderNo,json,flowId);
					}
					// 工单巡检第五步
					if (json.data.executeStatus==5) {
						flowId=5;
						step_5(orderNo,json,flowId);
					}
					// 工单巡检第六步
					if (json.data.executeStatus==6) {
						flowId=6;
						step_6(orderNo,json,flowId);
					}
					// 工单巡检第七步
					if (json.data.executeStatus==7) {
						flowId=7;
						step_7(orderNo,json,flowId);
					}
					// 工单巡检第八步
					if (json.data.executeStatus==8) {
						flowId=8;
						step_8(orderNo,json,flowId);
					}
					// 工单巡检第九步
					if (json.data.executeStatus==9) {
						flowId=9;
						step_9(orderNo,json,flowId);
					}
					// 工单巡检第十步
					if (json.data.executeStatus==10) {
						flowId=10;
						step_10(orderNo,json,flowId);
					}
					// 工单巡检第十一步
					if (json.data.executeStatus==11) {
						flowId=11;
						step_11(orderNo,json,flowId);
					}
					// 工单巡检第十二步
					if (json.data.executeStatus==12) {
						flowId=12;
						step_12(orderNo,json,flowId);
					}

				}
	})
}

// 复选框组件
function checkbox(orderNo,json,flowId){
	var step_input = document.getElementsByName("inCheckbox");
	var n;		// 复选框打勾的个数
	// 初始化判断 显示的复选框打勾选项
	for(var t = 0; t < json.node.length; t++){
		if(json.node[t].status==2){
			if((t+1) > step_input.length){		// 保存当前的位置
				step_input[t+1].checked=true;
			}if((t+1) < step_input.length) {
				step_input[t].checked=true;
				step_input[t+1].checked=true
			}
		}else{
			step_input[t].checked=false;
		}
	}
	// 提交之后的页面操作
	for (var i = 0; i < step_input.length; i++) {
		step_input[i].index = i;		// 在点击事件的外层赋值 位置！
		step_input[i].onclick=function(){
			// console.log(this.index);
			for (var j = 0; j < this.index; j++) {		// 前面的全选
				step_input[j].checked=true;
			}
			for (var k = (this.index+1); k < step_input.length; k++) {		// 后面的全不选
				step_input[k].checked=false;
			}
		}
		// 保存按钮 点击提交
		document.getElementById('send').onclick=function(){
			var checks = document.getElementsByName("inCheckbox");
	      n = 0;
	      for(i = 0; i < checks.length; i++){
	          if(checks[i].checked){
					  n++;
				 }
	      }
			// 如果大于0，就发送请求
			if(n > 0){
				var flowStepIdstr = "";
				for (var p = 1; p < (n+1); p++) {
		        	 flowStepIdstr += p + ",";
			   }
			    //去掉最后一个逗号(如果不需要去掉，就不用写)
			   if (flowStepIdstr.length > 0) {
			        flowStepIdstr = flowStepIdstr.substr(0, flowStepIdstr.length - 1);
			   }
				console.log(n,flowStepIdstr);
				stepSend(orderNo,flowId,flowStepIdstr)
			}if (n==0) {
				alert("你还没选");
			}

		}
	}

}
// 保存按钮，提交之后下一步是否显示
function stepSend(orderNo,flowId,flowStepIdstr){
	$.ajax({
		url: $url+"iom_app_server/api/order/modificationPatrolState",
      data: {
 				"orderNo": orderNo,
 				"flowId":flowId,
 				"flowStepId":flowStepIdstr
      },
      dataTyp: "json",
      type: "get",
      xhrFields:{ // 跨域cookie打开
          withCredentials: true
      },
      crossDomain: true,
		success:function(data){
			var jsonp = (new Function("return" + data))();  // 转换json标准格式
			if(jsonp.result==true){
				alert("修改成功");
			}if(jsonp.result==false) {
				alert("修改失败");
			}if(jsonp.status==true){
				$("#step_next").show();
				$("#step_next").click(function(){		// 点击下一步请求
					next(orderNo)
				})
			}
		}
	})
}
// 下一步按钮请求
function next(orderNo){
	$.ajax({
		url: $url+"iom_app_server/api/order/nextFlow",
      data: {
 				"orderNo": orderNo,
      },
      dataTyp: "json",
      type: "get",
      xhrFields:{ // 跨域cookie打开
          withCredentials: true
      },
      crossDomain: true,
		success:function(data){
			start(orderNo);
		}
	})
}
// 步骤一
function step_1(orderNo,json,flowId){
	$("#step_content").html(
	`<h4>步骤一：</h4>
	 <p>巡视地点：<span>室外电缆沟及直埋路径</span></p>
	 <p>设备名称：<span>进线电缆</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 路径地面标识是否完好齐备</p>
		 <p><input type="checkbox" name="inCheckbox" /> 路劲地面有无开挖行为</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电缆沟是否有进水及非法进入行为</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100)
}
// 步骤二
function step_2(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤二：</h4>
	 <p>巡视地点：<span>室内电缆沟及电缆桥架</span></p>
	 <p>设备名称：<span>强弱电电缆</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 电缆沟及电缆桥架是否完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电缆是否有被老鼠啃咬痕迹</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤三
function step_3(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤三：</h4>
	 <p>巡视地点：<span>整个变配电室</span></p>
	 <p>设备名称：<span>环境、安防及消防</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 门窗完好、标识齐全</p>
		 <p><input type="checkbox" name="inCheckbox" /> 挡鼠板合格完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 照明、应急照明、疏散指示设施完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 消防应急设备齐备，通道顺畅</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电缆孔洞封堵严密</p>
		 <p><input type="checkbox" name="inCheckbox" /> 室内温湿度正常，通风系统正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电缆沟盖板完整</p>
		 <p><input type="checkbox" name="inCheckbox" /> 绝缘脚垫完整</p>
		 <p><input type="checkbox" name="inCheckbox" /> 墙、地面无渗水和积尘</p>
		 <p><input type="checkbox" name="inCheckbox" /> 安全工器具合格</p>
		 <p><input type="checkbox" name="inCheckbox" /> 所有设备标识准确完整</p>
		 <p><input type="checkbox" name="inCheckbox" /> 接地网及开关柜接地装置完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 监测设备运行正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤四
function step_4(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤四：</h4>
	 <p>巡视地点：<span>高压室（开闭所）</span></p>
	 <p>设备名称：<span>直流屏</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 蓄电池电压正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 连接片五松动腐蚀</p>
		 <p><input type="checkbox" name="inCheckbox" /> 客体无渗漏和变形</p>
		 <p><input type="checkbox" name="inCheckbox" /> 充电装置三项交流电压平衡</p>
		 <p><input type="checkbox" name="inCheckbox" /> 运行噪音无异常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 直流电源装置上的各种信号指示灯及声光报警装置正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤五
function step_5(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤五：</h4>
	 <p>巡视地点：<span>高压室（开闭所）</span></p>
	 <p>设备名称：<span>高压进线柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 带电显示器指示灯正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 分、合闸位置指示与运行一致</p>
		 <p><input type="checkbox" name="inCheckbox" /> 进线电缆接点正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电压、电流等仪表指示正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 综保装置正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤六
function step_6(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤六：</h4>
	 <p>巡视地点：<span>高压室（开闭所）</span></p>
	 <p>设备名称：<span>PT柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 绝缘子清洁完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 表计指示正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 高、低压保险接触正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤七
function step_7(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤七：</h4>
	 <p>巡视地点：<span>高压室（开闭所）</span></p>
	 <p>设备名称：<span>高压出线柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 带电显示器指示灯正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 分、合闸位置指示与运行一致</p>
		 <p><input type="checkbox" name="inCheckbox" /> 进线电缆接点正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电压、电流等仪表指示正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 综保装置正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 避雷器正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 地刀开光位置正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤八
function step_8(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤八：</h4>
	 <p>巡视地点：<span>变配电室</span></p>
	 <p>设备名称：<span>环网柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 带电显示器指示灯正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 分、合闸位置指示与运行一致</p>
		 <p><input type="checkbox" name="inCheckbox" /> 进线电缆接点正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
		 <p><input type="checkbox" name="inCheckbox" /> SF6气体压力等仪表指示正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤九
function step_9(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤九：</h4>
	 <p>巡视地点：<span>变配电室</span></p>
	 <p>设备名称：<span>变压器</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 运行温度正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
		 <p><input type="checkbox" name="inCheckbox" /> 本体及套管清洁无裂纹、放电</p>
		 <p><input type="checkbox" name="inCheckbox" /> 高低压接线端连接可靠</p>
		 <p><input type="checkbox" name="inCheckbox" /> 风机自动启停正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 柜门及观察窗完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 接地装置完好</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤十
function step_10(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤十：</h4>
	 <p>巡视地点：<span>变配电室</span></p>
	 <p>设备名称：<span>低压进线及母联柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 分、合闸位置指示与运行一致</p>
		 <p><input type="checkbox" name="inCheckbox" /> 进线电缆、母排接点正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电压、电流等仪表指示正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤十一
function step_11(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤十一：</h4>
	 <p>巡视地点：<span>变配电室</span></p>
	 <p>设备名称：<span>电容补偿柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 电容器外壳无鼓包、渗漏现象</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无放电声音</p>
		 <p><input type="checkbox" name="inCheckbox" /> 自动投入装置完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 熔丝开关、接触器等一次设备完好</p>
		 <p><input type="checkbox" name="inCheckbox" /> 二次仪表正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="step_next">下一步</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
}
// 步骤十二
function step_12(orderNo,json,flowId){
	$("#step_content").html(
   `<h4>步骤十二：</h4>
	 <p>巡视地点：<span>变配电室</span></p>
	 <p>设备名称：<span>低压馈线柜</span></p>
	 <p>巡视要点：</p>
	 <form action="" id="step_form">
		 <p><input type="checkbox" name="inCheckbox" /> 分、合闸位置指示与运行一致</p>
		 <p><input type="checkbox" name="inCheckbox" /> 母排接点正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 无异响、异味</p>
		 <p><input type="checkbox" name="inCheckbox" /> 电压、电流等仪表指示正常</p>
		 <p><input type="checkbox" name="inCheckbox" /> 二次仪表正常</p>
	 </form>
	 <span class="button">
		 <h3 id="send">保存</h3>
		 <h3 id="end">工单已完成</h3>
	 </span>`);
	 // 提交之后的页面显示
	 setTimeout(checkbox(orderNo,json,flowId),100);
	 setTimeout(function(){$("#end").show()},300)
}
