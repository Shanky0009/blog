import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';


if(Meteor.isServer) {
	Meteor.publish("users", function(){
 		return Meteor.users.find({},{
 			fields:{
 				profile:1
 			}
 		});
	});
	 Meteor.startup(function () {

	 	Meteor.methods({
		 	profilePic:function(imgFile){
				// var fs = require('fs')
				// console.log(imgFile)
				// var img = "data:image/png;base64"+imgFile;
				// // strip off the data: url prefix to get just the base64-encoded bytes
				// console.log(img)
				// var ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
				// // strip off the data: url prefix to get just the base64-encoded bytes
				// var data = img.replace(/^data:image\/\w+;base64,/, "");
				// var buf = new Buffer(img, 'base64');
				// fs.writeFile(process.env["PWD"] + "/public/images/"+Meteor.userId()+'.'+ext, buf, function(err) {
			 //      if (err) {
			 //        throw (new Meteor.Error(500, 'Failed to save file.', err));
			 //      } else {
			 //        console.log('The file was saved ');
			 //      }
			 //    }); 
			}
		})
	});

	

}

Meteor.methods({
	'users.profileUpdate'(profileData){
		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}
		Meteor.users.update({_id:this.userId}, { 
			$set: { 
				profile: profileData 
			} 
		});
	},
	
	
})