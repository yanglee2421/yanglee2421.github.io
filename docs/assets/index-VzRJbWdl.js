import{R as p,j as r}from"./index-TTh6u7Wr.js";import{u as x,F as u}from"./index.esm-n42OlbZY.js";import"./Editor-ZzMqOt7o.js";import{I as h}from"./item-text-lxC7LY3c.js";import{S as j}from"./SkeletonCard-8_cF-WhR.js";import"./copy-btn-57qi4T83.js";import{C as f,a as b,b as C}from"./CardHeader-AYCryLZp.js";import{G as e}from"./Grid-eMChz-HU.js";import{B as a}from"./Button-w9ywpE3s.js";import"./fabric-Y98Y_bQ5.js";import"./index-9djbFzGf.js";import"./TextField-2W1S6_Nl.js";import"./ButtonBase-Qpy50vo6.js";import"./OutlinedInput-qbl84Z5r.js";import"./useTheme-wFOvoZXw.js";import"./Modal-y_45rI3s.js";import"./Backdrop-TW-wqQkC.js";import"./utils-7yFeARfI.js";import"./Transition-Mu2Vou9r.js";import"./ownerDocument-bIJBxlvi.js";import"./ownerWindow-LT9-6hbI.js";import"./Portal-qRGqc8P7.js";import"./isHostComponent-jcd54X0C.js";import"./Paper--A8AC-BD.js";import"./Grow-3ZEb0sf7.js";import"./List-iRUv8s6y.js";import"./ListContext-T4iwPxsA.js";import"./useFormControl-6e_5MtfC.js";import"./TextareaAutosize-ItGzBMMi.js";import"./isMuiElement-qibW-xOb.js";import"./useControlled-BkD29Xeb.js";import"./createSvgIcon-PprR8B37.js";import"./Skeleton-ML4OMBWJ.js";import"./Tooltip-Sck434z4.js";import"./Popper-E3PBggSY.js";import"./IconButton-TIkL0xmx.js";import"./Typography-adl__cJu.js";import"./extendSxProp-JGnEgg8J.js";function er(){const m=x({defaultValues:{goals:""}}),[s,n]=p.useState([]),l=m.handleSubmit(t=>{const o=t.goals||crypto.randomUUID();n(i=>Array.from(new Set([...i,o])))}),c=p.useMemo(()=>s.map(t=>{const o=()=>{n(i=>i.filter(d=>t!==d))};return r.jsxs("li",{children:[r.jsx("button",{onClick:o,children:"delete"}),t]},t)}),[s]);return r.jsx(r.Fragment,{children:r.jsxs(f,{children:[r.jsx(b,{title:"Scrollbar Component"}),r.jsx(C,{children:r.jsxs(e,{container:!0,spacing:3,children:[r.jsx(e,{item:!0,xs:12,children:r.jsx("form",{onSubmit:l,children:r.jsxs(u,{...m,children:[r.jsx(h,{name:"goals",sx:{mb:2}}),r.jsx(a,{type:"submit",variant:"contained",sx:{mr:3},children:"add"}),r.jsx(a,{type:"reset",variant:"outlined",children:"reset"})]})})}),r.jsx(e,{item:!0,xs:12,maxHeight:200,children:r.jsx(j,{children:r.jsx("ul",{children:c})})})]})})]})})}export{er as Component};
