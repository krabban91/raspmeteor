import { Meteor } from 'meteor/meteor';
import {ExampleAds} from '/both/collections/exampleAds.js';


Meteor.methods({
	'exampleAds.update'(example){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(example, Object);
		let exampleId = example._id;
		delete example._id;
		ExampleAds.upsert(exampleId, { $set : example});
	}
});
