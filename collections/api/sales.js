import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import Schema from './../schemas/sales_schema.js'

const Sales = new Mongo.Collection('sales');
//const Sellers = new Mongo.Collection('sellers');
const SaleStats = new Mongo.Collection('saleStats');
const StrawStats = new Mongo.Collection('strawStats');

const SalesSchema = new SimpleSchema(Schema);

Sales.attachSchema(SalesSchema);
if(Meteor.isServer){
	
	Meteor.publish('sales', function salesPublication(){
		if(!Roles.userIsInRole(this.userId,['admin'])){
	    	this.stop();
	    	return;
		}
		//TODO: Limit fields. 
		let query = Sales.find({});
		return query;
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
}

Meteor.methods({
	'sales.insert'(saleRecord){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin', 'seller'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(saleRecord, {
			sellers:[{name:String}],
			sellingDate : Date,		
			totalSellingTime : String,
			sellingLocation : String,
			soldRasps : Number,
			noOfStraws : Number,
			swishPayments : Number,
			iZettlePayments : Number,
			weather : String,
			crowdness : String,
			tactic : String,
			funLevel : String,
			comments : String,			
			}
		);
		//let statsId = sellingDate.yyyymmdd('-');

	    let salesId = Sales.insert(
	    {
	    	sellers : saleRecord.sellers.map((a)=> {return a.name;}),
	    	sellingDate : saleRecord.sellingDate,		
			totalSellingTime : saleRecord.totalSellingTime,
			sellingLocation : saleRecord.sellingLocation,
			soldRasps : saleRecord.soldRasps,
			noOfStraws : saleRecord.noOfStraws,
			swishPayments : saleRecord.swishPayments,
			iZettlePayments : saleRecord.iZettlePayments,
			weather : saleRecord.weather,
			crowdness : saleRecord.crowdness,
			tactic : saleRecord.tactic,
			funLevel : saleRecord.funLevel,
			comments : saleRecord.comments,	
			verified : false,
			createdAt : new Date(),
			owner: Meteor.userId(),
	    });
	},
	'sales.changeVerifiedStatus'(params){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(params, {
			saleId: String, 
			verified: Boolean,
		});
		Sales.update(params.saleId, { $set : {verified : params.verified}});


	},

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

export {Sales, SaleStats, StrawStats, SalesSchema};