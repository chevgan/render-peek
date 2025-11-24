"use strict";var P=Object.create;var f=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var g=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var R=(e,t)=>{for(var r in t)f(e,r,{get:t[r],enumerable:!0})},d=(e,t,r,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of x(t))!F.call(e,n)&&n!==r&&f(e,n,{get:()=>t[n],enumerable:!(c=k(t,n))||c.enumerable});return e};var T=(e,t,r)=>(r=e!=null?P(g(e)):{},d(t||!e||!e.__esModule?f(r,"default",{value:e,enumerable:!0}):r,e)),j=e=>d(f({},"__esModule",{value:!0}),e);var S={};R(S,{useRenderPeek:()=>K});module.exports=j(S);var s=require("react"),a=T(require("fast-deep-equal"));var E=`
@keyframes peek-flash-anim {
  0% {
    box-shadow: inset 0 0 0 2px #ff4500;
  }
  100% {
    box-shadow: inset 0 0 0 2px transparent;
  }
}

.render-peek-flash {
  animation: peek-flash-anim 0.5s ease-out forwards;
}
`,m=!1;function p(){if(typeof document>"u"||m)return;let e=document.createElement("style");e.type="text/css",e.innerHTML=E,document.head.appendChild(e),m=!0}function K(e,t){p();let r=(0,s.useRef)(null),[c,n]=(0,s.useState)(!1),l=(0,s.useRef)(null),i=o=>{if(!t?.ignoreKeys||t.ignoreKeys.length===0)return o;let u={...o};return t.ignoreKeys.forEach(h=>{delete u[h]}),u},y=i(e);if(r.current){let o=i(r.current),u=(0,a.default)(o,y)}return(0,s.useEffect)(()=>{let o=i(e);if(r.current){let u=i(r.current);(0,a.default)(u,o)&&(n(!0),l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{n(!1),l.current=null},500))}r.current=e},[e,t]),{className:c?"render-peek-flash":""}}0&&(module.exports={useRenderPeek});
//# sourceMappingURL=useRenderPeek.js.map