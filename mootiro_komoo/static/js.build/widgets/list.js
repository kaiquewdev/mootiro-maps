(function(){define(["require","jquery","underscore","backbone"],function(e){var t,n,r,i;return t=e("jquery"),i=e("underscore"),n=e("backbone"),r=n.View.extend({tagName:"ul",className:"list",initialize:function(){return i.bindAll(this),this.listenTo(this.collection,"add",this.add),this.itemViews={},this.ItemView=this.options.ItemView},render:function(){var e=this;return this.$el.empty(),this.collection.each(function(t){return e.add(t)}),this},add:function(e){var t;return t=new this.ItemView({model:e}),this.$el.append(t.render().$el),this.itemViews[e.cid]=t,this}}),r})}).call(this);