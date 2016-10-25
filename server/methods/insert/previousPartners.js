import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {PreviousPartners, PreviousPartnersSchema} from '/both/collections/previousPartners.js';

Meteor.methods({
	
	'previousPartners.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return PreviousPartners.insert({
			name : 'Bilancia', 
			type : '1/4 sida',
			description : 'Annonserade för att profilera sig.',
			redaxNumber : 152,
		});
	}
});
