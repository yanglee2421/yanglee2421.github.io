import{r as i,ag as k,_ as u,m as C,j as S,I as H}from"./index-y-D59f-l.js";import{i as b}from"./isHostComponent-jcd54X0C.js";import{c as g,u as R,d as x,f as E}from"./TransitionGroupContext-y5PnIpQc.js";let h=0;function j(e){const[s,t]=i.useState(e),n=e||s;return i.useEffect(()=>{s==null&&(h+=1,t(`mui-${h}`))},[s]),n}const N=k.useId;function $(e){if(N!==void 0){const s=N();return e??s}return j(e)}function w(e,s,t){return e===void 0||b(e)?s:u({},s,{ownerState:u({},s.ownerState,t)})}function _(e,s=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!s.includes(n)).forEach(n=>{t[n]=e[n]}),t}function F(e,s,t){return typeof e=="function"?e(s,t):e}function I(e){if(e===void 0)return{};const s={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{s[t]=e[t]}),s}function O(e){const{getSlotProps:s,additionalProps:t,externalSlotProps:n,externalForwardedProps:o,className:l}=e;if(!s){const y=g(t==null?void 0:t.className,l,o==null?void 0:o.className,n==null?void 0:n.className),P=u({},t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),v=u({},t,o,n);return y.length>0&&(v.className=y),Object.keys(P).length>0&&(v.style=P),{props:v,internalRef:void 0}}const r=_(u({},o,n)),c=I(n),d=I(o),a=s(r),f=g(a==null?void 0:a.className,t==null?void 0:t.className,l,o==null?void 0:o.className,n==null?void 0:n.className),m=u({},a==null?void 0:a.style,t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),p=u({},a,t,d,c);return f.length>0&&(p.className=f),Object.keys(m).length>0&&(p.style=m),{props:p,internalRef:a.ref}}const W=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function G(e){var s;const{elementType:t,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:l=!1}=e,r=C(e,W),c=l?{}:F(n,o),{props:d,internalRef:a}=O(u({},r,{externalSlotProps:c})),f=R(a,c==null?void 0:c.ref,(s=e.additionalProps)==null?void 0:s.ref);return w(t,u({},d,{ref:f}),o)}function A(e){return typeof e=="function"?e():e}const L=i.forwardRef(function(s,t){const{children:n,container:o,disablePortal:l=!1}=s,[r,c]=i.useState(null),d=R(i.isValidElement(n)?n.ref:null,t);if(x(()=>{l||c(A(o)||document.body)},[o,l]),x(()=>{if(r&&!l)return E(t,r),()=>{E(t,null)}},[t,r,l]),l){if(i.isValidElement(n)){const a={ref:d};return i.cloneElement(n,a)}return S.jsx(i.Fragment,{children:n})}return S.jsx(i.Fragment,{children:r&&H.createPortal(n,r)})});export{L as P,$ as a,w as b,_ as e,G as u};
