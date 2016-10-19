import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Redax = new Mongo.Collection('redax');

const RedaxSchema = new SimpleSchema({
	roleNumber : {
		type: Number, 
		optional: false,
	},
	title : {
		type: String, 
		optional: false,
	},
	name : {
		type: String, 
		optional: false,
	},
	phoneNumber : {
		type: String, 
		optional: true,
	},	
	emailAddress : {
		type: String, 
		optional: true,
	},	
});

Redax.attachSchema(RedaxSchema);

export {Redax, RedaxSchema};
