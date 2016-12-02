import { Meteor } from 'meteor/meteor';
import {Subscribers} from '/both/collections/subscribers.js';

Meteor.methods({
	'subscribers.remove'(id) {
	 	if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
	    const client = Subscribers.findOne(id);
	    if(client === undefined)	    {
	    	throw new Meteor.Error('bad-argument');
	    }
	    Subscribers.remove(id);
	},

});