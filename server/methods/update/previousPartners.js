import { Meteor } from 'meteor/meteor';
import {PreviousPartners} from '/both/collections/previousPartners.js';


Meteor.methods({
	'previousPartners.update'(old){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(old, Object);
		let oldId = old._id;
		delete old._id;
		PreviousPartners.upsert(oldId, { $set : old});
	}
});
