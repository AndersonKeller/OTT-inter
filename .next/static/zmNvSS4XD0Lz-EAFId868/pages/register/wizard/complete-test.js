(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{"3Z25":function(e,t,a){"use strict";a.r(t);var n=a("rePB"),r=a("o0o1"),i=a.n(r),o=a("HaE+"),c=a("MX0m"),s=a.n(c),l=a("ihRs"),d=a("HyDj"),p=a("q1tI"),m=a.n(p),u=a("a3/r"),b=a("vOnD"),g=a("aSns"),f=a.n(g),x=a("zlq/"),y=m.a.createElement;function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var j=function(e){var t=e.packages,a=(e.layoutProps,e.selectPackage),n=e.handleSubmit,r=e.handleFormState,c=e.formData,l=e.setFormData;Object(p.useEffect)((function(e){console.log("\n\n packages.js first useEffect (componentDidMount)"),console.log("\n\n formData ".concat(JSON.stringify(c)," \n\n"))}));var m=Object(p.useContext)(b.a),g=f()(m.colors.primary).hsl().string(),h=Object(p.useState)(!1),j=(h[0],h[1]),k=Object(p.useState)(),v=k[0],_=k[1],O=Object(p.useState)(),N=O[0],S=(O[1],(t.items.find((function(e){return 0==e.amount}))||{}).id),P=function(){var e=Object(o.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault();try{_(!0),a(c.package_id),c.package_id===S?n(4,null):n(3),_(!1)}catch(t){console.error(t)}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=Object(p.useCallback)((function(e){var t=parseInt(e.target.value,10);l(w(w({},c),{},{package_id:t,payment_method_id:t===S?null:c.payment_method_id}))}),[]);return y("div",{className:"col-md-12"},y("form",{method:"post",onSubmit:P,className:s.a.dynamic([["3337338",[g,g,g]]])},y("div",{className:s.a.dynamic([["3337338",[g,g,g]]])+" register-confirm container text-center"},y("h2",{className:s.a.dynamic([["3337338",[g,g,g]]])+" card-title text-center"},y("span",{className:s.a.dynamic([["3337338",[g,g,g]]])+" text-primary"},"\xa1"),"S\xe9 parte de"," ",y(x.a,null),y("span",{className:s.a.dynamic([["3337338",[g,g,g]]])+" text-primary"},"!")),y("div",{className:s.a.dynamic([["3337338",[g,g,g]]])+" card-subtitle d-inline-block"},"Elige tu plan"),y("br",{className:s.a.dynamic([["3337338",[g,g,g]]])}),y("div",{className:s.a.dynamic([["3337338",[g,g,g]]])+" card-subtitle d-inline-block"},c.is_miembro?"Es miembro del club":""),y(d.b,{error:t.error?t.error:null,items:t.items?t.items:null,onChange:D,package_id:c.package_id,validationError:!v&&N&&N.errors&&N.errors.package_id,discount_id:c.discount_id,setBlockDiscountFields:j}),y("div",{className:s.a.dynamic([["3337338",[g,g,g]]])+" row mt-3"},y("div",{className:s.a.dynamic([["3337338",[g,g,g]]])+" col-md-12"},y("div",{className:s.a.dynamic([["3337338",[g,g,g]]])+" text-center"},y(u.a,{onClick:function(){return r(2)},color:"primary"},"Volver"),y(u.a,{color:"secondary",disabled:v,loading:v,type:"submit",style:{marginLeft:"20px"}},"Siguiente"))))),y(s.a,{id:"3337338",dynamic:[g,g,g]},[".text-primary{color:".concat(g," !important;}"),"strong.text-primary{color:".concat(g," !important;}"),"h2.card-title{font-weight:normal;color:#000;margin-bottom:1em;font-size:1.7em;}","div.card-subtitle{font-size:1.1em;font-weight:500;margin-bottom:2.5em;max-width:380px;}",".text-primary{color:".concat(g," !important;}"),".register-confirm{padding-top:50px;padding-bottom:50px;color:#666666;}"])))};j.getInitialProps=function(){var e=Object(o.a)(i.a.mark((function e(t){var a,n,r,o,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.api,t.res,n=t.user,e.prev=1,e.next=4,a.get("packages");case 4:o=e.sent,c=o.data,r={items:c},e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),r={error:e.t0};case 12:return e.abrupt("return",{packages:r,user:n});case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),t.default=Object(l.a)(j,!0)},HyDj:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n=a("wx14"),r=a("o0o1"),i=a.n(r),o=a("HaE+"),c=a("T5bk"),s=a("MX0m"),l=a.n(s),d=a("q1tI"),p=a.n(d),m=a("DKqL"),u=a("ihRs"),b=p.a.createElement,g=function(e){var t=e.onChange,a=e.package_id,r=e.plan,i=e.readOnly,o=e.discount,c=e.buttonLabel;return r.amount_with_discount=o?Math.round(r.amount*(1-o.pivot.percent)):0,b("label",{className:"jsx-2081163873 "+("text-center"+(i?" readonly":"")||!1)},b("input",Object(n.a)({checked:r.id==a,name:"package_id",onChange:t,type:"radio",value:r.id},{readOnly:i},{className:"jsx-2081163873"})),b("span",{className:"jsx-2081163873 fake-input"},b("div",{className:"jsx-2081163873 suscripcion"},"Suscripci\xf3n"),b("div",{className:"jsx-2081163873 d-block name"},r.name),(r.amount!==r.amount_with_discount||"$0"===r.amount&&!o)&&b("div",{className:"jsx-2081163873 "+((o?"discount-value":"value")||"")},r.amount),o&&b("div",{className:"jsx-2081163873 value"},r.amount_with_discount),b("div",{className:"jsx-2081163873 btn-suscribir"},c||"Suscribir")),b(l.a,{id:"2081163873"},["label.jsx-2081163873{cursor:pointer;display:block;margin-bottom:15px;overflow:hidden;position:relative;}","input.jsx-2081163873{opacity:0;position:absolute;}",".fake-input.jsx-2081163873{display:block;padding:15px;-webkit-transition:border-color .3s;transition:border-color .3s;background-color:#282828;color:#FFF;}","input.jsx-2081163873:checked+.fake-input.jsx-2081163873{padding:14px;background-color:var(--primary);}",".name.jsx-2081163873{font-size:1.33em;margin-bottom:5px;}",".discount-value.jsx-2081163873{-webkit-text-decoration:line-through;text-decoration:line-through;margin-right:5px;color:red;}",".readonly.jsx-2081163873{cursor:default;}",".value.jsx-2081163873{margin-top:1.4em;font-weight:bold;}",".btn-suscribir.jsx-2081163873{margin-top:1.3em;background-color:transparent !important;border:1px solid #FFF !important;font-weight:normal;border-radius:4.6px;color:#FFF;padding:0.8em 1em;font-size:0.8em;}",".suscripcion.jsx-2081163873{margin:0 0 1.4em 0;font-weight:bold;}"]))};t.b=Object(u.a)(Object(d.memo)((function(e){var t=e.error,a=e.items,r=(e.loading,e.onChange),s=e.package_id,p=e.validationError,u=e.readOnly,f=e.discount_id,x=e.setBlockDiscountFields,y=e.api,h=Object(d.useState)([]),w=h[0],j=h[1],k=Object(c.a)(a).slice(1);return Object(d.useEffect)((function(e){!function(){var e=Object(o.a)(i.a.mark((function e(t){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x(!0),!f){e.next=7;break}return e.next=4,y.get("discounts/".concat(f,"/packages"));case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0=[];case 8:a=e.t0,n=a.data,j(n),x(!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()()}),[f]),t?b("div",null,"No se pueden cargar paquetes"):b("section",{className:"jsx-2040892213 packages"},b("div",{className:"jsx-2040892213 row gutter-15 packages__list"},k&&k.map((function(e,t){var a=w?w.find((function(t){return t.id==e.id})):null;return b("div",Object(n.a)({key:t},{className:"jsx-2040892213 col-6 col-md"}),b(m.a,null,b(g,{onChange:r,readOnly:u,discount:a,package_id:s,plan:e})))}))),p&&b("div",{className:"jsx-2040892213 invalid-feedback"},p),b(l.a,{id:"2040892213"},[".packages.jsx-2040892213{margin-bottom:15px;}",".packages__list.jsx-2040892213{margin-bottom:-15px;}"]))})))},T5bk:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a("DSFK"),r=a("25BE"),i=a("BsWD"),o=a("PYwp");function c(e){return Object(n.a)(e)||Object(r.a)(e)||Object(i.a)(e)||Object(o.a)()}},T9XV:function(e,t,a){"use strict";a.r(t);var n=a("o0o1"),r=a.n(n),i=a("HaE+"),o=a("wx14"),c=a("gGgb"),s=a("80PL"),l=a("bHkH"),d=a("oBQu"),p=a("z0Ou"),m=a("q1tI"),u=a.n(m),b=a("rxnA"),g=a("ceL4"),f=a("ksHM"),x=a("3Z25"),y=u.a.createElement,h=function(e){var t=e.index,a=e.onClick;return y("nav",{style:{display:"none"}},y("ol",{className:"cd-breadcrumb triangle"},y("li",{onClick:function(){return a(0)},className:0===t?"current":""},y("a",{href:"javascript:;"},"Seus dados")),y("li",{onClick:function(){return a(1)},className:1===t?"current":""},y("a",{href:"javascript:;"},"Planos")),y("li",{onClick:function(){return a(2)},className:2===t?"current":""},y("a",{href:"javascript:;"},"Pagamento"))))},w=a("USah"),j=u.a.createElement,k=function(e){var t=e.api,a=e.layoutProps,n=e.packages,r=(e.user,function(e,t){E(e),O(t)}),i=Object(m.useState)({}),c=i[0],u=i[1],y=function(e){e>0&&E(e-1)},k=b.d,v=Object(m.useState)(),_=v[0],O=v[1],N=Object(m.useState)({package_id:"",payment_method_id:null,payment_os:null,cash_payment_method_id:null,terms:null,discount_id:null}),S=N[0],P=N[1],D=Object(m.useState)(0),C=D[0],E=D[1],F=Object(m.useState)(),z=(F[0],F[1],Object(m.useState)()),H=z[0],I=(z[1],function(e){P({package_id:e})});return j(s.a,{header:"hidden",footer:"show",customClass:"subscription-screen"},j(g.a,null),j(h,{index:C,onClick:r}),j("div",{className:"card-wrapper d-flex align-items-center justify-content-center h-100 responsive",style:{backgroundImage:"url('/static/".concat(b.g,"/subs/background.jpg')")}},j("div",{className:"card"},j("div",{className:"card-header text-center",style:{backgroundColor:"#242627",padding:"25px 15px",border:"none",borderRadius:"0",justifyContent:"center",display:"flex",width:"100%"}},j("div",{className:"img-logoApp-card img"}," ",j(w.a,null))),j("div",{className:"card-body"},function(){switch(C){case 0:return j(l.default,{api:t,layoutProps:a,handleSubmit:r,formData:c,setFormData:u});case 1:return j(d.default,{api:t,layoutProps:a,handleSubmit:r,handleFormState:y,formData:c,setFormData:u});case 2:return j(x.default,{packages:n,layoutProps:a,selectPackage:I,handleSubmit:r,handleFormState:y,formData:c,setFormData:u});case 3:return j(f.default,Object(o.a)({package_id:S.package_id,packages:n,userData:_,api:t,error:H,requireds:k,handleSubmit:r},{handleFormState:y,formData:c,setFormData:u}));case 4:return j(p.default,Object(o.a)({handleFormState:y},{api:t}))}}()))),j("style",{sjx:!0},"\n\n        .signup-screen .card-wrapper .card .card-header\n        .img-logoApp-card img,\n        .subscription-screen .card-wrapper .card .card-header .img-logoApp-card img {\n          width: 100%!important;\n        }\n\n        .signup-screen .card-wrapper .card .card-body, .subscription-screen .card-wrapper .card .card-body {\n          height:100%!important;\n        }\n\n        .img-logoApp-card{\n          max-width: 200px;\n        }\n\n      @media(max-width: 765px) {\n\n        .responsive {\n          display: flex;\n          flex-wrap: wrap;\n          height:100%!important;\n        }\n\n          }\n        .card{\n          background-color: rgba(255,255,255,0.85);\n        }\n\n        .card-body {\n          background-image: url()!important;\n        }\n\n        label {\n          display: inline-block;\n          margin-bottom: .5rem;\n          text-align: center;\n        }\n\n        .justify-content-end {\n          display:flex;\n          justify-content:center!important;\n        }\n\n        form{\n          padding 0px!important;\n        }\n\n        .row {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-wrap: wrap;\n          margin-right: 0px;\n          margin-left: 0px;\n          }\n\n        .col-8 {\n          max-width: 100%!important;\n        }\n      }\n\n      "))};k.getInitialProps=function(){var e=Object(i.a)(r.a.mark((function e(t){var a,n,i,o,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.api,t.res,n=t.user,e.prev=1,e.next=4,a.get("packages");case 4:o=e.sent,c=o.data,i={items:c},e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),i={error:e.t0};case 12:return e.abrupt("return",{packages:i,user:n});case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();t.default=Object(c.a)(k,!0)},ceL4:function(e,t,a){"use strict";var n=a("MX0m"),r=a.n(n),i=a("aSns"),o=a.n(i),c=a("YFqc"),s=a.n(c),l=a("nOHt"),d=a("q1tI"),p=a.n(d),m=a("vOnD"),u=(a("rOcY"),a("rxnA")),b=a("d36P"),g=a("7NIq"),f=a("RmiK"),x=(a("pLwp"),a("6ICi")),y=a("USah"),h=a("d5Q9"),w=a("M09o"),j=p.a.createElement,k=m.d.header.withConfig({displayName:"HeaderCad__StyledHeader",componentId:"upmaek-0"})(["background-color:",";box-shadow:0 0 5px rgba(var(--black-rgb),",");color:",";font-family:var(--sans-serif);font-size:16px;font-weight:bold;min-width:100%;padding:0px;position:",";transition:",";width:90%;z-index:10;@media (min-width:768px){padding:0px;}"],(function(e){return e.closed?"var(--background)":e.scrolled?o()(e.theme.colors.background).fade(.1).string():"white"===e.layoutColor?e.theme.colors.background:"transparent"}),(function(e){return"white"!==e.layoutColor&&e.scrolled?".9":"0"}),(function(e){return e.theme.colors.texts}),(function(e){return e.closed?"static":"fixed"}),(function(e){return e.closed?"background-color .3s, box-shadow .3s":"background-color .6s, box-shadow .6s"})),v=function(e){return j("div",{className:"jsx-3499172547 club-logo"},j(s.a,{href:"/"},j("a",{className:"jsx-3499172547"},j(f.a,null))),j(r.a,{id:"3499172547"},[".club-logo.jsx-3499172547{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:45px;padding:5px;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:45px;}",".club-logo.jsx-3499172547 a.jsx-3499172547{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}","@media (min-width:768px){.club-logo.jsx-3499172547{height:55px;margin-right:5px;width:55px;}}"]))},_=function(e){var t=e.closed;return j("h1",{className:r.a.dynamic([["574476306",[t?0:"20px"]]])+" logo"},j(g.a,{href:"/"},j("a",{className:r.a.dynamic([["574476306",[t?0:"20px"]]])},j(y.a,{height:"lau"===u.g?30:"river"===u.g?22:25}))),j(r.a,{id:"574476306",dynamic:[t?0:"20px"]},[".logo.__jsx-style-dynamic-selector{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:-5px;margin-bottom:-5px;}",".logo.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;padding:5px;}","@media (min-width:768px){.logo.__jsx-style-dynamic-selector{margin-right:".concat(t?0:"20px",";}}")]))};t.a=function(e){var t=e.closed,a=e.layoutColor,n=(e.menus,Object(d.useContext)(h.a)),i=(n.closeAuthModal,n.openAuthModal),o=function(e){return window.pageYOffset>1};var c=Object(d.useState)(o()),u=c[0],g=c[1];Object(d.useEffect)((function(e){var t=function(e){g(o())};return window.addEventListener("scroll",t),function(e){window.removeEventListener("scroll",t)}}),[]);Object(l.useRouter)(),Object(d.useRef)(null),Object(d.useContext)(b.b).setSearch;var f=Object(d.useState)("");f[0],f[1];var O=Object(d.useContext)(m.a),N=O.colors.white,S=O.colors.texts;return j(k,{closed:t,layoutColor:a,scrolled:u},j("nav",{className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" nav"},!t&&j(v,null),j("div",{className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" img-display"},j(_,{closed:t})),!t&&j(p.a.Fragment,null,j("div",{className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" style-button"},j(s.a,{href:"/signup"},j("button",{href:"/signup",className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" item-style3"},"Registrate")),j("button",{onClick:function(e){e.preventDefault(),w.a({action:"submit_form",category:"Contact",label:"Message here"}),i()},className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" item-style2"},"Entrar")),j(x.a,null))),j("nav",{className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" logo-app"},!t&&j("div",{className:r.a.dynamic([["2034424673",[t?"center":"space-between",N,S,S]]])+" img-logoApp"},j(y.a,null))),j(r.a,{id:"2034424673",dynamic:[t?"center":"space-between",N,S,S]},[".nav.__jsx-style-dynamic-selector{background:#26292b;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:".concat(t?"center":"space-between",";-webkit-justify-content:").concat(t?"center":"space-between",";-ms-flex-pack:").concat(t?"center":"space-between",";justify-content:").concat(t?"center":"space-between",";heigth:60%;padding:0px 16px;}"),".img-display.__jsx-style-dynamic-selector{display:block;}",".logo-app.__jsx-style-dynamic-selector{display:none;}",".style-button.__jsx-style-dynamic-selector{margin:auto;margin-right:revert;}",".img-logoApp.__jsx-style-dynamic-selector{width:40%!important;height:100%!important;padding:18px!important;}",".item-style3.__jsx-style-dynamic-selector{border-radius:4px;border:#3eaf58;background:#38ad30;color:white;font-size:15px;width:100px;height:27px;}",".item-style2.__jsx-style-dynamic-selector{font-size:17px;border:0px;color:white;background:transparent;padding:10px;}",".form-control.__jsx-style-dynamic-selector{background-color:transparent;border:0;display:inline-block;color:".concat(N,";font-family:inherit;font-size:inherit;font-weight:inherit;outline:0;padding:0;-webkit-transition:ease .6s;transition:ease .6s;vertical-align:middle;width:0;}"),".form-control.__jsx-style-dynamic-selector:focus{box-shadow:0 0 0 .1rem var(--primary);margin-right:10px;padding:0 10px;width:15vw;}",".form-control.__jsx-style-dynamic-selector::-webkit-input-placeholder{color:".concat(S,";}"),".form-control.__jsx-style-dynamic-selector::-moz-placeholder{color:".concat(S,";}"),".form-control.__jsx-style-dynamic-selector:-ms-input-placeholder{color:".concat(S,";}"),".form-control.__jsx-style-dynamic-selector::placeholder{color:".concat(S,";}"),".search-form.__jsx-style-dynamic-selector{margin-left:auto;}",".search-btn.__jsx-style-dynamic-selector{background-color:transparent;border:0;color:".concat(S,";cursor:pointer;margin-right:10px;outline:0;padding:5px;vertical-align:middle;}"),".search-btn.__jsx-style-dynamic-selector svg{-webkit-transition:color .2s;transition:color .2s;}",".search-btn.__jsx-style-dynamic-selector:focus,.search-btn.__jsx-style-dynamic-selector:hover{color:var(--white);}",".notifications-btn.__jsx-style-dynamic-selector{background-color:transparent;border:0;cursor:pointer;outline:0;margin-right:10px;padding:5px;vertical-align:middle;}","@media(max-width:414px){.img-display.__jsx-style-dynamic-selector{display:none;width:37%!important;heigth:-webkit-fit-content;heigth:-moz-fit-content;heigth:fit-content;}.logo-app.__jsx-style-dynamic-selector{background:black;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}}"]))}},lwlN:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register/wizard/complete-test",function(){return a("T9XV")}])},z0Ou:function(e,t,a){"use strict";a.r(t);var n=a("rePB"),r=a("MX0m"),i=a.n(r),o=a("gGgb"),c=a("q1tI"),s=a.n(c),l=a("gdJV"),d=(a("a3/r"),a("rxnA")),p=a("rOcY"),m=a("aSns"),u=a.n(m),b=a("vOnD"),g=(a("nOHt"),s.a.createElement);function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function x(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}t.default=Object(o.a)((function(e){e.handleFormState;var t=Object(c.useContext)(b.a),a=u()(t.colors.primary).hsl().string(),n=Object(c.useState)({name:""}),r=n[0],o=n[1],s=Object(c.useContext)(l.b).user;return Object(c.useEffect)((function(e){s&&(console.log(s),o(x(x({},r),{},{name:s.name})))}),[s]),g("div",{className:i.a.dynamic([["266191783",[a,a]]])+" register-confirm container text-center"},g("h2",{className:i.a.dynamic([["266191783",[a,a]]])+" card-title"},"Bienvenido ",g("strong",{className:i.a.dynamic([["266191783",[a,a]]])+" text-primary"},r.name)),g("div",{className:i.a.dynamic([["266191783",[a,a]]])+" card-subtitle"},"Gracias por completar tu perfil de ",g("br",{className:i.a.dynamic([["266191783",[a,a]]])}),g("img",{src:"/static/".concat(d.g,"/logos/logo_project_black.png"),alt:p.b.appName,width:200,style:{marginTop:"20px"},className:i.a.dynamic([["266191783",[a,a]]])})),g(i.a,{id:"266191783",dynamic:[a,a]},["h2.card-title{font-weight:normal;color:#000;margin-bottom:1em;font-size:1.7em;}","div.card-subtitle{font-size:1.1em;font-weight:500;margin-bottom:2.5em;}",".text-primary{color:".concat(a," !important;}"),".register-confirm{padding-top:50px;padding-bottom:50px;color:#666666;}",".text-primary{color:".concat(a," !important;}")]))}),!0)}},[["lwlN",0,1,11,12,13,3,2,5,4,6,7,8,9,10,14,22,21,24]]]);
//# sourceMappingURL=complete-test.js.map