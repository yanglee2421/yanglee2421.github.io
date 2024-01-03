import{s as u,g as x,d as h,j as o,L as a}from"./index-NOl4DqEL.js";import{u as f,F as j}from"./index.esm-PFAWtegw.js";import{o as g,c as y,a as n}from"./index.esm-DWm3QBwm.js";import"./Editor-Leo8qfg-.js";import{I as w,F as b,T as v,G as I}from"./ItemPassword-WxO5zlTS.js";import{I as F}from"./ItemText-cowRz3qq.js";import"./SkeletonCard-94_y6wPc.js";import"./copy-btn-XFFgqXmR.js";import{u as L}from"./useMutation-q_AUA4Pg.js";import"./index.esm2017-FCs6mSMr.js";import{u as S}from"./useTheme-GuQ9oku8.js";import{u as C}from"./useMediaQuery-ab3dVN14.js";import{B as r}from"./Box-ECGFyPyF.js";import{T as m}from"./Typography-PeIQuIa_.js";import{L as p}from"./Link-n9tfWD26.js";import{L as P}from"./LoadingButton-XTRyP2te.js";import{D as T}from"./Divider-L25Ixv9k.js";import{I as s}from"./IconButton-Ji51lX6_.js";import{G as k}from"./GitHub-Juok9rM5.js";import{s as B}from"./ButtonBase-7zDRXYUG.js";import"./fabric-Y98Y_bQ5.js";import"./index-9djbFzGf.js";import"./createSvgIcon-Pd_Bs2QI.js";import"./TextField-nQcERWWz.js";import"./OutlinedInput-IM8tDleW.js";import"./Modal-Xh0EGuVc.js";import"./Backdrop-NlEYlFVr.js";import"./utils-7yFeARfI.js";import"./Transition-z-EYftQ6.js";import"./ownerDocument-bIJBxlvi.js";import"./ownerWindow-LT9-6hbI.js";import"./Portal-kQ69nwgj.js";import"./isHostComponent-jcd54X0C.js";import"./Paper-61t9uWkm.js";import"./Grow-5aA_Tu-g.js";import"./List-aUEAzYML.js";import"./ListContext-kicnJyXl.js";import"./useFormControl-1tOr1C5f.js";import"./TextareaAutosize-bstcyYhk.js";import"./isMuiElement-7BVEk7WY.js";import"./useControlled-zkqhxYod.js";import"./InputAdornment-KRh95BiP.js";import"./VisibilityOutlined-AiSjOPgq.js";import"./CardHeader-QBBSwnV9.js";import"./Skeleton-aUiZU9k7.js";import"./CardContent-o2_FOQpp.js";import"./Tooltip-NFGqnXhD.js";import"./Popper-JhJLztZU.js";import"./utils-1RRThafF.js";import"./extendSxProp-67_cfwlG.js";import"./Button-5LEC6PDI.js";import"./CircularProgress-zUVyPBwz.js";import"./dividerClasses-rh6NTVqr.js";function D(){return L({mutationFn({email:i,password:e}){return u(x(h),i,e)}})}function Go(){const i=f({defaultValues:{email:"",password:""},resolver:g(y().shape({email:n().email().max(128).required(),password:n().min(8).max(16).required()}))}),e=D(),l=S(),d=C(l.breakpoints.down("md")),c=i.handleSubmit(t=>{e.mutate(t,{onError(){},onSuccess(){}})});return o.jsx(o.Fragment,{children:o.jsxs(r,{display:"flex",height:"100%",children:[o.jsx(r,{flex:1,overflow:"hidden",children:d&&o.jsx("h1",{children:"Hello small"})}),o.jsxs(r,{display:"flex",flexDirection:"column",justifyContent:"center",gap:4,width:"100%",maxWidth:{md:450},p:[6,12],boxShadow:t=>t.shadows[2],children:[o.jsxs(r,{children:[o.jsx(m,{variant:"h4",children:"Wellcome to here!"}),o.jsx(m,{variant:"body2",sx:{overflow:"hidden",maxHeight(t){return`calc(${t.typography.body1.lineHeight}em * 3)`}},children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis sed fugiat placeat alias illo praesentium."})]}),o.jsx(E,{onSubmit:c,noValidate:!0,autoComplete:"off",sx:{display:"flex",flexDirection:"column",gap:4},children:o.jsxs(j,{...i,children:[o.jsx(F,{name:"email",label:"Email"}),o.jsx(w,{name:"password",label:"Password"}),o.jsx(r,{display:"flex",justifyContent:"space-between",alignItems:"center",children:o.jsx(p,{variant:"body2",component:a,to:"/forgot-passwd",children:"Forgot Password?"})}),o.jsx(P,{loading:e.isPending,type:"submit",variant:"contained",fullWidth:!0,size:"large",children:"sign in"})]})}),o.jsxs(r,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[o.jsx(m,{variant:"body2",children:"New on our platform?"}),o.jsx(p,{variant:"body2",component:a,to:"/register",children:"Create an account"})]}),o.jsx(T,{children:"Or"}),o.jsxs(r,{display:"flex",justifyContent:"center",gap:4,children:[o.jsx(s,{children:o.jsx(b,{})}),o.jsx(s,{children:o.jsx(v,{})}),o.jsx(s,{children:o.jsx(k,{})}),o.jsx(s,{children:o.jsx(I,{})})]})]})]})})}const E=B("form")({});export{Go as NotLogged};