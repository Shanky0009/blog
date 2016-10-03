import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'

import '../api/profiles.js'
import './profile.html';


if(Meteor.isServer) {
	Meteor.publish("users", function(){
 		return Meteor.users.find({},{
 			fields:{
 				profile:1
 			}
 		});
	});
}


Template.profile.helpers({
	user() {
		console.log(Meteor.users.findOne({username:FlowRouter.getParam("profileName").trim()}))
		return Meteor.users.findOne({username:FlowRouter.getParam("profileName")});
	}
});
