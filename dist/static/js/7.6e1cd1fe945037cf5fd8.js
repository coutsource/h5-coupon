webpackJsonp([7],{RtdA:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Dd8w"),n=s.n(a),i=s("bOdI"),r=s.n(i),o=(s("f4F5"),s("e1sI"),s("ap4S"),s("9JZw")),d=s("dX72"),l=Object(o.a)({render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:e.b({disabled:e.isDisabled}),on:{click:function(t){e.$emit("click")}}},[s("span",{class:e.b("input")},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],class:e.b("control"),attrs:{type:"radio",disabled:e.isDisabled},domProps:{value:e.name,checked:e._q(e.currentValue,e.name)},on:{change:function(t){e.currentValue=e.name}}}),s("icon",{attrs:{name:e.currentValue===e.name?"checked":"check"}})],1),e.$slots.default?s("span",{class:e.b("label",e.labelPosition),on:{click:e.onClickLabel}},[e._t("default")],2):e._e()])},name:"radio",mixins:[d.a],props:{name:null,value:null,disabled:Boolean,labelDisabled:Boolean,labelPosition:Boolean},computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(e){(this.parent||this).$emit("input",e)}},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled}},created:function(){this.findParent("van-radio-group")},methods:{onClickLabel:function(){this.isDisabled||this.labelDisabled||(this.currentValue=this.name)}}}),c=Object(o.a)({render:function(){var e=this.$createElement;return(this._self._c||e)("div",{class:this.b()},[this._t("default")],2)},name:"radio-group",props:{value:null,disabled:Boolean},watch:{value:function(e){this.$emit("change",e)}}}),u=Object(o.a)({render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:e.b()},[s("radio-group",{class:e.b("group"),attrs:{value:e.value},on:{input:function(t){e.$emit("input",t)}}},[s("cell-group",e._l(e.list,function(t,a){return s("cell",{key:t.id,attrs:{"is-link":""}},[s("radio",{attrs:{name:t.id},on:{click:function(s){e.$emit("select",t,a)}}},[s("div",{class:e.b("name")},[e._v(e._s(t.name)+"，"+e._s(t.tel))]),s("div",{class:e.b("address")},[e._v(e._s(e.$t("address"))+"："+e._s(t.address))])]),s("icon",{class:e.b("edit"),attrs:{slot:"right-icon",name:"edit"},on:{click:function(s){e.$emit("edit",t,a)}},slot:"right-icon"})],1)}))],1),s("cell",{staticClass:"van-hairline--top",class:e.b("add"),attrs:{icon:"add","is-link":"",title:e.addButtonText||e.$t("add")},on:{click:function(t){e.$emit("add")}}})],1)},name:"address-list",components:{Radio:l,RadioGroup:c},props:{addButtonText:String,value:[String,Number],list:{type:Array,default:function(){return[]}}}}),h=s("3nlj"),m=s("Hj6f"),p=s("NYxO"),v={data:function(){return{havePage:!1,mainarea:!1,slidename:"slide-go",chosenAddressId:"1"}},components:r()({Headersec:h.a,Nopage:m.a},u.name,u),computed:n()({},Object(p.mapGetters)(["this.$store.state.address","this.$store.state.chooseaddress","this.$store.state.ischoose","this.$store.state.comname"])),mounted:function(){this.mainarea=!0,0===this.$store.state.address.length?this.havePage=!1:this.havePage=!0,"addressadd"===this.$store.state.comname?this.slidename="slide-back":this.slidename="slide-go",this.setComname("address")},methods:n()({onChooseAddress:function(e){1==this.$store.state.ischoose&&(this.setChooseaddress(e),this.$router.push("./orderwait"),this.setIschoose(2))}},Object(p.mapMutations)({setChooseaddress:"SET_CHOOSEADDRESS",setIschoose:"SET_ISCHOOSE",setComname:"SET_COMNAME"}),{onAdd:function(){this.$router.push("./addaddress")},onEdit:function(e,t){this.$router.push({path:"./addaddress",query:{index:t}})}})},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page"},[s("headersec",{attrs:{tabname:"我的地址"}}),e._v(" "),s("transition",{attrs:{name:e.slidename}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.mainarea,expression:"mainarea"}],staticClass:"container"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.havePage,expression:"!havePage"}]},[s("nopage")],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.havePage,expression:"havePage"}]},[s("van-address-list",{attrs:{list:this.$store.state.address},on:{add:e.onAdd,edit:e.onEdit},model:{value:e.chosenAddressId,callback:function(t){e.chosenAddressId=t},expression:"chosenAddressId"}})],1)])])],1)},staticRenderFns:[]};var b=s("VU/8")(v,f,!1,function(e){s("b2g6")},"data-v-062f86bd",null);t.default=b.exports},ap4S:function(e,t){},b2g6:function(e,t){},dX72:function(e,t,s){"use strict";t.a={data:function(){return{parent:null}},methods:{findParent:function(e){for(var t=this.$parent;t;){if(t.$options.name===e){this.parent=t;break}t=t.$parent}}}}},e1sI:function(e,t){}});