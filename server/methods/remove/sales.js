import { Meteor } from 'meteor/meteor';
import {Sales} from '/both/collections/sales.js';

Meteor.methods({
	'sales.remove'(salesId) {
	 	// Make sure the user is logged in before inserting a task
	    //if (! this.userId) {
	    //  throw new Meteor.Error('not-authorized');
	    //}
	    //Also check if specific rasp-admin. 
	    const sale = Sales.findOne(salesId);
	    if(sale === undefined) //real check later on
	    {
	    	throw new Meteor.Error('bad-argument');
	    }
	    Sales.remove(salesId);
	},

});