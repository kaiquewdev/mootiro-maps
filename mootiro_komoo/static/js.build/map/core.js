(function(){define(["jquery","underscore","backbone"],function(e,t,n){var r,i;return r=function(){function r(){this._components={},this._pubQueue=[],this._pubsub={},t.extend(this._pubsub,n.Events)}return r.prototype.loading=0,r.prototype.data={deferred:e.Deferred,when:e.when},r.prototype._getComponent=function(e,t){var n,r;n=(r=this._components[e])!=null?r:{};if(n[t]==null)throw new Error("Could not be found a component '"+e+"' with id '"+t+"'");return n[t]},r.prototype._removeComponent=function(e,t){var n;return(n=this._components[e])!=null?delete n[t]:void 0},r.prototype.load=function(e,t,n){var r,i,s,o,u,a=this;return u=t,s=e.split("::"),r=s[0],i=s[1],o=this.data.deferred(),require([r],function(r){var s,f;s=r[i];try{f=new s(a,t)}catch(l){throw l}return a.data.when(f.init(n)).done(function(){return a._components[e][u].instance=f,typeof console!="undefined"&&console!==null&&console.log("Component '"+e+"' initialized"),a.publish(""+i+":started",u),o.resolve(f)}).fail(function(){return typeof console!="undefined"&&console!==null&&console.warn("Could not initialize component '"+e+"'"),o.resolve(f)})},function(t){var n;if(t.requireType!=="timeout")throw n=t.requireModules&&t.requireModules[0],require.undef(n),t;return typeof console!="undefined"&&console!==null&&console.warn("Could not load module '"+t.requireModules+"'"),o.resolve()}),o.promise()},r.prototype.unload=function(e){},r.prototype.start=function(n,r,i){var s,o,u,a,f,l,c,h,p,d,v,m=this;i==null&&(i={}),t.isString(n)?o=[{component:n,el:r,opts:i}]:t.isArray(n)?o=n:o=[n];if(!t.isArray(o))throw new Error("componentList must be defined as an array");c=[];for(d=0,v=o.length;d<v;d++)l=o[d],s=l.component,r=l.el,i=l.opts,this.loading++,f=r,(p=this._components)[s]==null&&(p[s]={}),u=this._components[s],u[f]!=null&&typeof console!="undefined"&&console!==null&&console.error("Conflict: already exists one component '"+s+"' with id '"+f+"' "),this._components[s][f]={type:s,el:r,opts:i},a=this.data.deferred(),c.push(this.load(s,r,i));return h=this.data.when.apply(e,c),h.done(function(){return m.loading-=arguments.length,m._processPublishQueue()}),h},r.prototype.stop=function(n,r){var i,s,o,u,a,f,l,c,h;a=r,f=t.isArray(a)?a:[a],o=this.data.deferred(),l=f.length,u=0;for(c=0,h=f.length;c<h;c++)i=f[c],s=this._getComponent(n,i),s.instance.destroy().done(function(){e(s.el).children().remove(),this._removeComponent(n,i),u++;if(u===l)return o.resolve()});return o.promise()},r.prototype.publish=function(e){return this._addToPublishQueue.apply(this,arguments),this._processPublishQueue()},r.prototype.subscribe=function(e,t,n){return this._pubsub.on(e,t,n)},r.prototype._addToPublishQueue=function(e){return this._pubQueue.push(arguments)},r.prototype._processPublishQueue=function(){var e;if(this.loading>0)return!1;e=this._pubQueue.shift();if(e!=null)return this._pubsub.trigger.apply(this._pubsub,e),this._processPublishQueue()},r}(),i={Mediator:r},i})}).call(this);