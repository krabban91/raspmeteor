import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {PotentialPartners, PotentialPartnersSchema} from '/both/collections/potentialPartners.js';

Meteor.methods({
	'potentialPartners.add'(partner) {
		check(partner, Object);
		check(partner, 
			{
				name : String,
				companyName : String, 
				email : String, 
				phone : String, 
				message : String, 
			})
		return PotentialPartners.insert({
			name: partner.name,
			companyName: partner.companyName,
			email : partner.email, 
			phone : partner.phone, 
			message : partner.message,
			createdAt : new Date(),
		});
	}
});
