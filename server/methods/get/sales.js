import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Sales} from '/both/collections/sales.js';

Meteor.methods({
	'sales.getById'(saleId){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin', 'seller'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(saleId, String);
		console.log(saleId);
	    return Sales.findOne({slug:saleId});
	}
});
