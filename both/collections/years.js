import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Years = new Mongo.Collection('years');

const YearsSchema = new SimpleSchema({
	number: {
		type: Number, 
		optional: false,
	}, 
	year: {
		type: String, 
		optional: false,
	},
	fileName: {
		type: String,
		optional: false,
	},
	smallFileName: {
		type: String,
		optional: false,
	}
});

Years.attachSchema(YearsSchema);

export {Years, YearsSchema};