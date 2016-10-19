import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Redax, RedaxSchema} from '/both/collections/redax.js';

Meteor.methods({
	
	'redax.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return Redax.insert({
			roleNumber : 1,
			title : 'Scrubbis',
			name : 'Adrian Electrolux', 
		});
	}
});
