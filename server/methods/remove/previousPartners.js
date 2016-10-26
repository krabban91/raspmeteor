import { Meteor } from 'meteor/meteor';
import {PreviousPartners} from '/both/collections/previousPartners.js';


Meteor.methods({
	'previousPartners.remove'(oldId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(oldId, String);
		PreviousPartners.remove(oldId);
	}
});
