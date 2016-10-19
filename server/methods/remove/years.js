import { Meteor } from 'meteor/meteor';
import {Years} from '/both/collections/years.js';


Meteor.methods({
	'years.remove'(imageId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(imageId, String);
		Years.remove(imageId);
	}
});
