(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{126:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(0),r=n(10),s=n(14),o=Object(a.createContext)(),i=function(e){var t=e.children,n=Object(a.useState)([{}]),r=Object(s.a)(n,2),i=r[0],l=r[1],u=Object(a.useState)(""),j=Object(s.a)(u,2),b=j[0],d=j[1];return Object(c.jsx)(o.Provider,{value:{taskStore:i,userId:b,setUserId:d,setTaskStore:l},children:t})},l=n(72),u=n(73),j=n(82),b=n(81),d=(n(99),n(46)),h=n(11);var O=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("h1",{children:"Page Not Found"})})})},p=n(35),m=n.n(p),f=n(48),x=n(23),g=n.n(x);var v=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(""),i=Object(s.a)(o,2),l=i[0],u=i[1],j=Object(a.useState)(""),b=Object(s.a)(j,2),d=b[0],O=b[1],p=Object(a.useState)(""),x=Object(s.a)(p,2),v=x[0],y=x[1],k=Object(a.useState)(!0),C=Object(s.a)(k,2),S=C[0],w=C[1],N=Object(a.useState)({}),T=Object(s.a)(N,2),F=T[0],U=T[1],B=Object(h.f)(),D=function(e){w(!1)},I=function(e){w(!0)},P=function(){var e=Object(f.a)(m.a.mark((function e(t){var c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),c={},!S){e.next=7;break}c={email:l,password:d},g.a.post("http://localhost:3008/users/login",c,{withCredentials:!0}).then((function(e){U(e.data.user),B.push("/dashboard",{Username:n,UserData:F})})).catch((function(e){return alert("There was an error logging in, please verify your credentials")})),e.next=12;break;case 7:if(!(d.length<8)){e.next=10;break}return alert("Please choose a password that is at least 8 characters"),e.abrupt("return");case 10:c={name:n,password:d,email:l,age:v},g.a.post("http://localhost:3008/users",c,{withCredentials:!0}).then((function(e){U(e.data.user),console.log(e.data),B.push("/dashboard",{Username:n,UserData:F})})).catch((function(e){return console.log(e)}));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return S?Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("form",{onSubmit:P,className:"form",children:[Object(c.jsxs)("div",{className:"form-selector-button",children:[Object(c.jsx)("button",{type:"button",className:"LoginStateButton",onClick:function(e){return D()},children:"Sign Up"}),Object(c.jsx)("button",{type:"button",className:"LoginStateButton",onClick:function(e){return I()},children:"Log In"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Email"}),Object(c.jsx)("input",{type:"email",value:l,onChange:function(e){u(e.target.value)},autoComplete:"on"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Password"}),Object(c.jsx)("input",{type:"password",value:d,onChange:function(e){O(e.target.value)},autoComplete:"on"})]}),Object(c.jsx)("button",{className:"formSubmitButton",children:"Submit"})]})}):Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("form",{onSubmit:P,className:"form",children:[Object(c.jsxs)("div",{className:"form-selector-button",children:[Object(c.jsx)("button",{type:"button",className:"LoginStateButton",onClick:function(e){return D()},children:"Sign Up"}),Object(c.jsx)("button",{type:"button",className:"LoginStateButton",onClick:function(e){return I()},children:"Log In"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Username"}),Object(c.jsx)("input",{value:n,onChange:function(e){r(e.target.value)},autoComplete:"on"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Password"}),Object(c.jsx)("input",{type:"password",value:d,onChange:function(e){O(e.target.value)},autoComplete:"on"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Email"}),Object(c.jsx)("input",{value:l,onChange:function(e){u(e.target.value)},autoComplete:"on"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Age"}),Object(c.jsx)("input",{value:v,onChange:function(e){y(e.target.value)},autoComplete:"on"})]}),Object(c.jsx)("button",{className:"formSubmitButton",children:"Submit"})]})})};var y=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"container",children:Object(c.jsx)(v,{})})})},k=n(171),C=n(180);var S=function(){var e=Object(h.f)();return Object(c.jsx)("div",{style:{width:"80%"},children:Object(c.jsx)(k.a,{position:"static",style:{display:"flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"4rem"},children:Object(c.jsx)(C.a,{color:"inherit",onClick:function(){e.push("/")},children:"Logout"})})})},w=n(84),N=n(179),T=n(182),F=n(178),U=n(176),B=n(177),D=n(175),I=n(174),P=n(25);var L=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(""),l=Object(s.a)(i,2),u=l[0],j=l[1],b=Object(a.useState)(!1),d=Object(s.a)(b,2),h=d[0],O=d[1],p=Object(a.useState)(""),x=Object(s.a)(p,2),v=x[0],y=x[1],k=Object(a.useState)(""),S=Object(s.a)(k,2),L=S[0],E=S[1],_=Object(P.a)(),W=Object(I.a)(_.breakpoints.down("sm")),q=Object(a.useContext)(o),A=function(){var e=Object(f.a)(m.a.mark((function e(t){var c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),c={description:u,completed:n},g.a.post("http://localhost:3008/tasks",c,{withCredentials:!0}).then((function(e){y("Congratulations, your task was successfully created"),E("The secret of getting ahead is getting started. ~ Mark Twain"),q.setTaskStore(q.taskStore.concat(e.data)),M()})).catch((function(e){401===e.response.status?alert("Your session has timed out. Please logout to back to the home screen to sign back in and authenticate :)"):(console.log(e),y("Oh no, your task was unsuccessfully created"),E("Check the browser console for further errors"),M())}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){O(!0)},J=function(){O(!1)};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("form",{onSubmit:A,className:"form",children:[Object(c.jsx)(w.a,{variant:"h4",children:" Create a new task"}),Object(c.jsx)(N.a,{id:"task-description-input",label:"Description",type:"text",autoComplete:"current-password",fullWidth:!0,margin:"normal",onChange:function(e){return j(e.target.value)}}),Object(c.jsxs)(N.a,{id:"standard-select-currency-native",select:!0,label:"Completed?",value:n,onChange:function(e){return r(e.target.value)},SelectProps:{native:!0},fullWidth:!0,margin:"normal",helperText:"Please indicate if task is completed",children:[Object(c.jsx)("option",{value:!1,children:"Uncomplete"}),Object(c.jsx)("option",{value:!0,children:"Complete"})]}),Object(c.jsx)(C.a,{type:"submit",fullWidth:!0,children:"Submit"})]}),Object(c.jsxs)(T.a,{fullScreen:W,open:h,onClose:J,"aria-labelledby":"responsive-dialog-title",children:[Object(c.jsx)(D.a,{id:"responsive-dialog-title",children:v}),Object(c.jsx)(U.a,{children:Object(c.jsx)(B.a,{children:L})}),Object(c.jsx)(F.a,{children:Object(c.jsx)(C.a,{autoFocus:!0,onClick:J,color:"primary",children:"Ok"})})]}),Object(c.jsx)("br",{})]})},E=n(80),_=n.n(E),W=n(77),q=n.n(W),A=n(79),M=n.n(A),J=n(78),Q=n.n(J),Y=n(53);var z=function(){var e=Object(Y.useMediaQuery)({query:"(max-width: 1195px)"});return Object(c.jsxs)("div",{style:e?{display:"none"}:{display:"flex",color:"white"},children:[Object(c.jsx)("h4",{style:{width:"80%"},children:"Description"}),Object(c.jsx)("h4",{style:{width:"10%",textAlign:"center"},children:"Completed"}),Object(c.jsx)("h4",{style:{width:"10%",textAlign:"center"},children:"Delete"})]})};var G=function(e){var t=Object(a.useContext)(o),n=Object(a.useState)({}),r=Object(s.a)(n,2),i=(r[0],r[1]);Object(a.useEffect)((function(){g.a.get("http://localhost:3008/tasks",{withCredentials:!0}).then((function(e){t.setTaskStore(e.data)})).catch((function(e){return console.log("from get request: ".concat(e))}))}),[]);var l=t.taskStore;Object(a.useEffect)((function(){console.log(t.taskStore)}),[t.taskStore]);var u={display:"flex",alignItems:"flex-start",marginTop:".5rem"},j={display:"flex",alignItems:"flex-start",marginTop:".5rem"},b=Object(Y.useMediaQuery)({query:"(max-width: 1195px)"}),d={width:"80%",color:"White"},h={width:"10%",color:"white"},O=function(e){for(var t in e.completed=!e.completed,l)e._id===t._id&&(t.completed=e.completed);g.a.patch("http://localhost:3008/tasks/".concat(e._id),{completed:e.completed},{withCredentials:!0}).then(i)};console.log(l);var p=l.map((function(e){return Object(c.jsxs)("div",{className:"taskItem",style:b?j:u,children:[Object(c.jsx)(q.a,{}),Object(c.jsx)("p",{style:d,children:e.description}),e.completed?Object(c.jsx)(Q.a,{onClick:function(){return O(e)},style:h}):Object(c.jsx)(M.a,{onClick:function(){return O(e)},style:h}),Object(c.jsx)(_.a,{onClick:function(){return n=e._id,t.setTaskStore(t.taskStore.filter((function(e){return e._id!==n}))),void g.a.delete("http://localhost:3008/tasks/".concat(n),{withCredentials:!0});var n},style:h})]})}));return Object(c.jsxs)("div",{style:{width:"80%"},children:[Object(c.jsx)(z,{}),p]})};var H=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)(S,{}),Object(c.jsx)(L,{}),Object(c.jsx)(G,{})]})})},K=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).state={user:{}},c}return Object(u.a)(n,[{key:"render",value:function(){return Object(c.jsx)(d.a,{children:Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)(h.c,{children:[Object(c.jsx)(h.a,{exact:!0,path:"/",render:function(){return Object(c.jsx)(y,{})}}),Object(c.jsx)(h.a,{exact:!0,path:"/dashboard",render:function(){return Object(c.jsx)(H,{})}}),Object(c.jsx)(h.a,{component:O})]})})})}}]),n}(a.Component);Object(r.render)(Object(c.jsx)(i,{children:Object(c.jsx)(K,{})}),document.getElementById("root"))},99:function(e,t,n){}},[[126,1,2]]]);
//# sourceMappingURL=main.e6aee2cb.chunk.js.map