import{q as r,_ as t,n as u,r as z,f as R,i as y,j as B}from"./index-TTh6u7Wr.js";import{a as C,g as m,s as x,B as $,c as I,b as h}from"./ButtonBase-Qpy50vo6.js";function k(o){return m("MuiIconButton",o)}const M=C("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),_=M,j=["edge","children","className","color","disabled","disableFocusRipple","size"],E=o=>{const{classes:a,disabled:s,color:e,edge:i,size:n}=o,l={root:["root",s&&"disabled",e!=="default"&&`color${r(e)}`,i&&`edge${r(i)}`,`size${r(n)}`]};return h(l,k,a)},O=x($,{name:"MuiIconButton",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:s}=o;return[a.root,s.color!=="default"&&a[`color${r(s.color)}`],s.edge&&a[`edge${r(s.edge)}`],a[`size${r(s.size)}`]]}})(({theme:o,ownerState:a})=>t({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(o.vars||o).palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!a.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.action.activeChannel} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},a.edge==="start"&&{marginLeft:a.size==="small"?-3:-12},a.edge==="end"&&{marginRight:a.size==="small"?-3:-12}),({theme:o,ownerState:a})=>{var s;const e=(s=(o.vars||o).palette)==null?void 0:s[a.color];return t({},a.color==="inherit"&&{color:"inherit"},a.color!=="inherit"&&a.color!=="default"&&t({color:e==null?void 0:e.main},!a.disableRipple&&{"&:hover":t({},e&&{backgroundColor:o.vars?`rgba(${e.mainChannel} / ${o.vars.palette.action.hoverOpacity})`:u(e.main,o.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),a.size==="small"&&{padding:5,fontSize:o.typography.pxToRem(18)},a.size==="large"&&{padding:12,fontSize:o.typography.pxToRem(28)},{[`&.${_.disabled}`]:{backgroundColor:"transparent",color:(o.vars||o).palette.action.disabled}})}),T=z.forwardRef(function(a,s){const e=R({props:a,name:"MuiIconButton"}),{edge:i=!1,children:n,className:l,color:g="default",disabled:c=!1,disableFocusRipple:d=!1,size:v="medium"}=e,b=y(e,j),p=t({},e,{edge:i,color:g,disabled:c,disableFocusRipple:d,size:v}),f=E(p);return B.jsx(O,t({className:I(f.root,l),centerRipple:!0,focusRipple:!d,disabled:c,ref:s,ownerState:p},b,{children:n}))}),N=T;export{N as I};
