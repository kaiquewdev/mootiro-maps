(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["require","jquery","underscore","backbone","reForm","./models","new_utils","text!templates/authentication/_login.html","text!templates/authentication/_register.html","text!templates/authentication/_social_button.html","text!templates/widgets/_signup.html"],function(e){var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y;return n=e("jquery"),y=e("underscore"),r=e("backbone"),d=e("reForm"),h=e("./models"),p=e("new_utils"),c=e("text!templates/authentication/_login.html"),v=e("text!templates/authentication/_register.html"),g=e("text!templates/authentication/_social_button.html"),m=e("text!templates/widgets/_signup.html"),f=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.tagName="li",n.prototype.template=y.template(g),n.prototype.initialize=function(){return y.bindAll(this,"render"),this.className=this.options.provider,this.url=this.options.url,this.image_url=this.options.image_url,this.msg=this.options.message,this.provider=this.options.provider},n.prototype.render=function(){var e;return e=this.template({provider:this.provider,url:this.url,image_url:this.image_url,msg:this.msg}),this.$el.html(e),this.$el.addClass(this.className),this},n}(r.View),l=function(e){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,e),r.prototype.tagName="ul",r.prototype.id="external_providers",r.prototype.initialize=function(){return y.bindAll(this,"render"),this.buttons=this.options.buttons},r.prototype.render=function(){var e,t=this;return e=this.buttons,n(this.el).html(""),y.each(e,function(e){var r;return r=new f(e),n(t.el).append(r.render().el)}),this},r}(r.View),a=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.template=m,n}(d.Widget),i=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.fields=[{name:"email",widget:d.commonWidgets.TextWidget,label:"Email:"},{name:"password",widget:d.commonWidgets.PasswordWidget,label:"Password:"},{name:"signup",widget:a,label:" "}],n}(d.Form),s=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="login_box",n.prototype.tagName="section",n.prototype.template=y.template(c),n.prototype.initialize=function(){var e,t,n;return y.bindAll(this,"render"),t={provider:"google",url:dutils.urls.resolve("login_google"),image_url:"/static/img/login-google.png",message:"Log In with Google"},e={provider:"facebook",url:dutils.urls.resolve("login_facebook"),image_url:"/static/img/login-facebook.png",message:"Log In with Facebook"},this.socialBtnsView=new l({buttons:[t,e]}),n=new h.LoginModel({}),this.formView=new i({formId:"form_login",model:n})},n.prototype.render=function(){var e;return e=this.template({}),this.$el.html(e),this.$el.find(".social_buttons").append(this.socialBtnsView.render().el),this.$el.find(".login_form").append(this.formView.render().el),this},n}(r.View),o=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.fields=[{name:"name",widget:d.commonWidgets.TextWidget,label:"Name"},{name:"email",widget:d.commonWidgets.TextWidget,label:"Email"},{name:"password",widget:d.commonWidgets.PasswordWidget,label:"Password",container_class:"half-box-left"},{name:"password_confirm",widget:d.commonWidgets.PasswordWidget,label:"Password Confirmation",container_class:"half-box-right"}],n}(d.Form),u=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.template=y.template(v),n.prototype.className="register",n.prototype.tagName="section",n.prototype.initialize=function(){var e;return y.bindAll(this),e=new h.User({}),this.registerForm=new o({formId:"form_register",submit_label:"Register",model:e})},n.prototype.render=function(){var e;return e=this.template({}),this.$el.html(e),this.$el.find(".form-wrapper").append(this.registerForm.render().el),this},n}(r.View),{LoginView:s,RegisterView:u}})}).call(this)