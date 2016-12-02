import { Meteor } from 'meteor/meteor';
import {PotentialPartners} from '/both/collections/potentialPartners.js';

Meteor.methods({
	'potentialPartners.remove'(id) {
	 	if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
	    const partner = PotentialPartners.findOne(id);
	    if(partner === undefined)	    {
	    	throw new Meteor.Error('bad-argument');
	    }
	    PotentialPartners.remove(id);
	},

});