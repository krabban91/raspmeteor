import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const PreviousPartners = new Mongo.Collection('previousPartners');


const PreviousPartnersSchema = new SimpleSchema({
	name: {
		type: String,
		optional: false,
	},
	size : {
		type: String, 
		optional: false,
	},
	description : {
		type: String, 
		optional: false,
	},
	redaxNumber : {
		type:String, 
		optional:false,
	}, 
	price: {
		type: Number,
		optional: false,
	}

});


PreviousPartners.attachSchema(PreviousPartnersSchema);

export {PreviousPartners, PreviousPartnersSchema};
