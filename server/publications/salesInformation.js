import { Meteor } from 'meteor/meteor';

import {SalesInformation} from '/both/collections/salesInformation.js';

Meteor.publish('salesInformation', function salesInformationPublication(){
	return SalesInformation.find({});
});
