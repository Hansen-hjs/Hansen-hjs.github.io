(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e61a3bf"],{1000:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"detail"},[e("div",{directives:[{name:"ripple",rawName:"v-ripple",value:"rgba(0,0,0,0.2)",expression:"'rgba(0,0,0,0.2)'"}],staticClass:"whitebtn back",on:{click:t.goBack}},[t._v("返回")]),e("div",{staticClass:"title"},[t._v(t._s(t.pageData.title))]),e("div",{staticClass:"time"},[t._v("发布日期："+t._s(t.pageData.date))]),e("div",{staticClass:"img-box",staticStyle:{"margin-bottom":"10px"}},[e("img",{attrs:{src:t.pageData.image,alt:""}})]),e("div",{staticClass:"info"},[t._v(t._s(t.pageData.content))]),t._l(t.pageData.contentList,function(a,i){return e("div",{key:i,staticClass:"items"},[0==a.type?e("div",{staticClass:"text"},[t._v(t._s(a.data))]):1==a.type?e("div",{staticClass:"img-box"},[e("img",{attrs:{src:a.data,alt:""}})]):2==a.type?e("div",{staticClass:"title"},[t._v(t._s(a.data))]):3==a.type?e("div",{staticClass:"tip"},[t._v(t._s(a.data))]):t._e(),a.path?e("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"bluebtn btn",on:{click:function(e){return t.openDetail(a.path)}}},[t._m(0,!0)]):t._e(),a.github?e("div",{directives:[{name:"ripple",rawName:"v-ripple",value:"rgba(0,0,0,0.2)",expression:"'rgba(0,0,0,0.2)'"}],staticClass:"whitebtn btn",on:{click:function(e){return t.openLink(a.github)}}},[t._m(1,!0)]):t._e(),a.link?e("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"greenbtn btn",on:{click:function(e){return t.openLink(a.link)}}},[t._m(2,!0)]):t._e()])}),e("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"bottom"},[t._v("仅供学习，转载请标明出处，谢谢~")])],2)},s=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"box"},[i("span",[t._v("文章介绍")]),i("img",{attrs:{src:e("3fb1"),alt:""}})])},function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"box"},[i("span",[t._v("GitHub")]),i("img",{attrs:{src:e("359c"),alt:""}})])},function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"box"},[i("span",[t._v("新窗口打开")]),i("img",{attrs:{src:e("3fb1"),alt:""}})])}],n=e("d225"),c=e("b0b4"),r=e("308d"),l=e("6bb5"),o=e("4e2b"),p=e("9ab4"),u=e("60a3"),v=e("cecd"),d=function(t){function a(){return Object(n["a"])(this,a),Object(r["a"])(this,Object(l["a"])(a).apply(this,arguments))}return Object(o["a"])(a,t),Object(c["a"])(a,[{key:"goBack",value:function(){this["$router"].go(-1)}},{key:"openDetail",value:function(t){this["$router"].push(t),window.scrollTo(0,0)}},{key:"openLink",value:function(t){window.open(t)}},{key:"mounted",value:function(){window.scrollTo(0,0)}},{key:"pageData",get:function(){var t=v["a"].homeData.columnList,a=this["$route"].params.id,e=t.filter(function(t){return t.id==a})[0];return e}}]),a}(u["d"]);d=p["a"]([Object(u["a"])({})],d);var b=d,m=b,_=(e("8161"),e("2877")),f=Object(_["a"])(m,i,s,!1,null,"37678a6d",null);a["default"]=f.exports},"3fb1":function(t,a,e){t.exports=e.p+"img/book.5bbd1f2d.png"},8161:function(t,a,e){"use strict";var i=e("d8a1"),s=e.n(i);s.a},d8a1:function(t,a,e){}}]);