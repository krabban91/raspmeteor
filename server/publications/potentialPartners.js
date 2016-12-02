import { Meteor } from 'meteor/meteor';

import {PotentialPartners} from '/both/collections/potentialPartners.js';

Meteor.publish('potentials', function potentialPartnersPublication(){
	if(!Roles.userIsInRole(this.userId,['admin','seller'])){
	    	this.stop();
	    	return;
		}
	return PotentialPartners.find({});
});
