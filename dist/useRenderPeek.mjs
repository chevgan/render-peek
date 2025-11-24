import{useRef as f,useState as h,useEffect as P}from"react";import a from"fast-deep-equal";var y=`
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
`,l=!1;function i(){if(typeof document>"u"||l)return;let e=document.createElement("style");e.type="text/css",e.innerHTML=y,document.head.appendChild(e),l=!0}function R(e,s){i();let n=f(null),[d,c]=h(!1),o=f(null),u=t=>{if(!s?.ignoreKeys||s.ignoreKeys.length===0)return t;let r={...t};return s.ignoreKeys.forEach(p=>{delete r[p]}),r},m=u(e);if(n.current){let t=u(n.current),r=a(t,m)}return P(()=>{let t=u(e);if(n.current){let r=u(n.current);a(r,t)&&(c(!0),o.current&&clearTimeout(o.current),o.current=setTimeout(()=>{c(!1),o.current=null},500))}n.current=e},[e,s]),{className:d?"render-peek-flash":""}}export{R as useRenderPeek};
//# sourceMappingURL=useRenderPeek.mjs.map