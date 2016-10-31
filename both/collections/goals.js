import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Goals = new Mongo.Collection('goals');


const GoalsSchema = new SimpleSchema({
	name: {
		type: String,
		optional: false,
	},
	amountOfRasps : {
		type: Number, 
		optional: false,
	},
	description : {
		type: String, 
		optional: false,
	}, 
	isAchieved : {
		type: Boolean,
		optional:true, 
	},
	dateAchieved : {
		type: Date, 
		optional:true,
	},
	showDescription: {
		type:Boolean, 
		optional:false,
	}

});


Goals.attachSchema(GoalsSchema);

export {Goals, GoalsSchema};
