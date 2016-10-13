import { Meteor } from 'meteor/meteor';

import {Years} from '/both/collections/sales.js';

Meteor.publish('Years', function yearsPublication(){
	return Years.find({});
});
