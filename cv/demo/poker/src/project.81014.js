window.__require=function o(e,t,r){function n(c,p){if(!t[c]){if(!e[c]){var s=c.split("/");if(s=s[s.length-1],!e[s]){var u="function"==typeof __require&&__require;if(!p&&u)return u(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+c+"'")}}var a=t[c]={exports:{}};e[c][0].call(a.exports,function(o){return n(e[c][1][o]||o)},a,a.exports,o,e,t,r)}return t[c].exports}for(var i="function"==typeof __require&&__require,c=0;c<r.length;c++)n(r[c]);return n}({Main:[function(o,e,t){"use strict";cc._RF.push(e,"898abEHKhNCJJUKaPd3sDvD","Main");var r=this&&this.__extends||function(){var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,e){o.__proto__=e}||function(o,e){for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),n=this&&this.__decorate||function(o,e,t,r){var n,i=arguments.length,c=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(o,e,t,r);else for(var p=o.length-1;p>=0;p--)(n=o[p])&&(c=(i<3?n(c):i>3?n(e,t,c):n(e,t))||c);return i>3&&c&&Object.defineProperty(e,t,c),c};Object.defineProperty(t,"__esModule",{value:!0});var i=cc._decorator,c=i.ccclass,p=i.property,s=i.menu,u=function(o){function e(){var e=null!==o&&o.apply(this,arguments)||this;return e.pokerNode=null,e.pokerBox=null,e.pokerPool=[],e.moving=!1,e.moveType="off",e.pokerTotal=12,e}return r(e,o),e.prototype.initPool=function(){for(var o=0;o<this.pokerTotal;o++){var e=cc.instantiate(this.pokerNode);this.pokerPool.push(e)}},e.prototype.getPoker=function(){return this.pokerPool.length?this.pokerPool.shift():cc.instantiate(this.pokerNode)},e.prototype.putPoker=function(o){o.parent.removeChild(o),this.pokerPool.push(o)},e.prototype.setPoker=function(o){var e=this,t=o.poker_index;switch(this.moveType){case"on":var r=.1*this.node.width,n=8*r/this.pokerTotal,i=r-this.node.width/2-o.width/2+n*t;o.parent=this.pokerBox,o.setPosition(0,100),o.setScale(.4,.4),o.runAction(cc.sequence(cc.spawn(cc.moveTo(.4,i,-220),cc.scaleTo(.4,1,1)),cc.moveTo(.1,i,-190),cc.callFunc(function(){o.y=-190,t==e.pokerTotal&&(e.moving=!1)})));break;case"off":o.runAction(cc.sequence(cc.moveTo(.3,0,-190),cc.spawn(cc.moveTo(.2,0,100),cc.scaleTo(.2,.4,.4)),cc.callFunc(function(){e.putPoker(o),1==t&&(e.moving=!1)})))}},e.prototype.ouputPoker=function(){var o=this;if(!this.moving&&"on"!=this.moveType){this.moving=!0,this.moveType="on";for(var e=function(e){var r=t.getPoker();r.poker_index=e+1,t.scheduleOnce(function(){o.setPoker(r)},.2*e)},t=this,r=0;r<this.pokerTotal;r++)e(r)}},e.prototype.recoverPoker=function(){if(!this.moving&&"off"!=this.moveType){this.moving=!0,this.moveType="off";for(var o=this.pokerBox.children.length-1;o>=0;o--){var e=this.pokerBox.children[o];this.setPoker(e)}}},e.prototype.onLoad=function(){this.initPool()},n([p({type:cc.Node,displayName:"\u6251\u514b\u9884\u5236\u4f53"})],e.prototype,"pokerNode",void 0),n([p({type:cc.Node,displayName:"\u6251\u514b\u5bb9\u5668"})],e.prototype,"pokerBox",void 0),e=n([c,s("\u4e3b\u7a0b\u5e8f")],e)}(cc.Component);t.default=u,cc._RF.pop()},{}]},{},["Main"]);