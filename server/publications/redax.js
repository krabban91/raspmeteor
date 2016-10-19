import { Meteor } from 'meteor/meteor';

import {Redax} from '/both/collections/redax.js';

Meteor.publish('redax', function redaxPublication(){
	return Redax.find({});
});
