webpackJsonp([1],{"92Ly":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("nav",{staticClass:"flex items-center justify-between flex-wrap bg-green-300 p-6"},[e("img",{staticClass:"h-10",attrs:{src:s("ZEU2"),alt:"logo"}})])}]},i={name:"App",components:{Navbar:s("VU/8")({name:"Navbar"},a,!1,null,null,null).exports},data:function(){return{profile:{userId:"",displayName:"",pictureUrl:"",statusMessage:""},accessToken:"",textCopyButton:"Copy Access Token"}},methods:{getProfile:function(){var t=this;this.$liff.getProfile().then(function(e){t.profile=e}).catch(function(t){alert("Error getting profile: "+t)})},getAccessToken:function(){this.accessToken=this.$liff.getAccessToken()},onCopy:function(){this.textCopyButton="Copied!"}},beforeCreate:function(){this.$liff.init()},mounted:function(){var t=this;setTimeout(function(){t.getProfile(),t.getAccessToken()},1e3)}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{"margin-top":"0"},attrs:{id:"app"}},[s("div",{staticClass:"container mx-auto min-h-screen bg-teal-100"},[s("Navbar"),t._v(" "),s("div",{staticClass:"flex justify-center p-6"},[s("div",{staticClass:"max-w-sm rounded overflow-hidden shadow-lg bg-white"},[s("img",{staticClass:"w-screen h-64 bg-gray-200",staticStyle:{"object-fit":"cover"},attrs:{src:this.profile.pictureUrl,alt:""}}),t._v(" "),s("div",{staticClass:"px-6 py-4 text-left"},[s("div",{staticClass:"font-bold text-base mb-2"},[t._v("\n            User ID : \n            "),s("span",[t._v(t._s(this.profile.userId))])]),t._v(" "),s("div",{staticClass:"font-bold text-base mb-2"},[t._v("\n            Display Name : \n            "),s("span",[t._v(t._s(this.profile.displayName))])]),t._v(" "),s("div",{staticClass:"font-bold text-base mb-2"},[t._v("\n            Status Message : \n            "),s("span",[t._v(t._s(this.profile.statusMessage))])])]),t._v(" "),s("div",{staticClass:"text-right px-5 pb-5"},[s("button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:this.accessToken,expression:"this.accessToken",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"}],staticClass:"bg-green-500 text-white hover:bg-green-400 font-bold py-2 px-4 rounded w-full shadow border-gray-400",attrs:{type:"button"}},[s("font-awesome-icon",{attrs:{icon:"copy"}}),t._v("\n            "+t._s(t.textCopyButton)+"\n          ")],1)])])])],1),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var r=s("VU/8")(i,o,!1,function(t){s("92Ly")},null,null).exports,c=s("/ocq");n.a.use(c.a);var l=new c.a({routes:[]}),p=s("C/JF"),f=s("fhbW"),u=s("1e6/"),d=s("wvfG"),v=s.n(d);p.c.add(f.a),n.a.component("font-awesome-icon",u.a),n.a.prototype.$liff=window.liff,n.a.config.productionTip=!1,v.a.config.autoSetContainer=!0,n.a.use(v.a),new n.a({el:"#app",router:l,components:{App:r},template:"<App/>"})},ZEU2:function(t,e,s){t.exports=s.p+"static/img/cmmc-logo.2eb203f.png"}},["NHnr"]);
//# sourceMappingURL=app.fd2812822cad665687bb.js.map