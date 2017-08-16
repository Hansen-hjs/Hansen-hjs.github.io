<h2 align="center">AKK电力系统 | webAPP</h2>

### 介绍：
1. 所用技术：HTML5+CSS(rem)+JS(jQuery)
2. 用了Ajax,代码前后端分离开发，根据后台数据提供接口，然后Ajax请求回来改写页面数据内容和请求更改数据
3. 主要功能是查看用户账号下的电能数据信息，和用户数据的操作
4. 此应用使用了大量的 EChart 图表插件，用Ajax请求回来的数据根据用户不同按钮和操作，将数据安图表要求处理好传入到 EChart 图表里面去

### 页面介绍：
#* 首页-首页详情
1. 调用了百度地图，百度地图控件有覆盖物和地图视图切换功能
2. 首页两个登录后用户数据的提示容器
3. 首页搜索框功能，搜索列表由Ajax请求数据获取信息，提供模糊搜索，并在地图显示当前搜索的地点
4. 首页各个红点点击进去就是当前红点下的数据详情页
5. 详情页有两个数据图表显示当前点击的红点数据和报警信息、最新事件列表
![首页图片](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/home.png)
![详情页图片](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/home_class.png)

#* 实时监测页
1. 一个3级菜单，数据由Ajax获取
2. 点击类型按钮根据所选三级菜单最终的字符然后进行Ajax请求，然后传到图表和表单中去
3. 点击接线图后操作与上面一致，只不过把图表换成了svg
![实时监详情页图片](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/testing.png)
![实时监详情页图片](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/testing2.png)

#* 数据分析页
1. 一个3级菜单，数据由Ajax获取
2. 点击类型按钮根据所选三级菜单最终的字符然后进行Ajax请求，然后传到图表和表单中去（这个模块的数据处理超级复杂，请看代码）
3. 一共6个分页，5个不同要求的数据处理方法来整理数据然后进行页面内容更改
4. 这里开始用到时间日期组件
![数据分析](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/mort.png)
![日趋势图](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/m_daychart.png)
![日报表](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/m_dayform.png)
![月趋势图](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/m_monthchart.png)
![月报表](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/m_monthform.png)
![尖峰评测](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/m_jianfeng.png)

#* 事件页
1. 还是图表和数据列表的Ajax请求显示
2. 三个巡检任务的流程状态和查询下拉框的列表信息，再点击当前列表信息即去到查询流程状态的工单查询详情页，然后根据用户操作进行Ajax请求显示页面和更改信息
3. 报警信息两个入口，也是可以查询信息，点击未确认然后Ajax请请更改并返回提示
![事件页](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/event.png)
![报警信息](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/event_bj.png)
![巡检任务](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/event_wc.png)
![开始巡检页](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/job.jpg)
![巡检流程](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/job2.jpg)

#* 管理页和登录页
1. 这些常见的功能就不说，直接看代码
![登录页](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/index.png)
![管理页](https://raw.githubusercontent.com/Hansen-hjs/Hansen-hjs.github.io/master/work/photos/an.png)
