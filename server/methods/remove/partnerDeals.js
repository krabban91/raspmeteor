import { Meteor } from 'meteor/meteor';
import {PartnerDeals} from '/both/collections/partnerDeals.js';


Meteor.methods({
	'partnerDeals.remove'(dealId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(dealId, String);
		PartnerDeals.remove(dealId);
	}
});
