import { Meteor } from 'meteor/meteor';

import {Sales, SalesTotal, SaleStats, StrawStats} from '/both/collections/sales.js';
import {Properties} from '/both/collections/properties.js';

Meteor.publish('sales', function salesPublication(){
		if(!Roles.userIsInRole(this.userId,['admin','seller'])){
	    	this.stop();
	    	return;
		}
		let query = Sales.find({});
		return query;
	});

// does not quite work. 
Meteor.publish('singleSale', function publishSingleSale(saleId){
	if(!Roles.userIsInRole(this.userId,['admin','seller'])){
    	this.stop();
    	return;
	}
	return Sales.find({_id:saleId});
});

Meteor.publish('salesTotal', function totalSalesPublication(){
	if(!Roles.userIsInRole(this.userId,['admin', 'seller'])){
    	this.stop();
    	return;
	}
	let settings = Properties.findOne();

	let pipeline = [
		{$match : 
			{
				$and:[
					{verified: true},
					{sellingDate: {
						$gte:settings.sellingPeriodStart, 
						$lte:settings.sellingPeriodStop
						}
					}
				],
				
			},
		},
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
	let settings = Properties.findOne();
	let pipeline = [
		{$match : 
			{
				$and:[
					{verified: true},
					{sellingDate: {
						$gte:settings.sellingPeriodStart, 
						$lte:settings.sellingPeriodStop
						}
					}
				],
				
			},
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
	let settings = Properties.findOne();
	
	let pipeline = [
		{$match : 
			{
				$and:[
					{verified: true},
					{sellingDate: {
						$gte:settings.sellingPeriodStart, 
						$lte:settings.sellingPeriodStop
						}
					}
				],
				
			},
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

