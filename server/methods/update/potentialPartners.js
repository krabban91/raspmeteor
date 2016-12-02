import { Meteor } from 'meteor/meteor';
import {PotentialPartners} from '/both/collections/potentialPartners.js';


Meteor.methods({
	'potentialPartners.changeContactedStatus'(params){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(params, {
			partnerId: String, 
			isContacted: Boolean,
		});
		PotentialPartners.update(params.partnerId, { $set : {isContacted : params.isContacted}});
	},
});