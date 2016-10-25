import { Meteor } from 'meteor/meteor';
import {PartnerDeals} from '/both/collections/partnerDeals.js';


Meteor.methods({
	'partnerDeals.update'(deal){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(deal, Object);
		let dealId = deal._id;
		delete deal._id;
		PartnerDeals.upsert(dealId, { $set : deal});
	}
});
