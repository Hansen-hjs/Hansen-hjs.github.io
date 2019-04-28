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
    comment: '自我评价：做过的项目类型有web、web-App、hybrid-App、公众号、小程序和小游戏，对于开发有丰富的领域经验，能快速高效的进行项目部署。对移动端前端开发有深入了解，并且自己写过了一些移动端的日常插件（ES6）：swiper轮播图、手势放大缩小图片、用户交互提示、下拉刷新、图片懒加载、基于fech.js的Ajax、小球抛物线，按钮点击水波纹。线上预览地址：https://hansen-hjs.github.io/cv/demo/vue/。无论对开发环境webpack+Vue.js还是直接原生JavaScript开发都能够熟练掌握使用。',
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
        //     index: 21,
        //     title: '方块切割-H5游戏',
        //     startTime: '2018-10',
        //     endTime: '2018-10',
        //     skill: 'cocos creator游戏引擎',
        //     content: '参照app(slicing)游戏写的H5游戏。类似水果忍者的切割休闲游戏，有抽奖，签到和皮肤试玩等功能。扫描右方二维码体验。',
        //     code: 'http://skt.webgz.cn/demo/slicing/',
        //     end: true
        // }, {
            index: 22,
            title: '企鹅大逃亡-H5游戏',
            startTime: '2018-10',
            endTime: '2018-11',
            skill: 'cocos creator游戏引擎',
            content: '企鹅冲刺，操作类跑酷(伪3D)游戏，各种道具和皮肤更换，每种皮肤带有不同的属性。扫描右方二维码体验。该游戏资源较多首次加载可能久一点',
            code: 'https://hansen-hjs.github.io/cv/demo/dash/index.html'
        }, {
            index: 23,
            title: '疯狂大逃杀-小游戏',
            startTime: '2018-11',
            endTime: '2018-11',
            skill: 'cocos creator游戏引擎',
            content: '合成+战斗类休闲挂机游戏，有商店、技能、队友助战、背包等丰富功能。第一版本类似app游戏“合成之星”，后续做了第二、三个版本升级，部分功能有更变。微信小程序搜索“疯狂大逃杀”即可体验',
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
        }, {
            index: 27,
            title: '玩爆砖块-小游戏',
            startTime: '2019-04',
            endTime: '2019-04',
            skill: 'cocos creator游戏引擎',
            content: '射击类消除游戏，分无限模式和关卡模式，每个模式都有7种不同的玩法，多个皮肤和音乐供选择。微信小程序搜索“玩爆砖块”即可体验',
        }
    ]
};

/** 选择元素 单个 */
function find(name) {
    return document.querySelector(name);
}

/** 项目列表输出节点 */
var listNode = find('.project-list');

/** 输出列表索引 */
var listIndex = 0;

/**
 * 创建当个项目列表
 * @param {Object} info 项目信息
 */
function createItem(info) {
    var li = document.createElement('li');
    var calssName = info.code ? 'info-code' : 'info';
    li.innerHTML = '<div class="title-box flex">\
                        <span class="f1 title">'+ info.title + '</span>\
                        <span class="f1 time">'+ info.startTime + '-' + info.endTime + '</span>\
                        <span class="f1"></span>\
                    </div>\
                    <p class="skill">所用技能：'+ info.skill + '</p>\
                    <p class="'+ calssName +'">'+ info.content + '</p>';
    listNode.appendChild(li);

    // 判断生成二维码
    if (!info.code) return;
    var codeImg = document.createElement('div');
    codeImg.style.float = 'right';
    var qrcode = new QRCode(codeImg, {
        width: 100,
        height: 100
    });
    qrcode.makeCode(info.code);
    li.appendChild(codeImg);
}

/**
 * 输出项目列表
 * @param {Array} list 项目列表
 */
function outputList(list) {
    list.reverse();
    for (var i = 0; i < list.length; i++) {
        createItem(list[i]);
        listIndex += 1;
        if (list[i].end) break;
    }
}

/** 更新信息 */
function updataInfo() {
    var text = document.createTextNode(myInfo.age);
    find('.Age').appendChild(text);
    find('.comment').textContent = myInfo.comment;
    outputList(myInfo.projectList);
}
updataInfo();

/** 更多项目 */
function moreList(el) {
    el.parentNode.removeChild(el);
    var list = myInfo.projectList;
    for (var i = listIndex; i < list.length; i++) {
        createItem(list[i]);
        listIndex += 1;
    }
}