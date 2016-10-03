import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'

import '../api/profiles.js'
import './profileUpdate.html';
import '../lib/common.js'




Template.profileUpdate.onCreated(function bodyOnCreated(){
	Meteor.subscribe("users");
	this.pic=new ReactiveDict();
});

Template.profileUpdate.helpers({
	proPic() {
		const instance = Template.instance();

		if(instance.pic.get('url')!=null)
			return instance.pic.get('url');
		else
			return false;
	},
	userProfile(){
		return Meteor.user();
	}
});
 
Template.profileUpdate.events({
	'submit .profileData'(event){
		event.preventDefault();
		
		const target = event.target;

		const profileData ={
			pic : target.pic.value,
			first_Name : target.fName.value,
			last_Name : target.lName.value,
			phonNo : target.phNo.value,
			city : target.city.value,
			country:target.country.value,
		}
		
		Meteor.call('users.profileUpdate', profileData );
		FlowRouter.go('profile');
	},
	'change .profilePic'(event, instance){
		var preview = document.querySelector('img');
		let imgFile=event.target.files[0];
		
	      // Images.insert(imgFile, function (err, fileObj) {
	      //   console.log(fileObj)
	      // });
	      
		// var reader = new FileReader();
		//    reader.readAsDataURL(imgFile);
		//    reader.onload = function () {
		//      console.log(reader.result);
		//    };
		//    reader.onerror = function (error) {
		//      console.log('Error: ', error);
		//    };

		// reader.onload = function(event) {
		//     console.log(event.target.result)
		// };

		//   reader.addEventListener("load", function () {
		// 	var buffer = new Uint8Array(reader.result)
		// 	console.log("hello")
		//   });

		//   if (img) {
		//     reader.readAsDataURL(imgFile);
		//   }


		Meteor.call('profilePic', imgFile, function(err, response){} );
		instance.pic.set('url', event.target.value)

	}
})

 