(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8a4b39d0"],{"02a8":function(t,a,i){},1000:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"detail"},[i("div",{staticClass:"whitebtn back",attrs:{ripple:"true",color:"rgba(0,0,0,0.2)"},on:{click:t.goBack}},[t._v("返回")]),i("div",{staticClass:"title"},[t._v(t._s(t.pageData.title))]),i("div",{staticClass:"time"},[t._v("发布日期："+t._s(t.pageData.date))]),i("div",{staticClass:"img-box",staticStyle:{"margin-bottom":"10px"}},[i("img",{attrs:{src:t.pageData.image,alt:""}})]),i("div",{staticClass:"info"},[t._v(t._s(t.pageData.content))]),t._l(t.pageData.contentList,function(a,e){return i("div",{key:e,staticClass:"items"},[0==a.type?i("div",{staticClass:"text"},[t._v(t._s(a.data))]):1==a.type?i("div",{staticClass:"img-box"},[i("img",{attrs:{src:a.data,alt:""}})]):2==a.type?i("div",{staticClass:"title"},[t._v(t._s(a.data))]):3==a.type?i("div",{staticClass:"tip"},[t._v(t._s(a.data))]):t._e(),a.path?i("div",{staticClass:"bluebtn btn",attrs:{ripple:"true"},on:{click:function(i){return t.openDetail(a.path)}}},[t._m(0,!0)]):t._e(),a.github?i("div",{staticClass:"whitebtn btn",attrs:{ripple:"true",color:"rgba(0,0,0,0.2)"},on:{click:function(i){return t.openLink(a.github)}}},[t._m(1,!0)]):t._e(),a.link?i("div",{staticClass:"greenbtn btn",attrs:{ripple:"true"},on:{click:function(i){return t.openLink(a.link)}}},[t._m(2,!0)]):t._e()])}),i("div",{staticClass:"bottom",attrs:{ripple:"true"}},[t._v("仅供学习，转载请标明出处，谢谢~")])],2)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box"},[e("span",[t._v("文章介绍")]),e("img",{attrs:{src:i("3fb1"),alt:""}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box"},[e("span",[t._v("GitHub")]),e("img",{attrs:{src:i("359c"),alt:""}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box"},[e("span",[t._v("新窗口打开")]),e("img",{attrs:{src:i("3fb1"),alt:""}})])}],n=i("d225"),c=i("b0b4"),r=i("308d"),o=i("6bb5"),l=i("4e2b"),u=i("9ab4"),p=i("60a3"),b=i("cecd"),v=function(t){function a(){return Object(n["a"])(this,a),Object(r["a"])(this,Object(o["a"])(a).apply(this,arguments))}return Object(l["a"])(a,t),Object(c["a"])(a,[{key:"goBack",value:function(){this["$router"].go(-1)}},{key:"openDetail",value:function(t){this["$router"].push(t),window.scrollTo(0,0)}},{key:"openLink",value:function(t){window.open(t)}},{key:"mounted",value:function(){window.scrollTo(0,0)}},{key:"pageData",get:function(){var t=b["a"].homeData.columnList,a=this["$route"].params.id,i=t.filter(function(t){return t.id==a})[0];return i}}]),a}(p["d"]);v=u["a"]([Object(p["a"])({})],v);var d=v,f=d,_=(i("c91a"),i("2877")),g=Object(_["a"])(f,e,s,!1,null,"13a40aff",null);a["default"]=g.exports},"3fb1":function(t,a,i){t.exports=i.p+"img/book.5bbd1f2d.png"},c91a:function(t,a,i){"use strict";var e=i("02a8"),s=i.n(e);s.a}}]);
//# sourceMappingURL=chunk-8a4b39d0.2e3812c1.js.map