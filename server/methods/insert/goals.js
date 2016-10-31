import { Meteor } from 'meteor/meteor';

import {Goals} from '/both/collections/goals.js';

Meteor.methods({
	'goals.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return Goals.insert({
			name : 'Första steget',
			amountOfRasps : 1000,
			description : 'Redaktörerna kommer att dansa Svansjön i A-Dammen. Lapp kommer att dyka upp om detta. Häng på Scrubben!',
			showDescription:false,
		});
	}
});
