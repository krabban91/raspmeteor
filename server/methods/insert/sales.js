import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Sales} from '/both/collections/sales.js';

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

	    return Sales.insert(
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
	}
});
