import{q as R,_ as p,r as x,f as S,i as E,j as m}from"./index-TTh6u7Wr.js";import{a as U,g as A,s as $,c as v,b as D}from"./ButtonBase-Qpy50vo6.js";import{f as w}from"./OutlinedInput-qbl84Z5r.js";import{u as W}from"./useFormControl-6e_5MtfC.js";import{T as F}from"./Typography-adl__cJu.js";import{S as z}from"./Stack-AIRYaIAH.js";function B(e){return A("MuiFormControlLabel",e)}const H=U("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),t=H,I=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],G=e=>{const{classes:o,disabled:l,labelPlacement:n,error:a,required:r}=e,d={root:["root",l&&"disabled",`labelPlacement${R(n)}`,a&&"error",r&&"required"],label:["label",l&&"disabled"],asterisk:["asterisk",a&&"error"]};return D(d,B,o)},J=$("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:l}=e;return[{[`& .${t.label}`]:o.label},o.root,o[`labelPlacement${R(l.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>p({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${t.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${t.label}`]:{[`&.${t.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),K=$("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${t.error}`]:{color:(e.vars||e).palette.error.main}})),O=x.forwardRef(function(o,l){var n,a;const r=S({props:o,name:"MuiFormControlLabel"}),{className:d,componentsProps:k={},control:i,disabled:P,disableTypography:q,label:j,labelPlacement:T="end",required:h,slotProps:N={}}=r,_=E(r,I),b=W(),y=(n=P??i.props.disabled)!=null?n:b==null?void 0:b.disabled,u=h??i.props.required,L={disabled:y,required:u};["checked","name","onChange","value","inputRef"].forEach(c=>{typeof i.props[c]>"u"&&typeof r[c]<"u"&&(L[c]=r[c])});const M=w({props:r,muiFormControl:b,states:["error"]}),f=p({},r,{disabled:y,labelPlacement:T,required:u,error:M.error}),C=G(f),g=(a=N.typography)!=null?a:k.typography;let s=j;return s!=null&&s.type!==F&&!q&&(s=m.jsx(F,p({component:"span"},g,{className:v(C.label,g==null?void 0:g.className),children:s}))),m.jsxs(J,p({className:v(C.root,d),ownerState:f,ref:l},_,{children:[x.cloneElement(i,L),u?m.jsxs(z,{display:"block",children:[s,m.jsxs(K,{ownerState:f,"aria-hidden":!0,className:C.asterisk,children:[" ","*"]})]}):s]}))}),oe=O;export{oe as F};
