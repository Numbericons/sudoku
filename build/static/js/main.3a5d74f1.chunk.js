(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{11:function(e,t,n){e.exports=n(22)},16:function(e,t,n){},17:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(10),c=n.n(i),l=(n(16),n(1)),o=n(2),s=n(4),u=n(3),h=n(5),f=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={value:e.attr[0],revealed:e.attr[1],entered:e.attr[2]},r.enterVal=r.enterVal.bind(Object(h.a)(r)),r}return Object(o.a)(n,[{key:"enterVal",value:function(e){this.props.change(e,this.props.idx)}},{key:"renderFixed",value:function(){return a.a.createElement("div",{className:"square"},a.a.createElement("h3",{className:"square-revealed"},this.state.value))}},{key:"render",value:function(){if(this.state.revealed)return this.renderFixed();var e="";this.props.attr[2]&&(e=this.props.attr[2]);return a.a.createElement("div",{className:"square",onClick:this.enterVal},a.a.createElement("h3",{className:"square-entered"},e))}}]),n}(a.a.Component),d=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={value:e.value},r}return Object(o.a)(n,[{key:"reload",value:function(){window.location.reload()}},{key:"refresh",value:function(){return a.a.createElement("div",{className:"number",onClick:this.reload},a.a.createElement("h1",{className:"number-text"},this.state.value))}},{key:"render",value:function(){if(this.props.refresh)return this.refresh();var e=this.props.selected?"selected":"number";return a.a.createElement("div",{className:e,onClick:this.props.select},a.a.createElement("h1",{className:"number-text"},this.state.value))}}]),n}(a.a.Component);function v(e){return Math.floor(Math.random()*e.length)}function m(e){return[1,2,3,4,5,6,7,8,9].filter((function(t){return!e.includes(t)}))}function g(e,t,n,r,a){var i=t.slice().filter((function(t){return!n.includes(t)&&function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=JSON.parse(JSON.stringify(e));return a[t]=[n,!0],S(a,t,r)}(e,e.length,t)})),c=v(i),l=i.splice(c,1)[0];l||(l=F(t)),void 0===l&&(t=m(a));var o=t.indexOf(l);return-1===o&&(o=v(t)),t.splice(o,1),n.push(l),l}function p(e,t){var n=[],r=e.length,a=[[9,6,3],[8,5,2],[7,4,1]];return(a[0].includes(r)||a[1].includes(r))&&(n=y(t,e.length,1)),a[0].includes(r)&&(n=n.concat(y(t,e.length,2))),e.length>0&&(a[2].includes(r)&&(n=n.concat(y(t,e.length,-1))),a[2].includes(r)&&(n=n.concat(y(t,e.length,-2)))),n}function b(e,t){for(var n=[],r=0;r<e.length;r++)t.includes(e[r])&&n.push(e[r]);return n}function k(e,t,n){n.push(t);var r=e.indexOf(t);return e.splice(r,1)[0]}function w(e,t,n,r,a,i,c){var l,o,s=r.filter((function(e){return t.includes(e)&&!a.includes(e)}));return n.length||s.length?(n.length?(o=v(n),l=n.splice(o,1)[0]):l=s[v(s)],k(t,l,i)):g(e,t,i,0,c)}function E(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=j(e.length+t);return n.filter((function(t){return e[t]})).map((function(t){return e[t][0]}))}function y(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;if(e.length<27)return[];var i=[],c=r||(e.length<54?3:6),l=21;t<7&&(l+=3),t<4&&(l+=3);for(var o=e.length+n-l,s=o;s>=0;s-=3){if(3!==i.length&&6!==i.length||(s-=18),a===e[s][0])return e[s][0];if(i.unshift(e[s][0]),i.length===c)break}return i}function O(e,t){return E(t,3).filter((function(t){return e.includes(t)}))}function N(e,t){for(var n=Object.keys(e),r=0;r<n.length;r++)if(e[n[r]].includes(t))return r+1}function x(e){var t={1:[60,57,54,33,30,27,6,3,0],2:[61,58,55,34,31,28,7,4,1],3:[62,59,56,35,32,29,8,5,2],4:[69,66,63,42,39,36,15,12,9],5:[70,67,64,43,40,37,16,13,10],6:[71,68,65,44,41,38,17,14,11],7:[78,75,72,51,48,45,24,21,18],8:[79,76,73,52,49,46,25,22,19],9:[80,77,74,53,50,47,26,23,20]};return t[N(t,e)]}function j(e){var t={1:[0,1,2,9,10,11,18,19,20],2:[3,4,5,12,13,14,21,22,23],3:[6,7,8,15,16,17,24,25,26],4:[27,28,29,36,37,38,45,46,47],5:[30,31,32,39,40,41,48,49,50],6:[33,34,35,42,43,44,51,52,53],7:[54,55,56,63,64,65,72,73,74],8:[57,58,59,66,67,68,75,76,77],9:[60,61,62,69,70,71,78,79,80]};return t[N(t,e)]||[]}function M(e,t){if(!t)return!0;for(var n={},r=0;r<t.length;r++)if(e[t[r]]){if(1===n[e[t[r]][0]])return!1;n[e[t[r]][0]]=1}return!0}function S(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=j(t),a=x(t);return!(!M(e,r)||!M(e,a))&&(!n||!0===I(e,t))}function V(e,t,n){var r=JSON.parse(JSON.stringify(e));return J(r,t,n),S(r,n)&&S(r,t)}function J(e,t,n){var r=e[t].slice();e[t]=e[n].slice(),e[n]=r}function C(e,t,n){for(var r=[],a=x(n)[0]-n%3,i=a;i<a+3;i++)for(var c=x(i),l=0;l<c.length;l++)e[c[l]]&&e[c[l]][0]===t&&r.push(e.indexOf(e[c[l]]));return r}function I(e,t){for(var n={},r=t-t%9,a=r;a<r+9;a++){if(!e[a])return!0;if(1===n[e[a][0]])return!1;n[e[a][0]]=1}return!0}function q(e,t,n){var r=[];return e.forEach((function(e){(t.includes(e)||n.includes(e))&&r.push(e)})),r}function B(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}return e}function R(e,t){return t?function(e){var t=e%9,n=[[1,2],[-1,1],[-1,-2]][e%3],r=[];r=t>5?[-3,-6]:t>2?[-3,3]:[3,6];for(var a=0;a<n.length;a++)r.push(n[a]+r[0]),r.push(n[a]+r[1]);return B(r)}(e):B([[1,2],[-1,1],[-1,-2]][e%3])}function F(e){return e[Math.floor(e.length*Math.random())]}function H(e,t){e.includes(t)&&e.splice(e.indexOf(t),1)}function L(e,t){for(var n=e[e.length-1],r=1;r<=t;r++)if(e[e.length-r]!==n)return!1;return!0}function T(e,t,n,r,a){var i=Math.floor(e.length/9),c=L(a,4)&&Math.random()>.5?-9:0;return c&&(5===i||8===i)&&Math.random()>.5&&(c-=9),function(e,t,n,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,i=C(e,n,e.length+a),c=e.length+a-27>=0?1:0;a&&(e.length+a-54>=0&&(c+=1),i=i.filter((function(e){return e-27*c>=0}))),i=B(i);for(var l=0;l<i.length;l++)for(var o=R(i[l],a),s=0;s<o.length;s++)if(e[i[l]+o[s]]){var u=e[i[l]+o[s]][0],h=V(e,i[l],i[l]+o[s]);if(h)return J(e,i[l],i[l]+o[s]),r=!0,t.includes(n)?[u,r]:[n,r]}return null}(e,t,n,r,c)}function W(e,t,n){if(t)return e.splice(e.indexOf(t[0]),1),n!==t[0]&&t[0]}function D(e,t,n,r){var a=r;return r=function(e,t,n){for(var r=JSON.parse(JSON.stringify(e)),a=0;a<t.length;a++){if(r.push([t[a],!0]),S(r,r.length-1,!1))return k(t,t[a],n);r.pop()}return k(t,F(t),n)}(e,t,n),a!==r&&t.push(a),r}function U(e,t,n,r,a,i){for(var c=arguments.length>6&&void 0!==arguments[6]&&arguments[6],l=arguments.length>7?arguments[7]:void 0,o=arguments.length>8?arguments[8]:void 0,s=arguments.length>9?arguments[9]:void 0,u=arguments.length>11?arguments[11]:void 0,h=arguments.length>12?arguments[12]:void 0;t.includes(a)||n.includes(a);){i.push(a),c||r.push(a),o.includes(a)&&l.push(a);var f=void 0,d=void 0;if(i.length+u>8||b(l,i).length===l.length){L(i,10)&&(a=D(e,r,i,a)||a),c||d||(f=T(e,t,a,c,i)),c=W(i,f,c);var v=r.includes(a)?0:1;n=y(e,r.length+v)}t=E(e),c||d||(a=w(e,r,l,s,t,i,h)),d=!1}return a}function $(e,t,n,r,a){for(var i=[],c=0;c<Math.pow(t,2);c++){n=m(i);var l=E(e),o=3===c?O(n,e):[],s=o.slice(),u=y(e,n.length),h=p(n,e),f=q(n,l,u),d=w(e,n,o,h,l,f,r);if((l.includes(d)||u.includes(d))&&(d=U(e,l,u,n,d,f,!1,o,s,h,r,c,i)),void 0===d)break;H(n,d),i.push(d);var v=Math.random()>a/100;e.push([d,v])}}function z(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,n=[],r=0;r<Math.pow(e,2);r++){var a=[1,2,3,4,5,6,7,8,9];$(n,e,a,r,t)}return n}var A=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={selected:null,grid:r.getBoard()},r.won=!1,r.select=r.select.bind(Object(h.a)(r)),r.changeVal=r.changeVal.bind(Object(h.a)(r)),r}return Object(o.a)(n,[{key:"changeVal",value:function(e,t){var n=JSON.parse(JSON.stringify(this.state.grid));n[t][2]="eraser"===this.state.selected?"":this.state.selected,this.setState({grid:n})}},{key:"getBoard",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t=z(e,this.props.val);t.length<81;)t=z(e,this.props.val);return t}},{key:"row",value:function(e){for(var t=[],n=0;n<3;n++){var r=a.a.createElement(f,{key:e+n,idx:e+n,attr:this.state.grid[e+n],selected:this.state.selected,change:this.changeVal});t.push(r)}return a.a.createElement("div",{className:"box-row"},t)}},{key:"box",value:function(e){return a.a.createElement("div",{className:"box"},this.row(e),this.row(e+3),this.row(e+6))}},{key:"boxRow",value:function(e){return a.a.createElement("div",{className:"grid-row-box-row"},this.box(e),this.box(e+9),this.box(e+18))}},{key:"build",value:function(){return a.a.createElement("div",{className:"grid"},a.a.createElement("div",{className:"grid-row"},this.boxRow(0)),a.a.createElement("div",{className:"grid-row"},this.boxRow(27)),a.a.createElement("div",{className:"grid-row"},this.boxRow(54)))}},{key:"select",value:function(e){var t=e.target.innerHTML?parseInt(e.target.innerHTML):"eraser";this.setState({selected:t})}},{key:"numbers",value:function(){for(var e=[],t=1;t<10;t++){var n=this.state.selected===t;e.push(a.a.createElement(d,{key:t,value:t,select:this.select,selected:n}))}return e.push(a.a.createElement(d,{key:"eraser",value:a.a.createElement("i",{className:"fa fa-eraser"}),select:this.select,selected:"eraser"===this.state.selected})),e.push(a.a.createElement(d,{key:"refresh",value:a.a.createElement("i",{className:"fa fa-refresh"}),refresh:!0})),a.a.createElement("div",{className:"numb-cont"},e)}},{key:"chkIndices",value:function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)for(var r=[1,2,3,4,5,6,7,8,9],a=0;a<e[t[n]].length;a++){var i=this.state.grid[e[t[n]][a]],c=i[1]?i[0]:i[2],l=r.indexOf(c);if(-1===l)return!1;r.splice(l,1)}return!0}},{key:"win",value:function(){return this.chkIndices({1:[0,1,2,3,4,5,6,7,8],2:[9,10,11,12,13,14,15,16,17],3:[18,19,20,21,22,23,24,25,26],4:[27,28,29,30,31,32,33,34,35],5:[36,37,38,39,40,41,42,43,44],6:[45,46,47,48,49,50,51,52,53],7:[54,55,56,57,58,59,60,61,62],8:[63,64,65,66,67,68,69,70,71],9:[72,73,74,75,76,77,78,79,80]})&&this.chkIndices({1:[0,1,2,9,10,11,18,19,20],2:[3,4,5,12,13,14,21,22,23],3:[6,7,8,15,16,17,24,25,26],4:[27,28,29,36,37,38,45,46,47],5:[30,31,32,39,40,41,48,49,50],6:[33,34,35,42,43,44,51,52,53],7:[54,55,56,63,64,65,72,73,74],8:[57,58,59,66,67,68,75,76,77],9:[60,61,62,69,70,71,78,79,80]})&&this.chkIndices({1:[60,57,54,33,30,27,6,3,0],2:[61,58,55,34,31,28,7,4,1],3:[62,59,56,35,32,29,8,5,2],4:[69,66,63,42,39,36,15,12,9],5:[70,67,64,43,40,37,16,13,10],6:[71,68,65,44,41,38,17,14,11],7:[78,75,72,51,48,45,24,21,18],8:[79,76,73,52,49,46,25,22,19],9:[80,77,74,53,50,47,26,23,20]})}},{key:"componentDidUpdate",value:function(){!this.won&&this.win()&&(this.won=!0,alert("Congratulations, you have won!"))}},{key:"render",value:function(){return a.a.createElement("div",{className:"board"},this.build(),this.numbers())}}]),n}(a.a.Component),G=(n(17),n(6)),K=n.n(G),P=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).loads=1,r}return Object(o.a)(n,[{key:"gameOver",value:function(){}},{key:"chkBoard",value:function(){}},{key:"play",value:function(){}},{key:"render",value:function(){var e;return 1===this.loads&&(e=prompt("Choose a difficulty between 1 and 100 to set the percentage of squares you want hidden:","50")),this.loads+=1,a.a.createElement("div",{className:"main"},a.a.createElement("div",{className:"main-head"},a.a.createElement("h1",{className:"main-head-text"},"Sudoku"),a.a.createElement("div",{className:"timer"},a.a.createElement(K.a,{formatValue:function(e){return"".concat(e<10?"0".concat(e):e)}},a.a.createElement(K.a.Hours,{formatValue:function(e){return 0===e?"00:":"".concat(e<10?"0".concat(e):e,":")}}),a.a.createElement(K.a.Minutes,{formatValue:function(e){return 0===e?"00:":"".concat(e<10?"0".concat(e):e,":")}}),a.a.createElement(K.a.Seconds,{formatValue:function(e){return 0===e?"00":"".concat(e<10?"0".concat(e):e)}})))),a.a.createElement("div",{className:"main-body"},a.a.createElement("div",null),a.a.createElement(A,{loads:this.loads,val:e}),a.a.createElement("div",null)),a.a.createElement("div",{className:"hide"},"Icons made by ",a.a.createElement("a",{href:"https://www.flaticon.com/authors/surang",title:"surang"},"surang")," from ",a.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")))}}]),n}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.3a5d74f1.chunk.js.map