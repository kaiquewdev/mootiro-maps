(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["require","jquery","underscore","backbone"],function(e){var n,r,i,s,o;return n=e("jquery"),o=e("underscore"),r=e("backbone"),i=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.urlRoot="/user/login/",n}(r.Model),s=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.urlRoot="/user/",n}(r.Model),{LoginModel:i,User:s}})}).call(this)