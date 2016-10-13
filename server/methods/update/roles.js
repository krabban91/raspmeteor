import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

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
	}
});