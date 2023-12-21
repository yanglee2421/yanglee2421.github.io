import{j as S,q as Le,y as ye,z as be,_ as T,r as N,f as ct,i as _e}from"./index-TTh6u7Wr.js";import{a as ut,g as dt,s as M,c as ft,b as pt}from"./ButtonBase-Qpy50vo6.js";import{c as L}from"./createSvgIcon-PprR8B37.js";import{C as ht}from"./Autocomplete-5Cwn_KXi.js";import{P as mt}from"./Paper--A8AC-BD.js";import{I as yt}from"./IconButton-TIkL0xmx.js";import{u as bt,b as wt,c as St,g as Et,i as we}from"./DataGrid-cTuv60Tg.js";import{T as Rt}from"./TextField-2W1S6_Nl.js";import{d as At}from"./ownerWindow-LT9-6hbI.js";function gt(e){return dt("MuiAlert",e)}const xt=ut("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),Se=xt,Ot=L(S.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),Ct=L(S.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),Tt=L(S.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),Pt=L(S.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),Ft=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],Nt=e=>{const{variant:t,color:n,severity:r,classes:s}=e,o={root:["root",`${t}${Le(n||r)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return pt(o,gt,s)},kt=M(mt,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${Le(n.color||n.severity)}`]]}})(({theme:e,ownerState:t})=>{const n=e.palette.mode==="light"?ye:be,r=e.palette.mode==="light"?be:ye,s=t.color||t.severity;return T({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&t.variant==="standard"&&{color:e.vars?e.vars.palette.Alert[`${s}Color`]:n(e.palette[s].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${s}StandardBg`]:r(e.palette[s].light,.9),[`& .${Se.icon}`]:e.vars?{color:e.vars.palette.Alert[`${s}IconColor`]}:{color:e.palette[s].main}},s&&t.variant==="outlined"&&{color:e.vars?e.vars.palette.Alert[`${s}Color`]:n(e.palette[s].light,.6),border:`1px solid ${(e.vars||e).palette[s].light}`,[`& .${Se.icon}`]:e.vars?{color:e.vars.palette.Alert[`${s}IconColor`]}:{color:e.palette[s].main}},s&&t.variant==="filled"&&T({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${s}FilledColor`],backgroundColor:e.vars.palette.Alert[`${s}FilledBg`]}:{backgroundColor:e.palette.mode==="dark"?e.palette[s].dark:e.palette[s].main,color:e.palette.getContrastText(e.palette[s].main)}))}),vt=M("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Lt=M("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),Ee=M("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),Re={success:S.jsx(Ot,{fontSize:"inherit"}),warning:S.jsx(Ct,{fontSize:"inherit"}),error:S.jsx(Tt,{fontSize:"inherit"}),info:S.jsx(Pt,{fontSize:"inherit"})},_t=N.forwardRef(function(t,n){var r,s,o,i,l,h;const p=ct({props:t,name:"MuiAlert"}),{action:u,children:c,className:b,closeText:E="Close",color:d,components:f={},componentsProps:w={},icon:y,iconMapping:A=Re,onClose:x,role:X="alert",severity:Z="success",slotProps:he={},slots:me={},variant:rt="standard"}=p,st=_e(p,Ft),k=T({},p,{color:d,severity:Z,variant:rt}),B=Nt(k),ot=(r=(s=me.closeButton)!=null?s:f.CloseButton)!=null?r:yt,it=(o=(i=me.closeIcon)!=null?i:f.CloseIcon)!=null?o:ht,at=(l=he.closeButton)!=null?l:w.closeButton,lt=(h=he.closeIcon)!=null?h:w.closeIcon;return S.jsxs(kt,T({role:X,elevation:0,ownerState:k,className:ft(B.root,b),ref:n},st,{children:[y!==!1?S.jsx(vt,{ownerState:k,className:B.icon,children:y||A[Z]||Re[Z]}):null,S.jsx(Lt,{ownerState:k,className:B.message,children:c}),u!=null?S.jsx(Ee,{ownerState:k,className:B.action,children:u}):null,u==null&&x?S.jsx(Ee,{ownerState:k,className:B.action,children:S.jsx(ot,T({size:"small","aria-label":E,title:E,color:"inherit",onClick:x},at,{children:S.jsx(it,T({fontSize:"small"},lt))}))}):null]}))}),hr=_t,mr=L(S.jsx("path",{d:"M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"}),"CalendarMonthOutlined"),yr=L(S.jsx("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"RefreshOutlined"),Bt=["quickFilterParser","quickFilterFormatter","debounceMs"],jt=M(Rt,{name:"MuiDataGrid",slot:"ToolbarQuickFilter",overridesResolver:(e,t)=>t.toolbarQuickFilter})(({theme:e})=>({width:"auto",paddingBottom:e.spacing(.5),"& input":{marginLeft:e.spacing(.5)},"& .MuiInput-underline:before":{borderBottom:`1px solid ${(e.vars||e).palette.divider}`},"& input[type=search]::-ms-clear,\n& input[type=search]::-ms-reveal":{display:"none",width:0,height:0},'& input[type="search"]::-webkit-search-decoration,\n  & input[type="search"]::-webkit-search-cancel-button,\n  & input[type="search"]::-webkit-search-results-button,\n  & input[type="search"]::-webkit-search-results-decoration':{display:"none"}})),It=e=>e.split(" ").filter(t=>t!==""),Mt=e=>e.join(" ");function br(e){var t,n;const r=bt(),s=wt(),o=St(r,Et),{quickFilterParser:i=It,quickFilterFormatter:l=Mt,debounceMs:h=s.filterDebounceMs}=e,p=_e(e,Bt),[u,c]=N.useState(()=>l(o??[])),b=N.useRef(o);N.useEffect(()=>{we(b.current,o)||(b.current=o,c(y=>we(i(y),o)?y:l(o??[])))},[o,l,i]);const E=N.useCallback(y=>{const A=i(y);b.current=A,r.current.setQuickFilterValues(A)},[r,i]),d=N.useMemo(()=>At(E,h),[E,h]),f=N.useCallback(y=>{const A=y.target.value;c(A),d(A)},[d]),w=N.useCallback(()=>{c(""),E("")},[E]);return S.jsx(jt,T({as:s.slots.baseTextField,ownerState:s,variant:"standard",value:u,onChange:f,placeholder:r.current.getLocaleText("toolbarQuickFilterPlaceholder"),"aria-label":r.current.getLocaleText("toolbarQuickFilterLabel"),type:"search"},p,{InputProps:T({startAdornment:S.jsx(s.slots.quickFilterIcon,{fontSize:"small"}),endAdornment:S.jsx(s.slots.baseIconButton,T({"aria-label":r.current.getLocaleText("toolbarQuickFilterDeleteIconLabel"),size:"small",sx:{visibility:u?"visible":"hidden"},onClick:w},(t=s.slotProps)==null?void 0:t.baseIconButton,{children:S.jsx(s.slots.quickFilterClearIcon,{fontSize:"small"})}))},p.InputProps)},(n=s.slotProps)==null?void 0:n.baseTextField))}function Be(e,t){return function(){return e.apply(t,arguments)}}const{toString:Dt}=Object.prototype,{getPrototypeOf:le}=Object,J=(e=>t=>{const n=Dt.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),C=e=>(e=e.toLowerCase(),t=>J(t)===e),W=e=>t=>typeof t===e,{isArray:_}=Array,I=W("undefined");function Ut(e){return e!==null&&!I(e)&&e.constructor!==null&&!I(e.constructor)&&g(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const je=C("ArrayBuffer");function zt(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&je(e.buffer),t}const Ht=W("string"),g=W("function"),Ie=W("number"),Q=e=>e!==null&&typeof e=="object",$t=e=>e===!0||e===!1,H=e=>{if(J(e)!=="object")return!1;const t=le(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Vt=C("Date"),qt=C("File"),Jt=C("Blob"),Wt=C("FileList"),Qt=e=>Q(e)&&g(e.pipe),Gt=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||g(e.append)&&((t=J(e))==="formdata"||t==="object"&&g(e.toString)&&e.toString()==="[object FormData]"))},Kt=C("URLSearchParams"),Xt=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function D(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),_(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let l;for(r=0;r<i;r++)l=o[r],t.call(null,e[l],l,e)}}function Me(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const De=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Ue=e=>!I(e)&&e!==De;function re(){const{caseless:e}=Ue(this)&&this||{},t={},n=(r,s)=>{const o=e&&Me(t,s)||s;H(t[o])&&H(r)?t[o]=re(t[o],r):H(r)?t[o]=re({},r):_(r)?t[o]=r.slice():t[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&D(arguments[r],n);return t}const Zt=(e,t,n,{allOwnKeys:r}={})=>(D(t,(s,o)=>{n&&g(s)?e[o]=Be(s,n):e[o]=s},{allOwnKeys:r}),e),Yt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),en=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},tn=(e,t,n,r)=>{let s,o,i;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!r||r(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=n!==!1&&le(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},nn=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},rn=e=>{if(!e)return null;if(_(e))return e;let t=e.length;if(!Ie(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},sn=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&le(Uint8Array)),on=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=r.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},an=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},ln=C("HTMLFormElement"),cn=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),Ae=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),un=C("RegExp"),ze=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};D(n,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(r[o]=i||s)}),Object.defineProperties(e,r)},dn=e=>{ze(e,(t,n)=>{if(g(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(g(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},fn=(e,t)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return _(e)?r(e):r(String(e).split(t)),n},pn=()=>{},hn=(e,t)=>(e=+e,Number.isFinite(e)?e:t),Y="abcdefghijklmnopqrstuvwxyz",ge="0123456789",He={DIGIT:ge,ALPHA:Y,ALPHA_DIGIT:Y+Y.toUpperCase()+ge},mn=(e=16,t=He.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function yn(e){return!!(e&&g(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const bn=e=>{const t=new Array(10),n=(r,s)=>{if(Q(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[s]=r;const o=_(r)?[]:{};return D(r,(i,l)=>{const h=n(i,s+1);!I(h)&&(o[l]=h)}),t[s]=void 0,o}}return r};return n(e,0)},wn=C("AsyncFunction"),Sn=e=>e&&(Q(e)||g(e))&&g(e.then)&&g(e.catch),a={isArray:_,isArrayBuffer:je,isBuffer:Ut,isFormData:Gt,isArrayBufferView:zt,isString:Ht,isNumber:Ie,isBoolean:$t,isObject:Q,isPlainObject:H,isUndefined:I,isDate:Vt,isFile:qt,isBlob:Jt,isRegExp:un,isFunction:g,isStream:Qt,isURLSearchParams:Kt,isTypedArray:sn,isFileList:Wt,forEach:D,merge:re,extend:Zt,trim:Xt,stripBOM:Yt,inherits:en,toFlatObject:tn,kindOf:J,kindOfTest:C,endsWith:nn,toArray:rn,forEachEntry:on,matchAll:an,isHTMLForm:ln,hasOwnProperty:Ae,hasOwnProp:Ae,reduceDescriptors:ze,freezeMethods:dn,toObjectSet:fn,toCamelCase:cn,noop:pn,toFiniteNumber:hn,findKey:Me,global:De,isContextDefined:Ue,ALPHABET:He,generateString:mn,isSpecCompliantForm:yn,toJSONObject:bn,isAsyncFn:wn,isThenable:Sn};function m(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}a.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const $e=m.prototype,Ve={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ve[e]={value:e}});Object.defineProperties(m,Ve);Object.defineProperty($e,"isAxiosError",{value:!0});m.from=(e,t,n,r,s,o)=>{const i=Object.create($e);return a.toFlatObject(e,i,function(h){return h!==Error.prototype},l=>l!=="isAxiosError"),m.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};const En=null;function se(e){return a.isPlainObject(e)||a.isArray(e)}function qe(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function xe(e,t,n){return e?e.concat(t).map(function(s,o){return s=qe(s),!n&&o?"["+s+"]":s}).join(n?".":""):t}function Rn(e){return a.isArray(e)&&!e.some(se)}const An=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function G(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(f,w){return!a.isUndefined(w[f])});const r=n.metaTokens,s=n.visitor||u,o=n.dots,i=n.indexes,h=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function p(d){if(d===null)return"";if(a.isDate(d))return d.toISOString();if(!h&&a.isBlob(d))throw new m("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(d)||a.isTypedArray(d)?h&&typeof Blob=="function"?new Blob([d]):Buffer.from(d):d}function u(d,f,w){let y=d;if(d&&!w&&typeof d=="object"){if(a.endsWith(f,"{}"))f=r?f:f.slice(0,-2),d=JSON.stringify(d);else if(a.isArray(d)&&Rn(d)||(a.isFileList(d)||a.endsWith(f,"[]"))&&(y=a.toArray(d)))return f=qe(f),y.forEach(function(x,X){!(a.isUndefined(x)||x===null)&&t.append(i===!0?xe([f],X,o):i===null?f:f+"[]",p(x))}),!1}return se(d)?!0:(t.append(xe(w,f,o),p(d)),!1)}const c=[],b=Object.assign(An,{defaultVisitor:u,convertValue:p,isVisitable:se});function E(d,f){if(!a.isUndefined(d)){if(c.indexOf(d)!==-1)throw Error("Circular reference detected in "+f.join("."));c.push(d),a.forEach(d,function(y,A){(!(a.isUndefined(y)||y===null)&&s.call(t,y,a.isString(A)?A.trim():A,f,b))===!0&&E(y,f?f.concat(A):[A])}),c.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return E(e),t}function Oe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ce(e,t){this._pairs=[],e&&G(e,this,t)}const Je=ce.prototype;Je.append=function(t,n){this._pairs.push([t,n])};Je.toString=function(t){const n=t?function(r){return t.call(this,r,Oe)}:Oe;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function gn(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function We(e,t,n){if(!t)return e;const r=n&&n.encode||gn,s=n&&n.serialize;let o;if(s?o=s(t,n):o=a.isURLSearchParams(t)?t.toString():new ce(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class xn{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Ce=xn,Qe={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},On=typeof URLSearchParams<"u"?URLSearchParams:ce,Cn=typeof FormData<"u"?FormData:null,Tn=typeof Blob<"u"?Blob:null,Pn={isBrowser:!0,classes:{URLSearchParams:On,FormData:Cn,Blob:Tn},protocols:["http","https","file","blob","url","data"]},Ge=typeof window<"u"&&typeof document<"u",Fn=(e=>Ge&&["ReactNative","NativeScript","NS"].indexOf(e)<0)(typeof navigator<"u"&&navigator.product),Nn=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",kn=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Ge,hasStandardBrowserEnv:Fn,hasStandardBrowserWebWorkerEnv:Nn},Symbol.toStringTag,{value:"Module"})),O={...kn,...Pn};function vn(e,t){return G(e,new O.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return O.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function Ln(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function _n(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}function Ke(e){function t(n,r,s,o){let i=n[o++];const l=Number.isFinite(+i),h=o>=n.length;return i=!i&&a.isArray(s)?s.length:i,h?(a.hasOwnProp(s,i)?s[i]=[s[i],r]:s[i]=r,!l):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],o)&&a.isArray(s[i])&&(s[i]=_n(s[i])),!l)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,s)=>{t(Ln(r),s,n,0)}),n}return null}function Bn(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const ue={transitional:Qe,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s&&s?JSON.stringify(Ke(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return vn(t,this.formSerializer).toString();if((l=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const h=this.env&&this.env.FormData;return G(l?{"files[]":t}:t,h&&new h,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),Bn(t)):t}],transformResponse:[function(t){const n=this.transitional||ue.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(t&&a.isString(t)&&(r&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(l){if(i)throw l.name==="SyntaxError"?m.from(l,m.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{ue.headers[e]={}});const de=ue,jn=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),In=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&jn[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Te=Symbol("internals");function j(e){return e&&String(e).trim().toLowerCase()}function $(e){return e===!1||e==null?e:a.isArray(e)?e.map($):String(e)}function Mn(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Dn=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ee(e,t,n,r,s){if(a.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function Un(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function zn(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,o,i){return this[r].call(this,t,s,o,i)},configurable:!0})})}class K{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function o(l,h,p){const u=j(h);if(!u)throw new Error("header name must be a non-empty string");const c=a.findKey(s,u);(!c||s[c]===void 0||p===!0||p===void 0&&s[c]!==!1)&&(s[c||h]=$(l))}const i=(l,h)=>a.forEach(l,(p,u)=>o(p,u,h));return a.isPlainObject(t)||t instanceof this.constructor?i(t,n):a.isString(t)&&(t=t.trim())&&!Dn(t)?i(In(t),n):t!=null&&o(n,t,r),this}get(t,n){if(t=j(t),t){const r=a.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return Mn(s);if(a.isFunction(n))return n.call(this,s,r);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=j(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||ee(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function o(i){if(i=j(i),i){const l=a.findKey(r,i);l&&(!n||ee(r,r[l],l,n))&&(delete r[l],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!t||ee(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const n=this,r={};return a.forEach(this,(s,o)=>{const i=a.findKey(r,o);if(i){n[i]=$(s),delete n[o];return}const l=t?Un(o):String(o).trim();l!==o&&delete n[o],n[l]=$(s),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Te]=this[Te]={accessors:{}}).accessors,s=this.prototype;function o(i){const l=j(i);r[l]||(zn(s,i),r[l]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}}K.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(K.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});a.freezeMethods(K);const P=K;function te(e,t){const n=this||de,r=t||n,s=P.from(r.headers);let o=r.data;return a.forEach(e,function(l){o=l.call(n,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Xe(e){return!!(e&&e.__CANCEL__)}function U(e,t,n){m.call(this,e??"canceled",m.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(U,m,{__CANCEL__:!0});function Hn(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const $n=O.hasStandardBrowserEnv?{write(e,t,n,r,s,o){const i=[e+"="+encodeURIComponent(t)];a.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),a.isString(r)&&i.push("path="+r),a.isString(s)&&i.push("domain="+s),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Vn(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function qn(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Ze(e,t){return e&&!Vn(t)?qn(e,t):t}const Jn=O.hasStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(o){let i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(i){const l=a.isString(i)?s(i):i;return l.protocol===r.protocol&&l.host===r.host}}():function(){return function(){return!0}}();function Wn(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Qn(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(h){const p=Date.now(),u=r[o];i||(i=p),n[s]=h,r[s]=p;let c=o,b=0;for(;c!==s;)b+=n[c++],c=c%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),p-i<t)return;const E=u&&p-u;return E?Math.round(b*1e3/E):void 0}}function Pe(e,t){let n=0;const r=Qn(50,250);return s=>{const o=s.loaded,i=s.lengthComputable?s.total:void 0,l=o-n,h=r(l),p=o<=i;n=o;const u={loaded:o,total:i,progress:i?o/i:void 0,bytes:l,rate:h||void 0,estimated:h&&i&&p?(i-o)/h:void 0,event:s};u[t?"download":"upload"]=!0,e(u)}}const Gn=typeof XMLHttpRequest<"u",Kn=Gn&&function(e){return new Promise(function(n,r){let s=e.data;const o=P.from(e.headers).normalize();let{responseType:i,withXSRFToken:l}=e,h;function p(){e.cancelToken&&e.cancelToken.unsubscribe(h),e.signal&&e.signal.removeEventListener("abort",h)}let u;if(a.isFormData(s)){if(O.hasStandardBrowserEnv||O.hasStandardBrowserWebWorkerEnv)o.setContentType(!1);else if((u=o.getContentType())!==!1){const[f,...w]=u?u.split(";").map(y=>y.trim()).filter(Boolean):[];o.setContentType([f||"multipart/form-data",...w].join("; "))}}let c=new XMLHttpRequest;if(e.auth){const f=e.auth.username||"",w=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(f+":"+w))}const b=Ze(e.baseURL,e.url);c.open(e.method.toUpperCase(),We(b,e.params,e.paramsSerializer),!0),c.timeout=e.timeout;function E(){if(!c)return;const f=P.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),y={data:!i||i==="text"||i==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:f,config:e,request:c};Hn(function(x){n(x),p()},function(x){r(x),p()},y),c=null}if("onloadend"in c?c.onloadend=E:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(E)},c.onabort=function(){c&&(r(new m("Request aborted",m.ECONNABORTED,e,c)),c=null)},c.onerror=function(){r(new m("Network Error",m.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let w=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const y=e.transitional||Qe;e.timeoutErrorMessage&&(w=e.timeoutErrorMessage),r(new m(w,y.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,c)),c=null},O.hasStandardBrowserEnv&&(l&&a.isFunction(l)&&(l=l(e)),l||l!==!1&&Jn(b))){const f=e.xsrfHeaderName&&e.xsrfCookieName&&$n.read(e.xsrfCookieName);f&&o.set(e.xsrfHeaderName,f)}s===void 0&&o.setContentType(null),"setRequestHeader"in c&&a.forEach(o.toJSON(),function(w,y){c.setRequestHeader(y,w)}),a.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),i&&i!=="json"&&(c.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&c.addEventListener("progress",Pe(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",Pe(e.onUploadProgress)),(e.cancelToken||e.signal)&&(h=f=>{c&&(r(!f||f.type?new U(null,e,c):f),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(h),e.signal&&(e.signal.aborted?h():e.signal.addEventListener("abort",h)));const d=Wn(b);if(d&&O.protocols.indexOf(d)===-1){r(new m("Unsupported protocol "+d+":",m.ERR_BAD_REQUEST,e));return}c.send(s||null)})},oe={http:En,xhr:Kn};a.forEach(oe,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Fe=e=>`- ${e}`,Xn=e=>a.isFunction(e)||e===null||e===!1,Ye={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;const s={};for(let o=0;o<t;o++){n=e[o];let i;if(r=n,!Xn(n)&&(r=oe[(i=String(n)).toLowerCase()],r===void 0))throw new m(`Unknown adapter '${i}'`);if(r)break;s[i||"#"+o]=r}if(!r){const o=Object.entries(s).map(([l,h])=>`adapter ${l} `+(h===!1?"is not supported by the environment":"is not available in the build"));let i=t?o.length>1?`since :
`+o.map(Fe).join(`
`):" "+Fe(o[0]):"as no adapter specified";throw new m("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r},adapters:oe};function ne(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new U(null,e)}function Ne(e){return ne(e),e.headers=P.from(e.headers),e.data=te.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ye.getAdapter(e.adapter||de.adapter)(e).then(function(r){return ne(e),r.data=te.call(e,e.transformResponse,r),r.headers=P.from(r.headers),r},function(r){return Xe(r)||(ne(e),r&&r.response&&(r.response.data=te.call(e,e.transformResponse,r.response),r.response.headers=P.from(r.response.headers))),Promise.reject(r)})}const ke=e=>e instanceof P?e.toJSON():e;function v(e,t){t=t||{};const n={};function r(p,u,c){return a.isPlainObject(p)&&a.isPlainObject(u)?a.merge.call({caseless:c},p,u):a.isPlainObject(u)?a.merge({},u):a.isArray(u)?u.slice():u}function s(p,u,c){if(a.isUndefined(u)){if(!a.isUndefined(p))return r(void 0,p,c)}else return r(p,u,c)}function o(p,u){if(!a.isUndefined(u))return r(void 0,u)}function i(p,u){if(a.isUndefined(u)){if(!a.isUndefined(p))return r(void 0,p)}else return r(void 0,u)}function l(p,u,c){if(c in t)return r(p,u);if(c in e)return r(void 0,p)}const h={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:l,headers:(p,u)=>s(ke(p),ke(u),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(u){const c=h[u]||s,b=c(e[u],t[u],u);a.isUndefined(b)&&c!==l||(n[u]=b)}),n}const et="1.6.2",fe={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{fe[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const ve={};fe.transitional=function(t,n,r){function s(o,i){return"[Axios v"+et+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,l)=>{if(t===!1)throw new m(s(i," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!ve[i]&&(ve[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,l):!0}};function Zn(e,t,n){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const l=e[o],h=l===void 0||i(l,o,e);if(h!==!0)throw new m("option "+o+" must be "+h,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+o,m.ERR_BAD_OPTION)}}const ie={assertOptions:Zn,validators:fe},F=ie.validators;class q{constructor(t){this.defaults=t,this.interceptors={request:new Ce,response:new Ce}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=v(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&ie.assertOptions(r,{silentJSONParsing:F.transitional(F.boolean),forcedJSONParsing:F.transitional(F.boolean),clarifyTimeoutError:F.transitional(F.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:ie.assertOptions(s,{encode:F.function,serialize:F.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[n.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],d=>{delete o[d]}),n.headers=P.concat(i,o);const l=[];let h=!0;this.interceptors.request.forEach(function(f){typeof f.runWhen=="function"&&f.runWhen(n)===!1||(h=h&&f.synchronous,l.unshift(f.fulfilled,f.rejected))});const p=[];this.interceptors.response.forEach(function(f){p.push(f.fulfilled,f.rejected)});let u,c=0,b;if(!h){const d=[Ne.bind(this),void 0];for(d.unshift.apply(d,l),d.push.apply(d,p),b=d.length,u=Promise.resolve(n);c<b;)u=u.then(d[c++],d[c++]);return u}b=l.length;let E=n;for(c=0;c<b;){const d=l[c++],f=l[c++];try{E=d(E)}catch(w){f.call(this,w);break}}try{u=Ne.call(this,E)}catch(d){return Promise.reject(d)}for(c=0,b=p.length;c<b;)u=u.then(p[c++],p[c++]);return u}getUri(t){t=v(this.defaults,t);const n=Ze(t.baseURL,t.url);return We(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){q.prototype[t]=function(n,r){return this.request(v(r||{},{method:t,url:n,data:(r||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,l){return this.request(v(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}q.prototype[t]=n(),q.prototype[t+"Form"]=n(!0)});const V=q;class pe{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(l=>{r.subscribe(l),o=l}).then(s);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,l){r.reason||(r.reason=new U(o,i,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new pe(function(s){t=s}),cancel:t}}}const Yn=pe;function er(e){return function(n){return e.apply(null,n)}}function tr(e){return a.isObject(e)&&e.isAxiosError===!0}const ae={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ae).forEach(([e,t])=>{ae[t]=e});const nr=ae;function tt(e){const t=new V(e),n=Be(V.prototype.request,t);return a.extend(n,V.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return tt(v(e,s))},n}const R=tt(de);R.Axios=V;R.CanceledError=U;R.CancelToken=Yn;R.isCancel=Xe;R.VERSION=et;R.toFormData=G;R.AxiosError=m;R.Cancel=R.CanceledError;R.all=function(t){return Promise.all(t)};R.spread=er;R.isAxiosError=tr;R.mergeConfig=v;R.AxiosHeaders=P;R.formToJSON=e=>Ke(a.isHTMLForm(e)?new FormData(e):e);R.getAdapter=Ye.getAdapter;R.HttpStatusCode=nr;R.default=R;const rr=R,nt=rr.create({baseURL:"https://data-warpdriven.warpdriven.ai/api",timeout:1e3*30});nt.interceptors.request.use(e=>{if(!e.headers.getAuthorization()){const t="phx_m56yfnzSJ10UqrhEoVSjeewiDHzmzjn7LOqprQ3WSZn";e.headers.setAuthorization(`Bearer ${t}`)}return e});nt.interceptors.response.use(e=>{const{data:t}=e;return t},e=>{const{message:t}=e;throw new Error(t)});const z=new Map;z.set("VSR - Clicks",{order:1,type:"events",id:"$pageview",name:"VSR - Clicks",math:"total",properties:[{key:"$current_url",value:"vsr_click",operator:"icontains",type:"event"}]});z.set("VSR - View",{order:0,type:"events",id:"WarpDrivenVSRView",name:"VSR - View",math:"total"});z.set("VSR - Add to cart",{order:2,type:"events",id:"$autocapture",name:"VSR - Add to cart",math:"total",properties:[{key:"$el_text",value:"Add to cart",operator:"icontains",type:"event"}]});z.set("VSR - Checkout",{order:3,type:"events",id:"$autocapture",name:"VSR - Checkout",math:"total",properties:[{key:"$el_text",value:"Checkout",operator:"icontains",type:"event"}]});const sr=new Map;sr.set(3,z);export{hr as A,mr as C,br as G,yr as R,nt as a,sr as p};
