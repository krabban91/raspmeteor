import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Properties = new Mongo.Collection('properties');

const PropertiesSchema = new SimpleSchema({
	redaxNumber : {
		type: String, 
		optional: false,
	},
	SellingPeriodStart : {
		type: Date, 
		optional: false,
	},
	SellingPeriodStop : {
		type: Date, 
		optional: false,
	},	
});

Properties.attachSchema(PropertiesSchema);

export {Properties, PropertiesSchema};