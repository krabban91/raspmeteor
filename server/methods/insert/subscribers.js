import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Subscribers, SubscribersSchema} from '/both/collections/subscribers.js';

Meteor.methods({
	
	'subscribers.insert'(subscriber) {
		check(subscriber, Object);
		check(subscriber, 
			{
				email : String, 
				name : String,
			})
		return Subscribers.insert({email : subscriber.email, name: subscriber.name });
	}
});
