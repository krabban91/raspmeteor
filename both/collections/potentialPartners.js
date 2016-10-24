import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const PotentialPartners = new Mongo.Collection('potentialPartners');

const PotentialPartnersSchema = new SimpleSchema({
	name : {
		type : String, 
		optional : false,
		trim : false,
	},
	companyName : {
		type : String, 
		optional : false,
		trim : false,
	},
	email : {
		type : String,
		optional: false,
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