"use strict";(self.webpackChunkdegenesys=self.webpackChunkdegenesys||[]).push([[774],{5405:(e,t,s)=>{s.d(t,{ConfigCtrl:()=>y,zv:()=>h,uA:()=>f,ExplorerCtrl:()=>x,jb:()=>_,OptionsCtrl:()=>v,AV:()=>u,ThemeCtrl:()=>q,ToastCtrl:()=>G});var o=s(1730);const n=e=>"object"===typeof e&&null!==e,a=new WeakMap,r=new WeakSet,i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.is,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(e,t)=>new Proxy(e,t),s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e=>n(e)&&!r.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer),i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>{switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}},l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:new WeakMap,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;const n=l.get(e);if((null==n?void 0:n[0])===t)return n[1];const d=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return(0,o.jc)(d,!0),l.set(e,[t,d]),Reflect.ownKeys(e).forEach((t=>{if(Object.getOwnPropertyDescriptor(d,t))return;const n=Reflect.get(e,t),i={value:n,enumerable:!0,configurable:!0};if(r.has(n))(0,o.jc)(n,!1);else if(n instanceof Promise)delete i.value,i.get=()=>s(n);else if(a.has(n)){const[e,t]=a.get(n);i.value=c(e,t(),s)}Object.defineProperty(d,t,i)})),Object.preventExtensions(d)},d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new WeakMap,p=arguments.length>7&&void 0!==arguments[7]?arguments[7]:[1,1],u=arguments.length>8&&void 0!==arguments[8]?arguments[8]:i=>{if(!n(i))throw new Error("object required");const l=d.get(i);if(l)return l;let h=p[0];const g=new Set,f=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:++p[0];h!==t&&(h=t,g.forEach((s=>s(e,t))))};let m=p[1];const v=e=>(t,s)=>{const o=[...t];o[1]=[e,...o[1]],f(o,s)},b=new Map,y=e=>{var t;const s=b.get(e);s&&(b.delete(e),null==(t=s[1])||t.call(s))},w=Array.isArray(i)?[]:Object.create(Object.getPrototypeOf(i)),I=t(w,{deleteProperty(e,t){const s=Reflect.get(e,t);y(t);const o=Reflect.deleteProperty(e,t);return o&&f(["delete",[t],s]),o},set(t,i,l,c){const p=Reflect.has(t,i),h=Reflect.get(t,i,c);if(p&&(e(h,l)||d.has(l)&&e(h,d.get(l))))return!0;y(i),n(l)&&(l=(0,o.o5)(l)||l);let m=l;if(l instanceof Promise)l.then((e=>{l.status="fulfilled",l.value=e,f(["resolve",[i],e])})).catch((e=>{l.status="rejected",l.reason=e,f(["reject",[i],e])}));else{!a.has(l)&&s(l)&&(m=u(l));const e=!r.has(m)&&a.get(m);e&&((e,t)=>{if(b.has(e))throw new Error("prop listener already exists");if(g.size){const s=t[3](v(e));b.set(e,[t,s])}else b.set(e,[t])})(i,e)}return Reflect.set(t,i,m,c),f(["set",[i],l,h]),!0}});d.set(i,I);const C=[w,function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:++p[1];return m===e||g.size||(m=e,b.forEach((t=>{let[s]=t;const o=s[1](e);o>h&&(h=o)}))),h},c,e=>{g.add(e),1===g.size&&b.forEach(((e,t)=>{let[s,o]=e;if(o)throw new Error("remove already exists");const n=s[3](v(t));b.set(t,[s,n])}));return()=>{g.delete(e),0===g.size&&b.forEach(((e,t)=>{let[s,o]=e;o&&(o(),b.set(t,[s]))}))}}];return a.set(I,C),Reflect.ownKeys(i).forEach((e=>{const t=Object.getOwnPropertyDescriptor(i,e);"value"in t&&(I[e]=i[e],delete t.value,delete t.writable),Object.defineProperty(w,e,t)})),I};return[u,a,r,e,t,s,i,l,c,d,p]},[l]=i();function c(){return l(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function d(e,t,s){const o=a.get(e);let n;o||console.warn("Please use proxy object");const r=[],i=o[3];let l=!1;const c=i((e=>{r.push(e),s?t(r.splice(0)):n||(n=Promise.resolve().then((()=>{n=void 0,l&&t(r.splice(0))})))}));return l=!0,()=>{l=!1,c()}}const p=c({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),u={state:p,subscribe:e=>d(p,(()=>e(p))),push(e,t){e!==p.view&&(p.view=e,t&&(p.data=t),p.history.push(e))},reset(e){p.view=e,p.history=[e]},replace(e){p.history.length>1&&(p.history[p.history.length-1]=e,p.view=e)},goBack(){if(p.history.length>1){p.history.pop();const[e]=p.history.slice(-1);p.view=e}},setData(e){p.data=e}},h={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile:()=>typeof window<"u"&&Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)),isAndroid:()=>h.isMobile()&&navigator.userAgent.toLowerCase().includes("android"),isIos(){const e=navigator.userAgent.toLowerCase();return h.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl:e=>e.startsWith("http://")||e.startsWith("https://"),isArray:e=>Array.isArray(e)&&e.length>0,formatNativeUrl(e,t,s){if(h.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let o=e;o.includes("://")||(o=e.replaceAll("/","").replaceAll(":",""),o="".concat(o,"://")),o.endsWith("/")||(o="".concat(o,"/")),this.setWalletConnectDeepLink(o,s);const n=encodeURIComponent(t);return"".concat(o,"wc?uri=").concat(n)},formatUniversalUrl(e,t,s){if(!h.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let o=e;o.endsWith("/")||(o="".concat(o,"/")),this.setWalletConnectDeepLink(o,s);const n=encodeURIComponent(t);return"".concat(o,"wc?uri=").concat(n)},wait:async e=>new Promise((t=>{setTimeout(t,e)})),openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(h.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(h.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(h.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(h.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=null==(e=u.state.data)?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},g=c({enabled:typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),userSessionId:"",events:[],connectedWalletId:void 0}),f={state:g,subscribe:e=>d(g.events,(()=>e(function(e,t){const s=a.get(e);s||console.warn("Please use proxy object");const[o,n,r]=s;return r(o,n(),t)}(g.events[g.events.length-1])))),initialize(){g.enabled&&typeof(null==crypto?void 0:crypto.randomUUID)<"u"&&(g.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){g.connectedWalletId=e},click(e){if(g.enabled){const t={type:"CLICK",name:e.name,userSessionId:g.userSessionId,timestamp:Date.now(),data:e};g.events.push(t)}},track(e){if(g.enabled){const t={type:"TRACK",name:e.name,userSessionId:g.userSessionId,timestamp:Date.now(),data:e};g.events.push(t)}},view(e){if(g.enabled){const t={type:"VIEW",name:e.name,userSessionId:g.userSessionId,timestamp:Date.now(),data:e};g.events.push(t)}}},m=c({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),v={state:m,subscribe:e=>d(m,(()=>e(m))),setChains(e){m.chains=e},setWalletConnectUri(e){m.walletConnectUri=e},setIsCustomDesktop(e){m.isCustomDesktop=e},setIsCustomMobile(e){m.isCustomMobile=e},setIsDataLoaded(e){m.isDataLoaded=e},setIsUiLoaded(e){m.isUiLoaded=e},setIsAuth(e){m.isAuth=e}},b=c({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),y={state:b,subscribe:e=>d(b,(()=>e(b))),setConfig(e){var t,s;f.initialize(),v.setChains(e.chains),v.setIsAuth(Boolean(e.enableAuthMode)),v.setIsCustomMobile(Boolean(null==(t=e.mobileWallets)?void 0:t.length)),v.setIsCustomDesktop(Boolean(null==(s=e.desktopWallets)?void 0:s.length)),h.setModalVersionInStorage(),Object.assign(b,e)}};var w=Object.defineProperty,I=Object.getOwnPropertySymbols,C=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable,O=(e,t,s)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const E="https://explorer-api.walletconnect.com",j="wcm",L="js-2.6.2";async function A(e,t){const s=((e,t)=>{for(var s in t||(t={}))C.call(t,s)&&O(e,s,t[s]);if(I)for(var s of I(t))W.call(t,s)&&O(e,s,t[s]);return e})({sdkType:j,sdkVersion:L},t),o=new URL(e,E);return o.searchParams.append("projectId",y.state.projectId),Object.entries(s).forEach((e=>{let[t,s]=e;s&&o.searchParams.append(t,String(s))})),(await fetch(o)).json()}const k={getDesktopListings:async e=>A("/w3m/v1/getDesktopListings",e),getMobileListings:async e=>A("/w3m/v1/getMobileListings",e),getInjectedListings:async e=>A("/w3m/v1/getInjectedListings",e),getAllListings:async e=>A("/w3m/v1/getAllListings",e),getWalletImageUrl:e=>"".concat(E,"/w3m/v1/getWalletImage/").concat(e,"?projectId=").concat(y.state.projectId,"&sdkType=").concat(j,"&sdkVersion=").concat(L),getAssetImageUrl:e=>"".concat(E,"/w3m/v1/getAssetImage/").concat(e,"?projectId=").concat(y.state.projectId,"&sdkType=").concat(j,"&sdkVersion=").concat(L)};var M=Object.defineProperty,U=Object.getOwnPropertySymbols,D=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,S=(e,t,s)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const N=h.isMobile(),T=c({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),x={state:T,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=y.state;if("NONE"===e||"ALL"===t&&!e)return T.recomendedWallets;if(h.isArray(e)){const t={recommendedIds:e.join(",")},{listings:s}=await k.getAllListings(t),o=Object.values(s);o.sort(((t,s)=>e.indexOf(t.id)-e.indexOf(s.id))),T.recomendedWallets=o}else{const{chains:e,isAuth:s}=v.state,o=null===e||void 0===e?void 0:e.join(","),n=h.isArray(t),a={page:1,sdks:s?"auth_v1":void 0,entries:h.RECOMMENDED_WALLET_AMOUNT,chains:o,version:2,excludedIds:n?t.join(","):void 0},{listings:r}=N?await k.getMobileListings(a):await k.getDesktopListings(a);T.recomendedWallets=Object.values(r)}return T.recomendedWallets},async getWallets(e){const t=((e,t)=>{for(var s in t||(t={}))D.call(t,s)&&S(e,s,t[s]);if(U)for(var s of U(t))P.call(t,s)&&S(e,s,t[s]);return e})({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:o}=y.state,{recomendedWallets:n}=T;if("ALL"===o)return T.wallets;n.length?t.excludedIds=n.map((e=>e.id)).join(","):h.isArray(s)&&(t.excludedIds=s.join(",")),h.isArray(o)&&(t.excludedIds=[t.excludedIds,o].filter(Boolean).join(",")),v.state.isAuth&&(t.sdks="auth_v1");const{page:a,search:r}=e,{listings:i,total:l}=N?await k.getMobileListings(t):await k.getDesktopListings(t),c=Object.values(i),d=r?"search":"wallets";return T[d]={listings:[...T[d].listings,...c],total:l,page:null!==a&&void 0!==a?a:1},{listings:c,total:l}},getWalletImageUrl:e=>k.getWalletImageUrl(e),getAssetImageUrl:e=>k.getAssetImageUrl(e),resetSearch(){T.search={listings:[],total:0,page:1}}},R=c({open:!1}),_={state:R,subscribe:e=>d(R,(()=>e(R))),open:async e=>new Promise((t=>{const{isUiLoaded:s,isDataLoaded:o}=v.state;if(h.removeWalletConnectDeepLink(),v.setWalletConnectUri(null===e||void 0===e?void 0:e.uri),v.setChains(null===e||void 0===e?void 0:e.chains),u.reset("ConnectWallet"),s&&o)R.open=!0,t();else{const e=setInterval((()=>{const s=v.state;s.isUiLoaded&&s.isDataLoaded&&(clearInterval(e),R.open=!0,t())}),200)}})),close(){R.open=!1}};var V=Object.defineProperty,B=Object.getOwnPropertySymbols,H=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable,z=(e,t,s)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const J=c({themeMode:typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}),q={state:J,subscribe:e=>d(J,(()=>e(J))),setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(J.themeMode=t),s&&(J.themeVariables=((e,t)=>{for(var s in t||(t={}))H.call(t,s)&&z(e,s,t[s]);if(B)for(var s of B(t))K.call(t,s)&&z(e,s,t[s]);return e})({},s))}},F=c({open:!1,message:"",variant:"success"}),G={state:F,subscribe:e=>d(F,(()=>e(F))),openToast(e,t){F.open=!0,F.message=e,F.variant=t},closeToast(){F.open=!1}}},62:(e,t,s)=>{s.d(t,{WalletConnectModal:()=>n});var o=s(5405);class n{constructor(e){this.openModal=o.jb.open,this.closeModal=o.jb.close,this.subscribeModal=o.jb.subscribe,this.setTheme=o.ThemeCtrl.setThemeConfig,o.ThemeCtrl.setThemeConfig(e),o.ConfigCtrl.setConfig(e),this.initUi()}async initUi(){if(typeof window<"u"){await Promise.all([s.e(910),s.e(54)]).then(s.bind(s,54));const e=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",e),o.OptionsCtrl.setIsUiLoaded(!0)}}}}}]);
//# sourceMappingURL=774.9dd01255.chunk.js.map