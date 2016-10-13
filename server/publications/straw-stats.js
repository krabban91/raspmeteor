import { Meteor } from 'meteor/meteor';

import {Sales, StrawStats} from '/both/collections/sales.js';


Meteor.publish('strawStats', function(){
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
		{$unwind: 
			"$sellers"
		},
		{$group : 
			{ 
				_id: "$sellers", 
				count: {$sum: "$noOfStraws"}
			} 
		},
		{$out : 'strawStats'}
	];
	Sales.aggregate(pipeline);	

	return StrawStats.find({});
});
