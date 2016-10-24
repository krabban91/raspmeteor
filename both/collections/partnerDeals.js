import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const PartnerDeals = new Mongo.Collection('partnerDeals');


const PartnerDealsSchema = new SimpleSchema({
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
	price: {
		type: Number,
		optional: false,
	}

});


PartnerDeals.attachSchema(PartnerDealsSchema);

export {PartnerDeals, PartnerDealsSchema};
