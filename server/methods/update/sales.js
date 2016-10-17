import { Meteor } from 'meteor/meteor';
import {Sales} from '/both/collections/sales.js';


Meteor.methods({
	'sales.changeVerifiedStatus'(params){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(params, {
			saleId: String, 
			verified: Boolean,
		});
		Sales.update(params.saleId, { $set : {verified : params.verified}});
	}
});