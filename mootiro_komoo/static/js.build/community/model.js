(function(){define(["backbone","project/model","utils"],function(e,t){var n,r;return r=e.Model.extend({urlRoot:"/community/",initialize:function(){return this.projects=nestCollection(this,"projects",new t.Projects(this.get("projects"))),this.projects.url=""+this.url()+"/projects/"}}),n=e.Collection.extend({model:r,parse:function(e){return e.results}}),{Community:r,Communities:n}})}).call(this);