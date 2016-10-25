import { Meteor } from 'meteor/meteor';

import {ExampleAds} from '/both/collections/exampleAds.js';

Meteor.methods({
	'exampleAds.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return ExampleAds.insert({
			name : 'Arkitektbyrå', 
			description : 'Kunden ville anspela på konkurrenters virrighet.',
		});
	}
});
