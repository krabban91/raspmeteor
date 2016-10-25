import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const PotentialPartners = new Mongo.Collection('potentialPartners');

const PotentialPartnersSchema = new SimpleSchema({
	name : {
		type : String, 
		optional : false,
	},
	companyName : {
		type : String, 
		optional : false,
	},
	email : {
		type : String,
		optional: true,
	},
	phone : {
		type : String,
		optional: true,
	},
	message : {
		type : String,
		optional: true,
	},
	isContacted : {
		type : Boolean, 
		optional : true,
	}
});

PotentialPartners.attachSchema(PotentialPartnersSchema);

export {PotentialPartners, PotentialPartnersSchema};