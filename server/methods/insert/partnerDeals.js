import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {PartnerDeals, PartnerDealsSchema} from '/both/collections/partnerDeals.js';

Meteor.methods({
	
	'partnerDeals.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return PartnerDeals.insert({
			name : 'Prisvärd tidningsannons', 
			type : '1/4 sida',
			description : 'En annons i tidningen som Raspredaktionen tagit fram unikt efter era önskemål',
			price : 4000,
		});
	}
});
