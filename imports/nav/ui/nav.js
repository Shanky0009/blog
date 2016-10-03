import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import './nav.html';



Template.nav.events({
	'click .logout'(){
		Meteor.logout();
		FlowRouter.go('home');
	}
})