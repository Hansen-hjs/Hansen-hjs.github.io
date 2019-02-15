var ver = (function () {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
})();
if (ver > -1) {
    if (ver < 10) {
        window.location.href = 'http://modesign.cc/outdatedbrowser/';
    } else {
        console.log('当前IE浏览版本为：', ver);
    }
}
var myInfo = {
    age: (new Date().getFullYear() - 1995) + '岁',
    comment: '自我评价：做过的项目类型有web、web-App、hybrid-App、公众号、小程序和小游戏，对于开发有丰富的领域经验，能快速高效的进行项目部署。对移动端前端开发有深入了解，并且自己写过了一些移动端的日常插件（ES6）：swiper轮播图、手势放大缩小图片、用户交互提示、下拉刷新、图片懒加载、基于fech.js的Ajax、小球抛物线，按钮点击水波纹。线上预览地址：skt.webgz.cn/vue-dome代码在github上。无论对开发环境Webpack+node.js+Vue.js还是直接原生JavaScript开发都能够熟练掌握使用，并且在性能至上的前提下进行开发。',
    projectList: [
        {
            index: 1,
            title: '电力系统-webAPP',
            startTime: '2017-07',
            endTime: '2017-08',
            skill: 'jQuery.js',
            content: '1、用户密码账号登陆，记住、修改密码，分等级跳转对应首页。2、模糊搜索和百度地图的结合（模糊搜索标注物）以及百度地图的一些api调用。3、多级菜单选择显示的报表和ECharts图表的展示以及图表的展示切换。4、日期查询报表数据和巡检数据的页面保存。5、工单维修步骤及操作保存'
        }, {
            index: 2,
            title: '医疗商城-webAPP',
            startTime: '2017-08',
            endTime: '2017-09',
            skill: 'Vue.js（Vuex、vue-router）+ ES6 + webpack；数据交换用自己封装的Ajax（优先使用fetch）',
            content: '1、两种角色的应用状态显示内容（游客和会员）。2、短信登陆和推荐人，记住登录状态。3、商品购买（余额和支付宝支付），商品收藏，和淘宝一样的购物车功能。4、商品列表的价格筛选，商品类型排序（前端实现，带过渡特效）。5、发表评论，上传图片（多张）。6、组件功能：提示框、loading状态、城市选择，搜索框（动态搜索，搜索提示）、分享弹框。备注：此项目属于二次开发，之前用的是jQuery.js后来客户需要页面和功能大改动，于是改用Vue.js重构，优化了整个项目。'
        }, {
            index: 3,
            title: '医疗商城-PC端',
            startTime: '2017-08',
            endTime: '2017-09',
            skill: '原生JavaScript',
            content: '轮播图；购物车组件功能（单选、多选并动态计算价格等，参考手机版）；收货地址的增新、更改和删除；商品详情页的相册功能（小图换大图加轮播类似淘宝）；菜单下拉切换；返回顶部 该项目在首次移动端开发时同步开发的，后来客户需求变动，导致这个项目废弃，所以就没有下文了，也没有后台数据那些...'
        }, {
            index: 4,
            title: '信用超市-公众号',
            startTime: '2017-09',
            endTime: '2017-10',
            skill: 'Vue.js（Vuex、vue-router） + ES6 + webpack；数据交换用自己封装的Ajax（优先使用fetch）',
            content: '1、组件功能：提示框、loading状态、城市选择，搜索框（动态搜索，搜索提示）。2、二维码本地生成。3、各种网贷信息的展示，身份证实名验证。4、手机短信登陆。5、上传头像，用户资料修改。6、跳转app下载等功能（该项目在我离职前还没申请到公众号的链接绑定，所以并不清楚线上项目名称）。7、用vuex的优点做了数据缓存，保证了再次打开相同的页面也不会出现页面加载中或空白的状态。'
        }, {
            index: 5,
            title: '君必强-APP',
            startTime: '2017-11',
            endTime: '2017-11',
            skill: 'apicloud + Vue.js; 数据交互用apicloud自带的Ajax',
            content: '该项目属于线上项目，所以我接手的时候只是在原来的基础上增加了一个模块（论坛），共4个。论坛模块的筛选和切换；用户发帖，上传图片；版主管理帖子信息内容和模糊搜索；帖子审核（是否通过，加精，置顶和删除）；帖子的回复（回复层主，回复楼主，回复用户三种角色）；帖子点赞、收藏功能；用户帖子信息状态查看等功能。'
        }, {
            index: 6,
            title: '元圣道方-APP',
            startTime: '2017-11',
            endTime: '2017-12',
            skill: 'apicloud + Vue.js; 数据交互用apicloud自带的Ajax',
            content: '1、用户短信登陆。2、用户地址管理/资料更改、上传头像。3、订单模糊搜索和订单状态，订单物流的查看（这里有用户等级的不同展示和功能）。4、扫码功能。5、微信分享功能。6、用户资料查询（余额，积分，等级，消费记录）。7、app消息提醒。8、商城类（常见的商品展示，商品详情，商品购买，订单留言和购物车功能）。'
        }, {
            index: 7,
            title: '微商系统-公众号',
            startTime: '2018-01',
            endTime: '2018-02',
            skill: 'Vue.js + ES6 + webpack；用到自己编写的插件：Ajax（优先使用fetch）、轮播图、用户交互提示功能、本地生成二维码、页面到底部加载更多。',
            content: '1、分游客和会员状态，手机注册登录修改密码。2、微信支付，分享，扫描商品和物流码。3、商品搜索，上传图片。4、除了常见的商城类型外还有考试答题，点赞收藏，模糊过滤，每日任务的百分比圆环显示（CSS3实现）。5、这个项目比较大，所以为了减少请求在部分常见页面作了防止多次请求接口的设计（利用vuex实现），游客模式和会员模式进行了分模块化打包，提高首次打开的用户体验。'
        }, {
            index: 8,
            title: '广州楚才信息科技官网',
            startTime: '2018-03',
            endTime: '2018-03',
            skill: '原生JavaScript + HTML5/CSS3 响应式网站',
            content: 'PC，手机响应式网站，对低版本浏览器做了兼容跳转提示，首页动态切换视觉功能，小图换大图相册功能，分页功能，百度地图的位置显示，元素变化的过渡效果等。数据交互由php后台人员进行（即切图和编写静态功能）。'
        }, {
            index: 9,
            title: '小猪辩色-小程序（益智类游戏）',
            startTime: '2018-04',
            endTime: '2018-04',
            skill: 'ES6 + wx语法',
            content: '两个游戏模式：4宫格颜色文字反应点击和难度逐渐增加多色宫格。4宫格则固定的4个方块，根据每次获取回来的数据生成不同的文字和色块、题目，然后在规定时间内进行正确的操作获取不同的奖励；逐渐增加多色宫格则是根据关卡进度不断增加色块难度和数量的视觉辨别玩法，玩家在规定时间内点击多个色块中的一个与其他色块不一致的就为成功，每隔10关有一次奖励；其他的有个人钱包、信息页、排行页，奖品页等与一般H5页面一致。'
        }, {
            index: 10,
            title: '跑酷加减法-小程序（益智类游戏）',
            startTime: '2018-04',
            endTime: '2018-05',
            skill: 'ES6 + wx语法',
            content: '只有一个游戏模式：根据获取回来的数据生成计算题目和答案，然后在规定时间内判断正确或错误提交，成功则继续下一关（没有关卡限制，只有难度增大），每隔多少关就会获得相应的奖励，然后在余额页面进行提现，还有娃娃领取页面也是可以填写收货信息进行娃娃领取的。其他的有个人钱包、信息页、排行页，奖品页等与一般H5页面一致。第二版本增加了红包活动功能，具体参照默契答答红包功能。'
        }, {
            index: 11,
            title: '默契答答-小程序（社交类）',
            startTime: '2018-05',
            endTime: '2018-05',
            skill: 'ES6 + wx语法',
            content: '一个出题者与答题者的社交类游戏，出题者设定题目和规则，然后分享到朋友圈，红包广场（小程序里面的一个世界场景）或者好友，答题者完成出题者规则就可获得出题者派送的红包，红包的金额和数量也是出题者设定的；其他功能有审核题目列表，自定义题库，红包管理，游戏状态查看，红包广场，定时发放红包，余额提现等。'
        }, {
            index: 12,
            title: '疯狂鸟儿-小游戏',
            startTime: '2018-06',
            endTime: '2018-06',
            skill: 'cocos creator游戏引擎',
            content: '类似经典游戏像素鸟，挑战你的极限反应与操作，微信搜索“疯狂鸟儿”即可体验。'
        }, {
            index: 13,
            title: '最强射击-小游戏',
            startTime: '2018-07',
            endTime: '2018-07',
            skill: 'cocos creator游戏引擎',
            content: '拖动一个发射点进行射击方块类游戏，击中方块即根据子弹等级减少方块内的数字（方块的颜色随数字减少而变淡），到达0即爆炸，否则碰到方块即游戏结束。三种游戏道具：快速子弹、重力弹、散弹。游戏难度和游戏子弹的属性的升级由动态去更改（后台修改，前端上传数据）'
        }, {
            index: 14,
            title: '芝麻说说-小程序（社交类）',
            startTime: '2018-07',
            endTime: '2018-07',
            skill: 'ES6 + wx语法',
            content: '升级的第二个版本，一个设置红包口令然后派发到广场，说出口令即可参与红包玩法；第二版主要是增加了红包拼团的玩法（最多四个人）、红包审核、广告插入和一些用户操作提示的功能。'
        }, {
            index: 15,
            title: '元气游戏中心-小程序',
            startTime: '2018-08',
            endTime: '2018-08',
            skill: 'ES6 + wx语法',
            content: '公司游戏盒子'
        }, {
            index: 16,
            title: '颜值猫养成-小游戏',
            startTime: '2018-08',
            endTime: '2018-08',
            skill: 'cocos creator游戏引擎',
            content: '养成类换装小游戏，数据是由本地储存和计算，小程序搜索“颜值猫养成”即可体验。'
        }, {
            index: 17,
            title: '太空黑洞迷航-小游戏',
            startTime: '2018-08',
            endTime: '2018-08',
            skill: 'cocos creator游戏引擎',
            content: '休闲类动作过关小游戏，小程序搜索“太空黑洞迷航”即可体验。'
        }, {
            index: 18,
            title: '开局一条咸鱼-小游戏',
            startTime: '2018-08',
            endTime: '2018-08',
            skill: 'cocos creator游戏引擎',
            content: '休闲类单指操作小游戏，小程序搜索“开局一条咸鱼”即可体验。'
        }, {
            index: 19,
            title: '踩砖块-小游戏',
            startTime: '2018-08',
            endTime: '2018-09',
            skill: 'cocos creator游戏引擎',
            content: '休闲类动作小游戏，小程序搜索“踩砖块”即可体验。'
        }, {
            index: 20,
            title: '嫦娥中秋奔月-小游戏',
            startTime: '2018-09',
            endTime: '2018-09',
            skill: 'cocos creator游戏引擎',
            content: '类似经典游戏“涂鸦跳跃”，增加了收集道具并使用、奖励模式和复活三大玩法，小程序搜索“嫦娥中秋奔月”即可体验。'
        }, {
        //     index: 21,
        //     title: '陨石破坏王-小游戏',
        //     startTime: '2018-09',
        //     endTime: '2018-09',
        //     skill: 'cocos creator游戏引擎',
        //     content: '玩家可操控的只有一大块巨石。当游戏开启后，巨石将被弹射出来，玩家可点击屏幕让巨石狠狠得砸到地面，并且在这些看起来相当恐慌的兽人中藏有一些手握道具的特殊兽人。比如砸中一个携带炸弹的兽人他就会把巨石远远炸到空中;砸中携带金库的兽人就能收获到丰厚的金钱，金币可以用来购买升级增益道具，扫描右方二维码体验。',
        //     code: 'http://skt.webgz.cn/orc/'
        // }, {
            index: 21,
            title: '方块切割-H5游戏',
            startTime: '2018-10',
            endTime: '2018-10',
            skill: 'cocos creator游戏引擎',
            content: '类似水果忍者的切割休闲游戏，有抽奖，签到和皮肤试玩等功能。扫描右方二维码体验。',
            code: 'http://skt.webgz.cn/demo/slicing/'
        }, {
            index: 22,
            title: '企鹅大逃亡-H5游戏',
            startTime: '2018-10',
            endTime: '2018-11',
            skill: 'cocos creator游戏引擎',
            content: '企鹅宝宝大逃亡，操作类跑酷游戏，各种道具和皮肤更换（各自不同的属性）。扫描右方二维码体验。该游戏资源较多首次加载可能久一点',
            code: 'http://skt.webgz.cn/demo/dash_v2/'
        }, {
            index: 23,
            title: '疯狂大逃杀-小游戏',
            startTime: '2018-11',
            endTime: '2018-11',
            skill: 'cocos creator游戏引擎',
            content: '合成+战斗类休闲挂机游戏，有商店、技能、队友助战、背包等丰富功能，期间做了第二个版本升级，部分功能有更变。微信小程序搜索“疯狂大逃杀”即可体验',
        }, {
            index: 24,
            title: '甄嬛传奇-小游戏',
            startTime: '2018-12',
            endTime: '2018-12',
            skill: 'cocos creator游戏引擎',
            content: '合成类休闲挂机游戏，有商店、换装、任务、技能和额外收集金币小游戏等系统。微信小程序搜索“甄嬛传奇”即可体验',
        }, {
            index: 25,
            title: '益智游戏OL-小游戏',
            startTime: '2018-12',
            endTime: '2018-12',
            skill: 'cocos creator游戏引擎',
            content: '脑筋急转弯类益智休闲游戏。微信小程序搜索“益智游戏OL”即可体验',
        },  {
            index: 26,
            title: '荒野英雄-小游戏',
            startTime: '2019-01',
            endTime: '2019-01',
            skill: 'cocos creator游戏引擎',
            content: '合成+战斗类休闲挂机游戏，有商店、技能、背包、超越好友等丰富功能，战斗是多个敌人参与战斗，有近战和远战两种攻击模式，三种武器攻击类型。微信小程序搜索“荒野英雄”即可体验',
        }
    ]
};

function outputList(arr) {
    arr.reverse();
    function createItem(obj) {
        var li = document.createElement('li');
        var calssName = obj.code ? 'info-code' : 'info';
        li.innerHTML = '<div class="title-box flex">\
                            <span class="f1 title">'+ obj.title + '</span>\
                            <span class="f1 time">'+ obj.startTime + '-' + obj.endTime + '</span>\
                            <span class="f1"></span>\
                        </div>\
                        <p class="skill">所用技能：'+ obj.skill + '</p>\
                        <p class="'+ calssName +'">'+ obj.content + '</p>';
        document.querySelector('.project-list').appendChild(li);
        // 判断生成二维码
        if (obj.code) {
            var codeImg = document.createElement('div');
            codeImg.style.float = 'right';
            var qrcode = new QRCode(codeImg, {
                width: 100,
                height: 100
            });
            qrcode.makeCode(obj.code);
            li.appendChild(codeImg);
        }
    }
    for (var i = 0; i < arr.length; i++) createItem(arr[i]);
}

function updataInfo() {
    var text = document.createTextNode(myInfo.age);
    document.querySelector('.Age').appendChild(text);
    document.querySelector('.comment').textContent = myInfo.comment;
    outputList(myInfo.projectList);
}
updataInfo();