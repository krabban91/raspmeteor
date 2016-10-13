import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Redax = new Mongo.Collection('redax');

const RedaxSchema = new SimpleSchema({
	redaxNumber : {
		type: String, 
		optional: false,
	},
	roleNumber : {
		type: Number, 
		min:1, 
		max:6,
		optional: false,
	},
	roleName : {
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
