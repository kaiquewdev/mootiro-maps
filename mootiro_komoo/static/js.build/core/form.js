(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["require","reForm","./form_widgets","text!templates/forms/_inline_form.html"],function(e){var n,r,i,s;return i=e("reForm"),r=i.commonWidgets,s=e("./form_widgets"),n=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.template=e("text!templates/forms/_inline_form.html"),r.prototype.events={"click .cancel":"onCancelClick"},r.prototype.initialize=function(){return r.__super__.initialize.apply(this,arguments),this.render()},r.prototype.onCancelClick=function(e){return e!=null&&e.preventDefault(),this.set(this.model.toJSON()),this.trigger("cancel")},r.prototype.wasChanged=function(){return!_.isEqual(this.get(),_.pick(this.model.toJSON(),_.pluck(this.fields,"name")))},r}(i.Form),{commonWidgets:r,widgets:s,BaseForm:n}})}).call(this);