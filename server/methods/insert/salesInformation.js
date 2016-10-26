import { Meteor } from 'meteor/meteor';

import {SalesInformation} from '/both/collections/salesInformation.js';

Meteor.methods({
	'salesInformation.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return SalesInformation.insert({
			name : 'Försäljningen har börjat!', 
			content : 'Nu inleder vi med att informera att Rasp är kontantfritt! Sjukt fett! Inga fler stölder!',
			createdAt: new Date(),
		});
	}
});
