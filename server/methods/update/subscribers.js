import { Meteor } from 'meteor/meteor';
import {Subscribers} from '/both/collections/subscribers.js';


Meteor.methods({
	'subscribers.changeContactedStatus'(params){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(params, {
			clientId: String, 
			isContacted: Boolean,
		});
		Subscribers.update(params.clientId, { $set : {isContacted : params.isContacted}});
	},
});