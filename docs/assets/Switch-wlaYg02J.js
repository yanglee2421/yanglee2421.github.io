import{w as r,_ as i,x as w,F as $,E as x,r as m,k as S,m as f,j as n}from"./index-y-D59f-l.js";import{a as C,g as y,s as d,c as z,b as R}from"./TransitionGroupContext-y5PnIpQc.js";import{S as B}from"./SwitchBase-bYSMwn7K.js";function j(a){return y("MuiSwitch",a)}const M=C("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),t=M,T=["className","color","edge","size","sx"],N=a=>{const{classes:o,edge:s,size:e,color:p,checked:u,disabled:h}=a,g={root:["root",s&&`edge${r(s)}`,`size${r(e)}`],switchBase:["switchBase",`color${r(p)}`,u&&"checked",h&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},v=R(g,j,o);return i({},o,v)},E=d("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(a,o)=>{const{ownerState:s}=a;return[o.root,s.edge&&o[`edge${r(s.edge)}`],o[`size${r(s.size)}`]]}})(({ownerState:a})=>i({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},a.edge==="start"&&{marginLeft:-8},a.edge==="end"&&{marginRight:-8},a.size==="small"&&{width:40,height:24,padding:7,[`& .${t.thumb}`]:{width:16,height:16},[`& .${t.switchBase}`]:{padding:4,[`&.${t.checked}`]:{transform:"translateX(16px)"}}})),I=d(B,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(a,o)=>{const{ownerState:s}=a;return[o.switchBase,{[`& .${t.input}`]:o.input},s.color!=="default"&&o[`color${r(s.color)}`]]}})(({theme:a})=>({position:"absolute",top:0,left:0,zIndex:1,color:a.vars?a.vars.palette.Switch.defaultColor:`${a.palette.mode==="light"?a.palette.common.white:a.palette.grey[300]}`,transition:a.transitions.create(["left","transform"],{duration:a.transitions.duration.shortest}),[`&.${t.checked}`]:{transform:"translateX(20px)"},[`&.${t.disabled}`]:{color:a.vars?a.vars.palette.Switch.defaultDisabledColor:`${a.palette.mode==="light"?a.palette.grey[100]:a.palette.grey[600]}`},[`&.${t.checked} + .${t.track}`]:{opacity:.5},[`&.${t.disabled} + .${t.track}`]:{opacity:a.vars?a.vars.opacity.switchTrackDisabled:`${a.palette.mode==="light"?.12:.2}`},[`& .${t.input}`]:{left:"-100%",width:"300%"}}),({theme:a,ownerState:o})=>i({"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette.action.activeChannel} / ${a.vars.palette.action.hoverOpacity})`:w(a.palette.action.active,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${t.checked}`]:{color:(a.vars||a).palette[o.color].main,"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / ${a.vars.palette.action.hoverOpacity})`:w(a.palette[o.color].main,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${t.disabled}`]:{color:a.vars?a.vars.palette.Switch[`${o.color}DisabledColor`]:`${a.palette.mode==="light"?$(a.palette[o.color].main,.62):x(a.palette[o.color].main,.55)}`}},[`&.${t.checked} + .${t.track}`]:{backgroundColor:(a.vars||a).palette[o.color].main}})),O=d("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(a,o)=>o.track})(({theme:a})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:a.transitions.create(["opacity","background-color"],{duration:a.transitions.duration.shortest}),backgroundColor:a.vars?a.vars.palette.common.onBackground:`${a.palette.mode==="light"?a.palette.common.black:a.palette.common.white}`,opacity:a.vars?a.vars.opacity.switchTrack:`${a.palette.mode==="light"?.38:.3}`})),U=d("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(a,o)=>o.thumb})(({theme:a})=>({boxShadow:(a.vars||a).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"})),_=m.forwardRef(function(o,s){const e=S({props:o,name:"MuiSwitch"}),{className:p,color:u="primary",edge:h=!1,size:g="medium",sx:v}=e,k=f(e,T),c=i({},e,{color:u,edge:h,size:g}),l=N(c),b=n.jsx(U,{className:l.thumb,ownerState:c});return n.jsxs(E,{className:z(l.root,p),sx:v,ownerState:c,children:[n.jsx(I,i({type:"checkbox",icon:b,checkedIcon:b,ref:s,ownerState:c},k,{classes:i({},l,{root:l.switchBase})})),n.jsx(O,{className:l.track,ownerState:c})]})}),L=_;export{L as S,t as s};
