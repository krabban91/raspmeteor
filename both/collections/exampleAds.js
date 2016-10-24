import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const ExampleAds = new Mongo.Collection('exampleAds');


const ExampleAdsSchema = new SimpleSchema({
	name: {
		type: String,
		optional: false,
	},
	description : {
		type: String, 
		optional: false,
	}, 
	fileLocation : {
		type: String, 
		optional: true,
	}, 
});


ExampleAds.attachSchema(ExampleAdsSchema);

export {ExampleAds, ExampleAdsSchema};
