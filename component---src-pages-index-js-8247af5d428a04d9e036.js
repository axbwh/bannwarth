(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{RXBc:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),i=a("Wbzz"),o=a("LrsE"),l=a("Bl7J"),s=a("vOnD"),c=a("Aw06"),p=a("wEEd"),d=a("9eSz"),m=a.n(d),u=a("b6Qr");const v=Object(s.b)(c.a).withConfig({displayName:"thumbnail__Project",componentId:"sc-pwams3-0"})(["width:100%;pointer-events:auto;overflow:hidden;display:block;position:relative;&:not(:last-child){padding-bottom:10vw;}"]),g=Object(s.b)(p.a.div).withConfig({displayName:"thumbnail__Clip",componentId:"sc-pwams3-1"})(["position:relative;display:block;overflow:hidden;width:calc(100vw - var(--gutter) * 2);height:calc( (100vw - var(--gutter) * 2) * 9 / 16);@media (max-width:768px){}"]),w=(e,t)=>`translate3d(${-.03*e}px,${-.03*t}px,0)`;var f=e=>{let{slug:t,title:a,imageData:i,parallax:o,hovered:l,...s}=e;const{0:c,1:d}=Object(n.useState)(()=>"undefined"==typeof window||window.innerWidth<=768);Object(n.useLayoutEffect)(()=>{const e=()=>{"undefined"!=typeof window&&d(window.innerWidth<=768)};return window.addEventListener("resize",e),window.addEventListener("gestureend",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("gestureend",e)}},[]);const[f,h]=Object(p.c)(()=>({val:0,config:{mass:1,tension:280,friction:200}}));return h({val:l===t?1:0}),r.a.createElement(v,Object.assign({to:"/"+t},s),r.a.createElement(g,{style:{transform:o.xy.interpolate(w)}},r.a.createElement(p.a.div,{style:{transform:f.val.interpolate({range:[0,1],output:[1.05,1.01]}).interpolate(e=>`scale(${e})`),opacity:f.val.interpolate({range:[0,1],output:u.isMobile||c?[1,1]:[.5,1]})}},r.a.createElement(m.a,{loading:"eager",fluid:i,alt:a,backgroundColor:!0}))))};const h=Object(s.b)(e=>{let{moveX:t,...a}=e;return r.a.createElement(p.a.div,a)}).withConfig({displayName:"slide__Div",componentId:"sc-14ze2jp-0"})(["display:",";flex-direction:",";"],e=>e.moveX?"inline-flex":"flex",e=>e.moveX?"row":"column");var x=e=>{let{children:t,spring:a,moveX:n=!1,doesSkew:i=!1,style:o,...l}=e;return r.a.createElement(h,Object.assign({style:{...o,transform:Object(p.b)([a.transform,a.skew],n?(e,t)=>i?`translateX(${e}%) skew(${t}deg, 0deg)`:`translateX(${e}%) `:(e,t)=>i?`translateY(${e}%) skew(0deg, ${t}deg)`:`translateY(${e}%) `)},moveX:n},l),t)},b=a("dbrF"),y=a("EgnG");const E=Object(s.b)(e=>{let{moveX:t,passRef:a,...n}=e;return r.a.createElement(p.a.div,Object.assign({ref:a},n))}).withConfig({displayName:"scroll__Div",componentId:"sc-9s5mof-0"})(["display:",";flex-direction:",";"],e=>e.moveX?"inline-flex":"flex",e=>e.moveX?"row":"column");var j=e=>{let{children:t,scroll:a,moveX:i=!1,style:o,...l}=e;const s=Object(n.useRef)(null),c=Object(n.useRef)({x:0,y:0}),{0:d,1:m}=Object(n.useState)(),{0:u,1:v}=Object(n.useState)(!1),[g,w]=Object(p.c)(()=>({x:`translateX(${-c.current.x}px) `,y:`translateY(${-c.current.y}px) `}));return Object(n.useLayoutEffect)(()=>{const e=()=>{const e=Array.from(s.current.childNodes),t=y.a.timeline({targets:c.current,easing:"easeInOutQuint",autoplay:!1});e.forEach((e,a)=>{const n=a<1?.001:1,r=e.offsetLeft,i=e.offsetTop;t.add({x:a<1?[r,r]:r,y:a<1?[i,i]:i,duration:n})}),m(t)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),Object(n.useEffect)(()=>{d&&(d.seek(d.duration*a.top),!u&&a.render?w({x:`translateX(${-c.current.x}px) `,y:`translateY(${-c.current.y}px) `,immediate:!0,onRest:()=>{w({immediate:!1,onRest:void 0}),v(!0)}}):w({x:`translateX(${-c.current.x}px) `,y:`translateY(${-c.current.y}px) `}))},[a,d,w,u,v]),r.a.createElement(E,Object.assign({moveX:i,passRef:s,style:{...o,transform:i?g.x:g.y}},l),t)};const O=Object(s.b)(p.a.div).withConfig({displayName:"preview__Img",componentId:"sc-dlqrvw-0"})(["position:relative;overflow:hidden;"]),k=Object(s.b)(p.a.div).withConfig({displayName:"preview__Prev",componentId:"sc-dlqrvw-1"})(["position:relative;display:block;width:calc(100vw - var(--gutter) * 2);height:calc( (100vw - var(--gutter) * 2) * 9 / 16);@media (max-width:768px){height:calc((100 * var(--vh)) - var(--nav-size) - 6vw - 10px - 35px);}"]),_=s.b.div.withConfig({displayName:"preview__Date",componentId:"sc-dlqrvw-2"})(['position:absolute;right:-30px;width:20px;overflow:hidden;bottom:0;p,a{display:block;writing-mode:vertical-lr;line-height:20px;font-size:14px;font-variation-settings:"wght" 350,"wdth" 85,"slnt" 0;letter-spacing:2px;pointer-events:all;margin:0;white-space:nowrap;align-self:flex-end;text-transform:capitalize;text-decoration:none;color:inherit;}']),C=Object(s.b)(_).withConfig({displayName:"preview__Tag",componentId:"sc-dlqrvw-3"})(["top:0;bottom:unset;p{align-self:flex-start;}"]),I=Object(s.b)(C).withConfig({displayName:"preview__Roman",componentId:"sc-dlqrvw-4"})(['@media (max-width:768px){display:none;}right:unset;left:-30px;height:22px;width:auto;p{align-self:flex-end;line-height:22px;font-size:20px;font-variation-settings:"wght" 1000,"wdth" 85,"slnt" 0;writing-mode:unset;}']),$=Object(s.b)(_).withConfig({displayName:"preview__View",componentId:"sc-dlqrvw-5"})(["left:-30px;right:unset;@media (max-width:768px){display:none;}a{font-variation-settings:unset;letter-spacing:unset;text-transform:uppercase;}"]),X=(e,t)=>`translate3d(${-.005*e}px,${-.005*t}px,0)`,S=e=>`"wght" ${e}, "wdth" 85, "slnt" 0`;var N=e=>{let{projects:t,spring:a,scroll:n,parallax:i,hoverIn:o,hoverOut:l,hover:s,hovered:p,setClip:d,...m}=e;return r.a.createElement(k,m,r.a.createElement(_,null,r.a.createElement(x,{spring:a,moveX:"true"},t.map((e,t)=>r.a.createElement("p",{key:"date"+t},e.date)))),r.a.createElement(C,null,r.a.createElement(x,{spring:a,moveX:"true"},t.map((e,t)=>r.a.createElement("p",{key:"tag"+t},e.tags[0])))),r.a.createElement(I,null,r.a.createElement(x,{spring:a},t.map((e,t)=>r.a.createElement("p",{key:"roman"+t},Object(b.b)(t+1))))),r.a.createElement($,null,r.a.createElement(x,{style:{fontVariationSettings:s.interpolate({range:[0,1],output:[350,1e3]}).interpolate(S),letterSpacing:s.interpolate({range:[0,1],output:[2,4]}).interpolate(e=>e+"px")},spring:a,moveX:"true"},t.map((e,t)=>r.a.createElement(c.a,{to:"/"+e.slug,key:"view"+t,onMouseEnter:()=>o(e.slug),onMouseLeave:l,setClip:d},e.prompt)))),r.a.createElement(O,{style:{transform:i.xy.interpolate(X)}},r.a.createElement(j,{scroll:n},t.map((e,t)=>{const a=e.images[0].childImageSharp.fluid;return r.a.createElement(f,{onMouseEnter:()=>o(e.slug),onMouseLeave:l,key:"prev"+t,slug:e.slug,imageData:a,parallax:i,hovered:p,setClip:d})}))))};const z=Object(s.b)(x).withConfig({displayName:"titles__Title",componentId:"sc-1d2fwxk-0"})(["height:1em;a{text-decoration:none;white-space:nowrap;text-transform:uppercase;min-width:80vw;font-size:6vw;line-height:1em;padding-left:3vw;padding-bottom:30px;margin:0px;color:inherit;pointer-events:all;opacity:0.2;@media (max-width:768px){margin-top:calc(var(--nav-size));}font-weight:bold;-webkit-text-stroke:3px rgba(255,255,255,0.4);text-stroke:3px rgba(255,255,255,0.4);paint-order:stroke fill;}"]),L=s.b.div.withConfig({displayName:"titles__Mask",componentId:"sc-1d2fwxk-1"})(["display:flex;overflow:hidden;position:absolute;top:0px;height:calc(100 * var(--vh));width:calc(80vw + 24px);a{opacity:1;}"]),R=Object(s.b)(p.a.div).withConfig({displayName:"titles__Wrap",componentId:"sc-1d2fwxk-2"})(["align-self:flex-start;position:absolute;display:inline-block;padding-left:30px;z-index:5;@media (max-width:768px){position:relative;margin-bottom:20px;margin-top:15px;}"]);var D=e=>{let{projects:t,spring:a,hoverIn:n,hoverOut:i,hover:o,setClip:l,...s}=e,p={fontVariationSettings:o.interpolate({range:[0,1],output:[1200,680]}).interpolate(e=>`"wght" ${e}, "wdth" 85, "slnt" 0`),letterSpacing:o.interpolate({range:[0,1],output:[1,.7]}).interpolate(e=>e+"vw")};return r.a.createElement(R,s,r.a.createElement(z,{style:p,spring:a,moveX:"true",doesSkew:"true"},t.map((e,t)=>r.a.createElement("a",{key:"hidden"+t,href:"#"+e.slug},e.title))),r.a.createElement(L,null,r.a.createElement(z,{style:p,spring:a,moveX:"true",doesSkew:"true"},t.map((e,t)=>r.a.createElement(c.a,{to:"/"+e.slug,key:"title"+t,onMouseEnter:()=>n(e.slug),onMouseLeave:i,setClip:l},e.title)))))};const M=s.b.div.withConfig({displayName:"folio__Abs",componentId:"sc-12bxnex-0"})(["height:100%;width:100%;position:absolute;"]),q=s.b.div.withConfig({displayName:"folio__Wrap",componentId:"sc-12bxnex-1"})(["position:-webkit-sticky;position:sticky;display:flex;flex-direction:column;top:0;left:0;overflow:hidden;align-items:center;@media (min-width:768px){justify-content:center;}height:calc(100 * var(--vh));width:100vw;pointer-events:none;z-index:100;"]),A=(e,t)=>`translate3d(${.055*e}px,${.055*t}px,0)`,W=(e,t)=>`translate3d(${.085*e}px,${.085*t}px,0)`;var Y=e=>{let{projects:t,scroll:a,parallax:i,setClip:o}=e;const{0:l,1:s}=Object(n.useState)(null),{0:c,1:d}=Object(n.useState)(!1),[m,u]=Object(p.c)(()=>({factor:0,config:{mass:20,tension:300,friction:140}})),v=Object(n.useRef)({transform:0,skew:0}),{0:g,1:w}=Object(n.useState)(),[f,h]=Object(p.c)(()=>({transform:-v.current.transform,skew:v.current.skew}));Object(n.useLayoutEffect)(()=>{const e=y.a.timeline({targets:v.current,easing:"easeInOutQuint",autoplay:!1});t.forEach((a,n)=>{const r=n<1?.001:1,i=100/t.length*n;e.add({transform:n<1?[i,i]:i,duration:r})}),w(e)},[t]);const x=e=>{s(e),u({factor:1})},b=()=>{s(null),u({factor:0})};return Object(n.useEffect)(()=>{if(g)if(g.seek(g.duration*a.top),!c&&a.render)h({transform:-v.current.transform,immediate:!0,onRest:()=>{h({immediate:!1,onRest:void 0}),d(!0)}});else{g.seek(g.duration*a.top);let t=50*(e=Math.abs(a.speed),--e*e*e+1),n=a.speed>0?t:-t;h({transform:-v.current.transform,skew:n})}var e},[a,g,h,c,d]),r.a.createElement(M,null,r.a.createElement(q,null,r.a.createElement(D,{hoverIn:x,hoverOut:b,style:{transform:i.xy.interpolate(W)},projects:t,spring:f,hover:m.factor,setClip:o}),r.a.createElement(N,{hoverIn:x,hoverOut:b,style:{transform:i.xy.interpolate(A)},projects:t,spring:f,scroll:a,hover:m.factor,hovered:l,parallax:i,setClip:o})))},J=a("LbRr"),P=a("U6gd");const Q=s.b.div.withConfig({displayName:"pages__Dummy",componentId:"sc-6kvjaa-0"})(["height:calc(100 * var(--vh));width:100vw;"]);t.default=e=>{let{location:{state:t},location:a}=e;const s=Object(i.useStaticQuery)("1225971745").allProjectsJson.edges.map(e=>e.node),{0:c,1:d}=Object(n.useState)({top:0,speed:0,render:!a.hash}),[m,u]=Object(p.c)(()=>({xy:[0,0],config:{mass:10,tension:550,friction:140}})),[v,g]=Object(p.c)(()=>({trim:o.a(null!=t&&t.linked?o.b.r:0),mask:o.a(o.b.r)}));return r.a.createElement(l.a,{title:"Alex Bannwarth - 3D Artist & Creative Director",clip:v,setClip:g,setScroll:d,setParallax:u},r.a.createElement(J.a,{setClip:g,to:"/about",top:s[0].slug,parallax:m},r.a.createElement(P.a,{scroll:c,projects:s,setClip:g})),r.a.createElement(Y,{scroll:c,projects:s,parallax:m,setClip:g}),s.map(e=>r.a.createElement(Q,{key:e.slug,id:e.slug})))}}}]);
//# sourceMappingURL=component---src-pages-index-js-8247af5d428a04d9e036.js.map