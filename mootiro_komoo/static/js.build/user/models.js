(function(){define(["require","underscore","backbone","urls","./collections"],function(e){var t,n,r,i;return i=e("underscore"),t=e("backbone"),r=e("urls"),n=t.Model.extend({urlRoot:r.resolve("user_api"),getUpdates:function(){var t;return this.updates!=null?this.updates:(t=e("./collections").PaginatedUpdates,this.updates=new t([],{user:this}),window.collection=this.updates,this.updates)},goToProfile:function(){return t.trigger("user::profile",this.id)}}),{User:n}})}).call(this);