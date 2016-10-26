import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const SalesInformation = new Mongo.Collection('salesInformation');


const SalesInformationSchema = new SimpleSchema({
	name: {
		type: String,
		optional: false,
	},
	content : {
		type: String, 
		optional: false,
	},
	createdAt: {
		type: Date,
		optional: false,
	}
});


SalesInformation.attachSchema(SalesInformationSchema);

export {SalesInformation, SalesInformationSchema};
