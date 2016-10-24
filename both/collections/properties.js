import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Properties = new Mongo.Collection('properties');

const PropertiesSchema = new SimpleSchema({
	redaxNumber : {
		type: Number, 
		optional: false,
	},
	sellingPeriodStart : {
		type: Date, 
		optional: false,
	},
	sellingPeriodStop : {
		type: Date, 
		optional: false,
	},
	organizationNumber: {
		type: String, 
		optional: false,
	},

	visitingAddress: {
		type: Object, 
		optional: false,
	},
	'visitingAddress.name': {
		type: String, 
		optional: false,
		trim:false,
	},
	'visitingAddress.street': {
		type: String, 
		optional: false,
		trim:false,
	},
	'visitingAddress.postalInfo': {
		type: String, 
		optional: false,
		trim:false,
	}, 	
	
	invoiceAddress: {
		type: Object, 
		optional: false,
	},
	'invoiceAddress.name': {
		type: String, 
		optional: false,
		trim:false,
	},
	'invoiceAddress.street': {
		type: String, 
		optional: false,
		trim:false,
	}, 	
	'invoiceAddress.postalInfo': {
		type: String, 
		optional: false,
		trim:false,
	},
	paymentMethods :{
		type: [Object]
	},
	'paymentMethods.$.description': {
		type: String, 
		optional: true,
		trim:false,
	}, 
	'paymentMethods.$.value': {
		type: String, 
		optional: true,
		trim:false,
	},
	raspEmail: {
		type: String, 
	},
	raspPhone: {
		type: String,
		trim:false, 
	},
	totalAmountOfRasps: {
		type: Number,
	}
});

Properties.attachSchema(PropertiesSchema);

export {Properties, PropertiesSchema};

