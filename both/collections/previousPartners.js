import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const PreviousPartners = new Mongo.Collection('previousPartners');


const PreviousPartnersSchema = new SimpleSchema({
	name: {
		type: String,
		optional: false,
	},
	type : {
		type: String, 
		optional: false,
	},
	description : {
		type: String, 
		optional: false,
	},
	redaxNumber : {
		type: Number, 
		optional:false,
	}, 
	fileLocation: {
		type: String,
		optional:true,
	}

});


PreviousPartners.attachSchema(PreviousPartnersSchema);

export {PreviousPartners, PreviousPartnersSchema};
