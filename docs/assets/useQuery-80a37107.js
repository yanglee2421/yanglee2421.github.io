var Y=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(Y(s,t,"read from private field"),e?e.call(s):t.get(s)),h=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},n=(s,t,e,r)=>(Y(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e);var l=(s,t,e)=>(Y(s,t,"access private method"),e);import{S as mt,s as Z,W as Ct,X as ct,Y as lt,Z as Ot,$ as Et,a0 as St,a1 as dt,o as bt,r as m,p as Qt}from"./index-39bca082.js";import{s as Ut}from"./utils-73056672.js";var p,a,I,f,E,T,g,A,x,D,S,Q,O,U,w,M,L,$,k,G,B,J,j,tt,K,et,W,st,V,it,_,Rt,yt,wt=(yt=class extends mt{constructor(t,e){super();h(this,w);h(this,L);h(this,k);h(this,B);h(this,j);h(this,K);h(this,W);h(this,V);h(this,_);h(this,p,void 0);h(this,a,void 0);h(this,I,void 0);h(this,f,void 0);h(this,E,void 0);h(this,T,void 0);h(this,g,void 0);h(this,A,void 0);h(this,x,void 0);h(this,D,void 0);h(this,S,void 0);h(this,Q,void 0);h(this,O,void 0);h(this,U,void 0);n(this,a,void 0),n(this,I,void 0),n(this,f,void 0),n(this,U,new Set),n(this,p,t),this.options=e,n(this,g,null),this.bindMethods(),this.setOptions(e)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(i(this,a).addObserver(this),ft(i(this,a),this.options)&&l(this,w,M).call(this),l(this,j,tt).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return rt(i(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return rt(i(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,K,et).call(this),l(this,W,st).call(this),i(this,a).removeObserver(this)}setOptions(t,e){const r=this.options,y=i(this,a);if(this.options=i(this,p).defaultQueryOptions(t),Z(r,this.options)||i(this,p).getQueryCache().notify({type:"observerOptionsUpdated",query:i(this,a),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),l(this,V,it).call(this);const o=this.hasListeners();o&&pt(i(this,a),y,this.options,r)&&l(this,w,M).call(this),this.updateResult(e),o&&(i(this,a)!==y||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&l(this,L,$).call(this);const u=l(this,k,G).call(this);o&&(i(this,a)!==y||this.options.enabled!==r.enabled||u!==i(this,O))&&l(this,B,J).call(this,u)}getOptimisticResult(t){const e=i(this,p).getQueryCache().build(i(this,p),t),r=this.createResult(e,t);return It(this,r)&&(n(this,f,r),n(this,T,this.options),n(this,E,i(this,a).state)),r}getCurrentResult(){return i(this,f)}trackResult(t){const e={};return Object.keys(t).forEach(r=>{Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:()=>(i(this,U).add(r),t[r])})}),e}getCurrentQuery(){return i(this,a)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const e=i(this,p).defaultQueryOptions(t),r=i(this,p).getQueryCache().build(i(this,p),e);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,e))}fetch(t){return l(this,w,M).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),i(this,f)))}createResult(t,e){var ut;const r=i(this,a),y=this.options,o=i(this,f),u=i(this,E),d=i(this,T),F=t!==r?t.state:i(this,I),{state:c}=t;let{error:z,errorUpdatedAt:at,fetchStatus:P,status:C}=c,ht=!1,R;if(e._optimisticResults){const b=this.hasListeners(),X=!b&&ft(t,e),vt=b&&pt(t,r,e,y);(X||vt)&&(P=St(t.options.networkMode)?"fetching":"paused",c.dataUpdatedAt||(C="pending")),e._optimisticResults==="isRestoring"&&(P="idle")}if(e.select&&typeof c.data<"u")if(o&&c.data===(u==null?void 0:u.data)&&e.select===i(this,A))R=i(this,x);else try{n(this,A,e.select),R=e.select(c.data),R=dt(o==null?void 0:o.data,R,e),n(this,x,R),n(this,g,null)}catch(b){n(this,g,b)}else R=c.data;if(typeof e.placeholderData<"u"&&typeof R>"u"&&C==="pending"){let b;if(o!=null&&o.isPlaceholderData&&e.placeholderData===(d==null?void 0:d.placeholderData))b=o.data;else if(b=typeof e.placeholderData=="function"?e.placeholderData((ut=i(this,D))==null?void 0:ut.state.data,i(this,D)):e.placeholderData,e.select&&typeof b<"u")try{b=e.select(b),n(this,g,null)}catch(X){n(this,g,X)}typeof b<"u"&&(C="success",R=dt(o==null?void 0:o.data,b,e),ht=!0)}i(this,g)&&(z=i(this,g),R=i(this,x),at=Date.now(),C="error");const N=P==="fetching",q=C==="pending",H=C==="error",ot=q&&N;return{status:C,fetchStatus:P,isPending:q,isSuccess:C==="success",isError:H,isInitialLoading:ot,isLoading:ot,data:R,dataUpdatedAt:c.dataUpdatedAt,error:z,errorUpdatedAt:at,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>F.dataUpdateCount||c.errorUpdateCount>F.errorUpdateCount,isFetching:N,isRefetching:N&&!q,isLoadingError:H&&c.dataUpdatedAt===0,isPaused:P==="paused",isPlaceholderData:ht,isRefetchError:H&&c.dataUpdatedAt!==0,isStale:nt(t,e),refetch:this.refetch}}updateResult(t){const e=i(this,f),r=this.createResult(i(this,a),this.options);if(n(this,E,i(this,a).state),n(this,T,this.options),Z(r,e))return;i(this,E).data!==void 0&&n(this,D,i(this,a)),n(this,f,r);const y={},o=()=>{if(!e)return!0;const{notifyOnChangeProps:u}=this.options,d=typeof u=="function"?u():u;if(d==="all"||!d&&!i(this,U).size)return!0;const v=new Set(d??i(this,U));return this.options.throwOnError&&v.add("error"),Object.keys(i(this,f)).some(F=>{const c=F;return i(this,f)[c]!==e[c]&&v.has(c)})};(t==null?void 0:t.listeners)!==!1&&o()&&(y.listeners=!0),l(this,_,Rt).call(this,{...y,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,j,tt).call(this)}},p=new WeakMap,a=new WeakMap,I=new WeakMap,f=new WeakMap,E=new WeakMap,T=new WeakMap,g=new WeakMap,A=new WeakMap,x=new WeakMap,D=new WeakMap,S=new WeakMap,Q=new WeakMap,O=new WeakMap,U=new WeakMap,w=new WeakSet,M=function(t){l(this,V,it).call(this);let e=i(this,a).fetch(this.options,t);return t!=null&&t.throwOnError||(e=e.catch(Ct)),e},L=new WeakSet,$=function(){if(l(this,K,et).call(this),ct||i(this,f).isStale||!lt(this.options.staleTime))return;const e=Ot(i(this,f).dataUpdatedAt,this.options.staleTime)+1;n(this,S,setTimeout(()=>{i(this,f).isStale||this.updateResult()},e))},k=new WeakSet,G=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(i(this,a)):this.options.refetchInterval)??!1},B=new WeakSet,J=function(t){l(this,W,st).call(this),n(this,O,t),!(ct||this.options.enabled===!1||!lt(i(this,O))||i(this,O)===0)&&n(this,Q,setInterval(()=>{(this.options.refetchIntervalInBackground||Et.isFocused())&&l(this,w,M).call(this)},i(this,O)))},j=new WeakSet,tt=function(){l(this,L,$).call(this),l(this,B,J).call(this,l(this,k,G).call(this))},K=new WeakSet,et=function(){i(this,S)&&(clearTimeout(i(this,S)),n(this,S,void 0))},W=new WeakSet,st=function(){i(this,Q)&&(clearInterval(i(this,Q)),n(this,Q,void 0))},V=new WeakSet,it=function(){const t=i(this,p).getQueryCache().build(i(this,p),this.options);if(t===i(this,a))return;const e=i(this,a);n(this,a,t),n(this,I,t.state),this.hasListeners()&&(e==null||e.removeObserver(this),t.addObserver(this))},_=new WeakSet,Rt=function(t){bt.batch(()=>{t.listeners&&this.listeners.forEach(e=>{e(i(this,f))}),i(this,p).getQueryCache().notify({query:i(this,a),type:"observerResultsUpdated"})})},yt);function Ft(s,t){return t.enabled!==!1&&!s.state.dataUpdatedAt&&!(s.state.status==="error"&&t.retryOnMount===!1)}function ft(s,t){return Ft(s,t)||s.state.dataUpdatedAt>0&&rt(s,t,t.refetchOnMount)}function rt(s,t,e){if(t.enabled!==!1){const r=typeof e=="function"?e(s):e;return r==="always"||r!==!1&&nt(s,t)}return!1}function pt(s,t,e,r){return e.enabled!==!1&&(s!==t||r.enabled===!1)&&(!e.suspense||s.state.status!=="error")&&nt(s,e)}function nt(s,t){return s.isStaleByTime(t.staleTime)}function It(s,t){return!Z(s.getCurrentResult(),t)}var gt=m.createContext(!1),Tt=()=>m.useContext(gt);gt.Provider;function xt(){let s=!1;return{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s}}var Dt=m.createContext(xt()),Pt=()=>m.useContext(Dt),Mt=(s,t)=>{(s.suspense||s.throwOnError)&&(t.isReset()||(s.retryOnMount=!1))},At=s=>{m.useEffect(()=>{s.clearReset()},[s])},Lt=({result:s,errorResetBoundary:t,throwOnError:e,query:r})=>s.isError&&!t.isReset()&&!s.isFetching&&Ut(e,[s.error,r]),kt=s=>{s.suspense&&typeof s.staleTime!="number"&&(s.staleTime=1e3)},Bt=(s,t)=>s.isLoading&&s.isFetching&&!t,jt=(s,t,e)=>(s==null?void 0:s.suspense)&&Bt(t,e),Kt=(s,t,e)=>t.fetchOptimistic(s).catch(()=>{e.clearReset()});function Wt(s,t,e){const r=Qt(e),y=Tt(),o=Pt(),u=r.defaultQueryOptions(s);u._optimisticResults=y?"isRestoring":"optimistic",kt(u),Mt(u,o),At(o);const[d]=m.useState(()=>new t(r,u)),v=d.getOptimisticResult(u);if(m.useSyncExternalStore(m.useCallback(F=>{const c=y?()=>{}:d.subscribe(bt.batchCalls(F));return d.updateResult(),c},[d,y]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),m.useEffect(()=>{d.setOptions(u,{listeners:!1})},[u,d]),jt(u,v,y))throw Kt(u,d,o);if(Lt({result:v,errorResetBoundary:o,throwOnError:u.throwOnError,query:d.getCurrentQuery()}))throw v.error;return u.notifyOnChangeProps?v:d.trackResult(v)}function qt(s,t){return Wt(s,wt,t)}export{qt as u};
