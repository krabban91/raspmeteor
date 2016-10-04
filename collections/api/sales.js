import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import Schema from './../schemas/sales_schema.js'

const Sales = new Mongo.Collection('sales');

SimpleSchema.extendOptions({
	materialForm: Match.Optional(Object)
});

const SalesSchema = new SimpleSchema(Schema);

Sales.attachSchema(SalesSchema);

if(Meteor.isServer){

	Meteor.publish('sales', function salesPublication(){
		return Sales;
	});
}

Meteor.methods({
	'sales.insert'(soldWithSwish, soldWithIZettle, straws, seller1, seller2){
		 // Make sure the user is logged in before inserting a task
	    //if (! this.userId) {
	    //  throw new Meteor.Error('not-authorized');
	    //}

	    Sales.insert({
	    	soldWithSwish, 
	    	soldWithIZettle, 
	    	straws, 
	    	seller1, 
	    	seller2, 
	    	createdAt : new Date(), 
	    	//owner : this.userId,
	    });
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

export {Sales, SalesSchema};