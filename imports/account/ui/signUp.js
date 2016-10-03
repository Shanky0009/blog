import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './signUp.html';

Template.sign.events({
	'submit .sign'(event){
		event.preventDefault();

		const target = event.target;
		const password = target.password.value;
		const username = target.username.value;
		const email = target.email.value;
		const profile = '';
		// Meteor.call('verifyEmail');
		Accounts.createUser({username, email, password, profile}, function (err) {
			if(!err){
				const userId= Meteor.userId();
				// Accounts.sendVerificationEmail(userId);
			}
		});
		FlowRouter.go('home');
	},
})
