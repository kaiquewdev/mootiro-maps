define(["jquery"],function(e){return{init:function(t){var n=e('<div id="fb-root" />');e("body").prepend(n),function(e,n,r){var i,s=e.getElementsByTagName(n)[0];if(e.getElementById(r))return;i=e.createElement(n),i.id=r,i.src="//connect.facebook.net/en_US/all.js#xfbml=1&appId="+t,s.parentNode.insertBefore(i,s)}(document,"script","facebook-jssdk")}}});