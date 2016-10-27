import { Meteor } from 'meteor/meteor';
import {Goals} from '/both/collections/goals.js';


Meteor.methods({
	'goals.remove'(goalId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(goalId, String);
		Goals.remove(goalId);
	}
});
