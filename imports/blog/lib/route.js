FlowRouter.route('/blogs', {
	name: "blogs",
  	action: function() {
  		BlazeLayout.render('mainTemp', {
        navigation: 'nav', 
        content: '', 
        blogger: 'bloggs' 
      });
  	}
});

FlowRouter.route('/addBlog', {
	name: "addBlog",
  triggersEnter: [function(context, redirect) {
    if (Meteor.user()){
      BlazeLayout.render('mainTemp', {
        navigation: 'nav', 
        content:'', 
        blogger: 'bloggs' });
    } else {
       FlowRouter.go('error');
    }
  }],
});

FlowRouter.route('/blogs/:blogId', {
	name: "blogView",
  	action: function(params) {
  		BlazeLayout.render('mainTemp', {
        navigation: 'nav', 
        content:'', 
        blogger: 'bloggs' 
      });
  	}
});

FlowRouter.route('/editBlog/:editId', {
	name: "editBlog",
  	action: function(params) {
  		BlazeLayout.render('mainTemp', {
        navigation: 'nav', 
        content:'', 
        blogger: 'bloggs' 
      });
  	}
});