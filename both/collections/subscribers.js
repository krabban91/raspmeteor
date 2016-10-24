import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
const Subscribers = new Mongo.Collection('subscribers');

const SubscribersSchema = new SimpleSchema({
	email : {
		type : String,
		optional: false,
	},
	name : {
		type : String, 
		optional : false,
		trim : false,
	},
	isContacted : {
		type : Boolean, 
		optional : true,
	}
});

Subscribers.attachSchema(SubscribersSchema);

export {Subscribers, SubscribersSchema};