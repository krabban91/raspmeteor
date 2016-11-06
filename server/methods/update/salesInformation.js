import { Meteor } from 'meteor/meteor';
import {SalesInformation} from '/both/collections/salesInformation.js';


Meteor.methods({
	'salesInformation.update'(info){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(info, Object);
		let infoId = info._id;
		delete info._id;
		SalesInformation.upsert(infoId, { $set : info});
	}
});
