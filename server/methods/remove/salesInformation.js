import { Meteor } from 'meteor/meteor';
import {SalesInformation} from '/both/collections/salesInformation.js';


Meteor.methods({
	'salesInformation.remove'(infoId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		SalesInformation.remove(infoId);
	}
});
