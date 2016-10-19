import { Meteor } from 'meteor/meteor';
import {Redax} from '/both/collections/redax.js';


Meteor.methods({
	'redax.remove'(memberId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(memberId, String);
		Redax.remove(memberId);
	}
});
