import { Meteor } from 'meteor/meteor';

import {Sales, SaleStats} from '/both/collections/sales.js';


Meteor.publish('saleStats', function(){
	if(!Roles.userIsInRole(this.userId,['admin', 'seller'])){	
    	this.stop();
    	return;
	}
	let pipeline = [
		{$match : 
			{
				verified: true
			}
		},
		{$project : 
			{ 	day : {
					$substr : ["$sellingDate",0,10]
				},
				sold : "$soldRasps"
			}
		},
		{$group : 
			{
				_id : "$day", 
				total: {$sum : "$sold"} 
			}
		},
		{$out : 'saleStats'}
	];
	Sales.aggregate(pipeline);		
	
	return SaleStats.find({});
});
