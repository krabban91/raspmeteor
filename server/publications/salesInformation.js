import { Meteor } from 'meteor/meteor';

import {SalesInformation} from '/both/collections/salesInformation.js';

Meteor.publish('salesInformation', function salesInformationPublication(){
	let settings = Properties.findOne();
	
	return SalesInformation.find({
			createdAt: {
				$gte:settings.sellingPeriodStart, 
				$lte:settings.sellingPeriodStop
				}
			});
});
