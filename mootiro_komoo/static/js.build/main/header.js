(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["require","jquery","underscore","backbone","text!templates/main/_header.html","main/upper_bar"],function(e){var n,r,i,s,o;return n=e("jquery"),o=e("underscore"),r=e("backbone"),s=e("text!templates/main/_header.html"),i=function(n){function i(){i.__super__.constructor.apply(this,arguments)}return t(i,n),i.prototype.template=o.template(s),i.prototype.events={"click .logo a":"root"},i.prototype.initialize=function(){var t;return t=e("main/upper_bar"),this.upperBar=new t,o.bindAll(this),this.render()},i.prototype.render=function(){var e;return e=this.template(),this.$el.html(e),this.$el.find("#upper-bar-container").append(this.upperBar.$el),this},i.prototype.root=function(){return r.trigger("main::root"),!1},i}(r.View),i})}).call(this);