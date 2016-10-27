import { Meteor } from 'meteor/meteor';
import {Goals} from '/both/collections/goals.js';


Meteor.methods({
	'goals.update'(goal){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(goal, Object);
		let goalId = goal._id;
		delete goal._id;
		Goals.upsert(goalId, { $set : goal});
	},
	'goals.setAchieved'(goalId, value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(goalId, String);
		check(value, Boolean);
		if(value){
			Goals.update(goalId, {
				$set : {
					isAchieved: value, 
					dateAchieved:new Date()
				},
			});
		}else {
			Goals.update(goalId, {
				$set : {
					isAchieved: value, 
				},
				$unset:{
					dateAchieved:''
				},
			});
		}
	},
});
