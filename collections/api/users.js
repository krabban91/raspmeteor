import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('roles', function rolesPublication() {
  	return Roles.find({});
  });
  Meteor.publish('users', function userPublication(){
  	
  	if(!Roles.userIsInRole(this.userId,['admin'])){
  		console.log("no users.");
  		this.stop();
  		return;
  	}
  	return Meteor.users.find({}, {fields: {username:1,roles:1 }});
  })
}

Meteor.users.allow({
	'remove' : function(){ 
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
});

Meteor.methods({
	'user.updateRole'(options){
		check(options, {
			userId:String,
			role:String,
		});
		let {userId, role } = options;
		let user = Meteor.user();
		if(!Roles.userIsInRole(user, ['admin'])){
			throw new Meteor.error('not-authorized');
		}
		if(user._id == userId){
			throw new Meteor.error('Do not alter your own rights.');
		}
		const possibleRoles = ['admin', 'seller']; 
		let roles = [role];
		if(!role || possibleRoles.indexOf(role)<0){
			roles = [];
		}
		try{
			Roles.setUserRoles(userId, roles);
		} catch(e){
			return e;
		}
	},
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