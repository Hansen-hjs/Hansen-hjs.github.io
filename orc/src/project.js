__require=function e(o,t,n){function c(s,i){if(!t[s]){if(!o[s]){var l=s.split("/");if(l=l[l.length-1],!o[l]){var r="function"==typeof __require&&__require;if(!i&&r)return r(l,!0);if(a)return a(l,!0);throw new Error("Cannot find module '"+s+"'")}}var u=t[s]={exports:{}};o[s][0].call(u.exports,function(e){return c(o[s][1][e]||e)},u,u.exports,e,o,t,n)}return t[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<n.length;s++)c(n[s]);return c}({Ball:[function(e,o,t){"use strict";cc._RF.push(o,"cb8acBJ2t5H26YyJTwSNrq5","Ball");var n=e("Global"),c=[{mountain:"#7D2C1B",tree:"#491D12",floor:"#75280C",ground:"#3D1805"},{mountain:"#81b68c",tree:"#65977a",floor:"#e5c282",ground:"#2b5748"}];cc.Class({extends:cc.Component,properties:{moveBox:{default:null,type:cc.Node},bgColor:{default:null,type:cc.Node},audioFloor:{default:null,type:cc.AudioClip},audioDeath:{default:null,type:cc.AudioClip},audioBox:{default:null,type:cc.AudioClip},audioBoom:{default:null,type:cc.AudioClip},audioBoard:{default:null,type:cc.AudioClip},scoreLabel:{default:null,type:cc.Label},moneyLabel:{default:null,type:cc.Label},moneyTip:{default:null,type:cc.Label},explodeBoom:{default:null,type:cc.Prefab},explodeGold:{default:null,type:cc.Prefab}},moneyTipMove:function(e){n.userInfo.money+=e,this.moneyLabel.string=n.userInfo.money,this.moneyTip.string="\u91d1\u5e01 +"+e;var o=cc.spawn(cc.fadeIn(.3),cc.scaleTo(.3,2,2)),t=cc.scaleTo(.5,1,1),c=cc.spawn(cc.fadeOut(.3),cc.scaleTo(.3,1,1)),a=cc.sequence(o,t,c);a.easing(cc.easeOut(3)),this.moneyTip.node.runAction(a)},viewScale:function(){this.node.y<500||(n.game.wrap.scale=500/this.node.y)},colorSwitch:function(e,o,t,n,a){function s(e,o){var t=cc.sequence(cc.fadeOut(.3),cc.callFunc(function(){e.color=cc.hexToColor(c[a][o])}),cc.fadeIn(.3));e.runAction(t)}s(e,"mountain"),s(o,"tree"),s(t,"floor"),s(n,"ground")},bgMove:function(){var e=this.moveBox.width,o=this.moveBox.getChildByName("sun"),t=this.moveBox.getChildByName("tree"),c=this.moveBox.getChildByName("mountain"),a=this.moveBox.getChildByName("floor"),s=this.moveBox.getChildByName("ground"),i=this.moveBox.getChildByName("cloud");o.x-=this.bg_speed/8,o.x<=-o.width&&(o.x=e,n.gameInfo.level=n.gameInfo.countToatal==n.gameInfo.minNumber?n.gameInfo.level:n.gameInfo.level+1,console.log("\u96be\u5ea6\u589e\u52a0======>",n.gameInfo.level),255==o.opacity?(this.colorSwitch(c,t,a,s,1),this.bgColor.getChildByName("color-2").runAction(cc.fadeIn(.3)),o.runAction(cc.fadeOut(.3)),i.runAction(cc.fadeIn(.3))):(this.colorSwitch(c,t,a,s,0),this.bgColor.getChildByName("color-2").runAction(cc.fadeOut(.3)),o.runAction(cc.fadeIn(.3)),i.runAction(cc.fadeOut(.3)))),this.score_count+=this.bg_speed/16*this.value,this.score_count>=2&&(this.score_count=0,n.gameInfo.score+=1,this.scoreLabel.string=n.gameInfo.score+"m"),i.x-=this.bg_speed/8,i.x<=-i.width&&(i.x=e),c.x-=this.bg_speed/3,c.x<=-e&&(c.x=0),t.x-=this.bg_speed/2,t.x<=-e&&(t.x=0),s.x-=this.bg_speed/1.5,s.x<=-e&&(s.x=0)},restData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.floorNum=e,o||(this.bg_speed=16*n.gameInfo.startDash),this.value=.5,this.node.getChildByName("bone").getComponent(dragonBones.ArmatureDisplay).timeScale=o?.5:1},collisionFloor:function(){window.wx&&wx.vibrateShort(),this.floorNum+=5,this.floorNum>=25?(n.gameInfo.state="over",this.node.y=this.node.height/2,this.bounce=0,this.node.getChildByName("bone").getComponent(dragonBones.ArmatureDisplay).playAnimation("rockStop",1),this.node.getChildByName("particle").getComponent(cc.ParticleSystem).stopSystem(),n.game.gameOver()):this.bounce=25-this.floorNum,this.bg_speed=this.bg_speed/2,this.restData(this.floorNum,!0),cc.audioEngine.play(this.audioFloor,!1)},collisionOrc:function(e){var o=this;"over"==n.gameInfo.state||this.value<=1||this.isBoard||(window.wx&&wx.vibrateShort(),this.bounce<20&&!this.isBoard&&(this.bounce=20),n.game.explode(e),n.game.orcPool.put(e),n.gameInfo.total-n.gameInfo.level>=n.gameInfo.countToatal?n.game.creatOrc():(console.log("\u51cf\u5c11\u4e00\u4e2a\u517d\u4eba============>"),n.gameInfo.countToatal=n.gameInfo.countToatal<=n.gameInfo.minNumber?n.gameInfo.minNumber:n.gameInfo.countToatal-1),this.scheduleOnce(function(){o.isBoard||o.restData()},.01),cc.audioEngine.play(this.audioDeath,!1))},collisionStorehouse:function(e){var o=this;if(!("over"==n.gameInfo.state||this.value<=1)){window.wx&&wx.vibrateShort(),this.bounce<25&&(this.bounce=25),e.destroy();var t=cc.instantiate(this.explodeGold);t.setPosition(e.x+50,e.y+50),t.parent=n.game.map;var c=parseInt(50*Math.random())+50;this.moneyTipMove(c),this.scheduleOnce(function(){o.restData()},.01),cc.audioEngine.play(this.audioBox,!1)}},collisionBomb:function(e){var o=this;if(!("over"==n.gameInfo.state||this.value<=1)){n.game.nodeShock(),this.bounce=30,e.destroy();var t=cc.instantiate(this.explodeBoom);t.setPosition(e.x+50,e.y+50),t.parent=n.game.map,this.scheduleOnce(function(){o.restData()},.01),cc.audioEngine.play(this.audioBoom,!1)}},collisionBoard:function(e){var o=this;"over"==n.gameInfo.state||this.value<=1||(window.wx&&wx.vibrateShort(),this.bounce=15,this.floorNum=10,e.destroy(),this.isBoard=!0,this.scheduleOnce(function(){o.restData(o.floorNum),o.isBoard=!1,console.log("floorNum",o.floorNum)},.01),cc.audioEngine.play(this.audioBoard,!1))},onCollisionEnter:function(e,o){switch(e.node.name){case"floor":this.collisionFloor();break;case"orc":this.collisionOrc(e.node);break;case"storehouse":this.collisionStorehouse(e.node);break;case"bomb":this.collisionBomb(e.node);break;case"board":this.collisionBoard(e.node)}},onLoad:function(){this.bounce=0,this.restData(),this.score_count=0,this.moneyLabel.string=n.userInfo.money},start:function(){},update:function(e){"running"==n.gameInfo.state&&(this.bgMove(),this.viewScale(),this.bounce-=1*this.value,this.node.y+=this.bounce,this.node.y<0&&(this.node.y=this.node.width/2+1))}}),cc._RF.pop()},{Global:"Global"}],Game:[function(e,o,t){"use strict";cc._RF.push(o,"140e8YV+5pIDrBuK336hK4/","Game");var n=e("Global");cc.Class({extends:cc.Component,properties:{wrap:{default:null,type:cc.Node},ball:{default:null,type:cc.Node},coverStart:{default:null,type:cc.Node},map:{default:null,type:cc.Node},orc:{default:null,type:cc.Prefab},storehouse:{default:null,type:cc.Prefab},bomb:{default:null,type:cc.Prefab},board:{default:null,type:cc.Prefab},blood:{default:null,type:cc.Prefab},coverOver:{default:null,type:cc.Node},audioBgm:{default:null,type:cc.AudioClip},audioFail:{default:null,type:cc.AudioClip},pauseBtn:{default:null,type:cc.Node},blaze:{default:null,type:cc.Node},audioRevive:{default:null,type:cc.AudioClip}},openRank:function(){n.restData(),cc.director.loadScene("Rank")},openShare:function(){wx.shareAppMessage({title:n.shareInfo.title,imageUrl:n.shareInfo.url})},nodeShock:function(){window.wx&&wx.vibrateLong(),this.wrap.stopAllActions();var e=cc.sequence(cc.moveTo(.1,0,30),cc.moveTo(.1,0,-30),cc.moveTo(.1,0,30),cc.moveTo(.1,0,-30),cc.moveTo(.1,0,0));this.wrap.runAction(e)},blazeMove:function(){var e=this;window.wx&&wx.vibrateLong();var o=cc.sequence(cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.fadeIn(.2),cc.fadeOut(.2),cc.callFunc(function(){n.gameInfo.startDash=1,e.blaze.destroy(),console.log("\u51b2\u523a\u7ed3\u675f")}));this.blaze.runAction(o)},stateSwitch:function(){var e=this;this.pauseGame?(this.pauseGame=!1,cc.director.resume(),cc.loader.loadRes("pause",cc.SpriteFrame,function(o,t){e.pauseBtn.getComponent(cc.Sprite).spriteFrame=t})):(this.pauseGame=!0,cc.director.pause(),cc.loader.loadRes("play",cc.SpriteFrame,function(o,t){e.pauseBtn.getComponent(cc.Sprite).spriteFrame=t}))},reviveGame:function(){var e=this;cc.audioEngine.play(this.audioRevive,!1),this.coverOver.getChildByName("revive").destroy(),this.coverOver.active=!1;var o=cc.sequence(cc.moveBy(.5,0,350),cc.callFunc(function(){e.ball.getChildByName("bone").getComponent(dragonBones.ArmatureDisplay).playAnimation("rock",0),e.ball.getChildByName("particle").getComponent(cc.ParticleSystem).resetSystem(),e.balljs.restData(),e.balljs.bounce=0,n.gameInfo.state="running",n.playBgm=!0,cc.audioEngine.playMusic(e.audioBgm,!0),e.revived=!0}));this.ball.runAction(o)},playAgain:function(){n.restData(),cc.director.loadScene("Home")},startGame:function(){var e=this;this.coverStart.destroy(),n.gameInfo.countToatal=n.gameInfo.total;var o=cc.sequence(cc.moveTo(1,this.wrap.width/2,500),cc.callFunc(function(){n.gameInfo.state="running",e.schedule(function(){return e.creatPropOrc(e.storehouse)},n.gameInfo.orcMoney),e.schedule(function(){return e.creatPropOrc(e.bomb)},n.gameInfo.orcBoom),e.schedule(function(){return e.creatPropOrc(e.board)},n.gameInfo.orcBoard),n.gameInfo.startDash>1?e.blazeMove():e.blaze.destroy()}));this.ball.runAction(o),this.node.width>=1500&&(cc.find("move-box/floor",this.wrap).width=3600,console.log("\u9488\u5bf9\u5168\u9762\u5c4f\u624b\u673a\u505a\u7684\u5730\u677f\u62c9\u957f"))},gameOver:function(){if(n.saveData(),this.coverOver.active=!0,!this.revived){this.coverOver.getChildByName("revive").active=!0;var e=cc.repeatForever(cc.sequence(cc.scaleTo(.3,1.3,1.2),cc.scaleTo(.2,1,1)));this.coverOver.getChildByName("revive").runAction(e)}n.playBgm=!1,cc.audioEngine.stopMusic(),cc.audioEngine.play(this.audioFail,!1)},creatBloodPool:function(){this.bloodPool=new cc.NodePool;for(var e=0;e<n.gameInfo.total-5;++e){var o=cc.instantiate(this.blood);this.bloodPool.put(o)}},explode:function(e){var o=this,t=null,n=e.x+e.width/2,c=e.y+e.height/2;this.bloodPool.size()>0?t=this.bloodPool.get():(cc.log("\u91cd\u65b0\u521b\u5efa\u7c92\u5b50"),t=cc.instantiate(this.blood)),t.setPosition(n,c),t.parent=this.map,t.getComponent(cc.ParticleSystem).resetSystem(),this.scheduleOnce(function(){return o.bloodPool.put(t)},.5)},creatOrcPool:function(){this.orcPool=new cc.NodePool;for(var e=0;e<n.gameInfo.total;++e){var o=cc.instantiate(this.orc);this.orcPool.put(o)}},creatOrc:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,o=null;this.orcPool.size()>0?o=this.orcPool.get():(console.log("\u5bf9\u8c61\u6c60\u4e0d\u591f\u7528\uff0c\u91cd\u65b0\u521b\u5efa"),o=cc.instantiate(this.orc)),o.y=0,o.x=-o.width,o.parent=this.map,null!=e&&(console.log("\u517d\u4eba\u901f\u5ea6\u8d4b\u503c"),o.moveSpeed=2+.8*n.gameInfo.crazy*e)},creatPropOrc:function(e){var o=cc.instantiate(e);o.y=0,o.x=-o.width,o.moveSpeed=parseInt(5*Math.random())+5*n.gameInfo.crazy,o.parent=this.map},onLoad:function(){var e=this;n.game=this,cc.director.getCollisionManager().enabled=!0,this.balljs=this.ball.getComponent("Ball"),this.creatOrcPool();for(var o=function(o){e.scheduleOnce(function(){e.creatOrc(o)},.2)},t=n.gameInfo.total;t>0;t--)o(t);this.creatBloodPool()},start:function(){var e=this;this.node.on("touchstart",function(){"over"==n.gameInfo.state||e.pauseGame||(e.balljs.value=3,e.balljs.bounce=-Math.abs(e.balljs.bounce))},this)}}),cc._RF.pop()},{Global:"Global"}],Global:[function(e,o,t){"use strict";cc._RF.push(o,"ccbdbz4xYJOtJdax0OemaT/","Global"),o.exports={game:null,home:null,playBgm:!1,gameInfo:{state:"over",countToatal:0,total:10,level:0,orcBoom:6,orcBoard:5,orcMoney:10,score:0,minNumber:5,startDash:1,crazy:1},userInfo:{money:0,dash:1,fanatical:1,boom:1,signDate:"",signDay:1},shareInfo:{title:"",url:""},restData:function(){this.gameInfo.score=0,this.gameInfo.level=0,this.gameInfo.crazy=1,this.gameInfo.orcBoom=6,this.gameInfo.orcBoard=5,this.gameInfo.orcMoney=10,this.gameInfo.startDash=1},saveData:function(){window.localStorage.setItem("orcUserInfo",JSON.stringify(this.userInfo))},fetchData:function(){return window.localStorage.getItem("orcUserInfo")?JSON.parse(window.localStorage.getItem("orcUserInfo")):null}},cc._RF.pop()},{}],Home:[function(e,o,t){"use strict";cc._RF.push(o,"f149fTAsvFGpqRl39CPTvqE","Home");var n=e("Global"),c=e("utils");cc.Class({extends:cc.Component,properties:{moneyLabel:{default:null,type:cc.Label},skilBox:{default:null,type:cc.Node},explain:{default:null,type:cc.Node},shopBox:{default:null,type:cc.Prefab},signInBox:{default:null,type:cc.Prefab},audioBgm:{default:null,type:cc.AudioClip}},checkSign:function(){if(c.timeFormat().split(" ")[0]!=n.userInfo.signDate.split(" ")[0]){var e=cc.instantiate(this.signInBox);e.y=e.x=0,e.parent=this.node}},skilBtn:function(e,o){switch(Number(o)){case 1:0==n.userInfo.dash?(this.switchSkillBox(),this.switchShop(null,"show")):(n.userInfo.dash-=1,n.gameInfo.startDash=3,n.saveData(),cc.director.loadScene("Game"));break;case 2:0==n.userInfo.boom?(this.switchSkillBox(),this.switchShop(null,"show")):(n.userInfo.boom-=1,n.saveData(),n.gameInfo.orcBoom=3,cc.director.loadScene("Game"));break;case 3:0==n.userInfo.fanatical?(this.switchSkillBox(),this.switchShop(null,"show")):(n.userInfo.fanatical-=1,n.saveData(),n.gameInfo.crazy=2,cc.director.loadScene("Game"))}},switchSkillBox:function(e){var o=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!this.skillMove){this.skillMove=!0;var n=null;(n=t?cc.moveTo(.5,0,0):cc.moveTo(.5,0,-this.node.height)).easing(cc.easeExponentialOut(3));var c=cc.sequence(n,cc.callFunc(function(){o.skillMove=!1}));this.skilBox.runAction(c)}},switchShop:function(e){var o=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!this.shopMove){this.shopMove=!0;var n=null;(n=t?cc.moveTo(.5,0,0):cc.moveTo(.5,0,this.node.height)).easing(cc.easeExponentialOut(3));var c=cc.sequence(n,cc.callFunc(function(){o.shopMove=!1}));this.shop.runAction(c)}},switchExplain:function(e){var o=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!this.explainMove){this.explainMove=!0;var n,c=null;t?(c=cc.moveTo(.5,0,0)).easing(cc.easeExponentialOut(3)):(c=cc.moveTo(.5,-this.node.width,0)).easing(cc.easeExponentialOut(3)),n=cc.sequence(c,cc.callFunc(function(){o.explainMove=!1})),this.explain.runAction(n)}},updateUserInfo:function(){this.moneyLabel.string=n.userInfo.money,cc.find("money/text",this.shop).getComponent(cc.Label).string=n.userInfo.money,cc.find("skill-1/content",this.skilBox).getComponent(cc.Label).string="\u9ad8\u80fd\u9668\u77f3 \xd7"+n.userInfo.dash,cc.find("skill-2/content",this.skilBox).getComponent(cc.Label).string="\u70b8\u5f39\u591a\u591a \xd7"+n.userInfo.boom,cc.find("skill-3/content",this.skilBox).getComponent(cc.Label).string="\u517d\u4eba\u72c2\u66b4 \xd7"+n.userInfo.fanatical,0==n.userInfo.dash?cc.find("skill-1/btn/text",this.skilBox).getComponent(cc.Label).string="\u53bb\u8d2d\u4e70":cc.find("skill-1/btn/text",this.skilBox).getComponent(cc.Label).string="\u4f7f\u7528",0==n.userInfo.boom?cc.find("skill-2/btn/text",this.skilBox).getComponent(cc.Label).string="\u53bb\u8d2d\u4e70":cc.find("skill-2/btn/text",this.skilBox).getComponent(cc.Label).string="\u4f7f\u7528",0==n.userInfo.fanatical?cc.find("skill-3/btn/text",this.skilBox).getComponent(cc.Label).string="\u53bb\u8d2d\u4e70":cc.find("skill-3/btn/text",this.skilBox).getComponent(cc.Label).string="\u4f7f\u7528"},openGame:function(){n.playBgm=!0,cc.director.loadScene("Game")},openRank:function(){n.playBgm=!0,cc.director.loadScene("Rank")},onLoad:function(){n.home=this,n.fetchData()&&(n.userInfo=n.fetchData()),this.shop=cc.instantiate(this.shopBox),this.shop.parent=this.node,this.shop.y=this.node.height,this.skilBox.y=-this.node.height,this.explain.width=this.node.width,this.explain.height=this.node.height,this.explain.x=-this.node.width,this.updateUserInfo(),this.checkSign(),cc.director.preloadScene("Game",function(){return console.log("\u9884\u52a0\u8f7d\u6e38\u620f\u573a\u666f\u6210\u529f")}),n.playBgm||cc.audioEngine.playMusic(this.audioBgm,!0)},start:function(){window.wx&&(wx.getUserInfo({success:function(e){console.log("\u7528\u6237\u6388\u6743\u4fe1\u606f====>",e)},fail:function(){var e=wx.getSystemInfoSync().windowWidth,o=wx.getSystemInfoSync().windowHeight;console.warn("\u521b\u5efa\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u6309\u94ae");var t=wx.createUserInfoButton({type:"text",text:"",style:{left:0,top:0,width:e,height:o,lineHeight:o,backgroundColor:"rgba(0, 0, 0, 0)",color:"rgba(0, 0, 0, 0)",textAlign:"center",fontSize:16,borderRadius:4}});t.onTap(function(e){console.log("\u7528\u6237\u6388\u6743\u6570\u636e\uff1a",e),"getUserInfo:ok"==e.errMsg&&t.destroy()})}}),wx.showShareMenu(),wx.onShareAppMessage(function(e){return{title:n.shareInfo.title,imageUrl:n.shareInfo.url}}))}}),cc._RF.pop()},{Global:"Global",utils:"utils"}],Orc:[function(e,o,t){"use strict";cc._RF.push(o,"97443cTQwVMNq2iqPKKQ/56","Orc");e("Global");cc.Class({extends:cc.Component,properties:{},nodeMove:function(){"orc"==this.node.name?this.node.x>this.node.parent.width&&(this.node.x=-this.node.width):this.node.x>this.node.parent.width&&this.node.destroy()},update:function(e){this.node.x+=this.node.moveSpeed,this.nodeMove()}}),cc._RF.pop()},{Global:"Global"}],Rank:[function(e,o,t){"use strict";cc._RF.push(o,"10919IcMlRJCIJnVTKIFzRH","Rank"),cc.Class({extends:cc.Component,properties:{subBox:{default:null,type:cc.Sprite}},openShare:function(){wx.shareAppMessage({title:Global.shareInfo.title,imageUrl:Global.shareInfo.url})},backGame:function(){window.wx&&wx.postMessage({action:"hide"}),cc.director.loadScene("Game")},backHome:function(){window.wx&&wx.postMessage({action:"hide"}),cc.director.loadScene("Home")},onLoad:function(){window.wx&&wx.postMessage({action:"show"})},start:function(){window.wx&&(this.sub=new cc.Texture2D,wx.showShareMenu(),wx.onShareAppMessage(function(e){return{title:Global.shareInfo.title,imageUrl:Global.shareInfo.url}}))},updaetSubDomainCanvas:function(){if(this.sub){var e=wx.getOpenDataContext().canvas;this.sub.initWithElement(e),this.sub.handleLoadedTexture(),this.subBox.spriteFrame=new cc.SpriteFrame(this.sub)}},update:function(e){this.updaetSubDomainCanvas()}}),cc._RF.pop()},{}],Shop:[function(e,o,t){"use strict";cc._RF.push(o,"560e1WzOONLApGuKHuPx+nh","Shop");var n=e("Global"),c=e("utils");cc.Class({extends:cc.Component,properties:{},closeShop:function(){n.home.switchShop(null,null)},shopBtn:function(e,o){switch(Number(o)){case 1:n.userInfo.money>=300?(n.userInfo.money-=300,n.userInfo.dash+=1,n.home.updateUserInfo(),n.saveData(),c.showToast("\u8d2d\u4e70\u6210\u529f~","success")):c.showToast("\u91d1\u5e01\u4e0d\u8db3\uff0c\u8d2d\u4e70\u5931\u8d25");break;case 2:n.userInfo.money>=600?(n.userInfo.money-=600,n.userInfo.boom+=1,n.home.updateUserInfo(),n.saveData(),c.showToast("\u8d2d\u4e70\u6210\u529f~","success")):c.showToast("\u91d1\u5e01\u4e0d\u8db3\uff0c\u8d2d\u4e70\u5931\u8d25");break;case 3:n.userInfo.money>=1e3?(n.userInfo.money-=1e3,n.userInfo.fanatical+=1,n.home.updateUserInfo(),n.saveData(),c.showToast("\u8d2d\u4e70\u6210\u529f~","success")):c.showToast("\u91d1\u5e01\u4e0d\u8db3\uff0c\u8d2d\u4e70\u5931\u8d25");break;default:c.showToast("\u6682\u65f6\u65e0\u6cd5\u8d2d\u4e70\uff0c\u656c\u8bf7\u671f\u5f85~")}},start:function(){}}),cc._RF.pop()},{Global:"Global",utils:"utils"}],Sign:[function(e,o,t){"use strict";cc._RF.push(o,"7314785p89CdbuOywTQapVc","Sign");var n=e("Global"),c=e("utils");cc.Class({extends:cc.Component,properties:{content:{default:null,type:cc.Node}},eachCheck:function(){for(var e=this.content.children,o=n.userInfo.signDay-1,t=0;t<e.length;t++)o>t&&(e[t].getChildByName("sign_day").color=cc.hexToColor("#E9DCC9"),e[t].getChildByName("btn").color=cc.hexToColor("#E9DCC9"),cc.find("btn/text",e[t]).getComponent(cc.Label).string="\u5df2\u9886\u53d6"),o<t&&(e[t].getChildByName("btn").color=cc.hexToColor("#E9DCC9"),cc.find("btn/text",e[t]).getComponent(cc.Label).string="\u5f85\u9886\u53d6")},signBtn:function(e,o){switch(Number(o)){case 1:n.userInfo.signDay==o?(n.userInfo.signDay+=1,n.userInfo.money+=1e3,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):c.showToast("\u5df2\u7ecf\u9886\u53d6\u8fc7\u4e86");break;case 2:n.userInfo.signDay==o?(n.userInfo.signDay+=1,n.userInfo.money+=2e3,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):n.userInfo.signDay>o?c.showToast("\u5df2\u7ecf\u9886\u53d6\u8fc7\u4e86"):c.showToast("\u8fd8\u6ca1\u5230\u9886\u53d6\u65e5\u671f");break;case 3:n.userInfo.signDay==o?(n.userInfo.signDay+=1,n.userInfo.money+=3e3,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):n.userInfo.signDay>o?c.showToast("\u5df2\u7ecf\u9886\u53d6\u8fc7\u4e86"):c.showToast("\u8fd8\u6ca1\u5230\u9886\u53d6\u65e5\u671f");break;case 4:n.userInfo.signDay==o?(n.userInfo.signDay+=1,n.userInfo.money+=5e3,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):n.userInfo.signDay>o?c.showToast("\u5df2\u7ecf\u9886\u53d6\u8fc7\u4e86"):c.showToast("\u8fd8\u6ca1\u5230\u9886\u53d6\u65e5\u671f");break;case 5:n.userInfo.signDay==o?(n.userInfo.signDay+=1,n.userInfo.dash+=5,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):n.userInfo.signDay>o?c.showToast("\u5df2\u7ecf\u9886\u53d6\u8fc7\u4e86"):c.showToast("\u8fd8\u6ca1\u5230\u9886\u53d6\u65e5\u671f");break;case 6:n.userInfo.signDay==o?(n.userInfo.signDay+=1,n.userInfo.fanatical+=5,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):n.userInfo.signDay>o?c.showToast("\u5df2\u7ecf\u9886\u53d6\u8fc7\u4e86"):c.showToast("\u8fd8\u6ca1\u5230\u9886\u53d6\u65e5\u671f");break;case 7:n.userInfo.signDay==o?(n.userInfo.signDay=1,n.userInfo.boom+=5,c.showToast("\u9886\u53d6\u6210\u529f","success"),n.home.updateUserInfo(),n.userInfo.signDate=c.timeFormat(),n.saveData(),this.node.destroy()):c.showToast("\u8fd8\u6ca1\u5230\u9886\u53d6\u65e5\u671f")}},onLoad:function(){this.eachCheck()}}),cc._RF.pop()},{Global:"Global",utils:"utils"}],utils:[function(e,o,t){"use strict";cc._RF.push(o,"fc3dbSXtGNNzoy77cUuteSg","utils"),o.exports={saveData:function(e,o){window.localStorage.setItem(e,JSON.stringify(o))},fetchData:function(e){return window.localStorage.getItem(e)?JSON.parse(window.localStorage.getItem(e)):null},showLoading:function(e){wx.showLoading&&wx.showLoading({title:e,mask:!0})},hideLoading:function(){wx.hideLoading&&wx.hideLoading()},showToast:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\u63d0\u793a",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;window.wx?wx.showToast({title:e,icon:o,duration:t}):alert(e)},showAlert:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u63d0\u793a",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;wx.showModal({title:o,content:e,showCancel:!1,success:function(e){"function"==typeof t&&t()}})},showConfirm:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u786e\u8ba4\u63d0\u9192",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;wx.showModal({title:o,content:e,showCancel:!0,success:function(e){e.confirm?"function"==typeof t&&t():e.cancel&&"function"==typeof n&&n()}})},timeFormat:function(){var e,o,t,n,c,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=void 0;return e=("0"+((s=a>0?new Date((new Date).getTime()+24*a*3600*1e3):new Date(new Date-24*a*3600*1e3)).getMonth()+1)).slice(-2),o=("0"+s.getDate()).slice(-2),t=("0"+s.getHours()).slice(-2),n=("0"+s.getMinutes()).slice(-2),c=("0"+s.getSeconds()).slice(-2),s.getFullYear()+"-"+e+"-"+o+" "+t+":"+n+":"+c}},cc._RF.pop()},{}]},{},["Ball","Game","Orc","Global","Home","Shop","Sign","Rank","utils"]);