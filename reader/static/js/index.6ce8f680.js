(function(e){function n(n){for(var o,i,u=n[0],c=n[1],s=n[2],l=0,p=[];l<u.length;l++)i=u[l],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);f&&f(n);while(p.length)p.shift()();return r.push.apply(r,s||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],o=!0,i=1;i<t.length;i++){var c=t[i];0!==a[c]&&(o=!1)}o&&(r.splice(n--,1),e=u(u.s=t[0]))}return e}var o={},a={index:0},r=[];function i(e){return u.p+"static/js/"+({"pages-book":"pages-book","pages-tabBar-home":"pages-tabBar-home","pages-tabBar-personal":"pages-tabBar-personal"}[e]||e)+"."+{"pages-book":"08bcb70b","pages-tabBar-home":"d7a8cb90","pages-tabBar-personal":"7eb616d9"}[e]+".js"}function u(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t=a[e];if(0!==t)if(t)n.push(t[2]);else{var o=new Promise((function(n,o){t=a[e]=[n,o]}));n.push(t[2]=o);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=i(e);var s=new Error;r=function(n){c.onerror=c.onload=null,clearTimeout(l);var t=a[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",s.name="ChunkLoadError",s.type=o,s.request=r,t[1](s)}a[e]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:c})}),12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(n)},u.m=e,u.c=o,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)u.d(t,o,function(n){return e[n]}.bind(null,o));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var l=0;l<c.length;l++)n(c[l]);var f=s;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var o=t("483d"),a=t.n(o);a.a},"04c5":function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},r=[]},"23be":function(e,n,t){"use strict";t.r(n);var o=t("341d"),a=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=a.a},"341d":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={onLaunch:function(){},onShow:function(){},onHide:function(){}};n.default=o},"3dfd":function(e,n,t){"use strict";t.r(n);var o=t("04c5"),a=t("23be");for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);t("034f");var i,u=t("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=c.exports},"483d":function(e,n,t){var o=t("867b");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=t("4f06").default;a("b29d6b30",o,!0,{sourceMap:!1,shadowMode:!1})},"56d7":function(e,n,t){"use strict";var o=t("4ea4"),a=o(t("5530"));t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("6cdc"),t("1c31"),t("921b");var r=o(t("e143")),i=o(t("3dfd"));r.default.config.productionTip=!1,i.default.mpType="app";var u=new r.default((0,a.default)({},i.default));u.$mount()},5768:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={pages:{"pages/tabBar/home":{navigationBarTitleText:"首页"},"pages/tabBar/personal":{navigationBarTitleText:"个人页"},"pages/book":{navigationStyle:"custom"}},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"小说阅读器",navigationBarBackgroundColor:"#f4f4f4",backgroundColor:"#f4f4f4"}};n.default=o},"6cdc":function(e,n,t){"use strict";(function(e){var n=t("4ea4"),o=n(t("e143"));e["________"]=!0,delete e["________"],e.__uniConfig={globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"小说阅读器",navigationBarBackgroundColor:"#f4f4f4",backgroundColor:"#f4f4f4"},tabBar:{color:"#7A7E83",selectedColor:"#000000",borderStyle:"white",backgroundColor:"#f4f4f4",list:[{pagePath:"pages/tabBar/home",iconPath:"static/home_off.png",selectedIconPath:"static/home_on.png",text:"书城",redDot:!1,badge:""},{pagePath:"pages/tabBar/personal",iconPath:"static/personal_off.png",selectedIconPath:"static/personal_on.png",text:"我的",redDot:!1,badge:""}]}},e.__uniConfig.router={mode:"hash",base:"/"},e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},e.__uniConfig.sdkConfigs={},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},o.default.component("pages-tabBar-home",(function(e){var n={component:t.e("pages-tabBar-home").then(function(){return e(t("98b1"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),o.default.component("pages-tabBar-personal",(function(e){var n={component:t.e("pages-tabBar-personal").then(function(){return e(t("e180"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),o.default.component("pages-book",(function(e){var n={component:t.e("pages-book").then(function(){return e(t("973a"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),e.__uniRoutes=[{path:"/",alias:"/pages/tabBar/home",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isEntry:!0,isTabBar:!0,tabBarIndex:0},__uniConfig.globalStyle,{navigationBarTitleText:"首页"})},[e("pages-tabBar-home",{slot:"page"})])}},meta:{id:1,name:"pages-tabBar-home",isNVue:!1,pagePath:"pages/tabBar/home",isQuit:!0,isEntry:!0,isTabBar:!0,tabBarIndex:0,windowTop:44}},{path:"/pages/tabBar/personal",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isTabBar:!0,tabBarIndex:1},__uniConfig.globalStyle,{navigationBarTitleText:"个人页"})},[e("pages-tabBar-personal",{slot:"page"})])}},meta:{id:2,name:"pages-tabBar-personal",isNVue:!1,pagePath:"pages/tabBar/personal",isQuit:!0,isTabBar:!0,tabBarIndex:1,windowTop:44}},{path:"/pages/book",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationStyle:"custom"})},[e("pages-book",{slot:"page"})])}},meta:{name:"pages-book",isNVue:!1,pagePath:"pages/book",windowTop:0}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}]}).call(this,t("c8ba"))},"867b":function(e,n,t){var o=t("24fb");n=o(!1),n.push([e.i,".page{background-color:#fff;width:100%;box-sizing:border-box;min-height:100vh}",""]),e.exports=n},ecd6:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={appid:""};n.default=o}});