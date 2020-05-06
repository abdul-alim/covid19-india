(this["webpackJsonpcovid19-india"]=this["webpackJsonpcovid19-india"]||[]).push([[0],{44:function(e,a,t){e.exports=t(73)},49:function(e,a,t){},72:function(e,a,t){},73:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(38),s=t.n(c),l=(t(49),t(9)),o=t(12),i=t(1);var d=function(e){var a=e.pages,t=Object(n.useState)(!1),c=Object(i.a)(t,2);return c[0],c[1],r.a.createElement("nav",{className:"flex items-center flex-wrap bg-white text-primary py-2"},r.a.createElement("div",{className:"container py-2 px-2 items-center font-bold text-lg"},r.a.createElement("div",{className:"w-full flex items-center justify-between -my-2"},r.a.createElement("div",{className:"flex items-center cursor-pointer lg:flex"},r.a.createElement("img",{src:"/images/covid.svg",alt:"logo",className:"h-10 w-auto mr-3"}),r.a.createElement("div",{className:"text-xl font-bold text-black text-primary"},"COVID-19 India",r.a.createElement("span",{className:"text-red-600 uppercase live-txt blink"},"Live"))),r.a.createElement("div",{className:"flex ml-auto mr-1"},a.map((function(e,a){return!0===e.showInNavbar?r.a.createElement(l.NavLink,{exact:!0,to:e.pageLink,key:a,className:"mx-1 px-3 py-4 hidden lg:block nav-link",activeClassName:"relative nav-link-active"},r.a.createElement("span",(t=e.pageLink,n=e.animationDelayForNavbar,{className:"".concat(window.location.pathname===t?"focused":""),style:{animationDelay:"".concat(n,"s")}}),e.displayName)):null;var t,n}))))))},m=t(5),u=t.n(m),f=t(10),p=t(14),v=t(20),h=t(24);var b=function(e){var a=e.up,t=e.rotate,n=void 0===t?0:t,c=a?"5 12 12 5 19 12":"5 12 12 19 19 12",s={};return n&&(s.transform="rotate(".concat(n,"deg)")),r.a.createElement("svg",{style:Object(h.a)({marginTop:"-0.14rem"},s),className:"inline-block",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("line",{x1:"12",y1:"19",x2:"12",y2:"5"}),r.a.createElement("polyline",{points:c}))},y=Object(n.forwardRef)((function(e,a){e.count;var t=e.cards,c=e.styles,s=void 0===c?{}:c,l=e.callback,o=Object(n.useState)(t),d=Object(i.a)(o,2),m=d[0],u=d[1],f=Object(n.useState)(m[0].name),p=Object(i.a)(f,2),h=p[0],y=p[1];function x(e){y(e.name),u(Object(v.a)(m))}return Object(n.useImperativeHandle)(a,(function(){return{updateDisplayCardCounts:function(e){u(e)}}})),r.a.createElement("div",{className:"flex flex-row justify-center my-5 justify-between"},m.map((function(e,a){var t,n,c,o;return!1===s.bg&&e.name!==h||(t="bg-".concat(e.colorClass,"-100"),n="bg-".concat(e.colorClass,"-200")),!1!==s.shadow&&(c="shadow"),!1!==s.autoWidth&&(o="flex-auto"),l=l||function(){},r.a.createElement("div",{onClick:function(){x(e),l(e,a)},onTouchStart:function(){x(e),l(e,a)},key:a,className:"".concat(a?"ml-2":""," w-24 flex ").concat(o," flex-col rounded overflow-hidden cursor-pointer ").concat(c," text-center text-").concat(e.colorClass,"-600")},r.a.createElement("div",{className:"pt-2 flex flex-auto flex-col items-center justify-center ".concat(t," font-bold")},r.a.createElement("span",{className:"text-xs"},e.delta?r.a.createElement(b,{up:e.delta>=0}):"",e.delta),r.a.createElement("span",{className:"text-xl lg:text-2xl py-1"},e.value+"")),r.a.createElement("div",{className:"py-2 w-full ".concat(n," text-sm font-semibold")},r.a.createElement("span",{className:"capitalize"},e.name)))})))})),x=t(4),E=t.n(x);var g=function(e){var a=Object(n.useState)({columns:e.columns,rows:e.rows.filter((function(e){return e.confirmed>0}))}),t=Object(i.a)(a,2),c=t[0],s=c.rows,o=c.columns,d=t[1];s=s.filter((function(e){return e.confirmed>0})),Object(n.useEffect)((function(){d({columns:e.columns.slice(0),rows:e.rows.slice(0)})}),[e]);var m=function(e){var a=e.currentTarget,t=a.dataset.prop,n=a.ascending=!a.ascending,r=s.slice(0).sort((function(e,a){return n?function(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}(e[t],a[t]):function(e,a){return e<a?-1:e>a?1:e>=a?0:NaN}(e[t],a[t])}));d({rows:r,columns:o})};return r.a.createElement("table",{className:"w-full"},r.a.createElement("tbody",{className:"text-xs leading-tight border-b-2 cursor-pointer"},r.a.createElement("tr",null,o.map((function(e){return r.a.createElement("th",{className:"capitalize border px-2 py-2 sort-by sticky bg-white",key:e.name,onClick:m,"data-prop":e.accessor,title:"Click to sort"},e.name)})))),r.a.createElement("tbody",{className:"font-bold"},s.map((function(a,t){return r.a.createElement("tr",{key:t},o.map((function(t,n){var c=t.accessor,s=t.colorClass,o=0,i=a[c],d="";return a.today&&(o=a.today[c]),"Unknown"===a.district&&(d="bg-".concat(s,"-200 text-").concat(s,"-600")),e.link&&0===n&&(i=r.a.createElement(l.Link,{to:"/state/".concat(a.stateCode)},i,r.a.createElement("span",{className:"ml-1 text-gray-600"},r.a.createElement(b,{rotate:-90})))),r.a.createElement("td",{key:n,className:"".concat(0===n?"bg-gray-200":"text-right","  text-2xs border px-2 py-2 ").concat(d)},r.a.createElement("span",null,n>0&&o?r.a.createElement("span",{className:" mr-1 text-".concat(s,"-600 break-words")},r.a.createElement(b,{up:o>0}),r.a.createElement("span",null,o)):""),r.a.createElement("span",{className:"text-xs"},i))})))}))))},w=t(15),j=t(16),N=t(18),O=t(17),k={confirmed:"red",active:"orange",recovered:"green",dead:"gray",tested:"blue"},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2?arguments[2]:void 0;return t.map((function(t){return{name:t,value:e[t],delta:a[t],colorClass:k[t]}}))},D=function(e){Object(N.a)(t,e);var a=Object(O.a)(t);function t(e){var n;return Object(w.a)(this,t),(n=a.call(this)).state=Object(h.a)({},e.initCardData,{cards:e.cards}),n.child=r.a.createRef(),n}return Object(j.a)(t,[{key:"update",value:function(e,a){this.setState(e);var t=C(e,a,this.props.cards);this.child.current.updateDisplayCardCounts(t)}},{key:"render",value:function(){var e=C(this.state,this.state.today,this.props.cards),a=this.state.name;return r.a.createElement("div",null,r.a.createElement("h2",{className:"font-extra-bold text-xl text-primary my-2"},a),r.a.createElement(y,{styles:{bg:!1,autoWidth:!1},cards:e,ref:this.child,callback:this.props.callback}))}}]),t}(r.a.Component),S=window.d3,R=function(e){Object(N.a)(t,e);var a=Object(O.a)(t);function t(e){var n;return Object(w.a)(this,t),(n=a.call(this,e)).handleMapHover=function(e,a){n.child.current.update(e,a)},n.child=r.a.createRef(),n}return Object(j.a)(t,[{key:"componentDidMount",value:function(){var e=Object(f.a)(u.a.mark((function e(){var a,t,n,r,c,s,l,o,d,m,f,p,h,b,y,x,g,w,j,N,O,k,C=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.props,t=a.stateCode,n=a.seriesPoints,r=a.joinBy,c=a.zones,s=t.toLowerCase(),l="countries-ind-".concat(s,"-2"),o=[],this.mapExtents={confirmed:{count:S.max(n,(function(e){return e.confirmed})),colors:["#fff4ec","#ff1100"]},active:{count:S.max(n,(function(e){return e.active})),colors:["#fff4ec","#f36f40"]},recovered:{count:S.max(n,(function(e){return e.recovered})),colors:["#f4fcee","#007e1a"]},dead:{count:S.max(n,(function(e){return e.dead})),colors:["#fcfbfc","#2f2f2f"]}},d={},n.forEach((function(e){d[e[r]]=e})),m={},c&&c.forEach((function(e){m[e[0]]=e[1]})),e.next=8,Promise.all([E.a.get("/maps/".concat(t,".topojson")),E.a.get("/charts/map.json")]);case 8:f=e.sent,p=Object(i.a)(f,2),h=p[0].data,b=p[1].data,window.$ZC.mapCollections[l]=h,y=[],o=h.objects.source.geometries.map((function(e){var a=e.properties.name_ascii,t=0,n=0,r=0,s=0;if(d[a]){var l=d[a];t=l.confirmed,n=l.active,r=l.recovered,s=l.dead}y.push(a);var o=null;return c&&(o=m[a]),[a,t,n,r,s,o]})),n.forEach((function(e){y.includes(e[r])||console.log("map mitchmatch",e[r])})),console.log("*****************************"),c&&c.forEach((function(e){y.includes(e[0])||console.log("zone mitchmatch",e[0])})),this.myDiv&&(this.myDiv.classList.add("fade-in"),b.map.scope=l,b.seriesdata.chartdata[0].data=[o],b.legend.colors=Object(v.a)(this.mapExtents.confirmed.colors),b.legend.colorBand.stops=[0,this.mapExtents.confirmed.count],x=null,g=this.props,w=g.callback,j=g.tapCallback,N=g.clickCallback,O=function(e,a){var t=Object(i.a)(a.point,5),n=t[0],r=t[1],c=t[2],s=t[3],l=t[4],o={recovered:0,confirmed:0,active:0,dead:0};d[n]&&(o=d[n].today);var m={name:n,confirmed:r,active:c,recovered:s,dead:l};n!==x&&(C.handleMapHover(m,o),x=n),w&&w(m,o),window.d3.event.allowDefault=!0},k=function(){return window.d3.event.allowDefault=!0},b.chart.plot.plotoptions.geoheatmap.events={mousemove:O,tap:function(e,a){O(0,a),j&&j(e,a,C.map),window.d3.event.allowDefault=!0},click:N||k},this.map=window.$ZC.maps(this.myDiv,b),window.chart=this.map);case 19:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"callback",value:function(e,a){this.map.userdata.legend.colors=Object(v.a)(this.mapExtents[e.name].colors),this.map.userdata.legend.colorBand.stops=[0,this.mapExtents[e.name].count],this.map.userdata.legend.colorBand.ranges=null,this.map.userdata.legend.filter.enabled=!1,this.map.userdata.metadata.axes.clr=[a+1],this.map.userdata.chart.plot.plotoptions.geoheatmap.strokeColor=["#e84b36","#f88658","#007e1a","#2f2f2f"][a],this.map.eventHandler.mapEvents.clearHighlightedPoints(),this.map.redraw()}},{key:"changeMapType",value:function(e){S.selectAll("button").classed("text-primary",!1),e.target.classList.add("text-primary"),"zone"===e.target.name?(this.map.userdata.legend.colors=["#ff1100","#f88658","#009688"],this.map.userdata.legend.colorBand.ranges=[["Red Zone"],["Orange Zone"],["Green Zone"]],this.map.userdata.chart.plot.plotoptions.geoheatmap.strokeColor="#ddd",this.map.userdata.legend.filter.enabled=!0,this.map.userdata.metadata.axes.clr=[5],this.map.eventHandler.mapEvents.clearHighlightedPoints(),this.map.redraw()):this.callback({name:this.props.cards[0]},0)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(D,{ref:this.child,initCardData:this.props.initCardData,cards:this.props.cards,callback:this.callback.bind(this)}),r.a.createElement("div",{className:"live-map my-6",ref:function(a){return e.myDiv=a}}),this.props.zones&&r.a.createElement("div",{className:"my-4 text-sm"},r.a.createElement("button",{className:"bg-gray-300 px-4 py-3 font-bold text-primary",name:"default",onClick:this.changeMapType.bind(this),onTouchStart:this.changeMapType.bind(this)},"Affected Areas"),r.a.createElement("button",{className:"bg-gray-300 px-4 py-3 font-bold ml-2",name:"zone",onClick:this.changeMapType.bind(this),onTouchStart:this.changeMapType.bind(this)},"Zones")))}}]),t}(r.a.Component);window.colorFinder=function(e,a,t){if(0===t[e.userdata.metadata.axes.clr[0]])return"white"};var T=R,B={DL:18498192,HR:27793351,KL:35461849,HP:7384022,PB:29875481,GA:1564349,TG:38919054,UT:11140566,CH:1142479,LD:72172,DN:384058,GJ:64801901,CT:28989789,DD:223165,AN:411278,TN:77177540,MH:121924973,KA:66834193,OR:45861035,WB:98662146,PY:1394026,AP:53390841,JH:37933898,TR:4112223,MP:83849671,MZ:1222134,UP:233378519,RJ:79584255,SK:680721,BR:122256981,MN:3048861,AR:1548776,JK:13468313,LA:279924,NL:2218634,ML:3320226,AS:35080827},L="https://uidai.gov.in/images/state-wise-aadhaar-saturation.pdf",M=window.d3,A=M.timeParse("%d/%m/%Y"),P=M.timeFormat("%B %d");function I(e,a,t){var n;return n=r.a.createElement("div",{className:"text-xs"},"Total"===t?"As per latest IMCR ":"Till ".concat(P(A(e.date))," as per "),r.a.createElement("a",{href:e.source,rel:"noopener",className:"bg-blue-100",target:"_blank"},"Total"===t?"Report":"source")),{tested:e.tested.toLocaleString(),date:n,population:a.toLocaleString(),test_per_million:Math.round(e.tested/a*1e6).toLocaleString(),label:" - ".concat(t)}}var F=function(e){Object(N.a)(t,e);var a=Object(O.a)(t);function t(e){var n;return Object(w.a)(this,t),(n=a.call(this,e)).child=r.a.createRef(),n}return Object(j.a)(t,[{key:"componentDidMount",value:function(){var e=Object(f.a)(u.a.mark((function e(){var a,t,n,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=this.props,t=a.seriesData,n=a.name,r=a.callback,this.myDiv&&(c=window.$ZC.charts(this.myDiv,t),r&&r(c,n));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"h-full",ref:function(a){return e.myDiv=a}})}}]),t}(r.a.Component);function H(e,a,t,n,r){var c=t.map((function(t){return e.map((function(e,n){return"$index"===a?[n,e[t]]:[e[a],e[t]]}))}));return n&&c.forEach((function(e){!function(e,a){var t=0;e.forEach((function(e){e[a]+=t,t=e[a]}))}(e,1)})),r&&(c=c.map((function(e){return e.slice(-r)}))),c}function _(e){return e.charAt(0).toUpperCase()+e.slice(1)}function J(e,a){var t=Math.pow(10,a);return+(Math.round((e+Number.EPSILON)*t)/t).toFixed(a)}function z(e,a){var t=Math.max(0,e-a),n=function(e,a){var t=e>1?"s":"";return"day"===a&&1===e?"Yesterday":"".concat(e," ").concat(a).concat(t," ago")};return t<6e4?"".concat(Math.round(t/1e3)," seconds ago"):t<36e5?n(Math.round(t/6e4),"minute"):t<864e5?n(Math.round(t/36e5),"hour"):t<2592e6?n(Math.round(t/864e5),"day"):t<31536e6?n(Math.round(t/2592e6),"month"):n(Math.round(t/31536e6),"year")}function U(e){return JSON.parse(JSON.stringify(e))}var W=window.innerWidth<769;var G=function(e){var a=e.chartJson,t=e.history,c=Object(n.useRef)(),s=Object(n.useState)({}),l=Object(i.a)(s,2),o=l[0],d=l[1],m=Object(n.useState)("cumulative"),u=Object(i.a)(m,2),f=u[0],p=u[1],v=Object(n.useState)("month"),h=Object(i.a)(v,2),b=h[0],y=h[1],x=Object(n.useState)(!0),E=Object(i.a)(x,2),g=E[0],w=E[1],j={"1week":7,"2week":14,month:30},N=["confirmed","active","recovered","dead"];function O(e,a){var n=H(t,"date",["confirmed","active","recovered","dead"],e,a);return{series:n,minRange:n[0][0][0]}}function k(e,a){var t=a||"cumulative"===e.target.value;w(t),a||p(e.target.value);var n=o.daily,r=O(t,j[b]),c=r.series,s=r.minRange;c.forEach((function(e,a){n.userdata.seriesdata.chartdata[a].data=e})),n.userdata.chart.axes.xaxis.minRange=s,n.redraw()}if(t.length){var C=O(!0,j[b]),D=C.series,S=C.minRange;D.forEach((function(e,t){a.seriesdata.chartdata[t]={data:e,seriesname:_(N[t])}})),a.chart.axes.xaxis.minRange=S}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex flex-auto z-10 my-2 items-center justify-center"},r.a.createElement("label",{className:"flex items-center justify-center  text-sm mr-2"},r.a.createElement("span",null,"Scale"),r.a.createElement("select",{id:"scale-mode",className:"bg-gray-200 text-left font-bold ml-1 rounded w-full flex",defaultValue:"linear",onChange:function(e){var a=o.daily,t=e.target.value;a.userdata.chart.axes.yaxis[0].scaleType=t,"log"===t?(p("cumulative"),c.current.setAttribute("disabled",!0),c.current.parentElement.classList.add("text-gray-600")):(c.current.removeAttribute("disabled"),c.current.parentElement.classList.remove("text-gray-600")),k(null,t)}},r.a.createElement("option",{value:"linear"},"Linear"),r.a.createElement("option",{value:"log"},"Log"))),r.a.createElement("label",{className:"flex items-center justify-center  text-sm "},r.a.createElement("span",null,"Mode: "),r.a.createElement("select",{id:"trend-mode",className:"bg-gray-200 text-left font-bold ml-1 rounded w-full flex",value:f,onChange:k,ref:c},r.a.createElement("option",{value:"cumulative"},"Cumulative"),r.a.createElement("option",{value:"daily"},"Daily"))),r.a.createElement("label",{className:"flex items-center justify-center  text-sm ml-1 "},r.a.createElement("span",null,"Time: "),r.a.createElement("select",{id:"trend-time",className:"bg-gray-200 text-left font-bold ml-1 rounded w-full flex",defaultValue:b,onChange:function(e){var a=e.target.value;y(a);var t=o.daily,n=O(g,j[a]),r=n.series,c=n.minRange;r.forEach((function(e,a){t.userdata.seriesdata.chartdata[a].data=e})),t.userdata.chart.axes.xaxis.minRange=c,t.redraw()}},r.a.createElement("option",{value:"1week"},"1 Week"),r.a.createElement("option",{value:"2week"},"2 Weeks"),r.a.createElement("option",{value:"month"},"1 Month"),r.a.createElement("option",{value:"all"},"Beginning")))),r.a.createElement("div",{className:"trend-graph"},r.a.createElement(F,{seriesData:a,name:"daily",callback:function(e,a){o[a]=e,d(o)}})))},K=window.d3,V=!W;var Z=function(e){Object(p.a)(e);var a=Object(n.useState)(!1),t=Object(i.a)(a,2),c=t[0],s=t[1],l=Object(n.useState)({}),d=Object(i.a)(l,2),m=d[0],v=d[1],h=Object(n.useState)({rows:[],columns:[]}),b=Object(i.a)(h,2),x=b[0],w=b[1],j=Object(n.useState)({}),N=Object(i.a)(j,2),O=N[0],k=N[1],C=Object(n.useState)({}),D=Object(i.a)(C,2),S=D[0],R=D[1],M=Object(n.useState)({}),A=Object(i.a)(M,2),P=A[0],Z=A[1],$=Object(n.useState)(null),Y=Object(i.a)($,2),q=Y[0],Q=Y[1],X=Object(n.useState)({}),ee=Object(i.a)(X,2),ae=ee[0],te=ee[1],ne=Object(n.useState)({}),re=Object(i.a)(ne,2),ce=re[0],se=re[1],le=Object(n.useState)({}),oe=Object(i.a)(le,2),ie=oe[0],de=oe[1],me=Object(n.useState)({}),ue=Object(i.a)(me,2),fe=ue[0],pe=ue[1],ve=Object(n.useState)({}),he=Object(i.a)(ve,2),be=he[0],ye=he[1],xe=Object(n.useState)({}),Ee=Object(i.a)(xe,2),ge=Ee[0],we=Ee[1],je=Object(n.useState)({}),Ne=Object(i.a)(je,2),Oe=Ne[0],ke=Ne[1],Ce=Object(n.useState)({}),De=Object(i.a)(Ce,2),Se=De[0],Re=De[1],Te=Object(o.k)(),Be=Object(n.useRef)(),Le=Object(n.useState)({}),Me=Object(i.a)(Le,2),Ae=Me[0],Pe=Me[1],Ie=Object(n.useState)("-"),Fe=Object(i.a)(Ie,2),He=Fe[0],_e=Fe[1],Je=Object(n.useState)(!0),ze=Object(i.a)(Je,2),Ue=ze[0],We=ze[1],Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return[{name:"Confirmed",value:e.confirmed,delta:a.confirmed,colorClass:"red"},{name:"Active",value:e.active,delta:a.active,colorClass:"orange"},{name:"Recovered",value:e.recovered,delta:a.recovered,colorClass:"green"},{name:"Dead",value:e.dead,delta:a.dead,colorClass:"gray"}]},Ke=Object(n.useState)(Ge()),Ve=Object(i.a)(Ke,2),Ze=Ve[0],$e=Ve[1],Ye=Object(n.useState)([]),qe=Object(i.a)(Ye,2),Qe=qe[0],Xe=qe[1];Object(n.useEffect)((function(){!1===c&&ea()}),[c]);var ea=function(){var e=Object(f.a)(u.a.mark((function e(){var a,t,n,r,c,l,o,d,m,f,p,h,b,y,x,g,j,N,O,C,D,S,T,L,M,A,P,F,G,V,$,Y,q,X;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([E.a.get("https://api.track-corona.in/reports_v2.json"),E.a.get("/charts/daily.json"),E.a.get("/charts/states.json"),E.a.get("/charts/percent-chart.json")]);case 3:a=e.sent,t=Object(i.a)(a,4),n=t[0].data,r=t[1].data,c=t[2].data,l=t[3].data,We(!1),v(n),o=new Date(n.updatedTime),_e("".concat(z(new Date,o)," - ").concat(K.timeFormat("%B %d, %I:%M %p")(new Date(o)))),d=K.sum(Object.values(B)),m=I(n.testing_data_imcr,d,"Total"),R(m),$e(Ge(n,n.today)),f={confirmed:n.confirmed,active:n.active,recovered:n.recovered,dead:n.dead,name:"India",today:n.today},k(f),p=Object.values(n.states),Xe(p),h={},p.forEach((function(e){h[e.name]=e})),Z(h),w({rows:p,columns:[{name:"state/UT",accessor:"name"},{name:W?"cnfmd":"confirmed",accessor:"confirmed",colorClass:"red"},{name:W?"actv":"active",accessor:"active",colorClass:"orange"},{name:W?"Rcvrd":"recovered",accessor:"recovered",colorClass:"green"},{name:"dead",accessor:"dead",colorClass:"gray"}]}),Q(r),(b=Object.values(n.states).filter((function(e){return e.confirmed>50}))).forEach((function(e){e.deathRateByRecovery=J(e.dead/(e.recovered+e.dead)*100,2),e.deathRateByTotal=J(e.dead/e.confirmed*100,2),e.recoveryRateByTotal=J(e.recovered/e.confirmed*100,2)})),b.sort((function(e,a){return K.descending(e.confirmed,a.confirmed)})),x=H(b,"name",y=["confirmed","recovered","dead"]),g=U(c),x.forEach((function(e,a){g.seriesdata.chartdata[a]={data:e,seriesname:_(y[a])}})),te(g),b.sort((function(e,a){return K.descending(e.deathRateByRecovery,a.deathRateByRecovery)})),j=["confirmed","recovered","dead","Death Ratio"],N=H(b,"name",["confirmed","recovered","dead","deathRateByRecovery"]),(O=U(c)).canvas.title.text="Death Ratio By Total Recoveries",O.canvas.subtitle={text:"Death Ratio = Deaths / (Deaths + Recoveries)",show:!0},O.chart.plot.plotoptions.bar.stacked=!1,O.chart.axes.yaxis[0].label.text="Total",N.forEach((function(e,a){var t={data:e,seriesname:_(j[a])};a===N.length-1&&(t.type="line",t.yaxiscolumnorder=[1,0],t.color="rgb(171, 16, 23)"),O.seriesdata.chartdata[a]=t})),se(O),b.sort((function(e,a){return K.descending(e.deathRateByTotal,a.deathRateByTotal)})),C=["confirmed","recovered","dead","death rate"],D=H(b,"name",["confirmed","recovered","dead","deathRateByTotal"]),(S=U(c)).canvas.title.text="Death Ratio By Total Confirmed",S.canvas.subtitle={text:"Death Ratio = Deaths / (Deaths + Recoveries)",show:!1},S.chart.plot.plotoptions.bar.stacked=!1,S.chart.axes.yaxis[0].label.text="Total",D.forEach((function(e,a){var t={data:e,seriesname:_(C[a])};a===D.length-1&&(t.type="line",t.yaxiscolumnorder=[1,0],t.color="rgb(171, 16, 23)"),S.seriesdata.chartdata[a]=t})),de(S),b.sort((function(e,a){return K.descending(e.recoveryRateByTotal,a.recoveryRateByTotal)})),T=["confirmed","recovered","dead","recovery rate"],L=H(b,"name",["confirmed","recovered","dead","recoveryRateByTotal"]),(M=U(c)).canvas.title.text="Recovery Ratio By Total Infected",M.canvas.subtitle={text:"States With  > 50 Confirmed Cases",show:!0},M.chart.plot.plotoptions.bar.stacked=!1,M.chart.axes.yaxis[0].label.text="Total",L.forEach((function(e,a){var t={data:e,seriesname:_(T[a])};a===L.length-1&&(t.type="line",t.yaxiscolumnorder=[1,0],t.color="#00897B"),M.seriesdata.chartdata[a]=t})),pe(M),b.sort((function(e,a){return K.descending(e.confirmed,a.confirmed)})),A=K.timeParse("%b %d, %Y"),P=new Date(2020,1,29),F=b.slice(0,15).map((function(e){var a=H(e.history.filter((function(e){return A(e.date)>P})),"date",["confirmed"],!0)[0];return{seriesname:e.name,type:"line",data:a}})),(G=U(r)).canvas.title.text="Total Confirmed Cases By States",F.forEach((function(e,a){G.seriesdata.chartdata[a]=e})),we(G),b.sort((function(e,a){return K.descending(e.confirmed,a.confirmed)})),V=b.slice(0,20).map((function(e){var a=H(e.history,"$index",["confirmed"],!0)[0];return{seriesname:e.name,type:"line",data:a}})),$=["#f44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B"],Y=U(r),V.forEach((function(e,a){Y.seriesdata.chartdata[a]=e})),Y.chart.axes.xaxis.threshold={},Y.chart.axes.xaxis.tickCount=5,Y.chart.axes.xaxis.label={text:"No. Of Days Since 1st Confirmed Case"},Y.chart.axes.xaxis.ticklabel.alignMode="rotate(45)",Y.metadata.columns[0]={datatype:"numeric",columnname:"Day",dataindex:0,numeric:{axisformat:{prefix:"Day "}}},Y.chart.axes.yaxis[0].scaleType="log",Y.legend.colors=$,Y.canvas.title.text="Statewise Growth trend",Y.canvas.subtitle={text:"Top 20 States",show:!0},ye(Y),q=H(Object.values(n.states),"name",["confirmed"]),(X=U(c)).canvas.title.text="Word Cloud of Affected States and UTs",X.chart.axes.yaxis[0].label.text="Total",X.seriesdata.chartdata[0]={type:"wordcloud",data:q,seriesname:"Confirmed"},X.legend.colors=["#E91E63"],X.legend.enabled=!1,X.chart.plot.plotoptions.wordcloud={minSize:"2.5%",legendHighlightEffect:{selectedSeries:"invert"}},ke(X),l.seriesdata.chartdata[0]={type:"pie",data:[["Active",n.active],["Recovered",n.recovered],["dead",n.dead]]},Re(l),s(!0),e.next=95;break;case 92:e.prev=92,e.t0=e.catch(0),console.log(e.t0);case 95:case"end":return e.stop()}}),e,null,[[0,92]])})));return function(){return e.apply(this,arguments)}}();function aa(e){var a=P[e.name],t=B[a.stateCode],n=I(a.testing_data,t,a.name);R(n)}function ta(e,a){var t=a.point,n=x.rows.find((function(e){return e.name===t[0]})).stateCode;Te.push("/state/"+n)}var na=null;function ra(e,a,t){var n=K.mouse(t.container.node()),r=t.geo.utils.projection.invert(n),c=t.rendererArrangedReveresd[0].getPoint(r,n,0);if(a.point[0]===na&&c)return ta(0,a);na=a.point[0],window.d3.event.allowDefault=!0}function ca(e,a){Ae[a]=e,Pe(Ae)}function sa(e){return{animationDelay:200*e+"ms"}}function la(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex justify-between fade-in my-6",style:sa(2)},r.a.createElement("div",{className:"text-blue-600 items-center justify-center"},r.a.createElement("div",{className:"text-xs py-1"},"Tested ",r.a.createElement("span",{className:"font-bold"},S.label)),r.a.createElement("div",{className:"text-xl font-bold"},S.tested),S.date),r.a.createElement("div",{className:"text-blue-600 items-center justify-center text-right"},r.a.createElement("div",{className:"text-xs py-1"},"Population"," ",r.a.createElement("a",{rel:"noopener",target:"_blank",className:"bg-blue-100",href:L},"2019")),r.a.createElement("div",{className:"text-sm font-bold"},S.population),r.a.createElement("div",{className:"text-sm font-bold"},S.test_per_million," tests / million people"))),r.a.createElement("div",{className:"fade-in",style:sa(4)},r.a.createElement(T,{initCardData:O,seriesPoints:Qe,stateCode:"IND",joinBy:"name",data:x,cards:["confirmed","active","recovered","dead"],callback:aa,clickCallback:ta,tapCallback:ra})),r.a.createElement("div",{className:"w-full my-6 fade-in",style:sa(6)},c&&r.a.createElement(g,{rows:x.rows,columns:x.columns,link:!0})))}return r.a.createElement("div",{className:"container"},Ue&&r.a.createElement("div",{className:"flex items-center justify-center fixed h-screen w-full z-10",style:{left:0,top:0}},r.a.createElement("div",{className:"lds-dual-ring"})),c&&r.a.createElement("div",{className:"opacity-0 my-2 fade-in"},r.a.createElement("h1",{className:"font-bold mb-8 text-center md:text-2xl text-xl"},"Live Covid-19 statistcs - India"),r.a.createElement("div",{className:"flex flex-wrap justify-center"},r.a.createElement("div",{className:"w-full md:w-40 md:mx-10 pb-4"},r.a.createElement("div",{className:"flex justify-between text-primary font-bold items-center my-2"},r.a.createElement("div",null,r.a.createElement("span",null,"Share: "),r.a.createElement("a",{rel:"noopener",target:"_blank",href:"https://www.facebook.com/sharer/sharer.php?u=https://www.track-covid19.in/server/covid-app/&title=Live COVID-19 Tracker | India",className:"fb bg-center bg-contain bg-no-repeat px-2 ml-1"}),r.a.createElement("a",{className:"tweet bg-center bg-contain bg-no-repeat px-2 ml-1",rel:"noopener",target:"_blank",href:"https://twitter.com/intent/tweet?text=Live%20COVID-19%20Tracker%20%7C%20India%20%0AURL%3A%20https%3A%2F%2Fwww.track-covid19.in%2Fserver%2Fcovid-app%2F"})),r.a.createElement("div",{className:"text-right text-xs mb-2"},r.a.createElement("h2",{className:""},"Last Updated"),r.a.createElement("h2",{id:"lastUpdated",className:"capitalize"},He))),r.a.createElement("div",{className:"w-full fade-in mb-4",style:sa(1)},r.a.createElement(y,{ref:Be,cards:Ze,count:2e3})),W&&la(),r.a.createElement("div",{className:"w-full fade-in mb-4 border",style:sa(3)},r.a.createElement(G,{chartJson:q,history:m.history})),r.a.createElement("div",{className:"w-full fade-in md:w-40 mb-4 state-bar border",style:sa(5)},r.a.createElement(F,{seriesData:ge,name:"state_cases",callback:ca})),r.a.createElement("div",{className:"w-full fade-in md:w-40 mb-4 state-bar border",style:sa(4)},r.a.createElement(F,{seriesData:be,name:"growth",callback:ca})),r.a.createElement("div",{className:"w-full fade-in md:w-40 mb-4 percent-chart border",style:sa(6)},r.a.createElement(F,{seriesData:Se,name:"percent",callback:ca})),r.a.createElement("div",{className:"w-full fade-in md:w-40 mb-4 state-bar border",style:sa(7)},r.a.createElement(F,{seriesData:Oe,name:"wordcloud",callback:ca})),r.a.createElement("div",{className:"w-full md:w-40 mb-4 state-bar border fade-in",style:sa(9)},r.a.createElement(F,{seriesData:ae,name:"stacked",callback:ca}))),r.a.createElement("div",{className:"w-full md:w-40 md:mx-10"},V&&la(),r.a.createElement("div",{className:"w-full md:w-40 mb-4 state-bar border fade-in",style:sa(11)},r.a.createElement(F,{seriesData:fe,name:"recovery_trend",callback:ca})),r.a.createElement("div",{className:"w-full fade-in md:w-40 mb-4 state-bar border",style:sa(8)},r.a.createElement(F,{seriesData:ie,name:"recovery_trend",callback:ca})),r.a.createElement("div",{className:"w-full md:w-40 mb-4 state-bar border fade-in",style:sa(10)},r.a.createElement(F,{seriesData:ce,name:"death_trend",callback:ca}))))))};var $=function(e){Object(p.a)(e);var a=Object(n.useState)(!1),t=Object(i.a)(a,2),c=t[0],s=t[1],l=Object(n.useState)(!1),o=Object(i.a)(l,2),d=o[0],m=o[1];Object(n.useEffect)((function(){!1===c&&v()}),[c]);var v=function(){var e=Object(f.a)(u.a.mark((function e(){var a,t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([E.a.get("data/helplines.json")]);case 3:a=e.sent,t=Object(i.a)(a,1),n=t[0].data,m(n),s(!0),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container px-4",id:"help-lines"},Object.keys(d).map((function(e,a){return console.log(10*a),r.a.createElement("div",{key:a},r.a.createElement("div",{className:"fade-in border-l-2 border-primary text-primary font-bold p-2 uppercase my-2"},r.a.createElement("span",{className:"ml-1"},e)),r.a.createElement("div",{className:"flex flex-wrap -mx-2"},d[e].map((function(e,a){return r.a.createElement("div",{key:"".concat(JSON.stringify(e)),className:"fade-in md:w-auto w-full shadow px-4 py-2 text-base mx-2 my-2 md:flex-basis-250",style:{animationDelay:30*a+"ms"}},r.a.createElement("div",{className:"font-bold"},e.name),r.a.createElement("a",{className:"pr-2 underline text-blue-500",href:(t=e.number,n=e.type,"phone"===n?"tel:".concat(t):"whatsapp"===n?"whatsapp://send?phone=".concat(t):"email"===n?"mailto:".concat(n):t)},e.number));var t,n}))))})))},Y={AP:"Andhra Pradesh",AR:"Arunachal Pradesh",AS:"Assam",BR:"Bihar",CT:"Chhattisgarh",GA:"Goa",GJ:"Gujarat",HR:"Haryana",HP:"Himachal Pradesh",JH:"Jharkhand",KA:"Karnataka",KL:"Kerala",MP:"Madhya Pradesh",MH:"Maharashtra",MN:"Manipur",ML:"Meghalaya",MZ:"Mizoram",NL:"Nagaland",OR:"Odisha",PB:"Punjab",RJ:"Rajasthan",SK:"Sikkim",TN:"Tamil Nadu",TG:"Telangana",TR:"Tripura",UT:"Uttarakhand",UP:"Uttar Pradesh",WB:"West Bengal",AN:"Andaman and Nicobar",CH:"Chandigarh",DN:"Dadra and Nagar Haveli",DD:"Daman and Diu",DL:"Delhi",JK:"Jammu and Kashmir",LA:"Ladakh",LD:"Lakshadweep",PY:"Puducherry"},q=t(23),Q=window.d3;var X=function(e){Object(p.a)(e);var a=Object(n.useState)(!1),t=Object(i.a)(a,2),c=t[0],s=t[1],d=Object(n.useState)({rows:[],columns:[]}),m=Object(i.a)(d,2),v=m[0],h=m[1],b=Object(n.useState)({}),x=Object(i.a)(b,2),w=x[0],j=x[1],N=Object(n.useState)({}),O=Object(i.a)(N,2),k=O[0],C=O[1],D=Object(n.useState)(!0),S=Object(i.a)(D,2),R=S[0],M=S[1],A=Object(n.useRef)(),P=Object(o.m)().stateCode,H=Object(o.k)(),_=Y[P],J=Object.keys(Y),z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return[{name:"Confirmed",value:e.confirmed,delta:a.confirmed,colorClass:"red"},{name:"Active",value:e.active,delta:a.active,colorClass:"orange"},{name:"Recovered",value:e.recovered,delta:a.recovered,colorClass:"green"},{name:"Dead",value:e.dead,delta:a.dead,colorClass:"gray"}]},U=Object(n.useState)(z()),K=Object(i.a)(U,2),V=K[0],Z=K[1],$=Object(n.useState)([]),X=Object(i.a)($,2),ee=X[0],ae=X[1],te=Object(n.useState)(null),ne=Object(i.a)(te,2),re=ne[0],ce=ne[1],se=Object(n.useState)(null),le=Object(i.a)(se,2),oe=le[0],ie=le[1],de=Object(n.useState)({}),me=Object(i.a)(de,2),ue=me[0],fe=me[1],pe=Object(n.useState)({}),ve=Object(i.a)(pe,2),he=ve[0],be=ve[1],ye=Object(n.useState)(),xe=Object(i.a)(ye,2),Ee=xe[0],ge=xe[1],we=Object(n.useState)(),je=Object(i.a)(we,2),Ne=je[0],Oe=je[1];Object(n.useEffect)((function(){s(!1),ke()}),[P]);var ke=function(){var e=Object(f.a)(u.a.mark((function e(){var a,t,n,r,c,l,o,d,m,f,p,v,b,y;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([E.a.get("https://api.track-corona.in/district_v2.json"),E.a.get("https://api.track-corona.in/reports_v2.json"),E.a.get("/charts/daily.json"),E.a.get("/charts/percent-chart.json"),E.a.get("/data/zones.json")]);case 3:a=e.sent,t=Object(i.a)(a,5),n=t[0].data,r=t[1].data,c=t[2].data,l=t[3].data,o=t[4].data,M(!1),d=n[P],m=r.states[P],f=m.testing_data,p=B[P],v=Q.timeFormat("%B %d, %I:%M%p IST"),ge(d.updatedTime?v(new Date(d.updatedTime)):"-"),b=I(f,p,d.state),C(b),Z(z(m,m.today)),ae(d.districts),y={confirmed:d.confirmed,active:d.active,recovered:d.recovered,dead:d.dead,name:d.state,today:d.today},j(y),h({rows:d.districts,columns:[{name:"district",accessor:"district"},{name:W?"cnfmd":"confirmed",accessor:"confirmed",colorClass:"red"},{name:W?"actv":"active",accessor:"active",colorClass:"orange"},{name:W?"Rcvrd":"recovered",accessor:"recovered",colorClass:"green"},{name:"dead",accessor:"dead",colorClass:"gray"}]}),ce(c),m.history&&ie(m.history),l.seriesdata.chartdata[0]={type:"pie",data:[["Active",m.active],["Recovered",m.recovered],["Dead",m.dead]]},m.confirmed>0&&be(l),Oe(o[P]),s(!0),e.next=35;break;case 32:e.prev=32,e.t0=e.catch(0),console.log(e.t0);case 35:case"end":return e.stop()}}),e,null,[[0,32]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(q.a,null,r.a.createElement("title",null,"Coronavirus Outbreak in ",Y[P]," - covid19india.org"),r.a.createElement("meta",{name:"title",content:"Coronavirus Outbreak in ".concat(Y[P],": Latest Map and Case Count")}),r.a.createElement("meta",{name:"description",content:"Live statistics of Coronavirus (COVID-19) in ".concat(Y[P]," - India. Track the confirmed cases, recovered patients, and death toll of India due to the COVID-19 coronavirus.")})),r.a.createElement("div",{className:"container"},R&&r.a.createElement("div",{className:"flex items-center justify-center fixed h-screen w-full z-10",style:{left:0,top:0}},r.a.createElement("div",{className:"lds-dual-ring"})),c&&r.a.createElement("div",{className:"opacity-0 my-6 fade-in"},r.a.createElement("div",{className:"flex flex-wrap justify-center"},r.a.createElement("div",{className:"w-full md:w-40 md:mx-10 pb-4"},r.a.createElement("div",{className:"w-full md:w-40 font-bold cursor-pointer flex pb-6 text-xs text-gray-600 items-center"},r.a.createElement(l.Link,{to:"/"},"Home")," ",r.a.createElement("span",{className:"px-1"},"/"),r.a.createElement("select",{onChange:function(e){H.push("/state/"+e.target.value)},defaultValue:P,name:"states",className:"bg-gray-200 font-bold appearance-none py-1 px-2 state-select"},J.map((function(e){return r.a.createElement("option",{value:e,key:e},Y[e])})))),r.a.createElement("div",{className:"my-6"},r.a.createElement("h1",{className:"font-extra-bold text-primary text-3xl"},_),r.a.createElement("div",{className:"text-sm text-gray-700 font-bold"},"Last updated on ",Ee)),r.a.createElement("div",{className:"w-full fade-in"},r.a.createElement(y,{ref:A,cards:V,count:2e3})),r.a.createElement("div",{className:"w-full my-6 ".concat(c?"fade-in anim-delay-1":"")},r.a.createElement(g,{rows:v.rows,columns:v.columns}))),r.a.createElement("div",{className:"w-full md:w-40 md:mx-10 pb-4"},r.a.createElement("div",{className:""},r.a.createElement("div",{className:"flex justify-between fade-in anim-delay-2"},r.a.createElement("div",{className:"text-blue-600 items-center justify-center p-2"},r.a.createElement("div",{className:"text-xs py-1"},"Tested ",r.a.createElement("span",{className:"font-bold"},k.label)),r.a.createElement("div",{className:"text-xl font-bold"},k.tested),k.date),r.a.createElement("div",{className:"text-blue-600 items-center justify-center text-right p-2"},r.a.createElement("div",{className:"text-xs py-1"},"Population"," ",r.a.createElement("a",{rel:"noopener",target:"_blank",className:"bg-blue-100",href:L},"2019")),r.a.createElement("div",{className:"text-sm font-bold"},k.population),r.a.createElement("div",{className:"text-sm font-bold"},k.test_per_million," tests / million people"))),r.a.createElement("div",{className:"fade-in opacity-0  anim-delay-2 py-4"},r.a.createElement(T,{initCardData:w,stateCode:P,seriesPoints:ee,joinBy:"district",cards:["confirmed","active","recovered","dead"],zones:Ne}))))),r.a.createElement("div",{className:"flex flex-wrap justify-center"},r.a.createElement("div",{className:"w-full md:w-40 md:mx-10 state-bar border my-6"},re&&r.a.createElement(G,{chartJson:re,history:oe})),r.a.createElement("div",{className:"w-full md:w-40 md:mx-10 border my-6",style:{height:"400px"}},r.a.createElement(F,{seriesData:he,name:"percent",callback:function(e,a){ue[a]=e,fe(ue)}}))))))};t(72);function ee(){var e=Object(o.l)().pathname;return Object(n.useEffect)((function(){window.scrollTo(0,0)}),[e]),null}var ae=t(43),te=t.n(ae);var ne=function(){var e=[{pageLink:"/",view:Z,displayName:"Home",showInNavbar:!0},{pageLink:"/helplines",view:$,displayName:"Helplines",showInNavbar:!0},{pageLink:"/state/:stateCode",view:X,displayName:"State",showInNavbar:!1}];return r.a.createElement("div",{className:"App"},r.a.createElement(q.a,null,r.a.createElement("script",{type:"application/ld+json"},JSON.stringify({"@context":"http://schema.org/","@type":"NGO",name:"Coronavirus Outbreak in India: Latest Map and Case Count",alternateName:"COVID-19 Tracker",url:"https://track-covid-19.in",image:"https://www.track-covid19.in/server/covid-app/images/cms.png"}))),r.a.createElement(l.BrowserRouter,{basename:""},r.a.createElement(ee,null),r.a.createElement(te.a,{id:"UA-165660871-1"},r.a.createElement(o.d,{render:function(a){var t=a.location;return r.a.createElement("div",{className:"Routing"},r.a.createElement(d,{pages:e}),r.a.createElement(o.g,{location:t},e.map((function(e,a){return r.a.createElement(o.d,{exact:!0,path:e.pageLink,render:function(t){var n=t.match;return r.a.createElement(e.view,{key:n.params.stateCode||a})},key:a})})),r.a.createElement(o.c,{to:"/"})))}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[44,1,2]]]);
//# sourceMappingURL=main.c77674ac.chunk.js.map