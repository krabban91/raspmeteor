import { Meteor } from 'meteor/meteor';
import {Redax} from '/both/collections/redax.js';


Meteor.methods({
	'redax.update'(member){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(member, Object);
		let memberId = member._id;
		delete member._id;
		Redax.upsert(memberId, { $set : member});
	}
});
