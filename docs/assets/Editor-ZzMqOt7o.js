import{r as C}from"./index-TTh6u7Wr.js";import{p as e}from"./index-9djbFzGf.js";var k=function(){return k=Object.assign||function(r){for(var t,o=1,a=arguments.length;o<a;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},k.apply(this,arguments)},M={onActivate:e.func,onAddUndo:e.func,onBeforeAddUndo:e.func,onBeforeExecCommand:e.func,onBeforeGetContent:e.func,onBeforeRenderUI:e.func,onBeforeSetContent:e.func,onBeforePaste:e.func,onBlur:e.func,onChange:e.func,onClearUndos:e.func,onClick:e.func,onContextMenu:e.func,onCommentChange:e.func,onCopy:e.func,onCut:e.func,onDblclick:e.func,onDeactivate:e.func,onDirty:e.func,onDrag:e.func,onDragDrop:e.func,onDragEnd:e.func,onDragGesture:e.func,onDragOver:e.func,onDrop:e.func,onExecCommand:e.func,onFocus:e.func,onFocusIn:e.func,onFocusOut:e.func,onGetContent:e.func,onHide:e.func,onInit:e.func,onKeyDown:e.func,onKeyPress:e.func,onKeyUp:e.func,onLoadContent:e.func,onMouseDown:e.func,onMouseEnter:e.func,onMouseLeave:e.func,onMouseMove:e.func,onMouseOut:e.func,onMouseOver:e.func,onMouseUp:e.func,onNodeChange:e.func,onObjectResizeStart:e.func,onObjectResized:e.func,onObjectSelected:e.func,onPaste:e.func,onPostProcess:e.func,onPostRender:e.func,onPreProcess:e.func,onProgressState:e.func,onRedo:e.func,onRemove:e.func,onReset:e.func,onSaveContent:e.func,onSelectionChange:e.func,onSetAttrib:e.func,onSetContent:e.func,onShow:e.func,onSubmit:e.func,onUndo:e.func,onVisualAid:e.func,onSkinLoadError:e.func,onThemeLoadError:e.func,onModelLoadError:e.func,onPluginLoadError:e.func,onIconsLoadError:e.func,onLanguageLoadError:e.func,onScriptsLoad:e.func,onScriptsLoadError:e.func},N=k({apiKey:e.string,id:e.string,inline:e.bool,init:e.object,initialValue:e.string,onEditorChange:e.func,value:e.string,tagName:e.string,cloudChannel:e.string,plugins:e.oneOfType([e.string,e.array]),toolbar:e.oneOfType([e.string,e.array]),disabled:e.bool,textareaName:e.string,tinymceScriptSrc:e.oneOfType([e.string,e.arrayOf(e.string),e.arrayOf(e.shape({src:e.string,async:e.bool,defer:e.bool}))]),rollback:e.oneOfType([e.number,e.oneOf([!1])]),scriptLoading:e.shape({async:e.bool,defer:e.bool,delay:e.number})},M),S=function(r){return typeof r=="function"},O=function(r){return r in M},I=function(r){return r.substr(2)},R=function(r,t,o,a,i,s,n){var u=Object.keys(i).filter(O),c=Object.keys(s).filter(O),l=u.filter(function(f){return s[f]===void 0}),d=c.filter(function(f){return i[f]===void 0});l.forEach(function(f){var p=I(f),h=n[p];o(p,h),delete n[p]}),d.forEach(function(f){var p=a(r,f),h=I(f);n[h]=p,t(h,p)})},A=function(r,t,o,a,i){return R(i,r.on.bind(r),r.off.bind(r),function(s,n){return function(u){var c;return(c=s(n))===null||c===void 0?void 0:c(u,r)}},t,o,a)},D=0,P=function(r){var t=Date.now(),o=Math.floor(Math.random()*1e9);return D++,r+"_"+o+D+String(t)},T=function(r){return r!==null&&(r.tagName.toLowerCase()==="textarea"||r.tagName.toLowerCase()==="input")},B=function(r){return typeof r>"u"||r===""?[]:Array.isArray(r)?r:r.split(" ")},H=function(r,t){return B(r).concat(B(t))},V=function(){return window.InputEvent&&typeof InputEvent.prototype.getTargetRanges=="function"},x=function(r){if(!("isConnected"in Node.prototype)){for(var t=r,o=r.parentNode;o!=null;)t=o,o=t.parentNode;return t===r.ownerDocument}return r.isConnected},j=function(r,t){r!==void 0&&(r.mode!=null&&typeof r.mode=="object"&&typeof r.mode.set=="function"?r.mode.set(t):r.setMode(t))},w=function(){return w=Object.assign||function(r){for(var t,o=1,a=arguments.length;o<a;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},w.apply(this,arguments)},K=function(r,t,o){var a,i,s=r.createElement("script");s.referrerPolicy="origin",s.type="application/javascript",s.id=t.id,s.src=t.src,s.async=(a=t.async)!==null&&a!==void 0?a:!1,s.defer=(i=t.defer)!==null&&i!==void 0?i:!1;var n=function(){s.removeEventListener("load",n),s.removeEventListener("error",u),o(t.src)},u=function(c){s.removeEventListener("load",n),s.removeEventListener("error",u),o(t.src,c)};s.addEventListener("load",n),s.addEventListener("error",u),r.head&&r.head.appendChild(s)},U=function(r){var t={},o=function(n,u){var c=t[n];c.done=!0,c.error=u;for(var l=0,d=c.handlers;l<d.length;l++){var f=d[l];f(n,u)}c.handlers=[]},a=function(n,u,c){var l=function(b){return c!==void 0?c(b):console.error(b)};if(n.length===0){l(new Error("At least one script must be provided"));return}for(var d=0,f=!1,p=function(b,L){f||(L?(f=!0,l(L)):++d===n.length&&u())},h=0,v=n;h<v.length;h++){var y=v[h],g=t[y.src];if(g)g.done?p(y.src,g.error):g.handlers.push(p);else{var m=P("tiny-");t[y.src]={id:m,src:y.src,done:!1,error:null,handlers:[p]},K(r,w({id:m},y),o)}}},i=function(){for(var n,u=0,c=Object.values(t);u<c.length;u++){var l=c[u],d=r.getElementById(l.id);d!=null&&d.tagName==="SCRIPT"&&((n=d.parentNode)===null||n===void 0||n.removeChild(d))}t={}},s=function(){return r};return{loadScripts:a,deleteScripts:i,getDocument:s}},F=function(){var r=[],t=function(i){var s=r.find(function(n){return n.getDocument()===i});return s===void 0&&(s=U(i),r.push(s)),s},o=function(i,s,n,u,c){var l=function(){return t(i).loadScripts(s,u,c)};n>0?setTimeout(l,n):l()},a=function(){for(var i=r.pop();i!=null;i=r.pop())i.deleteScripts()};return{loadList:o,reinitialize:a}},z=F(),_=function(r){var t=r;return t&&t.tinymce?t.tinymce:null},G=function(){var r=function(t,o){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,i){a.__proto__=i}||function(a,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(a[s]=i[s])},r(t,o)};return function(t,o){if(typeof o!="function"&&o!==null)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");r(t,o);function a(){this.constructor=t}t.prototype=o===null?Object.create(o):(a.prototype=o.prototype,new a)}}(),E=function(){return E=Object.assign||function(r){for(var t,o=1,a=arguments.length;o<a;o++){t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},E.apply(this,arguments)},J=function(r){G(t,r);function t(o){var a,i,s,n=r.call(this,o)||this;return n.rollbackTimer=void 0,n.valueCursor=void 0,n.rollbackChange=function(){var u=n.editor,c=n.props.value;u&&c&&c!==n.currentContent&&u.undoManager.ignore(function(){if(u.setContent(c),n.valueCursor&&(!n.inline||u.hasFocus()))try{u.selection.moveToBookmark(n.valueCursor)}catch{}}),n.rollbackTimer=void 0},n.handleBeforeInput=function(u){if(n.props.value!==void 0&&n.props.value===n.currentContent&&n.editor&&(!n.inline||n.editor.hasFocus()))try{n.valueCursor=n.editor.selection.getBookmark(3)}catch{}},n.handleBeforeInputSpecial=function(u){(u.key==="Enter"||u.key==="Backspace"||u.key==="Delete")&&n.handleBeforeInput(u)},n.handleEditorChange=function(u){var c=n.editor;if(c&&c.initialized){var l=c.getContent();n.props.value!==void 0&&n.props.value!==l&&n.props.rollback!==!1&&(n.rollbackTimer||(n.rollbackTimer=window.setTimeout(n.rollbackChange,typeof n.props.rollback=="number"?n.props.rollback:200))),l!==n.currentContent&&(n.currentContent=l,S(n.props.onEditorChange)&&n.props.onEditorChange(l,c))}},n.handleEditorChangeSpecial=function(u){(u.key==="Backspace"||u.key==="Delete")&&n.handleEditorChange(u)},n.initialise=function(u){var c,l,d;u===void 0&&(u=0);var f=n.elementRef.current;if(f){if(!x(f)){if(u===0)setTimeout(function(){return n.initialise(1)},1);else if(u<100)setTimeout(function(){return n.initialise(u+1)},100);else throw new Error("tinymce can only be initialised when in a document");return}var p=_(n.view);if(!p)throw new Error("tinymce should have been loaded into global scope");var h=E(E({},n.props.init),{selector:void 0,target:f,readonly:n.props.disabled,inline:n.inline,plugins:H((c=n.props.init)===null||c===void 0?void 0:c.plugins,n.props.plugins),toolbar:(l=n.props.toolbar)!==null&&l!==void 0?l:(d=n.props.init)===null||d===void 0?void 0:d.toolbar,setup:function(v){n.editor=v,n.bindHandlers({}),n.inline&&!T(f)&&v.once("PostRender",function(y){v.setContent(n.getInitialValue(),{no_events:!0})}),n.props.init&&S(n.props.init.setup)&&n.props.init.setup(v)},init_instance_callback:function(v){var y,g,m=n.getInitialValue();n.currentContent=(y=n.currentContent)!==null&&y!==void 0?y:v.getContent(),n.currentContent!==m&&(n.currentContent=m,v.setContent(m),v.undoManager.clear(),v.undoManager.add(),v.setDirty(!1));var b=(g=n.props.disabled)!==null&&g!==void 0?g:!1;j(n.editor,b?"readonly":"design"),n.props.init&&S(n.props.init.init_instance_callback)&&n.props.init.init_instance_callback(v)}});n.inline||(f.style.visibility=""),T(f)&&(f.value=n.getInitialValue()),p.init(h)}},n.id=n.props.id||P("tiny-react"),n.elementRef=C.createRef(),n.inline=(s=(a=n.props.inline)!==null&&a!==void 0?a:(i=n.props.init)===null||i===void 0?void 0:i.inline)!==null&&s!==void 0?s:!1,n.boundHandlers={},n}return Object.defineProperty(t.prototype,"view",{get:function(){var o,a;return(a=(o=this.elementRef.current)===null||o===void 0?void 0:o.ownerDocument.defaultView)!==null&&a!==void 0?a:window},enumerable:!1,configurable:!0}),t.prototype.componentDidUpdate=function(o){var a=this,i,s;if(this.rollbackTimer&&(clearTimeout(this.rollbackTimer),this.rollbackTimer=void 0),this.editor&&(this.bindHandlers(o),this.editor.initialized)){if(this.currentContent=(i=this.currentContent)!==null&&i!==void 0?i:this.editor.getContent(),typeof this.props.initialValue=="string"&&this.props.initialValue!==o.initialValue)this.editor.setContent(this.props.initialValue),this.editor.undoManager.clear(),this.editor.undoManager.add(),this.editor.setDirty(!1);else if(typeof this.props.value=="string"&&this.props.value!==this.currentContent){var n=this.editor;n.undoManager.transact(function(){var c;if(!a.inline||n.hasFocus())try{c=n.selection.getBookmark(3)}catch{}var l=a.valueCursor;if(n.setContent(a.props.value),!a.inline||n.hasFocus())for(var d=0,f=[c,l];d<f.length;d++){var p=f[d];if(p)try{n.selection.moveToBookmark(p),a.valueCursor=p;break}catch{}}})}if(this.props.disabled!==o.disabled){var u=(s=this.props.disabled)!==null&&s!==void 0?s:!1;j(this.editor,u?"readonly":"design")}}},t.prototype.componentDidMount=function(){var o=this,a,i,s,n,u;if(_(this.view)!==null)this.initialise();else if(Array.isArray(this.props.tinymceScriptSrc)&&this.props.tinymceScriptSrc.length===0)(i=(a=this.props).onScriptsLoadError)===null||i===void 0||i.call(a,new Error("No `tinymce` global is present but the `tinymceScriptSrc` prop was an empty array."));else if(!((s=this.elementRef.current)===null||s===void 0)&&s.ownerDocument){var c=function(){var d,f;(f=(d=o.props).onScriptsLoad)===null||f===void 0||f.call(d),o.initialise()},l=function(d){var f,p;(p=(f=o.props).onScriptsLoadError)===null||p===void 0||p.call(f,d)};z.loadList(this.elementRef.current.ownerDocument,this.getScriptSources(),(u=(n=this.props.scriptLoading)===null||n===void 0?void 0:n.delay)!==null&&u!==void 0?u:0,c,l)}},t.prototype.componentWillUnmount=function(){var o=this,a=this.editor;a&&(a.off(this.changeEvents(),this.handleEditorChange),a.off(this.beforeInputEvent(),this.handleBeforeInput),a.off("keypress",this.handleEditorChangeSpecial),a.off("keydown",this.handleBeforeInputSpecial),a.off("NewBlock",this.handleEditorChange),Object.keys(this.boundHandlers).forEach(function(i){a.off(i,o.boundHandlers[i])}),this.boundHandlers={},a.remove(),this.editor=void 0)},t.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},t.prototype.changeEvents=function(){var o,a,i,s=(i=(a=(o=_(this.view))===null||o===void 0?void 0:o.Env)===null||a===void 0?void 0:a.browser)===null||i===void 0?void 0:i.isIE();return s?"change keyup compositionend setcontent CommentChange":"change input compositionend setcontent CommentChange"},t.prototype.beforeInputEvent=function(){return V()?"beforeinput SelectionChange":"SelectionChange"},t.prototype.renderInline=function(){var o=this.props.tagName,a=o===void 0?"div":o;return C.createElement(a,{ref:this.elementRef,id:this.id})},t.prototype.renderIframe=function(){return C.createElement("textarea",{ref:this.elementRef,style:{visibility:"hidden"},name:this.props.textareaName,id:this.id})},t.prototype.getScriptSources=function(){var o,a,i=(o=this.props.scriptLoading)===null||o===void 0?void 0:o.async,s=(a=this.props.scriptLoading)===null||a===void 0?void 0:a.defer;if(this.props.tinymceScriptSrc!==void 0)return typeof this.props.tinymceScriptSrc=="string"?[{src:this.props.tinymceScriptSrc,async:i,defer:s}]:this.props.tinymceScriptSrc.map(function(l){return typeof l=="string"?{src:l,async:i,defer:s}:l});var n=this.props.cloudChannel,u=this.props.apiKey?this.props.apiKey:"no-api-key",c="https://cdn.tiny.cloud/1/".concat(u,"/tinymce/").concat(n,"/tinymce.min.js");return[{src:c,async:i,defer:s}]},t.prototype.getInitialValue=function(){return typeof this.props.initialValue=="string"?this.props.initialValue:typeof this.props.value=="string"?this.props.value:""},t.prototype.bindHandlers=function(o){var a=this;if(this.editor!==void 0){A(this.editor,o,this.props,this.boundHandlers,function(u){return a.props[u]});var i=function(u){return u.onEditorChange!==void 0||u.value!==void 0},s=i(o),n=i(this.props);!s&&n?(this.editor.on(this.changeEvents(),this.handleEditorChange),this.editor.on(this.beforeInputEvent(),this.handleBeforeInput),this.editor.on("keydown",this.handleBeforeInputSpecial),this.editor.on("keyup",this.handleEditorChangeSpecial),this.editor.on("NewBlock",this.handleEditorChange)):s&&!n&&(this.editor.off(this.changeEvents(),this.handleEditorChange),this.editor.off(this.beforeInputEvent(),this.handleBeforeInput),this.editor.off("keydown",this.handleBeforeInputSpecial),this.editor.off("keyup",this.handleEditorChangeSpecial),this.editor.off("NewBlock",this.handleEditorChange))}},t.propTypes=N,t.defaultProps={cloudChannel:"6"},t}(C.Component);export{J as E};
