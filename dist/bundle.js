!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var s=function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.row=e,this.col=i},n=$("#game"),o=($("#newgame-btn"),$("#game-button")),r=$("#gamebar"),a=$("#top-border"),c=$("#middle-border"),l=$("#bottom-border"),u=$("#field-container"),h=($("#settings-container"),$("#input-rows")),f=$("#input-columns"),d=$("#input-bombs"),v=($("#scores"),"sprite-flag"),b="sprite-blank",m="block",p="clicked",k="visible",y="hidden",g=".".concat(v),C=".".concat(b),w=(".".concat("sprite-blank"),".".concat(m)),A=".".concat(p),B=16,F=10;function T(t,e){!function(t,e){var i=B*t+3*F+32,s=B*e+2*F,a=B*e+2*F,c=B*e/2-13-49,l=B*e/2-13-49;$(n).css("zoom",3),$(n).css({height:i,width:s}),$(r).css("width",a),$(u).css("height",B*t),$(o).css({"margin-left":c,"margin-right":l}),$(o).removeClass("sprite-btn-dead"),$(o).removeClass("sprite-btn-cool")}(t,e),I(e,a,"t"),function(t,e){for(var i=0;i<t;i++){$(u).append('<div class="row" id="r'.concat(i,'"></div>'));var s="#r"+i;$(s).append('<div class="sprite sprite-border-vertical"></div>');for(var n=0;n<e;n++){var o='<div id="'.concat(i,"-").concat(n,'" class="').concat(m,' sprite sprite-blank"></div>');$(s).append(o)}$(s).append('<div class="sprite sprite-border-vertical"></div>')}}(t,e),I(e,c,"i"),I(e,l,"b")}function I(t,e,i){$(e).append('<div class="sprite sprite-border-'.concat(i,'l"></div>'));for(var s=1;s<=t;s++)$(e).append('<div class="sprite sprite-border-horizontal"></div>');$(e).append('<div class="sprite sprite-border-'.concat(i,'r"></div>'))}function P(t){var e=[];for(t=Math.abs(t);t>0;)e[e.length]=t%10,t=parseInt(t/10);return e}function G(t,e){return"#"+t+"-"+e}function O(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";H&&console.log(t,e,i,s)}function U(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];$(t).removeClass(e),$(t).addClass(i),s&&$(t).addClass(p)}function j(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var N=function(){function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.seconds=0,this.secondsArray=[],this.interval=setInterval(function(){e.seconds++,999===e.seconds&&e.stopTimer();var t=P(e.seconds);e.timerClass(3,t[0]),e.timerClass(2,t[1]),e.timerClass(1,t[2])},1e3),this.startTs=new Date}var e,i,s;return e=t,(i=[{key:"timerClass",value:function(t,e){e=void 0===e?0:e;var i="#timer-".concat(t);if(parseInt($(i).attr("class").split("d")[2])!==e){for(var s=0;s<=9;s++)$(i).removeClass("sprite-d".concat(s));$(i).addClass("sprite-d".concat(e))}}},{key:"setTimerToZero",value:function(){this.timerClass(3,0),this.timerClass(2,0),this.timerClass(1,0)}},{key:"stopTimer",value:function(){clearInterval(this.interval)}},{key:"getFinishTime",value:function(){return(new Date-this.startTs)/1e3}}])&&j(e.prototype,i),s&&j(e,s),t}();function M(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var E=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.points=e;var i=P(this.points);this.scoreClass(3,i[0]),this.scoreClass(2,i[1]),this.scoreClass(1,i[2])}var e,i,s;return e=t,(i=[{key:"addPoint",value:function(){this.points++;var t=P(this.points);this.scoreClass(3,t[0]),this.scoreClass(2,t[1]),this.scoreClass(1,t[2]),this.points<0&&this.scoreClass(1,"-")}},{key:"removePoint",value:function(){this.points--;var t=P(this.points);this.scoreClass(3,t[0]),this.scoreClass(2,t[1]),this.scoreClass(1,t[2]),this.points<0&&this.scoreClass(1,"-")}},{key:"scoreClass",value:function(t,e){e=void 0===e?0:e;var i="#points-".concat(t);$(i).removeClass("d-");for(var s=0;s<=9;s++)$(i).removeClass("sprite-d".concat(s));$(i).addClass("sprite-d".concat(e))}}])&&M(e.prototype,i),s&&M(e,s),t}();function x(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var S,_=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),O("Setting up Game..."),this.debug=e,this.showBombs=e,this.rows,this.columns,this.bombs,this.setupGame()}var e,i,n;return e=t,(i=[{key:"setupGame",value:function(){$(a).empty(),$(c).empty(),$(u).empty(),$(l).empty();var t=parseInt($(h).val()),e=parseInt($(f).val()),i=parseInt($(d).val());this.rows=t<8?8:t,this.columns=e<8?8:e,this.bombs=i<1?1:i,O(this.rows+" rows, ",this.columns+" cols, ",this.bombs+" bombs"),this.amountFields=this.rows*this.columns-this.bombs,this.bombsArray=this.createBombs(),this.boardArray=this.createBoardArray(),this.gameWon=!1,T(this.rows,this.columns),this.points=new E(this.bombs),this.timer=new N}},{key:"createBombs",value:function(){for(var t=this,e=[],i=function(i){for(var n=!1,o=void 0,r=void 0;!n;)o=Math.floor(Math.random()*t.rows),r=Math.floor(Math.random()*t.columns),e.some(function(t){return t.row===o&&t.col===r})||(n=!0);if(e.push(new s(o,r)),t.showBombs){var a="#".concat(o,"-").concat(r);$(a).toggleClass("field bomb")}},n=1;n<=this.bombs;n++)i();return O("bombsArray =>",e),e}},{key:"createBoardArray",value:function(){for(var t=[],e=0;e<this.rows;e++){t[e]=[];for(var i=0;i<this.columns;i++)t[e][i]=0}for(var s=0;s<this.bombsArray.length;s++){var n=this.bombsArray[s].row,o=this.bombsArray[s].col;t[n][o]="b",t=this.counterUpAround(n,o,t)}return O("boardArray =>",t),t}},{key:"counterUpAround",value:function(t,e,i){return i=this.counterUp(t+1,e-1,i),i=this.counterUp(t+1,e,i),i=this.counterUp(t+1,e+1,i),i=this.counterUp(t,e-1,i),i=this.counterUp(t,e+1,i),i=this.counterUp(t-1,e-1,i),i=this.counterUp(t-1,e,i),i=this.counterUp(t-1,e+1,i)}},{key:"counterUp",value:function(t,e,i){return t>=0&&t<this.rows&&e>=0&&e<this.columns&&"number"==typeof i[t][e]&&(i[t][e]=i[t][e]+1),i}},{key:"checkNoBomb",value:function(t,e){if(isNaN(t))throw new Error("Row is NaN");if(isNaN(e))throw new Error("Col is NaN");return"b"!==this.boardArray[t][e]}},{key:"blockClicked",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";""===i&&(i=G(t,e)),O("block clicked =>",i),t<0||t>=this.rows||e<0||e>=this.columns||$(i).hasClass(b)&&(this.checkNoBomb(t,e)?this.fieldClicked(t,e,i):this.bombClicked(t,e,i))}},{key:"fieldClicked",value:function(t,e,i){this.amountFields--;var s=this.boardArray[t][e];U(i,b,"sprite-".concat(s),!0),$(i).attr("data-value",s),0===s&&this.clickFieldsAround(t,e),0===this.amountFields&&this.winGame()}},{key:"flagField",value:function(t){O("Flag field =>",t),$(t).hasClass(v)?(this.points.addPoint(),U(t,v,b)):(this.points.removePoint(),U(t,b,v))}},{key:"checkSurroundings",value:function(t,e){for(var i=0,s=-1;s<=1;s++)for(var n=-1;n<=1;n++)this.checkNoBomb(t+s,e+n)||i++;return i}},{key:"winGame",value:function(){if(!this.gameWon){var t=this.timer.getFinishTime();console.log("time =>",t),$(o).toggleClass("btn-smiley btn-cool");for(var e=0;e<this.bombs;e++){var i=G(this.bombsArray[e].row,this.bombsArray[e].col);$(i).hasClass(v)||this.flagField($(i))}!function(t,e){$(scores).hasClass(y)&&U(scores,y,k),$(scores).find("tbody:last-child").append("<tr><td>".concat(t,"</td><td>").concat(e,"</td></tr>"))}(this.rows+"x"+this.columns+", "+this.bombs+" Bombs "+this.seconds,t),this.timer.stopTimer()}this.gameWon=!0}},{key:"clickFieldsAround",value:function(t,e){this.blockClicked(t-1,e-1),this.blockClicked(t-1,e),this.blockClicked(t-1,e+1),this.blockClicked(t+1,e-1),this.blockClicked(t+1,e),this.blockClicked(t+1,e+1),this.blockClicked(t,e-1),this.blockClicked(t,e+1)}},{key:"bombClicked",value:function(t,e,i){O("bomb clicked =>",i),U(i,b,"sprite-bomb-red",!0),this.timer.stopTimer(),U(o,"sprite-btn-smiley","sprite-btn-dead");for(var s=0;s<this.bombs;s++){if(this.bombsArray[s].row!==t||this.bombsArray[s].col!==e)U(G(this.bombsArray[s].row,this.bombsArray[s].col),b,"sprite-bomb-grey")}var n=this;$(g).each(function(){var t=$(this).attr("id"),e=parseInt(t.split("-")[0]),i=parseInt(t.split("-")[1]);t="#"+t,n.checkNoBomb(e,i)&&U(t,v,"sprite-no-bomb")});for(var r=0;r<this.rows;r++)for(var a=0;a<this.columns;a++){U(G(r,a),null,null,!0)}}},{key:"clearGame",value:function(){this.timer.stopTimer(),this.timer.setTimerToZero()}}])&&x(e.prototype,i),n&&x(e,n),t}();function D(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var W=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),S=e,this.initDomListener()}var e,i,s;return e=t,(i=[{key:"initDomListener",value:function(){$(o).mousedown(function(){U(o,"sprite-btn-smiley","sprite-btn-click")}),$(game).mouseup(function(){$(o).hasClass("sprite-btn-wow")?U(o,"sprite-btn-wow","sprite-btn-smiley"):$(o).hasClass("sprite-btn-click")&&U(o,"sprite-btn-click","sprite-btn-smiley")}),$(o).click(function(){J()}),$("input:radio").click(function(){var t=parseInt($(this).val());$(game).css("zoom",t)}),$(game).on("click",C,function(){var t=$(this).attr("id"),e=parseInt(t.split("-")[0]),i=parseInt(t.split("-")[1]);S.blockClicked(e,i,"#".concat(t))}),$(game).on("contextmenu",w,function(){var t=$(this).attr("id");S.flagField("#".concat(t))}),$(game).on("mousedown",C,function(){U(o,"sprite-btn-smiley","sprite-btn-wow")})}}])&&D(e.prototype,i),s&&D(e,s),t}();function z(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var L=0,Z=0,R=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.Game=e}var e,i,s;return e=t,(i=[{key:"startAI",value:function(){for(Z=0,L=0,O("start AI");!this.Game.gameWon&&Z<this.Game.rows*this.Game.columns;)0===points?this.clickAllBlocks():0===L?this.randomClick():(L=0,this.goThroughClicked()),Z++}},{key:"clickAllBlocks",value:function(){$(C).each(function(){$(this).click()})}},{key:"randomClick",value:function(){var t=[];$(C).each(function(){t.push("#"+$(this).attr("id"))});var e=Math.floor(Math.random()*t.length),i=t[e];O("random click => ",i),$(i).click(),L++}},{key:"goThroughClicked",value:function(){var t=this;$(A).each(function(){var e=parseInt($(this).data("value"));if(e>0){var i=$(this).attr("id"),s=parseInt(i.split("-")[0]),n=parseInt(i.split("-")[1]),o=t.countUnclickedBlocksAround(s,n),r=t.countFlagsAround(s,n);o.length===e&&o.length>0?(flagArray(o),O("flag array =>",o.length,e),L++):r===e&&0!==r&&clickBlocksAround(s,n)}})}},{key:"countUnclickedBlocksAround",value:function(t,e){return this.checkClicked(t-1,e-1),this.checkClicked(t-1,e),this.checkClicked(t-1,e+1),this.checkClicked(t+1,e-1),this.checkClicked(t+1,e),this.checkClicked(t+1,e+1),this.checkClicked(t,e-1),this.checkClicked(t,e+1),[]}},{key:"countFlagsAround",value:function(t,e){var i=0;return i=this.checkFlag(t-1,e-1,i),i=this.checkFlag(t-1,e,i),i=this.checkFlag(t-1,e+1,i),i=this.checkFlag(t+1,e-1,i),i=this.checkFlag(t+1,e,i),i=this.checkFlag(t+1,e+1,i),i=this.checkFlag(t,e-1,i),i=this.checkFlag(t,e+1,i)}},{key:"checkClicked",value:function(t,e,i){var s=G(t,e);$(s).hasClass("tile")&&i.push(G(t,e))}},{key:"checkFlag",value:function(t,e,i){var s=G(t,e);return $(s).hasClass(m)&&$(s).hasClass(v)&&i++,i}},{key:"flagArray",value:function(t){t.forEach(function(t){flag(t)})}},{key:"flag",value:function(t){$(t).hasClass(v)||flagField($(t))}},{key:"clickBlock",value:function(t,e){var i=G(t,e);!$(i).hasClass(m)||$(i).hasClass(p)||$(i).hasClass(v)||($(i).click(),O("click =>",i),L++)}},{key:"clickBlocksAround",value:function(t,e){clickBlock(t-1,e-1),clickBlock(t-1,e),clickBlock(t-1,e+1),clickBlock(t+1,e-1),clickBlock(t+1,e),clickBlock(t+1,e+1),clickBlock(t,e-1),clickBlock(t,e+1)}}])&&z(e.prototype,i),s&&z(e,s),t}();i.d(e,"newGame",function(){return J}),i.d(e,"debug",function(){return H});var q,H=window.location.href.indexOf("localhost")>0;function J(){if(void 0!==q)q.clearGame(),q.setupGame();else{q=new _(H),new W(q);var t=new R(q);$("#AI").click(function(){t.startAI()})}}$(document).ready(function(){J()}),$("#newgame-btn").click(function(){J()})}]);