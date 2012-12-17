(function(){define(["require","jquery","backbone","page_manager","user/models","user/views"],function(e){var t,n,r,i,s;return t=e("jquery"),n=e("backbone"),i=e("page_manager"),r=function(t){var r,i;if(t==null){typeof console!="undefined"&&console!==null&&console.log("User id not specified");return}return r=e("user/models").User,i=new r,i.id=t,i.on("request",function(e){return n.trigger("app::working",e)}),i.on("sync",function(e,t,r){return n.trigger("app::done",e)}),i.on("error",function(e,t){if(t.status!=null)return n.trigger("app::done",e)}),i},s={render:function(s){var o,u,a;return a=e("user/views"),u=r(s),u.on("error",function(e,t){if(t.status===404)return n.trigger("main::notFound",e)}),window.user=u,t("#action-bar").empty(),o=new i.Page({sidebar:new a.Sidebar({model:u}),mainContent:new a.Profile({model:u})}),t.when(u.fetch()).done(function(){return i.open(o)})}},{getUser:r,profile:s}})}).call(this);