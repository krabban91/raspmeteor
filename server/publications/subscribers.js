import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Subscribers} from '/both/collections/subscribers.js';



Meteor.publish('subscribers', function subscribersPublication(){
	if(!Roles.userIsInRole(this.userId,['admin','seller'])){	
    	this.stop();
    	return;
	}
	return Subscribers.find({});
});
