import { Meteor } from 'meteor/meteor';

import {Sales, SalesTotal, SaleStats, StrawStats} from '/both/collections/sales.js';

Meteor.publish('sales', function salesPublication(){
		if(!Roles.userIsInRole(this.userId,['admin'])){
	    	this.stop();
	    	return;
		}
		let query = Sales.find({});
		return query;
	});

Meteor.publish('salesTotal', function totalSalesPublication(){
	if(!Roles.userIsInRole(this.userId,['admin', 'seller'])){
    	this.stop();
    	return;
	}
	let pipeline = [
		{$match: {verified : true}},
		{$project : {sold : "$soldRasps"}},
		{$group:{_id: 1, total:{$sum:"$sold"}}},
		{$out:'salesTotal'}
		];
	let query = Sales.aggregate(pipeline);
	return SalesTotal.find({});
});

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

