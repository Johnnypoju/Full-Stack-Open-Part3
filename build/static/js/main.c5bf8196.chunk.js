(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(3),a=t(1),u=t(0),i=function(e){var n=e.name,t=e.number,c=e.id,r=e.handleDeletion;return Object(u.jsxs)("div",{children:[n," ",t," ",Object(u.jsx)("button",{onClick:function(){return r(c)},children:"Delete"})]})},l=function(e){var n=e.persons,t=e.filter,c=e.handleDeletion;return Object(u.jsx)("ul",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(u.jsx)(i,{name:e.name,number:e.number,id:e.id,handleDeletion:c},e.name)}))})},s=function(e){var n=e.filter,t=e.handleFilter;return Object(u.jsx)("form",{children:Object(u.jsxs)("div",{children:["filter shown with ",Object(u.jsx)("input",{value:n,onChange:t})]})})},d=function(e){return Object(u.jsxs)("form",{onSubmit:e.addNewName,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:e.newName,onChange:e.handleNewName})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:e.newNumber,onChange:e.handleNewNumber})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},h=t(4),b=t.n(h),j="/api/persons",f=function(){return b.a.get(j).then((function(e){return e.data}))},m=function(e){return b.a.post(j,e).then((function(e){return e.data}))},O=function(e,n){return console.log("phonebook service id: ",e),console.log("phonebook service: ",n),b.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return b.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.value;return null===n?null:Object(u.jsx)("div",{className:t,children:n})},w=(t(40),function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),i=Object(o.a)(r,2),h=i[0],b=i[1],j=Object(a.useState)(""),w=Object(o.a)(j,2),x=w[0],g=w[1],N=Object(a.useState)(""),y=Object(o.a)(N,2),k=y[0],D=y[1],S=Object(a.useState)(null),C=Object(o.a)(S,2),A=C[0],E=C[1],F=Object(a.useState)(""),J=Object(o.a)(F,2),L=J[0],P=J[1];Object(a.useEffect)((function(){f().then((function(e){c(e),P("succeed")})).then(E("All names fetched")).then(console.log(t)).catch((function(e){P("error"),E(e.message)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(s,{handleFilter:function(e){D(e.target.value)},filter:k}),Object(u.jsx)("h3",{children:"Add new"}),Object(u.jsx)(v,{message:A,value:L}),Object(u.jsx)(d,{handleNewName:function(e){b(e.target.value)},handleNewNumber:function(e){g(e.target.value)},newName:h,newNumber:x,addNewName:function(e){e.preventDefault();var n={name:h,number:x},r=t.map((function(e){return e.name})).indexOf(h);if(r>-1){if(window.confirm("".concat(h," is already added to the phonebook. \n      Do you want to replace the old number with a new one?"))){var o={name:h,number:x,id:t[r].id};O(t[r].id,o).then((function(e){console.log(e),c(t.map((function(n){return n.name!==e.name?n:e}))),P("succeed"),E("".concat(h," added succesfully"))})).catch((function(e){P("error"),E("".concat(h," has already been deleted from the server.")),c(t.filter((function(e){return e.id!==t[r].id})))}))}}else m(n).then((function(e){console.log(e),c(t.concat(e)),P("succeed"),E("".concat(h," added succesfully"))})).catch((function(e){P("error"),E(e.message)}));b(""),g("")}}),Object(u.jsx)("h3",{children:"Numbers"}),Object(u.jsx)(l,{persons:t,filter:k,handleDeletion:function(e){window.confirm("Do you really want to delete person")&&p(e).then((function(){c(t.filter((function(n){return n.id!==e}))),P("succeed"),E("Person deleted from phonebook")})).catch((function(e){P("error"),E(e.message)}))}})]})});r.a.render(Object(u.jsx)(w,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.c5bf8196.chunk.js.map