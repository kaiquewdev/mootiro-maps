(function(){define(["jquery","underscore","backbone","text!templates/widgets/_autocomplete.html"],function(e,t,n,r){var i;return i=n.View.extend({className:"autocomplete",inputName:"autocomplete",autocompleteSource:"/autocomplete/",initialize:function(e,n){return this.inputName=e||this.inputName,this.autocompleteSource=n||this.autocompleteSource,this.template=t.template(r)},clear:function(){return this.$input.val(""),this.$value.val("")},val:function(){return console.log("value",this.$value.val()),this.$value.val()},render:function(){var e,t=this;return e=this.template({name:this.inputName}),this.$el.html(e),this.$input=this.$el.find("#id_"+this.inputName+"_autocomplete"),this.$value=this.$el.find("#id_"+this.inputName),this.$input.autocomplete({source:this.autocompleteSource,focus:function(e,n){return t.$input.val(n.item.label),!1},select:function(e,n){return t.$input.val(n.item.label),t.$value.val(n.item.value),!1},change:function(e,n){if(!n.item||!t.$input.val())return t.clear()}}),this}}),i})}).call(this);