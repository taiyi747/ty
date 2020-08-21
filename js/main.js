if( !window.console ){
    window.console = {
        log: function(){}
    }
}


/*!
 * jQuery resizeend - A jQuery plugin that allows for window resize-end event handling.
 * 
 * Copyright (c) 2015 Erik Nielsen
 * 
 * Licensed under the MIT license:
 *    http://www.opensource.org/licenses/mit-license.php
 * 
 * Project home:
 *    http://312development.com
 * 
 * Version:  0.2.0
 * 
 */
!function(a){var b=window.Chicago||{utils:{now:Date.now||function(){return(new Date).getTime()},uid:function(a){return(a||"id")+b.utils.now()+"RAND"+Math.ceil(1e5*Math.random())},is:{number:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},fn:function(a){return"function"==typeof a},object:function(a){return"[object Object]"===Object.prototype.toString.call(a)}},debounce:function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;d&&clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}},$:window.jQuery||null};if("function"==typeof define&&define.amd&&define("chicago",function(){return b.load=function(a,c,d,e){var f=a.split(","),g=[],h=(e.config&&e.config.chicago&&e.config.chicago.base?e.config.chicago.base:"").replace(/\/+$/g,"");if(!h)throw new Error("Please define base path to jQuery resize.end in the requirejs config.");for(var i=0;i<f.length;){var j=f[i].replace(/\./g,"/");g.push(h+"/"+j),i+=1}c(g,function(){d(b)})},b}),window&&window.jQuery)return a(b,window,window.document);if(!window.jQuery)throw new Error("jQuery resize.end requires jQuery")}(function(a,b,c){a.$win=a.$(b),a.$doc=a.$(c),a.events||(a.events={}),a.events.resizeend={defaults:{delay:250},setup:function(){var b,c=arguments,d={delay:a.$.event.special.resizeend.defaults.delay};a.utils.is.fn(c[0])?b=c[0]:a.utils.is.number(c[0])?d.delay=c[0]:a.utils.is.object(c[0])&&(d=a.$.extend({},d,c[0]));var e=a.utils.uid("resizeend"),f=a.$.extend({delay:a.$.event.special.resizeend.defaults.delay},d),g=f,h=function(b){g&&clearTimeout(g),g=setTimeout(function(){return g=null,b.type="resizeend.chicago.dom",a.$(b.target).trigger("resizeend",b)},f.delay)};return a.$(this).data("chicago.event.resizeend.uid",e),a.$(this).on("resize",a.utils.debounce(h,100)).data(e,h)},teardown:function(){var b=a.$(this).data("chicago.event.resizeend.uid");return a.$(this).off("resize",a.$(this).data(b)),a.$(this).removeData(b),a.$(this).removeData("chicago.event.resizeend.uid")}},function(){a.$.event.special.resizeend=a.events.resizeend,a.$.fn.resizeend=function(b,c){return this.each(function(){a.$(this).on("resizeend",b,c)})}}()});

/*!
 * Glide.js
 * Version: 2.0.7
 * Simple, lightweight and fast jQuery slider
 * Author: @jedrzejchalubek
 * Site: http://http://glide.jedrzejchalubek.com/
 * Licensed under the MIT license
 */

!function(a,b,c,d){var e=function(a,b){function c(){}var d;return c.prototype.make=function(b){return d="undefined"!=typeof b?parseInt(b):0,this[a.options.type](),this},c.prototype.after=function(b){return setTimeout(function(){b()},a.options.animationDuration+20)},c.prototype.slider=function(){var c=a[a.size]*(a.current-1),e=b.Clones.shift-a.paddings;b.Run.isStart()?(e=a.options.centered?Math.abs(e):0,b.Arrows.disable("prev")):b.Run.isEnd()?(e=a.options.centered?Math.abs(e):Math.abs(2*e),b.Arrows.disable("next")):(e=Math.abs(e),b.Arrows.enable()),a.track.css({transition:b.Transition.get("all"),transform:b.Translate.set(a.axis,c-e-d)})},c.prototype.carousel=function(){var c,e=a[a.size]*a.current;c=a.options.centered?b.Clones.shift-a.paddings:b.Clones.shift,b.Run.isOffset("<")&&(e=0,b.Run.flag=!1,this.after(function(){a.track.css({transition:b.Transition.clear("all"),transform:b.Translate.set(a.axis,a[a.size]*a.length+c)})})),b.Run.isOffset(">")&&(e=a[a.size]*a.length+a[a.size],b.Run.flag=!1,this.after(function(){a.track.css({transition:b.Transition.clear("all"),transform:b.Translate.set(a.axis,a[a.size]+c)})})),a.track.css({transition:b.Transition.get("all"),transform:b.Translate.set(a.axis,e+c-d)})},c.prototype.slideshow=function(){a.slides.css("transition",b.Transition.get("opacity")).eq(a.current-1).css("opacity",1).siblings().css("opacity",0)},new c},f=function(a,b){function c(){}return c.prototype.instance=function(){return{current:function(){return a.current},go:function(a,c){b.Run.pause(),b.Run.make(a,c),b.Run.play()},jump:function(a,c){b.Transition.jumping=!0,b.Animation.after(function(){b.Transition.jumping=!1}),b.Run.make(a,c)},move:function(a){b.Transition.jumping=!0,b.Animation.make(a),b.Transition.jumping=!1},start:function(c){b.Run.running=!0,a.options.autoplay=parseInt(c),b.Run.play()},play:function(){return b.Run.play()},pause:function(){return b.Run.pause()},destroy:function(){b.Run.pause(),b.Clones.remove(),b.Helper.removeStyles([a.track,a.slides]),b.Bullets.remove(),a.slider.removeData("glide_api"),b.Events.unbind(),b.Touch.unbind(),b.Arrows.unbind(),b.Bullets.unbind(),delete a.slider,delete a.track,delete a.slides,delete a.width,delete a.length},refresh:function(){b.Run.pause(),a.collect(),a.setup(),b.Clones.remove().init(),b.Bullets.remove().init(),b.Build.init(),b.Run.make("="+parseInt(a.options.startAt),b.Run.play())}}},new c},g=function(b,c){function d(){this.build(),this.bind()}return d.prototype.build=function(){this.wrapper=b.slider.find("."+b.options.classes.arrows),this.items=this.wrapper.children()},d.prototype.disable=function(a){var d=b.options.classes;this.items.filter("."+d["arrow"+c.Helper.capitalise(a)]).unbind("click.glide touchstart.glide").addClass(d.disabled).siblings().bind("click.glide touchstart.glide",this.click).bind("mouseenter.glide",this.hover).bind("mouseleave.glide",this.hover).removeClass(d.disabled)},d.prototype.enable=function(){this.bind(),this.items.removeClass(b.options.classes.disabled)},d.prototype.click=function(b){b.preventDefault(),c.Events.disabled||(c.Run.pause(),c.Run.make(a(this).data("glide-dir")),c.Animation.after(function(){c.Run.play()}))},d.prototype.hover=function(a){if(!c.Events.disabled)switch(a.type){case"mouseleave":c.Run.play();break;case"mouseenter":c.Run.pause()}},d.prototype.bind=function(){this.items.on("click.glide touchstart.glide",this.click).on("mouseenter.glide",this.hover).on("mouseleave.glide",this.hover)},d.prototype.unbind=function(){this.items.off("click.glide touchstart.glide").off("mouseenter.glide").off("mouseleave.glide")},new d},h=function(a,b){function c(){this.init()}return c.prototype.init=function(){this[a.options.type](),this.active(),b.Height.set()},c.prototype.isType=function(b){return a.options.type===b},c.prototype.isMode=function(b){return a.options.mode===b},c.prototype.slider=function(){b.Transition.jumping=!0,a.slides[a.size](a[a.size]),a.track.css(a.size,a[a.size]*a.length),this.isMode("vertical")&&b.Height.set(!0),b.Animation.make(),b.Transition.jumping=!1},c.prototype.carousel=function(){b.Transition.jumping=!0,b.Clones.shift=a[a.size]*b.Clones.items.length/2-a[a.size],a.slides[a.size](a[a.size]),a.track.css(a.size,a[a.size]*a.length+b.Clones.getGrowth()),this.isMode("vertical")&&b.Height.set(!0),b.Animation.make(),b.Clones.append(),b.Transition.jumping=!1},c.prototype.slideshow=function(){b.Transition.jumping=!0,b.Animation.make(),b.Transition.jumping=!1},c.prototype.active=function(){a.slides.eq(a.current-1).addClass(a.options.classes.active).siblings().removeClass(a.options.classes.active)},new c},i=function(b,c){function d(){this.init(),this.bind()}return d.prototype.init=function(){return this.build(),this.active(),this},d.prototype.build=function(){this.wrapper=b.slider.children("."+b.options.classes.bullets);for(var c=1;c<=b.length;c++)a("<button>",{"class":b.options.classes.bullet,"data-glide-dir":"="+c}).appendTo(this.wrapper);this.items=this.wrapper.children()},d.prototype.active=function(){this.items.eq(b.current-1).addClass("active").siblings().removeClass("active")},d.prototype.remove=function(){return this.items.remove(),this},d.prototype.click=function(b){b.preventDefault(),c.Events.disabled||(c.Run.pause(),c.Run.make(a(this).data("glide-dir")),c.Animation.after(function(){c.Run.play()}))},d.prototype.hover=function(a){if(!c.Events.disabled)switch(a.type){case"mouseleave":c.Run.play();break;case"mouseenter":c.Run.pause()}},d.prototype.bind=function(){this.wrapper.on("click.glide touchstart.glide","button",this.click).on("mouseenter.glide","button",this.hover).on("mouseleave.glide","button",this.hover)},d.prototype.unbind=function(){this.wrapper.off("click.glide touchstart.glide","button").off("mouseenter.glide","button").off("mouseleave.glide","button")},new d},j=function(a,b){function c(){this.items=[],this.shift=0,this.init()}var d,e=[0,1];return c.prototype.init=function(){return this.map(),this.collect(),this},c.prototype.map=function(){var a;for(d=[],a=0;a<e.length;a++)d.push(-1-a,a)},c.prototype.collect=function(){var b,c;for(c=0;c<d.length;c++)b=a.slides.eq(d[c]).clone().addClass(a.options.classes.clone),this.items.push(b)},c.prototype.append=function(){var b,c;for(b=0;b<this.items.length;b++)c=this.items[b][a.size](a[a.size]),d[b]>=0?c.appendTo(a.track):c.prependTo(a.track)},c.prototype.remove=function(){var a;for(a=0;a<this.items.length;a++)this.items[a].remove();return this},c.prototype.getGrowth=function(){return a.width*this.items.length},new c},k=function(a,b){function c(){for(var c in b)this[c]=new b[c](a,this)}return new c},l=function(c,d){function e(){this.disabled=!1,this.keyboard(),this.hoverpause(),this.resize(),this.bindTriggers()}var f=a("[data-glide-trigger]");return e.prototype.keyboard=function(){c.options.keyboard&&a(b).on("keyup.glide",function(a){39===a.keyCode&&d.Run.make(">"),37===a.keyCode&&d.Run.make("<")})},e.prototype.hoverpause=function(){c.options.hoverpause&&c.track.on("mouseover.glide",function(){d.Run.pause(),d.Events.trigger("mouseOver")}).on("mouseout.glide",function(){d.Run.play(),d.Events.trigger("mouseOut")})},e.prototype.resize=function(){a(b).on("resize.glide."+c.uuid,d.Helper.throttle(function(){d.Transition.jumping=!0,c.setup(),d.Build.init(),d.Run.make("="+c.current,!1),d.Run.play(),d.Transition.jumping=!1},c.options.throttle))},e.prototype.bindTriggers=function(){f.length&&f.off("click.glide touchstart.glide").on("click.glide touchstart.glide",this.handleTrigger)},e.prototype.handleTrigger=function(b){b.preventDefault();var c=a(this).data("glide-trigger").split(" ");if(!this.disabled)for(var d in c){var e=a(c[d]).data("glide_api");e.pause(),e.go(a(this).data("glide-dir"),this.activeTrigger),e.play()}},e.prototype.disable=function(){return this.disabled=!0,this},e.prototype.enable=function(){return this.disabled=!1,this},e.prototype.detachClicks=function(){return c.track.find("a").each(function(b,c){a(c).attr("data-href",a(c).attr("href")).removeAttr("href")}),this},e.prototype.attachClicks=function(){return c.track.find("a").each(function(b,c){a(c).attr("href",a(c).attr("data-href"))}),this},e.prototype.preventClicks=function(a){return"mousemove"===a.type&&c.track.one("click","a",function(a){a.preventDefault()}),this},e.prototype.call=function(a){return"undefined"!==a&&"function"==typeof a&&a(this.getParams()),this},e.prototype.trigger=function(a){return c.slider.trigger(a+".glide",[this.getParams()]),this},e.prototype.getParams=function(){return{index:c.current,length:c.slides.length,current:c.slides.eq(c.current-1),slider:c.slider,swipe:{distance:d.Touch.distance||0}}},e.prototype.unbind=function(){c.track.off("keyup.glide").off("mouseover.glide").off("mouseout.glide"),f.off("click.glide touchstart.glide"),a(b).off("keyup.glide").off("resize.glide."+c._uid)},new e},m=function(a,b){function c(){a.options.autoheight&&a.wrapper.css({transition:b.Transition.get("height")})}return c.prototype.get=function(){var b="y"===a.axis?2*a.paddings:0;return a.slides.eq(a.current-1).height()+b},c.prototype.set=function(b){return a.options.autoheight||b?a.wrapper.height(this.get()):!1},new c},n=function(a,b){function c(){}return c.prototype.byAxis=function(b,c){return"y"===a.axis?c:b},c.prototype.capitalise=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},c.prototype.now=Date.now||function(){return(new Date).getTime()},c.prototype.throttle=function(a,b,c){var d,e,f,g=this,h=null,i=0;c||(c={});var j=function(){i=c.leading===!1?0:g.now(),h=null,f=a.apply(d,e),h||(d=e=null)};return function(){var k=g.now();i||c.leading!==!1||(i=k);var l=b-(k-i);return d=this,e=arguments,0>=l||l>b?(h&&(clearTimeout(h),h=null),i=k,f=a.apply(d,e),h||(d=e=null)):h||c.trailing===!1||(h=setTimeout(j,l)),f}},c.prototype.removeStyles=function(a){for(var b=0;b<a.length;b++)a[b].removeAttr("style")},new c},o=function(a,b){function c(){this.running=!1,this.flag=!1,this.play()}return c.prototype.play=function(){var b=this;return(a.options.autoplay||this.running)&&"undefined"==typeof this.interval&&(this.interval=setInterval(function(){b.pause(),b.make(">"),b.play()},this.getInterval())),this.interval},c.prototype.getInterval=function(){return parseInt(a.slides.eq(a.current-1).data("glide-autoplay"))||a.options.autoplay},c.prototype.pause=function(){return(a.options.autoplay||this.running)&&this.interval>=0&&(this.interval=clearInterval(this.interval)),this.interval},c.prototype.isStart=function(){return 1===a.current},c.prototype.isEnd=function(){return a.current===a.length},c.prototype.isOffset=function(a){return this.flag&&this.direction===a},c.prototype.make=function(c,d){var e=this;switch(this.direction=c.substr(0,1),this.steps=c.substr(1)?c.substr(1):0,a.options.hoverpause||this.pause(),d!==!1&&b.Events.disable().call(a.options.beforeTransition).trigger("beforeTransition"),this.direction){case">":this.isEnd()?(a.current=1,this.flag=!0):">"===this.steps?a.current=a.length:a.current=a.current+1;break;case"<":this.isStart()?(a.current=a.length,this.flag=!0):"<"===this.steps?a.current=1:a.current=a.current-1;break;case"=":a.current=parseInt(this.steps)}b.Height.set(),b.Bullets.active(),b.Animation.make().after(function(){b.Build.active(),d!==!1&&b.Events.enable().call(d).call(a.options.afterTransition).trigger("afterTransition"),a.options.hoverpause||e.play()}),b.Events.call(a.options.duringTransition).trigger("duringTransition")},new c},p=function(b,c){function d(){this.dragging=!1,b.options.touchDistance&&b.track.on({"touchstart.glide":a.proxy(this.start,this)}),b.options.dragDistance&&b.track.on({"mousedown.glide":a.proxy(this.start,this)})}var e;return d.prototype.unbind=function(){b.track.off("touchstart.glide mousedown.glide").off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")},d.prototype.start=function(d){c.Events.disabled||this.dragging||(e="mousedown"===d.type?d.originalEvent:d.originalEvent.touches[0]||d.originalEvent.changedTouches[0],c.Transition.jumping=!0,this.touchStartX=parseInt(e.pageX),this.touchStartY=parseInt(e.pageY),this.touchSin=null,this.dragging=!0,b.track.on({"touchmove.glide mousemove.glide":c.Helper.throttle(a.proxy(this.move,this),b.options.throttle),"touchend.glide touchcancel.glide mouseup.glide mouseleave.glide":a.proxy(this.end,this)}),c.Events.detachClicks().call(b.options.swipeStart).trigger("swipeStart"),c.Run.pause())},d.prototype.move=function(a){if(!c.Events.disabled&&this.dragging){e="mousemove"===a.type?a.originalEvent:a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];var d=parseInt(e.pageX)-this.touchStartX,f=parseInt(e.pageY)-this.touchStartY,g=Math.abs(d<<2),h=Math.abs(f<<2),i=Math.sqrt(g+h),j=Math.sqrt(c.Helper.byAxis(h,g));if(this.touchSin=Math.asin(j/i),this.distance=c.Helper.byAxis(e.pageX-this.touchStartX,e.pageY-this.touchStartY),180*this.touchSin/Math.PI<45&&c.Animation.make(c.Helper.byAxis(d,f)),c.Events.preventClicks(a).call(b.options.swipeMove).trigger("swipeMove"),c.Build.isMode("vertical")){if(c.Run.isStart()&&f>0)return;if(c.Run.isEnd()&&0>f)return}if(!(180*this.touchSin/Math.PI<45))return;a.stopPropagation(),a.preventDefault(),b.track.addClass(b.options.classes.dragging)}},d.prototype.end=function(a){if(!c.Events.disabled&&this.dragging){var d;e="mouseup"===a.type||"mouseleave"===a.type?a.originalEvent:a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];var f=c.Helper.byAxis(e.pageX-this.touchStartX,e.pageY-this.touchStartY),g=180*this.touchSin/Math.PI;c.Transition.jumping=!1,c.Build.isType("slider")&&(c.Run.isStart()&&f>0&&(f=0),c.Run.isEnd()&&0>f&&(f=0)),d="mouseup"===a.type||"mouseleave"===a.type?b.options.dragDistance:b.options.touchDistance,f>d&&45>g?c.Run.make("<"):-d>f&&45>g?c.Run.make(">"):c.Animation.make(),c.Animation.after(function(){c.Events.enable(),c.Run.play()}),this.dragging=!1,c.Events.attachClicks().disable().call(b.options.swipeEnd).trigger("swipeEnd"),b.track.removeClass(b.options.classes.dragging).off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")}},new d},q=function(a,b){function c(){this.jumping=!1}return c.prototype.get=function(b){return this.jumping?this.clear("all"):b+" "+a.options.animationDuration+"ms "+a.options.animationTimingFunc},c.prototype.clear=function(b){return b+" 0ms "+a.options.animationTimingFunc},new c},r=function(a,b){function c(){}var d={x:0,y:0,z:0};return c.prototype.set=function(a,b){return d[a]=parseInt(b),"translate3d("+-1*d.x+"px, "+-1*d.y+"px, "+-1*d.z+"px)"},new c},s=function(b,c){var d={autoplay:4e3,type:"carousel",mode:"horizontal",startAt:1,hoverpause:!0,keyboard:!0,touchDistance:80,dragDistance:120,animationDuration:400,animationTimingFunc:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",throttle:16,autoheight:!1,paddings:0,centered:!0,classes:{base:"glide",wrapper:"glide__wrapper",track:"glide__track",slide:"glide__slide",arrows:"glide__arrows",arrow:"glide__arrow",arrowNext:"next",arrowPrev:"prev",bullets:"glide__bullets",bullet:"glide__bullet",clone:"clone",active:"active",dragging:"dragging",disabled:"disabled"},beforeInit:function(a){},afterInit:function(a){},beforeTransition:function(a){},duringTransition:function(a){},afterTransition:function(a){},swipeStart:function(a){},swipeEnd:function(a){},swipeMove:function(a){}};this.options=a.extend({},d,c),this.uuid=Math.floor(1e3*Math.random()),this.current=parseInt(this.options.startAt),this.element=b,this.collect(),this.setup(),this.options.beforeInit({index:this.current,length:this.slides.length,current:this.slides.eq(this.current-1),slider:this.slider});var s=new k(this,{Helper:n,Translate:r,Transition:q,Run:o,Animation:e,Clones:j,Arrows:g,Bullets:i,Height:m,Build:h,Events:l,Touch:p,Api:f});return s.Events.call(this.options.afterInit),s.Api.instance()};s.prototype.collect=function(){var a=this.options,b=a.classes;this.slider=this.element.addClass(b.base+"--"+a.type).addClass(b.base+"--"+a.mode),this.track=this.slider.find("."+b.track),this.wrapper=this.slider.find("."+b.wrapper),this.slides=this.track.find("."+b.slide).not("."+b.clone)},s.prototype.setup=function(){var a={horizontal:["width","x"],vertical:["height","y"]};this.size=a[this.options.mode][0],this.axis=a[this.options.mode][1],this.length=this.slides.length,this.paddings=this.getPaddings(),this[this.size]=this.getSize()},s.prototype.getPaddings=function(){var a=this.options.paddings;if("string"==typeof a){var b=parseInt(a,10),c=a.indexOf("%")>=0;return c?parseInt(this.slider[this.size]()*(b/100)):b}return a},s.prototype.getSize=function(){return this.slider[this.size]()-2*this.paddings},a.fn.glide=function(b){return this.each(function(){a.data(this,"glide_api")||a.data(this,"glide_api",new s(a(this),b))})}}(jQuery,window,document);

/* Zh-CN-TW */
function StranText(a,b,c){return""==a||null==a?"":(b=null==b?BodyIsFt:b,c&&(a=a.replace(b?"简":"繁",b?"繁":"简")),b?Traditionalized(a):Simplized(a))}function StranBody(a){var b,c,d,e;for("object"==typeof a?b=a.childNodes:(c=StranLink_Obj.innerHTML.toString(),c.indexOf("简")<0?(BodyIsFt=1,StranLink_Obj.innerHTML=StranText(c,0,1),StranLink.title=StranText(StranLink.title,0,1)):(BodyIsFt=0,StranLink_Obj.innerHTML=StranText(c,1,1),StranLink.title=StranText(StranLink.title,1,1)),setCookie(JF_cn,BodyIsFt,7),b=document.body.childNodes),d=0;d<b.length;d++)e=b.item(d),"||BR|HR|TEXTAREA|".indexOf("|"+e.tagName+"|")>0||e==StranLink_Obj||(""!=e.title&&null!=e.title&&(e.title=StranText(e.title)),""!=e.alt&&null!=e.alt&&(e.alt=StranText(e.alt)),"INPUT"==e.tagName&&""!=e.value&&"text"!=e.type&&"hidden"!=e.type&&(e.value=StranText(e.value)),3==e.nodeType?e.data=StranText(e.data):StranBody(e))}function JTPYStr(){return"皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄"}function FTPYStr(){return"皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩"}function Traditionalized(a){var e,b="",c=JTPYStr(),d=FTPYStr();for(e=0;e<a.length;e++)b+=a.charCodeAt(e)>1e4&&-1!=c.indexOf(a.charAt(e))?d.charAt(c.indexOf(a.charAt(e))):a.charAt(e);return b}function Simplized(a){var e,b="",c=JTPYStr(),d=FTPYStr();for(e=0;e<a.length;e++)b+=a.charCodeAt(e)>1e4&&-1!=d.indexOf(a.charAt(e))?c.charAt(d.indexOf(a.charAt(e))):a.charAt(e);return b}function setCookie(a,b){var f,c=setCookie.arguments,d=setCookie.arguments.length,e=d>2?c[2]:null;null!=e&&(f=new Date,f.setTime(f.getTime()+24*3600*1e3*e)),document.cookie=a+"="+escape(b)+(null==e?"":"; expires="+f.toGMTString())}function getCookie(a){var b=a+"=";return document.cookie.length>0?(offset=document.cookie.indexOf(b),-1!=offset?(offset+=b.length,end=document.cookie.indexOf(";",offset),-1==end&&(end=document.cookie.length),unescape(document.cookie.substring(offset,end))):""):void 0}var JF_cn,BodyIsFt,Default_isFT=0,StranIt_Delay=50,StranLink_Obj=document.getElementById("StranLink");if(StranLink_Obj){with(JF_cn="ft"+self.location.hostname.toString().replace(/\./g,""),BodyIsFt=getCookie(JF_cn),"1"!=BodyIsFt&&(BodyIsFt=Default_isFT),StranLink_Obj)"object"!=typeof document.all?href="javascript:StranBody()":(href="#",onclick=new Function("StranBody();return false")),title=StranText("点击以繁体中文方式浏览",1,1),innerHTML=StranText(innerHTML,1,1);"1"==BodyIsFt&&setTimeout("StranBody()",StranIt_Delay)}

/* 
 * jsui
 * ====================================================
*/
jsui.bd = $('body')
//jsui.is_signin = jsui.bd.hasClass('logged-in') ? true : false;

if( $('.widget-nav').length ){
    $('.widget-nav li').each(function(e){
        $(this).hover(function(){
            $(this).addClass('active').siblings().removeClass('active')
            $('.widget-navcontent .item:eq('+e+')').addClass('active').siblings().removeClass('active')
        })
    })
}

if( $('.sns-wechat').length ){
    $('.sns-wechat').on('click', function(){
        var _this = $(this)
        if( !$('#modal-wechat').length ){
            $('body').append('\
                <div class="modal fade" id="modal-wechat" tabindex="-1" role="dialog" aria-hidden="true">\
                    <div class="modal-dialog" style="margin-top:200px;width:340px;">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                <h4 class="modal-title">'+ _this.attr('title') +'</h4>\
                            </div>\
                            <div class="modal-body" style="text-align:center">\
                                <img style="max-width:100%" src="'+ _this.data('src') +'">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ')
        }
        $('#modal-wechat').modal()
    })
}


if( $('.carousel').length ){
    var el_carousel = $('.carousel')

    el_carousel.carousel({
        interval: 4000
    })

    tbquire(['hammer'], function(Hammer) {

        // window.Hammer = Hammer
        
        var mc = new Hammer(el_carousel[0]);

        mc.on("panleft panright swipeleft swiperight", function(ev) {
            if( ev.type == 'swipeleft' || ev.type == 'panleft' ){
                el_carousel.carousel('next')
            }else if( ev.type == 'swiperight' || ev.type == 'panright' ){
                el_carousel.carousel('prev')
            }
        });

    })
}


if( Number(jsui.ajaxpager) > 0 && ($('.excerpt').length || $('.excerpt-minic').length || $('.excerpt-card').length)){
    tbquire(['ias'], function() {
        if( !jsui.bd.hasClass('site-minicat') && $('.excerpt').length ){
            $.ias({
                triggerPageThreshold: jsui.ajaxpager?Number(jsui.ajaxpager)+1:5,
                history: false,
                container : '.content',
                item: '.excerpt',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/img/loading.gif"></div>',
                trigger: '加载更多',
                onRenderComplete: function() {
                    tbquire(['lazyload'], function() {
                        $('.excerpt .thumb').lazyload({
							data_attribute: 'src',
							placeholder: jsui.uri + '/img/thumbnail.png',
							threshold: 50,
							failure_limit: 100,
							load: function() {$(this).addClass('show')}
                        });
                    });
                }
            });
        }

        if( jsui.bd.hasClass('site-minicat') && $('.excerpt-minic').length ){
            $.ias({
                triggerPageThreshold: jsui.ajaxpager?Number(jsui.ajaxpager)+1:5,
                history: false,
                container : '.content',
                item: '.excerpt-minic',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/img/loading.gif"></div>',
                trigger: '加载更多',
                onRenderComplete: function() {
                    tbquire(['lazyload'], function() {
                        $('.excerpt .thumb').lazyload({
							data_attribute: 'src',
							placeholder: jsui.uri + '/img/thumbnail.png',
							threshold: 50,
							failure_limit: 100,
							load: function() {$(this).addClass('show')}
                        });
                    });
                }
            });
        }
        
        if( !jsui.bd.hasClass('site-minicat') && $('.excerpt-card').length ){
            $.ias({
                triggerPageThreshold: jsui.ajaxpager?Number(jsui.ajaxpager)+1:5,
                history: false,
                container : '.layout_card',
                item: '.excerpt-card',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/img/loading.gif"></div>',
                trigger: '加载更多',
                onRenderComplete: function() {
                    tbquire(['lazyload'], function() {
                        $('.excerpt-card .thumb').lazyload({
							data_attribute: 'src',
							placeholder: jsui.uri + '/img/thumbnail.png',
							threshold: 50,
							failure_limit: 100,
							load: function() {$(this).addClass('show')}
                        });
                    });
                }
            });
        }
        
        if( !jsui.bd.hasClass('site-minicat') && $('.mexcerpt').length ){
            $.ias({
                triggerPageThreshold: jsui.ajaxpager?Number(jsui.ajaxpager)+1:5,
                history: false,
                container : '.panel',
                item: '.mexcerpt',
                pagination: '.pagination',
                next: '.pg-item .next',
                loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/img/loading.gif"></div>',
                trigger: '加载更多',
                onRenderComplete: function() {
                    tbquire(['lazyload'], function() {
                        $('.excerpt .thumb').lazyload({
							data_attribute: 'src',
							placeholder: jsui.uri + '/img/thumbnail.png',
							threshold: 50,
							failure_limit: 100,
							load: function() {$(this).addClass('show')}
                        });
                    });
                }
            });
        }
    });
}
/* 
 * wow
 * ====================================================
*/
if($('.wow').length){
   tbquire(['wow'], function() {
      var wow = new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: false,
          live: true
      });
      wow.init();
   })
}

/* 
 * gallery
 * ====================================================
*/
jsui.fullimage = jsui.fullimage ? Number(jsui.fullimage) : 1

if(!jsui.bd.hasClass('is-phone') && jsui.fullimage ){

	jsui.gallerybox_api = null
	jsui.gallerybox_close = function(){

	    jsui.gallerybox_api && jsui.gallerybox_api.refresh()

	    $('.gallerybox').remove()
	        
	    $('.g___actived').removeClass('g___actived')
	}

	jsui.gallerybox_init = function(items){
	    jsui.bd.append('\
	        <div class="gallerybox">\
	            <div class="glide">\
	                <div class="glide__arrows">\
	                    <button class="glide__arrow prev" data-glide-dir="<"><i class="fa fa-angle-left"></i></button>\
	                    <button class="glide__arrow next" data-glide-dir=">"><i class="fa fa-angle-right"></i></button>\
	                </div>\
	                <div class="glide__wrapper">\
	                    <ul class="glide__track">'+ items +'</ul>\
	                </div>\
	                <div class="glide__bullets"></div>\
	            </div>\
	            <div class="gallerybox-close" onclick="javascript:jsui.gallerybox_close();"><i class="fa fa-close"></i></div>\
	        </div>\
	    ')
	}


	//$('.gallery img').addClass('gallery-image')

	$('.article-content img:not(.gallery-image)').on('click', function(event){

		if( $(this).parent()[0].tagName !== 'A' ){

		    var item_index = 1
		    var items = ''
		            
		    $(this).addClass('g___actived')

		    $('.article-content img:not(.gallery-image)').each(function(e){
		        var _this = $(this)
		        var src = ''
		        
		        src = typeof(_this.attr('data-original')) == 'undefined' ? _this.attr('src') : _this.attr('data-original')

		        if( _this.hasClass('g___actived') ){
		            item_index = e+1
		        }

		        var desc = ''
		        if( _this.next('.wp-caption-text').length ){
		            desc = '<div class="gallerybox-itemdesc">'+ _this.next('.wp-caption-text').html() +'</div>'
		        }

		        items += '<li class="glide__slide"><div class="gallerybox-item"><img src="'+ src +'"></div>'+ desc +'</li>'
		    })

		    jsui.gallerybox_init(items)

		    $('.gallerybox-item').height( $(window).height() )

		    var gallerybox_slider = $('.gallerybox .glide').glide({
		        type: 'slider',
		        startAt: item_index,
		        touchDistance: 2
		    })

		    jsui.gallerybox_api = gallerybox_slider.data('glide_api')

		}

	})


	$(window).resizeend(function() {
	    if( $('.gallerybox').length ){
	        $('.gallerybox-item').height( $(window).height() )
	    }
	})

}
/* 
 * lazyload
 * ====================================================
*/

tbquire(['lazyload'], function() {
    $('.avatar').lazyload({
        data_attribute: 'src',
        placeholder: jsui.uri + '/img/avatar-default.png',
        threshold: 400
    })

    $('.widget .avatar').lazyload({
        data_attribute: 'src',
        placeholder: jsui.uri + '/img/avatar-default.png',
        threshold: 400
    })

    /*$('.thumb').lazyload({
        data_attribute: 'src',
        placeholder: jsui.uri + '/img/thumbnail.png',
        threshold: 400
    })*/
    $('.thumb').lazyload({
        data_attribute: 'src',
        placeholder: jsui.uri + '/img/thumbnail.png',
        threshold: 50,
        failure_limit: 100,
        load: function() {$(this).addClass('show')}
    })

    $('.widget_ui_posts .thumb').lazyload({
        data_attribute: 'src',
        placeholder: jsui.uri + '/img/thumbnail.png',
        threshold: 400
    })

    $('.wp-smiley').lazyload({
        data_attribute: 'src',
        // placeholder: jsui.uri + '/img/thumbnail.png',
        threshold: 400
    })
    $("img.lazyload").lazyload(); 
})

if( jsui.bd.hasClass('is-phone') && $('.article-content img').length ){
	tbquire(['swiper'], function() {

		var pics = $('.article-content img').map(function(index, elem) {
			return typeof($(this).attr('data-original') == 'undefined') ? $(this).attr('src') : $(this).attr('data-original')
		})

		var timer = null

		$('.article-content img').each(function(index, el) {
			$(this).on('click', function(){

				if( $(this).parent()[0].tagName !== 'A' ){

					clearTimeout(timer)
						
					var imgs = ''
					for (var i = 0; i < pics.length; i++) {
						imgs += '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ pics[i] +'"></div></div>'
					}

					var code = '<div class="swiper-container article-swiper-container">\
						<div class="swiper-wrapper">'+ imgs +'</div>\
					</div>'

					jsui.bd.addClass('swiper-fixed').append(code)

					var aswiper = new Swiper('.article-swiper-container', {
						initialSlide: index,
						zoom: {
							maxRatio: 5
						},
						on:{
							click: function(event){
								timer = setTimeout(function(){
									jsui.bd.removeClass('swiper-fixed')
									$('.article-swiper-container').remove()
									aswiper.destroy(true,true)
								},50)
							},
							slideNextTransitionStart: function(event){
						    	$('.article-swiper-container .swiper-slide-prev img').addClass('article-swiper-no-transition')
							},
							slidePrevTransitionStart: function(event){
						    	$('.article-swiper-container .swiper-slide-next img').addClass('article-swiper-no-transition')
						    },
						    slideChange: function(event){
						    	$('.article-swiper-container .article-swiper-no-transition').removeClass('article-swiper-no-transition')
						    }
						},
					})

					return false
					
				}
			
			})
		})
	})

}

if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) && $('.other-sign').length) {
$('.other-sign').on("click", ".weixinlogin",function(t) {
    t.preventDefault();
    var e = $(this).attr("href") + "&timestarp=" + Date.parse(new Date);
    if ($("#wechat-iframe-modal").length) $("#wechat-iframe-modal").find(".wechat-login-iframe").attr("src", e);
    else {
        var r = '<div class="modal fade in" id="wechat-iframe-modal" data-backdrop="static">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header" style="border:0;padding: 5px 10px;">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\n            </div>\n            <div class="modal-body wechat-iframe-body">\n                <iframe class="wechat-login-iframe" src="' + e + '"></iframe>\n            </div>\n        </div>\n    </div>\n</div>';
        $("body").append(r),
        $("#wechat-iframe-modal").on("hide.bs.modal",
        function() {
            $("#wechat-iframe-modal").find(".wechat-login-iframe").attr("src", "about:blank")
        })
    }
    $("#wechat-iframe-modal").modal("show")
})
}

if( $('#focusslide-1').length ){

    tbquire(['swiper'], function() {

        var hswiper = new Swiper('#focusslide-1', {
            initialSlide: 0,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })

    })
}

if($('.single_gallery').length){
	tbquire(['swiper'],function(){
		
		var sswiper = new Swiper('.single_gallery', {
			initialSlide: 0,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
		})
	})
}


/*if($('.home-zhuanti').length){
	tbquire(['swiper'],function(){

    var ztswiper = new Swiper('.home-zhuanti-list', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 30
    });
    
	})
}*/



/* 
 * prettyprint
 * ====================================================
*/
$('pre').each(function(){
    if( !$(this).attr('style') ) $(this).addClass('prettyprint')
})

if( $('.prettyprint').length ){
    tbquire(['prettyprint'], function(prettyprint) {
        prettyPrint()
    })
}



/* 
 * rollbar
 * ====================================================
*/
jsui.bd.append('<div class="m-mask"></div>')
/* jsui.rb_comment = ''
if (jsui.bd.hasClass('comment-open')) {
    jsui.rb_comment = "<li><a href=\"javascript:(scrollTo('#comments',-15));\"><i class=\"fa fa-comments\"></i></a><h6>去评论<i></i></h6></li>"
}

jsui.rb_qq = ''
if( jsui.qq_id ){
    jsui.rb_qq = '<li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+jsui.qq_id+'&site=qq&menu=yes"><i class="fa fa-qq"></i></a><h6>'+jsui.qq_tip+'<i></i></h6></li>'
}

jsui.bd.append('\
    <div class="m-mask"></div>\
    <div class="rollbar"><ul>'
    +jsui.rb_comment
    +jsui.rb_qq
    +jsui.home_style+
    '<li><a id="StranLink"><i class="fa wencode">繁</i></a><h6>简繁切换<i></i></h6></li><li class="angle-up"><a href="javascript:(scrollTo());"><i class="fa fa-angle-up"></i></a><h6>去顶部<i></i></h6></li>\
    </ul></div>\
')*/



var _wid = $(window).width()

$(window).resize(function(event) {
    _wid = $(window).width()
});



var scroller =  $('.rollbar-totop')
var _fix = (jsui.bd.hasClass('nav_fixed') && !jsui.bd.hasClass('page-template-navs')) ? true : false
$(window).scroll(function() {
    var h = document.documentElement.scrollTop + document.body.scrollTop

    if( _fix && h > 0 && _wid > 720 ){
        jsui.bd.addClass('nav-fixed')
    }else{
        jsui.bd.removeClass('nav-fixed')
    }

    h > 200 ? scroller.fadeIn() : scroller.fadeOut();
})



/* 
 * bootstrap
 * ====================================================
*/
$('.user-welcome').tooltip({
    container: 'body',
    placement: 'bottom'
})



/* 
 * sign
 * ====================================================
*/
/*if (!jsui.bd.hasClass('logged-in')) {
    tbquire(['signpop'], function(signpop) {
        signpop.init()
    })
}*/


/* 
 * single
 * ====================================================
*/

var _sidebar = $('.sidebar')
if (_wid>1024 && _sidebar.length) {
	tbquire(['sticky'], function() {
		var h1 = 15;
		var h2 = jsui.bd.hasClass('nav-fixed') ? ($('.uc-header').length ? h1+73 : h1+63) : h1
		$('.sidebar').theiaStickySidebar({
			containerSelector: '.content',
			additionalMarginTop: h2
		});
		
	})
}

/*var _sidebar = $('.sidebar')
if (_wid>1024 && _sidebar.length) {
    var h1 = 15,
        h2 = 30
    var rollFirst = _sidebar.find('.widget:eq(' + (jsui.roll[0] - 1) + ')')
    var sheight = rollFirst.height()
    var _bottom = $('.footer').outerHeight()+48
    if($('.recent-content').length){ _bottom += $('.recent-content').outerHeight() }
    if($('.branding').length){ _bottom += $('.branding').outerHeight() }

    rollFirst.on('affix-top.bs.affix', function() {
        rollFirst.css({
            top: 0
        })
        sheight = rollFirst.height()

        for (var i = 1; i < jsui.roll.length; i++) {
            var item = jsui.roll[i] - 1
            var current = _sidebar.find('.widget:eq(' + item + ')')
            current.removeClass('affix').css({
                top: 0
            })
        };
    })
    rollFirst.on('affix.bs.affix', function() {

        rollFirst.css({
            top: jsui.bd.hasClass('nav-fixed') ? ($('.uc-header').length ? h1+73 : h1+63) : h1
        })

        for (var i = 1; i < jsui.roll.length; i++) {
            var item = jsui.roll[i] - 1
            var current = _sidebar.find('.widget:eq(' + item + ')')
            current.addClass('affix').css({
                top: jsui.bd.hasClass('nav-fixed')?($('.uc-header').length?sheight+h2+73:sheight+h2+63):sheight+h2
            })
            sheight += current.height() + 15
        };
    })

    rollFirst.affix({
        offset: {
            top: _sidebar.height(),
            bottom: _bottom
        }
    })

}*/



/*$('.plinks a').each(function(){
    var imgSrc = $(this).attr('href')+'/favicon.ico'
    if(imgSrc) $(this).prepend( '<img src="'+imgSrc+'">' )
})*/


/* 
 * comment
 * ====================================================
*/
if (jsui.bd.hasClass('comment-open')) {
    tbquire(['comment'], function(comment) {
        comment.init()
    })
}


/* 
 * page u
 * ====================================================
*/
if (jsui.bd.hasClass('page-template-pagesuser-php') || jsui.bd.hasClass('template-user')) {
    tbquire(['user'], function(user) {
        user.init()
    })
}


/* 
 * page nav
 * ====================================================
*/
if( jsui.bd.hasClass('page-template-pagesnavs-php') ){

    var titles = ''
    var i = 0
    $('#navs .items h2').each(function(){
        titles += '<li><a href="#'+i+'">'+$(this).text()+'</a></li>'
        i++
    })
    $('#navs nav ul').html( titles )

    $('#navs .items a').attr('target', '_blank')

    $('#navs nav ul').affix({
        offset: {
            top: $('#navs nav ul').offset().top,
            bottom: $('.footer').height() + $('.footer').css('padding-top').split('px')[0]*2
        }
    })


    if( location.hash ){
        var index = location.hash.split('#')[1]
        $('#navs nav li:eq('+index+')').addClass('active')
        $('#navs nav .item:eq('+index+')').addClass('active')
        scrollTo( '#navs .items .item:eq('+index+')' )
    }
    $('#navs nav a').each(function(e){
        $(this).click(function(){
            scrollTo( '#navs .items .item:eq('+$(this).parent().index()+')' )
            $(this).parent().addClass('active').siblings().removeClass('active')
        })
    })
}


/* 
 * page search
 * ====================================================
*/
if( jsui.bd.hasClass('search-results') ){
    var val = $('.site-search-form .search-input').val()
    var reg = eval('/'+val+'/i')
    $('.excerpt h2 a, .excerpt .note').each(function(){
        $(this).html( $(this).text().replace(reg, function(w){ return '<b>'+w+'</b>' }) )
    })
}


/* 
 * search
 * ====================================================
*/
$('.search-show').bind('click', function(){
    $(this).find('.fa').toggleClass('fa-remove')

    jsui.bd.toggleClass('search-on')

    if( jsui.bd.hasClass('search-on') ){
        $('.site-search').find('input').focus()
        jsui.bd.removeClass('m-nav-show')
    }
})

/* 
 * phone
 * ====================================================
*/

jsui.bd.append( $('.site-navbar').clone().attr('class', 'm-navbar') )

$('.m-navbar li.menu-item-has-children').each(function(){
    $(this).append('<i class="fa fa-angle-down faa"></i>')
})

$('.m-navbar li.menu-item-has-children .faa').on('click', function(){
    $(this).parent().find('.sub-menu').slideToggle(300)
})


$('.m-icon-nav').on('click', function(){
    jsui.bd.addClass('m-nav-show')

    $('.m-mask').show()

    jsui.bd.removeClass('search-on')
    $('.search-show .fa').removeClass('fa-remove') 
})

$('.m-mask').on('click', function(){
    $(this).hide()
    jsui.bd.removeClass('m-nav-show')
})



if ($('.article-content').length){
    $('.article-content img').attr('data-tag', 'bdshare')
}


video_ok()
$(window).resizeend(function(event) {
    video_ok()
});

function video_ok(){
    var cw = $('.article-content').width()
    $('.article-content embed, .article-content video, .article-content iframe').each(function(){
        var w = $(this).attr('width')||0,
            h = $(this).attr('height')||0
        if( cw && w && h ){
            $(this).css('width', cw<w?cw:w)
            $(this).css('height', $(this).width()/(w/h))
        }
    })

    rollbar_middle()

}

function rollbar_middle(){
    if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
    var a = $('.rollbar-rm')
    if( a.length ){
        a.css({
            'top': '50%',
            'margin-top': a.height()/2*-1-22
        })
    }
    }
}



$('.rollbar-m-on .rollbar-qrcode a').on('click', function(){
    $(this).next('h6').toggle()
})



//video
/*if($("#videoBox").length>0 && _wid > 720 ){
	
    var ha = ( $('#videoBox').offset().top + $('#videoBox').height() );

    $(window).scroll(function(){  

	    if ( $(window).scrollTop() >= ha) { 
      	    $('#videoBox').removeClass('in').addClass('out');
            $('#videoBox iframe').css('height','170px');  
	    } else if ( $(window).scrollTop() < ha ) {  
            $('#videoBox').removeClass('out').addClass('in'); 
            $('#videoBox iframe').css('height','100%');
	    }  

    });
}*/


if ($("#video").length && _wid > 720 && $(".content-wrap").length) {
    var e = $("#video"),
    t = $("#videoBox"),
    o = t.offset().top + t.height() + 20,
    n = '<div class="amh-vf-header"><h4 class="amh-vf-note">\u70b9\u51fb\u6309\u4f4f\u6b64\u5904\u53ef\u62d6\u52a8</h4><i class="amh-vf-close">X</i></div>',
    s = $(n),
    a = (document.documentElement.clientHeight || document.body.clientHeight - 250) / 3 * 2,
    //c = $(".sidebar").offset().left + $(".sidebar").width() - 360;
    c = $(".content-wrap").offset().left + $(".content-wrap").width() - 360;
    a = a > 250 ? parseInt(a, 10) : 0,
    c = c > 360 ? parseInt(c, 10) : 0;
    var m, f = !1;

    $(window).on("scroll",function() {
        m && clearTimeout(m),
        m = setTimeout(function() {
            var n = document.body.scrollTop || document.documentElement.scrollTop;
            n >= o && !f ? (e.prepend(s).addClass("amh-vf").css({
                top: a,
                left: c
            }), t.addClass("amh-vf-content"), f = !0) : n < o && f && (e.removeClass("amh-vf").css({
                top: "",
                left: ""
            }), t.removeClass("amh-vf-content"), s.remove(), f = !1)
        },
        20)
    }),
    e.on("click", ".amh-vf-close",function(o) {
        e.removeClass("amh-vf").css({
            top: "",
            left: ""
        }),
        t.removeClass("amh-vf-content"),
        s.remove()
    });
    var i, l, v = !1;

    e.on("mousedown", ".amh-vf-note",function(t) {
        v = !0,
        i = t.pageX - parseInt(e.css("left"), 10),
        l = t.pageY - parseInt(e.css("top"), 10),
        $(document).on("mousemove.amh-vf",
        function(t) {
            if (t.preventDefault(), t.stopPropagation(), v) {
                var o = document.documentElement.clientHeight,
                n = document.documentElement.clientWidth;
                a = parseInt(t.pageY - l, 10),
                c = parseInt(t.pageX - i, 10),
                a < 0 ? a = 0 : o - a < 250 && (a = o - 250),
                c < 0 ? c = 0 : n - c < 360 && (c = n - 360),
                e.css({
                    top: a,
                    left: c
                })
            }
        }).on("mouseup.amh-vf",function() {
            v = !1,
            $(document).off("mousemove.amh-vf"),
            $(document).off("mouseup.amh-vf")
        })
    })
}


/* functions
 * ====================================================
 */
function scrollTo(name, add, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top + (add || 0)
            }, speed)
        }
    }
}


function is_name(str) {
    return /.{2,12}$/.test(str)
}
function is_url(str) {
    return /^((http|https)\:\/\/)([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(str)
}
function is_qq(str) {
    return /^[1-9]\d{4,13}$/.test(str)
}
function is_mail(str) {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(str)
}


$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function strToDate(str, fmt) { //author: meizz   
    if( !fmt ) fmt = 'yyyy-MM-dd hh:mm:ss'
    str = new Date(str*1000)
    var o = {
        "M+": str.getMonth() + 1, //月份   
        "d+": str.getDate(), //日   
        "h+": str.getHours(), //小时   
        "m+": str.getMinutes(), //分   
        "s+": str.getSeconds(), //秒   
        "q+": Math.floor((str.getMonth() + 3) / 3), //季度   
        "S": str.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (str.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// REWARDS
$(".action-rewards").click(function(){
    $(".rewards-popover-mask").fadeIn();
	$(".rewards-popover").slideToggle();
});
$(".rewards-popover-close").click(function(){
    $(".rewards-popover-mask").fadeOut();
	$(".rewards-popover").slideToggle();
});


// collapse
$('.collapseButton').click(function(){
	$(this).parent().find('.xContent').slideToggle('fast');
    if ($(this).hasClass('show')) {
        $(this).removeClass('show');
    }else{
        $(this).addClass('show');
    }
});


// read more
if($(".article-content").height() < 700){
    $(".article-content").css("max-height","100%");
	$(".mask").css("display","none");
	$("#read-more").css("display","none");
}
$('#read-more').click(function(){
    $(".article-content").css("max-height","100%");
	$(".mask").css("display","none");
	$("#read-more").css("display","none");
}) 


// home style
$('#layoutswt').click(function() {
	if ($('#layoutswt i').hasClass('is_blog')) {
		window.location.href = jsui.www + '?layout=cms';
	} else if ($('#layoutswt i').hasClass('is_cms')) {
		window.location.href = jsui.www + '?layout=card';
	} else {
		window.location.href = jsui.www + '?layout=blog';
	}
});

//进度条加载！
$(document).on("click", "a",function() {
	if ($(window).width() < 768) return;
	if ($(this).attr('target') == '_blank') return;
	if ($(this).parent('#pagination-comments').length > 0) return;
	var url = $(this).attr('href');
	var u = document.createElement('a');
	u.href = url,
	ru = u.protocol + u.hostname + u.pathname + u.search,
	l = location,
	rl = l.protocol + l.hostname + l.pathname + l.search;
	if (ru == rl) return;
	var urlreg = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	if (urlreg.test(url)) {
		n = $('.header');
		if (n.children('.progress').length <= 0) {
			n.prepend('<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"></div></div>');
		}
	}
});

//公告栏滚动条
function clock(){
    $("#callboard ul").animate({marginTop:"-24px"},500,function(){
        $(this).css({marginTop:"2px"}).find("li:first").appendTo(this);                                                         
    })
}

var tips = setInterval("clock()",5000);
$("#callboard").hover(function(){
	clearInterval(tips);                          
},function(){
    tips = setInterval("clock()",5000);
})


function hidetp(){
    if($(".speedbar").css("display")=='block'){
       $(".speedbar").css("display","none");
    }else{
       $(".speedbar").css("display","block");
    }
}

//隐藏或者显示侧边栏
$('.close-sidebar').click(function() {
    $('.close-sidebar,.sidebar').hide();
    $('.show-sidebar').show();
    if (jsui.bd.hasClass('site-layout-3')) {
        $('.content').animate({ width: "1200px",marginLeft: "0" }, 0);
    } else {
        $('.content').animate({ width: "1200px" },0);
    }
});
$('.show-sidebar').click(function() {
    $('.show-sidebar').hide();
    $('.close-sidebar,.sidebar').show();
    if (jsui.bd.hasClass('site-layout-3')) {
        $('.content').animate({ width: "820px",marginLeft: "380px" }, 0);
    } else {
        $('.content').animate({ width: "820px" }, 0);
    }
});

/* 
 * ucenter
 * ====================================================
*/
tbquire(['ucenter'])
