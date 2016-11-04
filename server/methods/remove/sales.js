import { Meteor } from 'meteor/meteor';
import {Sales} from '/both/collections/sales.js';

Meteor.methods({
	'sales.remove'(salesId) {
	 	if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin', 'seller'])){
	    	throw new Meteor.Error('not-authorized');
		}
	    const sale = Sales.findOne(salesId);
	    if(sale === undefined)	    {
	    	throw new Meteor.Error('bad-argument');
	    }
	    Sales.remove(salesId);
	},

});