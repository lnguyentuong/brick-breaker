(this.webpackJsonpcanvas=this.webpackJsonpcanvas||[]).push([[0],[,,,,,,,,,,function(t,e,r){},function(t,e,r){},,function(t,e,r){},function(t,e,r){"use strict";r.r(e);var n=r(2),c=r.n(n),o=r(4),i=r.n(o),a=(r(10),r(1)),u=r(5),d=(r(11),r(0)),f=function(){return Object(d.jsxs)("div",{className:"lds-ellipsis",children:[Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{})]})},l=1.0001,s=20,h=new Audio("/brick-breaker/Thwomp.wav"),x=new Audio("/brick-breaker/Break.wav"),y=function(t,e){return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)},b=function(t,e){var r=e.coord,n=(r.x+s>t.width||r.x<s?-r.dx:r.dx)*l,c=(r.y<s?-r.dy:r.dy)*l;return Math.abs(n)+Math.abs(c)<.1?Object(a.a)(Object(a.a)({},e),{},{coord:Object(a.a)(Object(a.a)({},r),{},{dx:0,dy:0})}):Object(a.a)(Object(a.a)({},e),{},{coord:{x:r.x+n,y:r.y+c,dx:n,dy:c}})},j=function(t,e){var r=t.x-e.coord.x,n=t.y-e.coord.y,c=t.x-e.coord.x,o=t.y-e.coord.y-e.height,i=t.x-e.coord.x-e.width,a=t.y-e.coord.y,u=t.x-e.coord.x-e.width,d=t.y-e.coord.y-e.height;return t.x+s>=e.coord.x&&t.x-s<=e.coord.x+100&&(r*r+n*n<=400||c*c+o*o<=400||i*i+a*a<=400||u*u+d*d<=400||t.y+s>=e.coord.y&&t.y-s<=e.coord.y+e.height)},p=function(t,e){var r=(e.coord.x-t.x)/40,n=(e.coord.y-t.y)/40,c=-n,o=r;t.dx,t.dy,t.dx,t.dy;(t.x<e.coord.x||t.x>e.coord.x+e.width)&&t.y>=e.coord.y&&t.y<=e.coord.y+e.height&&(t.dx=-t.dx),(t.y<e.coord.y||t.y>e.coord.y+e.height)&&t.x>=e.coord.x&&t.y<=e.coord.x+e.width||(t.dx=-t.dx),t.dy=-t.dy,t.x+=t.dx,t.y+=t.dy},v="#ff0000",O="#000000",g=function(t){return t<16?"0"+t.toString(16):t.toString(16)},m=function(t,e,r){var n=e.x,c=e.y;t.beginPath(),t.fillStyle=r,t.fillRect(n,c,100,30)},w=function(t,e,r){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=0,n=0,c=0;if(t.startsWith("#")){var o=7===t.length?t.slice(1,3):t[1],i=7===t.length?t.slice(3,5):t[2],a=7===t.length?t.slice(5,7):t[3];r=parseInt(o,16),n=parseInt(i,16),c=parseInt(a,16)}if(t.startsWith("rgb")){var u=t.replace(/(rgb)|\(|\)| /g,"").split(",");r=parseInt(u[0]),n=parseInt(u[1]),c=parseInt(u[2])}return r=Math.max(Math.min(Math.floor((1-e)*r+255*e),255),0),n=Math.max(Math.min(Math.floor((1-e)*n+255*e),255),0),c=Math.max(Math.min(Math.floor((1-e)*c+255*e),255),0),"#".concat(g(r)).concat(g(n)).concat(g(c))}(r,1/e*(e-t))},M=function(t){return function(e){if(function(t){var e=t.canvas,r=e.height,n=e.width;t.fillStyle="white",t.fillRect(0,0,n,r)}(t),e.pos.map((function(e){return m(t,e.coord,w(e.life,2,O))})),function(t,e,r){var n=e.x,c=e.y;t.beginPath(),t.fillStyle=r,t.arc(n,c,s,0,2*Math.PI),t.fill()}(t,e.ball.coord,w(5,2,v)),m(t,e.player.coord,w(5,2,O)),e.endOfGame){t.font="48px arial",t.strokeText("END",e.size.width/2-200,e.size.height/2)}}},k=function(t){for(var e=t.height,r=t.width,c=new Array,o=0,i=0;o<r;)o+=100,i++;for(var u=0,f=new Array,l=0;l<10;l++){o=0;for(var v=0;v<i;v++)c.push(o),f.push(u),o+=100;u+=30}var O={pos:new Array(10*i).fill(1).map((function(t,e){return{life:2,coord:{x:c[e],y:f[e]},height:30,width:100}})),ball:{life:2,invincible:-1,coord:{x:500,y:500,dx:-5,dy:-5}},size:{height:e,width:r},player:{coord:{x:r/2,y:e-40},height:30,width:100,life:1e4},endOfGame:!0},g=Object(n.useRef)(),m=Object(n.useRef)(O),w=function t(e){m.current=function(t){return j(t.ball.coord,t.player)&&(h.play(),p(t.ball.coord,t.player)),t.pos.map((function(e,r,n){n.slice(r+1).map((function(r){j(t.ball.coord,e)&&(e.life--,x.play(),p(t.ball.coord,e))}))})),Object(a.a)(Object(a.a)({},t),{},{pos:t.pos.filter((function(t){return t.life>0})),ball:b(t.size,t.ball)})}(m.current),m.current.endOfGame=!function(t){return t.ball.coord.y+s<=t.size.height}(m.current),M(e)(m.current),m.current.endOfGame||requestAnimationFrame((function(){return t(e)}))},k=function(t){m.current=function(t){return function(e){var r=e.offsetX,n=e.offsetY;return t.pos.find((function(t){return y(t.coord,{x:r,y:n,dx:0,dy:0})<Math.pow(s,2)+100})),t}}(m.current)(t)},I=function(t){m.current=function(t){return function(e){return Object(a.a)(Object(a.a)({},t),{},{player:Object(a.a)(Object(a.a)({},t.player),{},{coord:{x:e.x,y:t.player.coord.y}})})}}(m.current)(t)};return Object(n.useEffect)((function(){return g.current&&(!function(t){return function(e){var r=e.getContext("2d");r&&requestAnimationFrame((function(){return t(r)}))}}(w)(g.current),g.current.addEventListener("click",k),g.current.addEventListener("mousemove",I)),function(){g.current.removeEventListener("click",I),g.current.removeEventListener("mousemove",I)}}),[]),Object(d.jsx)("canvas",{height:e,width:r,ref:g})},I=(r(13),function(){var t=Object(n.useState)(null),e=Object(u.a)(t,2),r=e[0],c=e[1],o=Object(n.useRef)();return Object(n.useEffect)((function(){setTimeout((function(){c({height:o.current.clientHeight,width:o.current.clientWidth})}),100)})),Object(d.jsx)("div",{className:"App",ref:o,children:r?Object(d.jsx)(k,Object(a.a)({},r)):Object(d.jsx)(f,{})})}),A=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,15)).then((function(e){var r=e.getCLS,n=e.getFID,c=e.getFCP,o=e.getLCP,i=e.getTTFB;r(t),n(t),c(t),o(t),i(t)}))};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(I,{})}),document.getElementById("root")),A()}],[[14,1,2]]]);
//# sourceMappingURL=main.17b97ea0.chunk.js.map