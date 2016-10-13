import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Years = new Mongo.Collection('years');

const YearsSchema = new SimpleSchema({
	number: {
		type: String, 
		optional: false,
	}, 
	year: {
		type: String, 
		optional: false,
	}
});

Years.attachSchema(YearsSchema);

export {Years, YearsSchema};