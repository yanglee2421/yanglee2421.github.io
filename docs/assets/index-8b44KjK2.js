import{R as o,j as r}from"./index-y-D59f-l.js";import{G as s}from"./Grid-JBlH0Mfc.js";import{C as l}from"./Card-gq2DRxhC.js";import{C as d}from"./CardHeader-5psyu3_J.js";import{C as c}from"./CardContent--MAUgh3u.js";import{T as j}from"./TextField-AbjQ87N5.js";import{B as g}from"./Box-gGW_-ZGs.js";import{B as h}from"./Backdrop-EpG-_wG6.js";import{C}from"./CircularProgress-0PcbA24j.js";import"./fabric-Y98Y_bQ5.js";import"./TransitionGroupContext-y5PnIpQc.js";import"./useTheme-vEkUmAeO.js";import"./extendSxProp-keH6JwdC.js";import"./Paper-cWqnbJ1A.js";import"./Typography-lsV97rWU.js";import"./OutlinedInput-3JaT48Fv.js";import"./Modal-WhXy9qwD.js";import"./ownerDocument-bIJBxlvi.js";import"./ownerWindow-LT9-6hbI.js";import"./Portal-pE_ByGME.js";import"./isHostComponent-jcd54X0C.js";import"./Grow-XbrmT_k2.js";import"./utils-7yFeARfI.js";import"./Transition-e2d74KiK.js";import"./List-d5ooj-Jo.js";import"./ListContext-jXuE6Pjc.js";import"./useFormControl-54SyaaD4.js";import"./TextareaAutosize-i_xNwxy6.js";import"./isMuiElement-8MWP4zlS.js";import"./Select-fELxCip1.js";import"./useControlled-MDGVTukE.js";import"./createSvgIcon-zvISoHuV.js";function $(){const i=o.useRef(null),[n,b]=o.useState("http://localhost:5500"),[x,f]=o.useState(""),[m,a]=o.useState(!0),u=t=>{var e,p;f(t.target.value),(p=(e=i.current)==null?void 0:e.contentWindow)==null||p.postMessage(JSON.stringify({msg:t.target.value}),n,[])};return o.useEffect(()=>{var e;const t=new AbortController;return(e=i.current)==null||e.addEventListener("load",()=>{a(!1)},{signal:t.signal}),()=>{new AbortController}},[i,a]),r.jsx(r.Fragment,{children:r.jsxs(s,{container:!0,spacing:6,p:3,children:[r.jsx(s,{item:!0,xs:12,children:r.jsxs(l,{children:[r.jsx(d,{title:"Form"}),r.jsx(c,{children:r.jsx(j,{value:x,onChange:u,disabled:m,label:"Text"})})]})}),r.jsx(s,{item:!0,xs:12,children:r.jsxs(l,{children:[r.jsx(d,{title:"Iframe"}),r.jsx(c,{children:r.jsxs(g,{position:"relative",p:3,border:"1px solid",borderColor:t=>t.palette.divider,children:[r.jsx(h,{open:m,sx:{position:"absolute"},children:r.jsx(C,{})}),r.jsx("iframe",{ref:i,src:n})]})})]})})]})})}export{$ as Component};
