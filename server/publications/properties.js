import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Properties, PropertiesSchema} from '/both/collections/properties.js';

import {InitPropertiesData} from '/server/init_values/initPropertiesData.js';


Meteor.publish('properties', function propertiesPublication(){
	let item = Properties.findOne();

	if(!item){
		check(InitPropertiesData, PropertiesSchema);
		Properties.insert(InitPropertiesData);
	}
	return Properties.find({});
});
