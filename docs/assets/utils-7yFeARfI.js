const s=t=>t.scrollTop;function l(t,e){var r,a;const{timeout:n,easing:i,style:o={}}=t;return{duration:(r=o.transitionDuration)!=null?r:typeof n=="number"?n:n[e.mode]||0,easing:(a=o.transitionTimingFunction)!=null?a:typeof i=="object"?i[e.mode]:i,delay:o.transitionDelay}}export{l as g,s as r};