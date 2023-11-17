import{j as h,r as O,_ as c,A as Fe,k as mt,m as Ee,B as tt}from"./index-4a7703be.js";import{e as Ne,h as St,g as xt,a as It,s as F,c as ge,b as Ot,u as vt}from"./ButtonBase-9c5cceda.js";import{i as ot,f as fe,A as Lt}from"./Select-ae1e6fa7.js";import{i as se,o as dt}from"./OutlinedInput-9ba50c2b.js";import{c as At}from"./createSvgIcon-2752c6cf.js";import{I as Pt}from"./IconButton-a4e324ae.js";import{M as yt}from"./Popper-2bb01623.js";import{P as Ct}from"./Paper-33c18bac.js";import{u as kt}from"./useId-d24f33f4.js";import{u as nt}from"./useControlled-9107a5e4.js";import{u as Rt}from"./usePreviousProps-90c1cc75.js";import{C as Tt}from"./Chip-812c4fac.js";const wt=At(h.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");function ft(o){return typeof o.normalize<"u"?o.normalize("NFD").replace(/[\u0300-\u036f]/g,""):o}function Dt(o={}){const{ignoreAccents:r=!0,ignoreCase:p=!0,limit:m,matchFrom:L="any",stringify:$,trim:P=!1}=o;return(g,{inputValue:_,getOptionLabel:z})=>{let A=P?_.trim():_;p&&(A=A.toLowerCase()),r&&(A=ft(A));const j=A?g.filter(oe=>{let M=($||z)(oe);return p&&(M=M.toLowerCase()),r&&(M=ft(M)),L==="start"?M.indexOf(A)===0:M.indexOf(A)>-1}):g;return typeof m=="number"?j.slice(0,m):j}}function rt(o,r){for(let p=0;p<o.length;p+=1)if(r(o[p]))return p;return-1}const Mt=Dt(),gt=5,Nt=o=>{var r;return o.current!==null&&((r=o.current.parentElement)==null?void 0:r.contains(document.activeElement))};function Et(o){const{unstable_isActiveElementInListbox:r=Nt,unstable_classNamePrefix:p="Mui",autoComplete:m=!1,autoHighlight:L=!1,autoSelect:$=!1,blurOnSelect:P=!1,clearOnBlur:g=!o.freeSolo,clearOnEscape:_=!1,componentName:z="useAutocomplete",defaultValue:A=o.multiple?[]:null,disableClearable:j=!1,disableCloseOnSelect:oe=!1,disabled:M,disabledItemsFocusable:He=!1,disableListWrap:ze=!1,filterOptions:at=Mt,filterSelectedOptions:be=!1,freeSolo:X=!1,getOptionDisabled:G,getOptionLabel:je=t=>{var e;return(e=t.label)!=null?e:t},groupBy:le,handleHomeEndKeys:Ve=!o.freeSolo,id:ne,includeInputInList:Be=!1,inputValue:st,isOptionEqualToValue:Y=(t,e)=>t===e,multiple:d=!1,onChange:he,onClose:me,onHighlightChange:$e,onInputChange:U,onOpen:Se,open:We,openOnFocus:lt=!1,options:it,readOnly:K=!1,selectOnFocus:_e=!o.freeSolo,value:xe}=o,k=kt(ne);let S=je;S=t=>{const e=je(t);return typeof e!="string"?String(e):e};const Ie=O.useRef(!1),Oe=O.useRef(!0),y=O.useRef(null),R=O.useRef(null),[ie,Ge]=O.useState(null),[w,pe]=O.useState(-1),ve=L?0:-1,v=O.useRef(ve),[s,Le]=nt({controlled:xe,default:A,name:z}),[u,Z]=nt({controlled:st,default:"",name:z,state:"inputValue"}),[q,Ae]=O.useState(!1),ue=O.useCallback((t,e)=>{if(!(d?s.length<e.length:e!==null)&&!g)return;let a;if(d)a="";else if(e==null)a="";else{const l=S(e);a=typeof l=="string"?l:""}u!==a&&(Z(a),U&&U(t,a,"reset"))},[S,u,d,U,Z,g,s]),[J,ke]=nt({controlled:We,default:!1,name:z,state:"open"}),[Ue,Re]=O.useState(!0),Te=!d&&s!=null&&u===S(s),T=J&&!K,f=T?at(it.filter(t=>!(be&&(d?s:[s]).some(e=>e!==null&&Y(t,e)))),{inputValue:Te&&Ue?"":u,getOptionLabel:S}):[],D=Rt({filteredOptions:f,value:s,inputValue:u});O.useEffect(()=>{const t=s!==D.value;q&&!t||X&&!t||ue(null,s)},[s,ue,q,D.value,X]);const Pe=J&&f.length>0&&!K,ce=Ne(t=>{t===-1?y.current.focus():ie.querySelector(`[data-tag-index="${t}"]`).focus()});O.useEffect(()=>{d&&w>s.length-1&&(pe(-1),ce(-1))},[s,d,w,ce]);function Ke(t,e){if(!R.current||t<0||t>=f.length)return-1;let n=t;for(;;){const a=R.current.querySelector(`[data-option-index="${n}"]`),l=He?!1:!a||a.disabled||a.getAttribute("aria-disabled")==="true";if(a&&a.hasAttribute("tabindex")&&!l)return n;if(e==="next"?n=(n+1)%f.length:n=(n-1+f.length)%f.length,n===t)return-1}}const N=Ne(({event:t,index:e,reason:n="auto"})=>{if(v.current=e,e===-1?y.current.removeAttribute("aria-activedescendant"):y.current.setAttribute("aria-activedescendant",`${k}-option-${e}`),$e&&$e(t,e===-1?null:f[e],n),!R.current)return;const a=R.current.querySelector(`[role="option"].${p}-focused`);a&&(a.classList.remove(`${p}-focused`),a.classList.remove(`${p}-focusVisible`));let l=R.current;if(R.current.getAttribute("role")!=="listbox"&&(l=R.current.parentElement.querySelector('[role="listbox"]')),!l)return;if(e===-1){l.scrollTop=0;return}const b=R.current.querySelector(`[data-option-index="${e}"]`);if(b&&(b.classList.add(`${p}-focused`),n==="keyboard"&&b.classList.add(`${p}-focusVisible`),l.scrollHeight>l.clientHeight&&n!=="mouse"&&n!=="touch")){const x=b,W=l.clientHeight+l.scrollTop,ct=x.offsetTop+x.offsetHeight;ct>W?l.scrollTop=ct-l.clientHeight:x.offsetTop-x.offsetHeight*(le?1.3:0)<l.scrollTop&&(l.scrollTop=x.offsetTop-x.offsetHeight*(le?1.3:0))}}),E=Ne(({event:t,diff:e,direction:n="next",reason:a="auto"})=>{if(!T)return;const b=Ke((()=>{const x=f.length-1;if(e==="reset")return ve;if(e==="start")return 0;if(e==="end")return x;const W=v.current+e;return W<0?W===-1&&Be?-1:ze&&v.current!==-1||Math.abs(e)>1?0:x:W>x?W===x+1&&Be?-1:ze||Math.abs(e)>1?x:0:W})(),n);if(N({index:b,reason:a,event:t}),m&&e!=="reset")if(b===-1)y.current.value=u;else{const x=S(f[b]);y.current.value=x,x.toLowerCase().indexOf(u.toLowerCase())===0&&u.length>0&&y.current.setSelectionRange(u.length,x.length)}}),qe=()=>{const t=(e,n)=>{const a=e?S(e):"",l=n?S(n):"";return a===l};if(v.current!==-1&&D.filteredOptions&&D.filteredOptions.length!==f.length&&D.inputValue===u&&(d?s.length===D.value.length&&D.value.every((e,n)=>S(s[n])===S(e)):t(D.value,s))){const e=D.filteredOptions[v.current];if(e&&f.some(a=>S(a)===S(e)))return!0}return!1},ee=O.useCallback(()=>{if(!T||qe())return;const t=d?s[0]:s;if(f.length===0||t==null){E({diff:"reset"});return}if(R.current){if(t!=null){const e=f[v.current];if(d&&e&&rt(s,a=>Y(e,a))!==-1)return;const n=rt(f,a=>Y(a,t));n===-1?E({diff:"reset"}):N({index:n});return}if(v.current>=f.length-1){N({index:f.length-1});return}N({index:v.current})}},[f.length,d?!1:s,be,E,N,T,u,d]),Je=Ne(t=>{St(R,t),t&&ee()});O.useEffect(()=>{ee()},[ee]);const Q=t=>{J||(ke(!0),Re(!0),Se&&Se(t))},V=(t,e)=>{J&&(ke(!1),me&&me(t,e))},B=(t,e,n,a)=>{if(d){if(s.length===e.length&&s.every((l,b)=>l===e[b]))return}else if(s===e)return;he&&he(t,e,n,a),Le(e)},te=O.useRef(!1),re=(t,e,n="selectOption",a="options")=>{let l=n,b=e;if(d){b=Array.isArray(s)?s.slice():[];const x=rt(b,W=>Y(e,W));x===-1?b.push(e):a!=="freeSolo"&&(b.splice(x,1),l="removeOption")}ue(t,b),B(t,b,l,{option:e}),!oe&&(!t||!t.ctrlKey&&!t.metaKey)&&V(t,l),(P===!0||P==="touch"&&te.current||P==="mouse"&&!te.current)&&y.current.blur()};function Qe(t,e){if(t===-1)return-1;let n=t;for(;;){if(e==="next"&&n===s.length||e==="previous"&&n===-1)return-1;const a=ie.querySelector(`[data-tag-index="${n}"]`);if(!a||!a.hasAttribute("tabindex")||a.disabled||a.getAttribute("aria-disabled")==="true")n+=e==="next"?1:-1;else return n}}const ye=(t,e)=>{if(!d)return;u===""&&V(t,"toggleInput");let n=w;w===-1?u===""&&e==="previous"&&(n=s.length-1):(n+=e==="next"?1:-1,n<0&&(n=0),n===s.length&&(n=-1)),n=Qe(n,e),pe(n),ce(n)},we=t=>{Ie.current=!0,Z(""),U&&U(t,"","clear"),B(t,d?[]:null,"clear")},Xe=t=>e=>{if(t.onKeyDown&&t.onKeyDown(e),!e.defaultMuiPrevented&&(w!==-1&&["ArrowLeft","ArrowRight"].indexOf(e.key)===-1&&(pe(-1),ce(-1)),e.which!==229))switch(e.key){case"Home":T&&Ve&&(e.preventDefault(),E({diff:"start",direction:"next",reason:"keyboard",event:e}));break;case"End":T&&Ve&&(e.preventDefault(),E({diff:"end",direction:"previous",reason:"keyboard",event:e}));break;case"PageUp":e.preventDefault(),E({diff:-gt,direction:"previous",reason:"keyboard",event:e}),Q(e);break;case"PageDown":e.preventDefault(),E({diff:gt,direction:"next",reason:"keyboard",event:e}),Q(e);break;case"ArrowDown":e.preventDefault(),E({diff:1,direction:"next",reason:"keyboard",event:e}),Q(e);break;case"ArrowUp":e.preventDefault(),E({diff:-1,direction:"previous",reason:"keyboard",event:e}),Q(e);break;case"ArrowLeft":ye(e,"previous");break;case"ArrowRight":ye(e,"next");break;case"Enter":if(v.current!==-1&&T){const n=f[v.current],a=G?G(n):!1;if(e.preventDefault(),a)return;re(e,n,"selectOption"),m&&y.current.setSelectionRange(y.current.value.length,y.current.value.length)}else X&&u!==""&&Te===!1&&(d&&e.preventDefault(),re(e,u,"createOption","freeSolo"));break;case"Escape":T?(e.preventDefault(),e.stopPropagation(),V(e,"escape")):_&&(u!==""||d&&s.length>0)&&(e.preventDefault(),e.stopPropagation(),we(e));break;case"Backspace":if(d&&!K&&u===""&&s.length>0){const n=w===-1?s.length-1:w,a=s.slice();a.splice(n,1),B(e,a,"removeOption",{option:s[n]})}break;case"Delete":if(d&&!K&&u===""&&s.length>0&&w!==-1){const n=w,a=s.slice();a.splice(n,1),B(e,a,"removeOption",{option:s[n]})}break}},Ye=t=>{Ae(!0),lt&&!Ie.current&&Q(t)},Ze=t=>{if(r(R)){y.current.focus();return}Ae(!1),Oe.current=!0,Ie.current=!1,$&&v.current!==-1&&T?re(t,f[v.current],"blur"):$&&X&&u!==""?re(t,u,"blur","freeSolo"):g&&ue(t,s),V(t,"blur")},Ce=t=>{const e=t.target.value;u!==e&&(Z(e),Re(!1),U&&U(t,e,"input")),e===""?!j&&!d&&B(t,null,"clear"):Q(t)},C=t=>{const e=Number(t.currentTarget.getAttribute("data-option-index"));v.current!==e&&N({event:t,index:e,reason:"mouse"})},I=t=>{N({event:t,index:Number(t.currentTarget.getAttribute("data-option-index")),reason:"touch"}),te.current=!0},H=t=>{const e=Number(t.currentTarget.getAttribute("data-option-index"));re(t,f[e],"selectOption"),te.current=!1},pt=t=>e=>{const n=s.slice();n.splice(t,1),B(e,n,"removeOption",{option:s[t]})},De=t=>{J?V(t,"toggleInput"):Q(t)},ut=t=>{t.currentTarget.contains(t.target)&&t.target.getAttribute("id")!==k&&t.preventDefault()},et=t=>{t.currentTarget.contains(t.target)&&(y.current.focus(),_e&&Oe.current&&y.current.selectionEnd-y.current.selectionStart===0&&y.current.select(),Oe.current=!1)},Me=t=>{!M&&(u===""||!J)&&De(t)};let ae=X&&u.length>0;ae=ae||(d?s.length>0:s!==null);let de=f;return le&&(de=f.reduce((t,e,n)=>{const a=le(e);return t.length>0&&t[t.length-1].group===a?t[t.length-1].options.push(e):t.push({key:n,index:n,group:a,options:[e]}),t},[])),M&&q&&Ze(),{getRootProps:(t={})=>c({"aria-owns":Pe?`${k}-listbox`:null},t,{onKeyDown:Xe(t),onMouseDown:ut,onClick:et}),getInputLabelProps:()=>({id:`${k}-label`,htmlFor:k}),getInputProps:()=>({id:k,value:u,onBlur:Ze,onFocus:Ye,onChange:Ce,onMouseDown:Me,"aria-activedescendant":T?"":null,"aria-autocomplete":m?"both":"list","aria-controls":Pe?`${k}-listbox`:void 0,"aria-expanded":Pe,autoComplete:"off",ref:y,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:M}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:we}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:De}),getTagProps:({index:t})=>c({key:t,"data-tag-index":t,tabIndex:-1},!K&&{onDelete:pt(t)}),getListboxProps:()=>({role:"listbox",id:`${k}-listbox`,"aria-labelledby":`${k}-label`,ref:Je,onMouseDown:t=>{t.preventDefault()}}),getOptionProps:({index:t,option:e})=>{const n=(d?s:[s]).some(l=>l!=null&&Y(e,l)),a=G?G(e):!1;return{key:S(e),tabIndex:-1,role:"option",id:`${k}-option-${t}`,onMouseMove:C,onClick:H,onTouchStart:I,"data-option-index":t,"aria-disabled":a,"aria-selected":n}},id:k,inputValue:u,value:s,dirty:ae,expanded:T&&ie,popupOpen:T,focused:q||w!==-1,anchorEl:ie,setAnchorEl:Ge,focusedTag:w,groupedOptions:de}}function Ft(o){return xt("MuiListSubheader",o)}It("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const Ht=["className","color","component","disableGutters","disableSticky","inset"],zt=o=>{const{classes:r,color:p,disableGutters:m,inset:L,disableSticky:$}=o,P={root:["root",p!=="default"&&`color${Fe(p)}`,!m&&"gutters",L&&"inset",!$&&"sticky"]};return Ot(P,Ft,r)},jt=F("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:p}=o;return[r.root,p.color!=="default"&&r[`color${Fe(p.color)}`],!p.disableGutters&&r.gutters,p.inset&&r.inset,!p.disableSticky&&r.sticky]}})(({theme:o,ownerState:r})=>c({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(o.vars||o).palette.text.secondary,fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(14)},r.color==="primary"&&{color:(o.vars||o).palette.primary.main},r.color==="inherit"&&{color:"inherit"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.inset&&{paddingLeft:72},!r.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(o.vars||o).palette.background.paper})),$t=O.forwardRef(function(r,p){const m=mt({props:r,name:"MuiListSubheader"}),{className:L,color:$="default",component:P="li",disableGutters:g=!1,disableSticky:_=!1,inset:z=!1}=m,A=Ee(m,Ht),j=c({},m,{color:$,component:P,disableGutters:g,disableSticky:_,inset:z}),oe=zt(j);return h.jsx(jt,c({as:P,className:ge(oe.root,L),ref:p,ownerState:j},A))});$t.muiSkipListHighlight=!0;const Vt=$t;function Bt(o){return xt("MuiAutocomplete",o)}const Wt=It("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]),i=Wt;var bt,ht;const _t=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],Gt=["ref"],Ut=["key"],Kt=o=>{const{classes:r,disablePortal:p,expanded:m,focused:L,fullWidth:$,hasClearIcon:P,hasPopupIcon:g,inputFocused:_,popupOpen:z,size:A}=o,j={root:["root",m&&"expanded",L&&"focused",$&&"fullWidth",P&&"hasClearIcon",g&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",_&&"inputFocused"],tag:["tag",`tagSize${Fe(A)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",z&&"popupIndicatorOpen"],popper:["popper",p&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return Ot(j,Bt,r)},qt=F("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:p}=o,{fullWidth:m,hasClearIcon:L,hasPopupIcon:$,inputFocused:P,size:g}=p;return[{[`& .${i.tag}`]:r.tag},{[`& .${i.tag}`]:r[`tagSize${Fe(g)}`]},{[`& .${i.inputRoot}`]:r.inputRoot},{[`& .${i.input}`]:r.input},{[`& .${i.input}`]:P&&r.inputFocused},r.root,m&&r.fullWidth,$&&r.hasPopupIcon,L&&r.hasClearIcon]}})(({ownerState:o})=>c({[`&.${i.focused} .${i.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${i.clearIndicator}`]:{visibility:"visible"}}},o.fullWidth&&{width:"100%"},{[`& .${i.tag}`]:c({margin:3,maxWidth:"calc(100% - 6px)"},o.size==="small"&&{margin:2,maxWidth:"calc(100% - 4px)"}),[`& .${i.inputRoot}`]:{flexWrap:"wrap",[`.${i.hasPopupIcon}&, .${i.hasClearIcon}&`]:{paddingRight:26+4},[`.${i.hasPopupIcon}.${i.hasClearIcon}&`]:{paddingRight:52+4},[`& .${i.input}`]:{width:0,minWidth:30}},[`& .${ot.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${ot.root}.${se.sizeSmall}`]:{[`& .${ot.input}`]:{padding:"2px 4px 3px 0"}},[`& .${dt.root}`]:{padding:9,[`.${i.hasPopupIcon}&, .${i.hasClearIcon}&`]:{paddingRight:26+4+9},[`.${i.hasPopupIcon}.${i.hasClearIcon}&`]:{paddingRight:52+4+9},[`& .${i.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${i.endAdornment}`]:{right:9}},[`& .${dt.root}.${se.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${i.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${fe.root}`]:{paddingTop:19,paddingLeft:8,[`.${i.hasPopupIcon}&, .${i.hasClearIcon}&`]:{paddingRight:26+4+9},[`.${i.hasPopupIcon}.${i.hasClearIcon}&`]:{paddingRight:52+4+9},[`& .${fe.input}`]:{padding:"7px 4px"},[`& .${i.endAdornment}`]:{right:9}},[`& .${fe.root}.${se.sizeSmall}`]:{paddingBottom:1,[`& .${fe.input}`]:{padding:"2.5px 4px"}},[`& .${se.hiddenLabel}`]:{paddingTop:8},[`& .${fe.root}.${se.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${i.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${fe.root}.${se.hiddenLabel}.${se.sizeSmall}`]:{[`& .${i.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${i.input}`]:c({flexGrow:1,textOverflow:"ellipsis",opacity:0},o.inputFocused&&{opacity:1})})),Jt=F("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(o,r)=>r.endAdornment})({position:"absolute",right:0,top:"calc(50% - 14px)"}),Qt=F(Pt,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(o,r)=>r.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),Xt=F(Pt,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:o},r)=>c({},r.popupIndicator,o.popupOpen&&r.popupIndicatorOpen)})(({ownerState:o})=>c({padding:2,marginRight:-2},o.popupOpen&&{transform:"rotate(180deg)"})),Yt=F(yt,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(o,r)=>{const{ownerState:p}=o;return[{[`& .${i.option}`]:r.option},r.popper,p.disablePortal&&r.popperDisablePortal]}})(({theme:o,ownerState:r})=>c({zIndex:(o.vars||o).zIndex.modal},r.disablePortal&&{position:"absolute"})),Zt=F(Ct,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(o,r)=>r.paper})(({theme:o})=>c({},o.typography.body1,{overflow:"auto"})),eo=F("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(o,r)=>r.loading})(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"})),to=F("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(o,r)=>r.noOptions})(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"})),oo=F("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(o,r)=>r.listbox})(({theme:o})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${i.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[o.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${i.focused}`]:{backgroundColor:(o.vars||o).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(o.vars||o).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${i.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:tt(o.palette.primary.main,o.palette.action.selectedOpacity),[`&.${i.focused}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:tt(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(o.vars||o).palette.action.selected}},[`&.${i.focusVisible}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.focusOpacity}))`:tt(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}}}})),no=F(Vt,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(o,r)=>r.groupLabel})(({theme:o})=>({backgroundColor:(o.vars||o).palette.background.paper,top:-8})),ro=F("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(o,r)=>r.groupUl})({padding:0,[`& .${i.option}`]:{paddingLeft:24}}),ao=O.forwardRef(function(r,p){var m,L,$,P;const g=mt({props:r,name:"MuiAutocomplete"}),{autoComplete:_=!1,autoHighlight:z=!1,autoSelect:A=!1,blurOnSelect:j=!1,ChipProps:oe,className:M,clearIcon:He=bt||(bt=h.jsx(wt,{fontSize:"small"})),clearOnBlur:ze=!g.freeSolo,clearOnEscape:at=!1,clearText:be="Clear",closeText:X="Close",componentsProps:G={},defaultValue:je=g.multiple?[]:null,disableClearable:le=!1,disableCloseOnSelect:Ve=!1,disabled:ne=!1,disabledItemsFocusable:Be=!1,disableListWrap:st=!1,disablePortal:Y=!1,filterSelectedOptions:d=!1,forcePopupIcon:he="auto",freeSolo:me=!1,fullWidth:$e=!1,getLimitTagsText:U=n=>`+${n}`,getOptionLabel:Se,groupBy:We,handleHomeEndKeys:lt=!g.freeSolo,includeInputInList:it=!1,limitTags:K=-1,ListboxComponent:_e="ul",ListboxProps:xe,loading:k=!1,loadingText:S="Loading…",multiple:Ie=!1,noOptionsText:Oe="No options",openOnFocus:y=!1,openText:R="Open",PaperComponent:ie=Ct,PopperComponent:Ge=yt,popupIcon:w=ht||(ht=h.jsx(Lt,{})),readOnly:pe=!1,renderGroup:ve,renderInput:v,renderOption:s,renderTags:Le,selectOnFocus:u=!g.freeSolo,size:Z="medium",slotProps:q={}}=g,Ae=Ee(g,_t),{getRootProps:ue,getInputProps:J,getInputLabelProps:ke,getPopupIndicatorProps:Ue,getClearProps:Re,getTagProps:Te,getListboxProps:T,getOptionProps:f,value:D,dirty:Pe,expanded:ce,id:Ke,popupOpen:N,focused:E,focusedTag:qe,anchorEl:ee,setAnchorEl:Je,inputValue:Q,groupedOptions:V}=Et(c({},g,{componentName:"Autocomplete"})),B=!le&&!ne&&Pe&&!pe,te=(!me||he===!0)&&he!==!1,{onMouseDown:re}=J(),{ref:Qe}=xe??{},ye=T(),{ref:we}=ye,Xe=Ee(ye,Gt),Ye=vt(we,Qe),Ce=Se||(n=>{var a;return(a=n.label)!=null?a:n}),C=c({},g,{disablePortal:Y,expanded:ce,focused:E,fullWidth:$e,getOptionLabel:Ce,hasClearIcon:B,hasPopupIcon:te,inputFocused:qe===-1,popupOpen:N,size:Z}),I=Kt(C);let H;if(Ie&&D.length>0){const n=a=>c({className:I.tag,disabled:ne},Te(a));Le?H=Le(D,n,C):H=D.map((a,l)=>h.jsx(Tt,c({label:Ce(a),size:Z},n({index:l}),oe)))}if(K>-1&&Array.isArray(H)){const n=H.length-K;!E&&n>0&&(H=H.splice(0,K),H.push(h.jsx("span",{className:I.tag,children:U(n)},H.length)))}const De=ve||(n=>h.jsxs("li",{children:[h.jsx(no,{className:I.groupLabel,ownerState:C,component:"div",children:n.group}),h.jsx(ro,{className:I.groupUl,ownerState:C,children:n.children})]},n.key)),et=s||((n,a)=>{const{key:l}=n,b=Ee(n,Ut);return h.jsx("li",c({},b,{children:Ce(a)}),l)}),Me=(n,a)=>{const l=f({option:n,index:a});return et(c({},l,{className:I.option}),n,{selected:l["aria-selected"],index:a,inputValue:Q},C)},ae=(m=q.clearIndicator)!=null?m:G.clearIndicator,de=(L=q.paper)!=null?L:G.paper,t=($=q.popper)!=null?$:G.popper,e=(P=q.popupIndicator)!=null?P:G.popupIndicator;return h.jsxs(O.Fragment,{children:[h.jsx(qt,c({ref:p,className:ge(I.root,M),ownerState:C},ue(Ae),{children:v({id:Ke,disabled:ne,fullWidth:!0,size:Z==="small"?"small":void 0,InputLabelProps:ke(),InputProps:c({ref:Je,className:I.inputRoot,startAdornment:H,onClick:n=>{n.target===n.currentTarget&&re(n)}},(B||te)&&{endAdornment:h.jsxs(Jt,{className:I.endAdornment,ownerState:C,children:[B?h.jsx(Qt,c({},Re(),{"aria-label":be,title:be,ownerState:C},ae,{className:ge(I.clearIndicator,ae==null?void 0:ae.className),children:He})):null,te?h.jsx(Xt,c({},Ue(),{disabled:ne,"aria-label":N?X:R,title:N?X:R,ownerState:C},e,{className:ge(I.popupIndicator,e==null?void 0:e.className),children:w})):null]})}),inputProps:c({className:I.input,disabled:ne,readOnly:pe},J())})})),ee?h.jsx(Yt,c({as:Ge,disablePortal:Y,style:{width:ee?ee.clientWidth:null},ownerState:C,role:"presentation",anchorEl:ee,open:N},t,{className:ge(I.popper,t==null?void 0:t.className),children:h.jsxs(Zt,c({ownerState:C,as:ie},de,{className:ge(I.paper,de==null?void 0:de.className),children:[k&&V.length===0?h.jsx(eo,{className:I.loading,ownerState:C,children:S}):null,V.length===0&&!me&&!k?h.jsx(to,{className:I.noOptions,ownerState:C,role:"presentation",onMouseDown:n=>{n.preventDefault()},children:Oe}):null,V.length>0?h.jsx(oo,c({as:_e,className:I.listbox,ownerState:C},Xe,xe,{ref:Ye,children:V.map((n,a)=>We?De({key:n.key,group:n.group,children:n.options.map((l,b)=>Me(l,n.index+b))}):Me(n,a))})):null]}))})):null]})}),Io=ao;export{Io as A,Dt as c};