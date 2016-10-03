FlowRouter.route('/profile/:profileName', {
	name: "profile",
    action: function() {
    	BlazeLayout.render('mainTemp', {navigation: 'nav', content: '', blogger: 'profile'});
    }
});
FlowRouter.route('/setting', {
	name: "profileSetting",
    action: function() {
    	BlazeLayout.render('mainTemp', {navigation: 'nav', content: '', blogger: 'profileUpdate'});
    }
});