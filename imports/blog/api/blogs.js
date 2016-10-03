import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

export const Blogs = new Mongo.Collection('blogs'); 

if(Meteor.isServer) {
	Meteor.publish('blogs', function blogPublication(){
		return Blogs.find({});
	});
}


Meteor.methods({
	'blogs.insert'(title, content, blogId, userId){
		check(title, String);
		check(content, String);

		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}

		if(blogId == '') {
			Blogs.insert({
				title,
				content,
				createdAt: new Date(),
				owner: this.userId,
				username: Meteor.user().username,
			});
		} else if (userId==Blogs.findOne(blogId).owner) {
			Blogs.update(blogId,{
				title,
				content,
				createdAt: Blogs.findOne(blogId).createdAt,
				owner: Blogs.findOne(blogId).owner,
				username: Blogs.findOne(blogId).username,
				comments: Blogs.findOne(blogId).comments,
			});
		}
		
	},
	'blogs.comment'(text, blogId, blogOwner){
		check(text, String);
		check(blogId, String);
		Blogs.update(blogId, { 
			$push: {
				comments: {
					comment: 
					text, 
					_id: Math.random(), 
					blogId:blogId, 
					blogOwner:blogOwner, 
					owner: Meteor.user().username, 
					innerComment:[], 
					createdAt: new Date(),
				}  
			} 
		});
	},
	'blogs.innerComment'(text, commentId, commentOwner, blogId, blogOwner){
		check(text, String);
		check(blogId, String);
		Blogs.update({_id:blogId, 'comments._id':commentId },{ 
			$push: {
				'comments.$.innerComment': {
					comment: 
					text, 
					_id: Math.random(), 
					commentId:commentId,
					commentOwner: commentOwner, 
					blogId:blogId, 
					blogOwner:blogOwner, 
					owner: Meteor.user().username, 
					createdAt: new Date(),
				} 
			}
		});
	},
	'blogs.remove'(blogId){
		check(blogId, String);

		const blog = Blogs.findOne(blogId);

		if(blog.private && blog.owner !== this.userId){
			throw new Meteor.Error('not-authorized');
		}

		if(blog.owner == this.userId){
			Blogs.remove(blogId);
		}	
	},
	'blogs.removeComment'(blogId, commentId, blogOwner, owner){
		check(blogId, String);
		check(commentId, Number);

		if(Meteor.user().username==owner || Meteor.user().username==blogOwner) {
			Blogs.update(blogId, { 
				$pull: {
					comments: { 
						_id: commentId 
					} 
				} 
			});
		}

	},
	'blogs.removeInnerComment'(innerCommentId, commentId, blogId, blogOwner, owner){
		
		if(Meteor.user().username==owner || Meteor.user().username==blogOwner) {
			Blogs.update({_id:blogId,'comments._id':commentId},{ 
				$pull: {
					'comments.$.innerComment':{
						_id:innerCommentId
					} 
				} 
			});
		}

	},
})