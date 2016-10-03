FlowRouter.route('/', {
	name: "home",
  	action: function() {
  		BlazeLayout.render('mainTemp', {
  			navigation: 'nav', 
  			content: 'home'
  		});
  	}
});
