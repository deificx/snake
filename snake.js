(()=>{var t={947:(t,e,i)=>{var s;!function(n,r,a){if(n){for(var o,h={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},c={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},l={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},u={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},d=1;d<20;++d)h[111+d]="f"+d;for(d=0;d<=9;++d)h[d+96]=d.toString();g.prototype.bind=function(t,e,i){var s=this;return t=t instanceof Array?t:[t],s._bindMultiple.call(s,t,e,i),s},g.prototype.unbind=function(t,e){return this.bind.call(this,t,(function(){}),e)},g.prototype.trigger=function(t,e){var i=this;return i._directMap[t+":"+e]&&i._directMap[t+":"+e]({},t),i},g.prototype.reset=function(){var t=this;return t._callbacks={},t._directMap={},t},g.prototype.stopCallback=function(t,e){if((" "+e.className+" ").indexOf(" mousetrap ")>-1)return!1;if(w(e,this.target))return!1;if("composedPath"in t&&"function"==typeof t.composedPath){var i=t.composedPath()[0];i!==t.target&&(e=i)}return"INPUT"==e.tagName||"SELECT"==e.tagName||"TEXTAREA"==e.tagName||e.isContentEditable},g.prototype.handleKey=function(){var t=this;return t._handleKey.apply(t,arguments)},g.addKeycodes=function(t){for(var e in t)t.hasOwnProperty(e)&&(h[e]=t[e]);o=null},g.init=function(){var t=g(r);for(var e in t)"_"!==e.charAt(0)&&(g[e]=function(e){return function(){return t[e].apply(t,arguments)}}(e))},g.init(),n.Mousetrap=g,t.exports&&(t.exports=g),void 0===(s=function(){return g}.call(e,i,e,t))||(t.exports=s)}function f(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent("on"+e,i)}function p(t){if("keypress"==t.type){var e=String.fromCharCode(t.which);return t.shiftKey||(e=e.toLowerCase()),e}return h[t.which]?h[t.which]:c[t.which]?c[t.which]:String.fromCharCode(t.which).toLowerCase()}function y(t){return"shift"==t||"ctrl"==t||"alt"==t||"meta"==t}function m(t,e,i){return i||(i=function(){if(!o)for(var t in o={},h)t>95&&t<112||h.hasOwnProperty(t)&&(o[h[t]]=t);return o}()[t]?"keydown":"keypress"),"keypress"==i&&e.length&&(i="keydown"),i}function k(t,e){var i,s,n,r=[];for(i=function(t){return"+"===t?["+"]:(t=t.replace(/\+{2}/g,"+plus")).split("+")}(t),n=0;n<i.length;++n)s=i[n],u[s]&&(s=u[s]),e&&"keypress"!=e&&l[s]&&(s=l[s],r.push("shift")),y(s)&&r.push(s);return{key:s,modifiers:r,action:e=m(s,r,e)}}function w(t,e){return null!==t&&t!==r&&(t===e||w(t.parentNode,e))}function g(t){var e=this;if(t=t||r,!(e instanceof g))return new g(t);e.target=t,e._callbacks={},e._directMap={};var i,s={},n=!1,a=!1,o=!1;function h(t){t=t||{};var e,i=!1;for(e in s)t[e]?i=!0:s[e]=0;i||(o=!1)}function c(t,i,n,r,a,o){var h,c,l,u,d=[],f=n.type;if(!e._callbacks[t])return[];for("keyup"==f&&y(t)&&(i=[t]),h=0;h<e._callbacks[t].length;++h)if(c=e._callbacks[t][h],(r||!c.seq||s[c.seq]==c.level)&&f==c.action&&("keypress"==f&&!n.metaKey&&!n.ctrlKey||(l=i,u=c.modifiers,l.sort().join(",")===u.sort().join(",")))){var p=!r&&c.combo==a,m=r&&c.seq==r&&c.level==o;(p||m)&&e._callbacks[t].splice(h,1),d.push(c)}return d}function l(t,i,s,n){e.stopCallback(i,i.target||i.srcElement,s,n)||!1===t(i,s)&&(function(t){t.preventDefault?t.preventDefault():t.returnValue=!1}(i),function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}(i))}function u(t){"number"!=typeof t.which&&(t.which=t.keyCode);var i=p(t);i&&("keyup"!=t.type||n!==i?e.handleKey(i,function(t){var e=[];return t.shiftKey&&e.push("shift"),t.altKey&&e.push("alt"),t.ctrlKey&&e.push("ctrl"),t.metaKey&&e.push("meta"),e}(t),t):n=!1)}function d(t,r,a,u,f){e._directMap[t+":"+a]=r;var y,m=(t=t.replace(/\s+/g," ")).split(" ");m.length>1?function(t,e,r,a){function c(e){return function(){o=e,++s[t],clearTimeout(i),i=setTimeout(h,1e3)}}function u(e){l(r,e,t),"keyup"!==a&&(n=p(e)),setTimeout(h,10)}s[t]=0;for(var f=0;f<e.length;++f){var y=f+1===e.length?u:c(a||k(e[f+1]).action);d(e[f],y,a,t,f)}}(t,m,r,a):(y=k(t,a),e._callbacks[y.key]=e._callbacks[y.key]||[],c(y.key,y.modifiers,{type:y.action},u,t,f),e._callbacks[y.key][u?"unshift":"push"]({callback:r,modifiers:y.modifiers,action:y.action,seq:u,level:f,combo:t}))}e._handleKey=function(t,e,i){var s,n=c(t,e,i),r={},u=0,d=!1;for(s=0;s<n.length;++s)n[s].seq&&(u=Math.max(u,n[s].level));for(s=0;s<n.length;++s)if(n[s].seq){if(n[s].level!=u)continue;d=!0,r[n[s].seq]=1,l(n[s].callback,i,n[s].combo,n[s].seq)}else d||l(n[s].callback,i,n[s].combo);var f="keypress"==i.type&&a;i.type!=o||y(t)||f||h(r),a=d&&"keydown"==i.type},e._bindMultiple=function(t,e,i){for(var s=0;s<t.length;++s)d(t[s],e,i)},f(t,"keypress",u),f(t,"keydown",u),f(t,"keyup",u)}}("undefined"!=typeof window?window:null,"undefined"!=typeof window?document:null)}},e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t="UP",e="RIGHT",s="DOWN",n="LEFT",r="IDLE",a="ENDED",o=250,h="EMIT_MOVE",c="EMIT_NEW_GAME",l=document.getElementById("snake");document.body.style.margin="0px",document.body.style.height="100vh",l.width=document.body.offsetWidth,l.height=document.body.offsetHeight;const u=l;var d=i(947),f=i.n(d);const p=new class{constructor(){this.element=window.document.createElement("a")}emit(t,e={}){this.element.dispatchEvent(new window.CustomEvent(t,{detail:e}))}on(t,e){this.element.addEventListener(t,(t=>{e(t.detail)}))}};f().bind("up",(()=>{p.emit(h,{direction:t})})),f().bind("right",(()=>{p.emit(h,{direction:e})})),f().bind("down",(()=>{p.emit(h,{direction:s})})),f().bind("left",(()=>{p.emit(h,{direction:n})})),f().bind("enter",(()=>{p.emit(c)})),f().bind("space",(()=>p.emit(c)));const y=p,m=new class{constructor(t,e){this.c=t.getContext("2d"),this.width=t.width,this.height=t.height,this.grid={w:e,h:Math.round(e/this.width*this.height)},this.state=r,this.radius=Math.round(this.width/e)/2,this.apple={x:null,y:null},this.position={x:null,y:null},this.direction=null,this.score=0,this.snake=[],this.wait=o,this.cooldown=o}newGame(){this.snake=[],this.snake.push({x:Math.round(this.grid.w/2),y:Math.round(this.grid.h/2)}),this.snake.push(this.snake[0]),this.snake.push(this.snake[0]),this.position=this.snake[0],this.randomDir(),this.placeApple(),this.score=0,this.state="STARTED",this.wait=o,this.cooldown=o}setDir(t){this.direction=t}getState(){return this.state}getScore(){return this.score}randomDir(){switch(Math.floor(3*Math.random())){case 0:return this.direction=t,t;case 1:return this.direction=n,n;case 2:return this.direction=s,s;default:return this.direction=null,null}}collision(t){var e;for(e=0;e<this.snake.length;e++)if(t.x===this.snake[e].x&&t.y===this.snake[e].y)return!0;return!1}randomPos(){return{x:Math.floor(Math.random()*this.grid.w),y:Math.floor(Math.random()*this.grid.h)}}placeApple(){for(var t=this.randomPos();this.collision(t);)t=this.randomPos();this.apple=t}move(t,e){this.position=t,e&&this.snake.pop(),this.snake.unshift(t),this.snake[0].from=this.directionDiff(this.snake[1],this.snake[0]),this.snake[1].from=this.directionDiff(this.snake[2],this.snake[1]),this.snake[1].to=this.directionDiff(this.snake[0],this.snake[1])}update(i){const r=Object.assign({},this.position);if(this.wait=this.wait-i,!(this.wait>0)){switch(this.wait=this.cooldown,this.direction){case t:r.y=r.y-1,r.y<0&&(r.y=this.grid.h-1);break;case e:r.x=r.x+1,r.x>=this.grid.w&&(r.x=0);break;case s:r.y=r.y+1,r.y>=this.grid.h&&(r.y=0);break;case n:r.x=r.x-1,r.x<0&&(r.x=this.grid.w-1)}r.x===this.apple.x&&r.y===this.apple.y?(this.score=this.score+10,this.score<150&&(this.cooldown=o-this.score),this.placeApple(),this.move(r,!1)):this.collision(r)?(this.wait=0,this.state=a):this.move(r,!0)}}directionDiff(i,r){return Math.abs(i.x-r.x)>1||Math.abs(i.y-r.y)>1?i.x<r.x?e:i.x>r.x?n:i.y<r.y?s:t:i.x<r.x?n:i.x>r.x?e:i.y<r.y?t:s}render(){if(this.state===r)return;const i=(this.cooldown-this.wait)/this.cooldown*2,a=this.wait>this.cooldown/2;let o,h,c;for(this.c.fillStyle="#eee",this.c.fillRect(0,0,this.width,this.height),this.c.strokeStyle="#ccc",o=1;o<this.grid.w;o++)this.c.moveTo(2*this.radius*o,0),this.c.lineTo(2*this.radius*o,this.height);for(o=1;o<this.grid.h;o++)this.c.moveTo(0,2*this.radius*o),this.c.lineTo(this.width,2*this.radius*o);for(this.c.stroke(),this.c.fillStyle="#f00",this.c.beginPath(),this.c.arc(this.apple.x*this.radius*2+this.radius,this.apple.y*this.radius*2+this.radius,this.radius,0,2*Math.PI),this.c.closePath(),this.c.fill(),this.c.fillStyle="#333",o=0;o<this.snake.length;o++){if(h=0,c=0,a)switch(this.snake[o].from){case t:c=this.radius*i-this.radius;break;case s:c=this.radius*i*-1+this.radius;break;case n:h=this.radius*i-this.radius;break;case e:h=this.radius*i*-1+this.radius}else switch(this.snake[o].to||this.direction){case t:c=this.radius*i*-1+this.radius;break;case s:c=this.radius*i-this.radius;break;case n:h=this.radius*i*-1+this.radius;break;case e:h=this.radius*i-this.radius}this.c.beginPath(),this.c.arc(this.snake[o].x*this.radius*2+h+this.radius,this.snake[o].y*this.radius*2+c+this.radius,this.radius,0,2*Math.PI),this.c.closePath(),this.c.fill()}}}(u,30),k=function(t){const e=t.getContext("2d"),i=t.width-40;return function({line:t=1,text:s}){e.fillStyle="#999",e.font="32px sans-serif",e.fillText(s,20,50*t,i)}}(u);let w;const g=()=>{const t=(new Date).getTime(),e=t-(w||t);switch(w=t,m.update(e),m.render(),m.getState()){case r:k({text:"Press return/enter to start a new game"});break;case a:k({text:"GAME OVER!"}),k({text:"Press return/enter to start a new game",line:2}),m.getScore()>0&&m.getScore()>=0?k({text:`Congratulations, new high score: ${m.getScore()}`,line:3}):k({text:`You scored ${m.getScore()} points. Your high score is 0`,line:3});break;default:k({text:m.getScore()}),requestAnimationFrame(g)}};requestAnimationFrame(g),y.on(h,(({direction:t})=>{m.setDir(t)})),y.on(c,(()=>{m.newGame(),requestAnimationFrame(g)}))})()})();
//# sourceMappingURL=snake.js.map