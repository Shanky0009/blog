FlowRouter.route('/login', {
	name: "logIn",
    action: function() {
    	BlazeLayout.render('mainTemp', {navigation: 'nav', content: 'log'});
    }
});

FlowRouter.route('/sign-up', {
	name: "signUp",
    action: function() {
    	BlazeLayout.render('mainTemp', {navigation: 'nav', content: 'sign'});
    }
});
