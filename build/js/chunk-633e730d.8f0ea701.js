(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-633e730d"],{3573:function(e,t,l){"use strict";var a=l("309c");t["a"]=a["a"]},a4c2:function(e,t,l){"use strict";l.r(t);var a=l("7a23");const n={class:"user"};function o(e,t,l,o,d,i){const p=Object(a["resolveComponent"])("PageSearch"),r=Object(a["resolveComponent"])("PageContent"),c=Object(a["resolveComponent"])("pageModal");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",n,[Object(a["createVNode"])(p,{searchFormConfig:e.searchFormConfig,onResetBtnClick:e.handleResetClick,onQueryBtnClick:e.handleQueryClick},null,8,["searchFormConfig","onResetBtnClick","onQueryBtnClick"]),Object(a["createVNode"])(r,{ref:"pageContentRef",contentTableConfig:e.contentTableConfig,pageName:e.pageName,onNewBtnClick:e.handleNewData,onEditBtnClick:e.handleEditData},null,8,["contentTableConfig","pageName","onNewBtnClick","onEditBtnClick"]),Object(a["createVNode"])(c,{ref:"pageModalRef",modalConfig:e.modalConfigRef,defaultInfo:e.defaultInfo,pageName:"users"},null,8,["modalConfig","defaultInfo"])])}var d=l("3573"),i=l("9d1a"),p=l("fae0"),r=p["a"],c=l("4e07");function s(){const e=Object(a["ref"])(null),t=()=>{var t;null===(t=e.value)||void 0===t||t.getPageData()},l=t=>{var l;null===(l=e.value)||void 0===l||l.getPageData(t)};return[e,t,l]}var f=l("0613");const m={propList:[{prop:"name",label:"用户名",minWidth:"100"},{prop:"realname",label:"真实姓名",minWidth:"100"},{prop:"cellphone",label:"手机号码",minWidth:"100"},{prop:"enable",label:"状态",minWidth:"100",slotName:"status"},{prop:"createAt",label:"创建时间",minWidth:"250",slotName:"createAt"},{prop:"updateAt",label:"更新时间",minWidth:"250",slotName:"updateAt"},{label:"操作",minWidth:"120",slotName:"handler"}],showIndexColumn:!0,showSelectColumn:!0,title:"用户列表"},u={formItem:[{field:"name",type:"input",label:"用户名",placeholder:"请输入用户名"},{field:"realname",type:"input",label:"真实姓名",placeholder:"请输入真实姓名"},{field:"password",type:"password",label:"密码",placeholder:"请输入密码",isHidden:!0},{field:"cellphone",type:"input",label:"电话号码",placeholder:"请输入电话号码"},{field:"departmentId",type:"select",label:"选择部门",placeholder:"请选择部门",options:[]},{field:"roleId",type:"select",label:"选择角色",placeholder:"请选择角色",options:[]}],colLayout:{span:24},myItemStyle:{}},h={labelWidth:"120px",itemLayout:{padding:"10px 40px"},colLayout:{span:8},formItem:[{field:"id",type:"input",label:"搜索id",placeholder:"请输入id"},{field:"name",type:"input",label:"用户名",placeholder:"请输入用户名"},{field:"realname",type:"input",label:"真实姓名",placeholder:"请输入真实姓名"},{field:"cellphone",type:"input",label:"电话号码",placeholder:"请输入电话号码"},{field:"enable",type:"select",label:"用户状态",placeholder:"请选择用户状态",options:[{title:"启用",value:"1"},{title:"禁用",value:"0"}]},{field:"createAt",type:"datepicker",label:"创建时间",otherOptions:{startPlaceholder:"开始时间",endPlaceholder:"结束时间",type:"daterange"}}]};var b=Object(a["defineComponent"])({name:"user",components:{PageSearch:r,PageContent:d["a"],pageModal:i["a"]},setup(){const e="users",t=Object(f["c"])(),l=Object(a["computed"])(()=>{const e=u.formItem.find(e=>"departmentId"===e.field);e.options=t.state.entireDepartment.map(e=>({title:e.name,value:e.id}));const l=u.formItem.find(e=>"roleId"===e.field);return l.options=t.state.entireRole.map(e=>({title:e.name,value:e.id})),u}),[n,o,d]=s(),i=()=>{const e=u.formItem.find(e=>"password"===e.field);e.isHidden=!1},p=()=>{const e=u.formItem.find(e=>"password"===e.field);e.isHidden=!0},[r,b,C,g]=Object(c["a"])(i,p);return{searchFormConfig:h,contentTableConfig:m,modalConfigRef:l,pageName:e,defaultInfo:b,pageContentRef:n,pageModalRef:r,handleResetClick:o,handleQueryClick:d,handleNewData:C,handleEditData:g}}}),C=l("6b0d"),g=l.n(C);const y=g()(b,[["render",o]]);t["default"]=y}}]);
//# sourceMappingURL=chunk-633e730d.8f0ea701.js.map