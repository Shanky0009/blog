FlowRouter.route('/error', {
	name: "error",
  	action: function() {
  		BlazeLayout.render('mainTemp', {
        navigation: 'nav', 
        content: '', 
        blogger: 'error' 
      });
  	}
});

FlowRouter.notFound = {

    action: function() {
    	BlazeLayout.render('mainTemp', {
        navigation: 'nav', 
        content: '', 
        blogger: 'errorPage' 
      });
    }
};