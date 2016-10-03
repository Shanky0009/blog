import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'

import './login.html';

Template.log.events({
	'submit .log'(event){
		event.preventDefault();

		const target = event.target;
		const password = target.password.value;
		const email = target.email.value;
		
		Meteor.loginWithPassword(email, password);
		FlowRouter.go('home');
	},
})

