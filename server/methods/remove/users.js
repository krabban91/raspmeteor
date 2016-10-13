import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
	'users.remove'(options){
		check(options, {
			userId:String,
		});
		let {userId} = options;
		let currentUser = Meteor.user();
		if(!Roles.userIsInRole(currentUser, ['admin'])){
			throw new Meteor.error('not-authorized');
		}
		if(currentUser._id == userId){
			throw new Meteor.error('Cannot remove self');
		}
		try{
			console.log(userId);
			Meteor.users.remove(userId);
		} catch(e){
			return e;
		}
	}
});