import { Meteor } from 'meteor/meteor';

Meteor.users.allow({
	'remove' : function(){ 
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
});
