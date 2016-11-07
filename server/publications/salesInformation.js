import { Meteor } from 'meteor/meteor';

import {SalesInformation} from '/both/collections/salesInformation.js';
import {Properties} from '/both/collections/properties.js'

Meteor.publish('salesInformation', function salesInformationPublication(){
	let settings = Properties.findOne();
	
	return SalesInformation.find({
			createdAt: {
				$gte:settings.sellingPeriodStart, 
				$lte:settings.sellingPeriodStop
				}
			});
});
