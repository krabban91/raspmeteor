import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function userPublication(){  	
	if(!Roles.userIsInRole(this.userId,['admin'])){
		this.stop();
		return;
	}
	return Meteor.users.find({}, {fields: {username:1,roles:1 }});
})