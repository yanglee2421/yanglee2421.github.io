import{_ as o,r as d,k as _,m as S,j as l,x}from"./index-y-D59f-l.js";import{a as E,g as w,s as N,c as I,b as T,d as Z,u as tt}from"./TransitionGroupContext-y5PnIpQc.js";import{L}from"./ListContext-jXuE6Pjc.js";import{l as et}from"./ListItemButton-AEk6BOIR.js";import{i as st}from"./isMuiElement-8MWP4zlS.js";import{B as ot}from"./ButtonBase-I5K-Fali.js";import{i as U}from"./isHostComponent-jcd54X0C.js";function at(t){return w("MuiListItem",t)}const nt=E("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]),b=nt;function it(t){return w("MuiListItemSecondaryAction",t)}E("MuiListItemSecondaryAction",["root","disableGutters"]);const rt=["className"],ct=t=>{const{disableGutters:e,classes:s}=t;return T({root:["root",e&&"disableGutters"]},it,s)},lt=N("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:s}=t;return[e.root,s.disableGutters&&e.disableGutters]}})(({ownerState:t})=>o({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})),D=d.forwardRef(function(e,s){const a=_({props:e,name:"MuiListItemSecondaryAction"}),{className:n}=a,i=S(a,rt),p=d.useContext(L),u=o({},a,{disableGutters:p.disableGutters}),f=ct(u);return l.jsx(lt,o({className:I(f.root,n),ownerState:u,ref:s},i))});D.muiName="ListItemSecondaryAction";const dt=D,pt=["className"],ut=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],mt=(t,e)=>{const{ownerState:s}=t;return[e.root,s.dense&&e.dense,s.alignItems==="flex-start"&&e.alignItemsFlexStart,s.divider&&e.divider,!s.disableGutters&&e.gutters,!s.disablePadding&&e.padding,s.button&&e.button,s.hasSecondaryAction&&e.secondaryAction]},bt=t=>{const{alignItems:e,button:s,classes:a,dense:n,disabled:i,disableGutters:p,disablePadding:u,divider:f,hasSecondaryAction:g,selected:A}=t;return T({root:["root",n&&"dense",!p&&"gutters",!u&&"padding",f&&"divider",i&&"disabled",s&&"button",e==="flex-start"&&"alignItemsFlexStart",g&&"secondaryAction",A&&"selected"],container:["container"]},at,a)},ft=N("div",{name:"MuiListItem",slot:"Root",overridesResolver:mt})(({theme:t,ownerState:e})=>o({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!e.disablePadding&&o({paddingTop:8,paddingBottom:8},e.dense&&{paddingTop:4,paddingBottom:4},!e.disableGutters&&{paddingLeft:16,paddingRight:16},!!e.secondaryAction&&{paddingRight:48}),!!e.secondaryAction&&{[`& > .${et.root}`]:{paddingRight:48}},{[`&.${b.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${b.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:x(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${b.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:x(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${b.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},e.alignItems==="flex-start"&&{alignItems:"flex-start"},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},e.button&&{transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:x(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:x(t.palette.primary.main,t.palette.action.selectedOpacity)}}},e.hasSecondaryAction&&{paddingRight:48})),gt=N("li",{name:"MuiListItem",slot:"Container",overridesResolver:(t,e)=>e.container})({position:"relative"}),vt=d.forwardRef(function(e,s){const a=_({props:e,name:"MuiListItem"}),{alignItems:n="center",autoFocus:i=!1,button:p=!1,children:u,className:f,component:g,components:A={},componentsProps:G={},ContainerComponent:O="li",ContainerProps:{className:z}={},dense:j=!1,disabled:k=!1,disableGutters:$=!1,disablePadding:H=!1,divider:W=!1,focusVisibleClassName:Y,secondaryAction:M,selected:q=!1,slotProps:J={},slots:K={}}=a,Q=S(a.ContainerProps,pt),X=S(a,ut),h=d.useContext(L),P=d.useMemo(()=>({dense:j||h.dense||!1,alignItems:n,disableGutters:$}),[n,h.dense,j,$]),R=d.useRef(null);Z(()=>{i&&R.current&&R.current.focus()},[i]);const m=d.Children.toArray(u),B=m.length&&st(m[m.length-1],["ListItemSecondaryAction"]),y=o({},a,{alignItems:n,autoFocus:i,button:p,dense:P.dense,disabled:k,disableGutters:$,disablePadding:H,divider:W,hasSecondaryAction:B,selected:q}),V=bt(y),F=tt(R,s),C=K.root||A.Root||ft,v=J.root||G.root||{},r=o({className:I(V.root,v.className,f),disabled:k},X);let c=g||"li";return p&&(r.component=g||"div",r.focusVisibleClassName=I(b.focusVisible,Y),c=ot),B?(c=!r.component&&!g?"div":c,O==="li"&&(c==="li"?c="div":r.component==="li"&&(r.component="div")),l.jsx(L.Provider,{value:P,children:l.jsxs(gt,o({as:O,className:I(V.container,z),ref:F,ownerState:y},Q,{children:[l.jsx(C,o({},v,!U(C)&&{as:c,ownerState:o({},y,v.ownerState)},r,{children:m})),m.pop()]}))})):l.jsx(L.Provider,{value:P,children:l.jsxs(C,o({},v,{as:c,ref:F},!U(C)&&{ownerState:o({},y,v.ownerState)},r,{children:[m,M&&l.jsx(dt,{children:M})]}))})}),Pt=vt;export{Pt as L};
