import { Meteor } from 'meteor/meteor';
import {ExampleAds} from '/both/collections/exampleAds.js';


Meteor.methods({
	'exampleAds.remove'(exampleId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(exampleId, String);
		ExampleAds.remove(exampleId);
	}
});
