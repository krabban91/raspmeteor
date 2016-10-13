import { Meteor } from 'meteor/meteor';

import {Sales} from '/both/collections/sales.js';

Meteor.publish('sales', function salesPublication(){
		if(!Roles.userIsInRole(this.userId,['admin'])){
	    	this.stop();
	    	return;
		}
		//TODO: Limit fields. 
		let query = Sales.find({});
		return query;
	});
