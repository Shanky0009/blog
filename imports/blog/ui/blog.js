import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Blogs } from '../api/blogs.js';

import './blog.html';
import './blogData.html';
import './comment.html';
import './editBlog.html';
 

Template.bloggs.onCreated(function bodyOnCreated(){
	Meteor.subscribe('blogs');
});

Template.bloggs.helpers({
	isOwner(){
		return this.owner === Meteor.userId();
	},
	blogs() {
		if(FlowRouter.getParam("blogId")){
			return Blogs.find(FlowRouter.getParam("blogId"));
		}
		else {
			return Blogs.find({},{ sort: { createdAt: -1 } });
		}	
	},
	addBlog(){
		if(FlowRouter.getRouteName()=="addBlog") {
			return true;
		} else if(FlowRouter.getRouteName()=="editBlog") {
			return Blogs.findOne(FlowRouter.getParam("editId"));
		} else {
			return false;
		}
	}
})

Template.blog.helpers({
	date(){
		const data = Blogs.findOne(this._id).createdAt;
		let date = new Date(data)
		
			let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
			let hour = date.getHours();
			let dates = {
			    day: days[date.getDay()],
			    date: date.getDate(),
			    month: months[date.getMonth()],
			    year: date.getFullYear(),
			    hour: hour,
			    minute: date.getMinutes()
			};
			return dates;
	},
	oneBlog(){
		if(FlowRouter.getParam("blogId")){
			return true;
		}
	},
	owner(){
		return this.owner === Meteor.userId();
	},
	
})

Template.cmnt.helpers({
	commentOwner(){
		if(Meteor.user().username == this.owner || Meteor.user().username == this.blogOwner || Meteor.user() == this.commentOwner)
			return true;
	},
})

Template.bloggs.events({
	'click .delete'() {
		if(Meteor.userId()){
			Meteor.call('blogs.remove', this._id);
		}
	},
	'click .deleteCmnt'(){
		if (Meteor.userId()){
			Meteor.call('blogs.removeComment', 
				this.blogId, 
				this._id, 
				this.blogOwner, 
				this.owner
			);
		}
	},
	'click .deleteInnerCmnt'(){
		if (Meteor.userId()){
			Meteor.call('blogs.removeInnerComment', 
				this._id, 
				this.commentId, 
				this.blogId, 
				this.blogOwner, 
				this.owner
			);
		}
	},
	'submit .new-blog'(event){
		event.preventDefault();

		const target = event.target;
		const content = target.content.value;
		const title = target.title.value;
		const blogId = target.blogId.value;

		if(content && title && Meteor.userId()) {
			Meteor.call('blogs.insert', title, content, blogId, Meteor.userId());
		}

		target.content.value = '';
		target.title.value = '';

		FlowRouter.go('blogs');
	},
	'submit .new-comment'() {
		event.preventDefault();

		const target = event.target;
		const comment = target.comment.value;
		const blogOwner = Blogs.findOne(this._id).username;

		if(comment && Meteor.userId()){
			Meteor.call('blogs.comment', comment, this._id, blogOwner);
		}

		target.comment.value = '';
	},
	'submit .inner-comment'() {
		event.preventDefault();

		const target = event.target;
		const comment = target.comment.value;
		const blogId = target.blogId.value;
		const blogOwner = Blogs.findOne(blogId).username;

		if(comment && Meteor.userId()) {
			Meteor.call('blogs.innerComment', comment, this._id, this.owner, blogId, blogOwner);
		}

		target.comment.value = '';
	}
	
});