(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));class i{constructor(t=5,n=5){this.width=t,this.height=n,this.reset()}reset(){const{width:t,height:n}=this;let e=(i=5,s=t*n*.6,Math.floor(i+(s-i+1)*Math.random()));var i,s;this.remain=e;const r=t*n;this.cells=Array.from({length:r},(t,n)=>{const i=Math.random()<e/(r-n);return i&&(e-=1),{index:n,value:i}})}matrix(){const{width:t,height:n}=this;return Array.from({length:n},(n,e)=>Array.from({length:t},(n,i)=>this.cells[e*t+i]))}turn(t){const{width:n}=this,e=[t-n,t,t+n,t%n?t-1:-1,(t+1)%n?t+1:-1].filter(t=>this.cells[t]);return e.forEach(t=>{const n=this.cells[t];n.value=!n.value,this.remain+=n.value?1:-1}),e}}},function(t,n,e){},,,,,function(t,n,e){"use strict";var i=e(2);e.n(i).a},function(t,n,e){},,,,,,function(t,n,e){"use strict";e.r(n);var i=e(4),s=e(6);const r=new(e(1).a);var a={data:()=>({remain:r.remain,matrix:r.matrix()}),methods:{onClick(t){r.turn(t.index),this.remain=r.remain}}},c=(e(7),e(5)),o=Object(c.a)(a,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("h1",[t._v("Lights")]),e("p",[e("em",{domProps:{textContent:t._s(t.remain)}}),t._v(" lights need to be switched off. ")]),t.remain?t._e():e("p",{staticClass:"text-success"},[t._v("You got it!")]),e("div",{staticClass:"mt-2"},t._l(t.matrix,(function(n,i){return e("div",{key:i},t._l(n,(function(n,i){return e("span",{key:i,staticClass:"item",class:{active:n.value},on:{click:function(e){return t.onClick(n)}}})})),0)})),0)])}),[],!1,null,null,null).exports;e(8);Object(i.a)({stdWidth:350,maxWidth:350});const h=new s.a({render:t=>t(o)}).$mount();document.body.append(h.$el)}],[[14,0,3]]]);