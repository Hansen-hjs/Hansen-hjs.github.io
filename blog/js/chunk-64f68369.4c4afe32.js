(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64f68369"],{"754b":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"about"},[s("div",{staticClass:"title"},[t._v("个人说明")]),s("div",{staticClass:"content"},[s("div",{staticClass:"left"},[s("div",{staticClass:"head"},[s("img",{attrs:{src:t.author.head,alt:""}})]),s("div",{staticClass:"item"},[s("img",{staticClass:"icon",attrs:{src:t.author.name_img,alt:""}}),s("div",{staticClass:"value"},[t._v(t._s(t.author.name))])]),s("div",{staticClass:"item"},[s("img",{staticClass:"icon",attrs:{src:t.author.occupation_img,alt:""}}),s("div",{staticClass:"value"},[t._v(t._s(t.author.occupation))])]),s("div",{staticClass:"item"},[s("img",{staticClass:"icon",attrs:{src:t.author.mailbox_img,alt:""}}),s("div",{staticClass:"value"},[t._v(t._s(t.author.mailbox))])]),s("div",{staticClass:"item"},[s("img",{staticClass:"icon",attrs:{src:t.author.wechat_img,alt:""}}),s("div",{staticClass:"value"},[t._v(t._s(t.author.wechat))])]),s("div",{staticClass:"item"},[s("img",{staticClass:"icon",attrs:{src:t.author.github_img,alt:""}}),s("div",{staticClass:"value"},[t._v(t._s(t.author.github))])])]),s("div",{staticClass:"info"},[s("div",{staticClass:"tip"},[t._v(t._s(t.info.tip))]),s("div",{staticClass:"time"},[t._v("更新时间："+t._s(t.info.date))]),t._l(t.info.contentList,function(a,i){return s("div",{key:i,staticClass:"text",style:{color:a.color||"#666"}},[t._v(t._s(a.text))])})],2)])])},e=[],c=s("d225"),o=s("b0b4"),u=s("308d"),r=s("6bb5"),l=s("4e2b"),n=s("9ab4"),v=s("60a3"),d=s("cecd"),b=function(t){function a(){var t;return Object(c["a"])(this,a),t=Object(u["a"])(this,Object(r["a"])(a).apply(this,arguments)),t.author=d["a"].authorInfo,t.info={tip:"这是一个前端技术博客",date:"2019/07/29",contentList:[{text:"为什么要写一个这样的博客，初衷是想把学到有用的技术分享给一些有需要的人，到后来成为了自己的代码笔记分享...记得当初学前端的时候基本就是百度（相信很多人也是）。直到后来我看了一本书《JavaScript高级程序》，花了两个星期很认真的看完了之后（边看边写代码）发现原来代码可以这样写，于是乎才真正开始JS编程之旅。因为先前我也是一个jQuery小子，所以受jQuery编程思维影响的我首次感到JS这门语言的灵活性。然后就经常去CodePen这类网站去看别人的代码，再到之后自己开始尝试用原生去实现一个简单的jQuery库、编写各种常用的web组件、JS到TS...。"},{text:"之后回头看看百度上面的那些转载了很多次的技术文章，比如我搜索一个vue computed 的使用，搜到文章的内容是直接复制官网的，我不明白为什么那些作者会有如此睿智的操作，如果官网能看懂还用来看你这篇文章？不单只是这种行为，还有百度上面能搜到的，大部分都是大家复制粘贴，转来转去的内容，基本上搜10篇文章有一半内容是相同的，最主要的是，对问题的解决没有得到有用的解决。也没有一个权威的网站可以定义或者说明这些问题（api 官网这个不算），所以才有各种各样的博客来分享各自对程序的理解，我也不例外。"},{text:"于是乎就决定把一些有用，且百度上搜不到的相关技术分享给有需要的人，毕竟代码写得再漂亮别人看不到也是一种遗憾，况且我也不会写很久的代码，要不是工资高，我才不愿意写代码。"},{text:"这里给前端的开发者强烈推荐使用 vs code 这个编辑器，强大的代码追踪提示配合JSDoc注释简直是再舒服不过的神器，同时多写JSDoc注释不但可以使代码更易阅读，同时也是一个良好的编程习惯，我觉得厉害的程序不是代码多牛逼多漂亮，而是用最少的代码实现最广的功能，同时其他程序员也能阅读。",color:"#68a069"},{text:"我是2015年正式接触JS的，虽然那时候Vue 和 ES6 刚发布，但是 MVVM 框架还没有正式鼎立、IE8及以下浏览器没有宣布死亡和jQuery的浪潮还算澎湃，所以我刚开始用JS的时候首选还是jQuery，所以我原生JS的基础可以说是0，抛弃了jQuery的api就无从下手，好在当时还是个学生，所以并不用考虑这么多，用到jQuery也只是做做dom的变形动画和IE的一些兼容而已。我深刻记得我工作第一个项目是jQuery+ECharts+百度地图的web-app，对于原生不熟的我，object原型链，数据类型转换...首次接触这些对于我来说简直是头皮发麻，不过还是给我搞出来（耗时一个月）。刚好在那个项目之后我看了“红宝书《JavaScript高级程序》”，也就是从那个时候开始，我才算正式入门。对比其他前端我算是比较幸运的，因为现代浏览器的普及以及IE宣布死亡（8及以下）所以可以直接使用ES6新语法，这个非常重要！！！许多面试题都喜欢问各种旧语法的实现技巧，常见的就有js继承的几种办法等之类的问题。在这里我可以肯定这些在实际运用中一定不会用到，因为babel的出现、和现代浏览器的支持，可以直接使用ES6 中的 extends。之所以不用旧语法，是因为本身JS的设计就存在缺陷，所以才出现各种实现某个方法的技巧，但使用旧语法的技巧都可能存在一些未知的问题，而新语法的出现就是弥补、统一这些不规范的技巧语法，同时省去一些不能预估的bug。一味追求使用旧语法说实话对自身的进步并没有起到太大作用，就好像当下流行的webpack+node去编程，基本上都是使用新语法去统一标准了，包括即将到来的Vue3.0也是基于新语法去实现。以上只是我个人的观点，对于旧语法，我们只需要了解和对比新语法的实现原理，只知道最重要的那一个就够了，操作的时候还是使用新语法，写好在让丢给给babel去处理新旧语法转换，这样可以规避一些不必要的麻烦，毕竟人家花了这么多时间和精力研发出来的产品去专门处理一件事情，肯定不会比你自己处理的差。"}]},t.menuList=["博客","关于"],t}return Object(l["a"])(a,t),Object(o["a"])(a,[{key:"mounted",value:function(){}}]),a}(v["d"]);b=n["a"]([Object(v["a"])({})],b);var h=b,m=h,C=(s("edcb"),s("2877")),_=Object(C["a"])(m,i,e,!1,null,"59404a05",null);a["default"]=_.exports},edcb:function(t,a,s){"use strict";var i=s("f9ba"),e=s.n(i);e.a},f9ba:function(t,a,s){}}]);
//# sourceMappingURL=chunk-64f68369.4c4afe32.js.map