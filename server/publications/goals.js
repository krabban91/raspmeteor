import { Meteor } from 'meteor/meteor';

import {Goals} from '/both/collections/goals.js';

Meteor.publish('goals', function goalsPublication(){
	return Goals.find({});
});
