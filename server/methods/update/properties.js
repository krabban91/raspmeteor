import { Meteor } from 'meteor/meteor';
import {Properties} from '/both/collections/properties.js';


Meteor.methods({
	'properties.updateRedaxNumber'(number){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(number, Number);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{redaxNumber:number}});

	},
	'properties.updateOrgNumber'(number){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(number, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{organizationNumber:number}});

	},
	'properties.updateRaspEmail'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{raspEmail:value}});
	},
	'properties.updateRaspPhone'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{raspPhone:value}});
	},
	'properties.updateRaspAmount'(number){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(number, Number);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{totalAmountOfRasps:number}});

	},
	'properties.updateSaleStartDate'(date){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(date, Date);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{sellingPeriodStart:date}});

	},
	'properties.updateSaleStopDate'(date){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(date, Date);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{sellingPeriodStop:date}});

	},
	'properties.updateVisitingName'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{'visitingAddress.name':value}});

	},
	'properties.updateVisitingStreet'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{'visitingAddress.street':value}});

	},
	'properties.updateVisitingPostalInfo'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{'visitingAddress.postalInfo':value}});

	},
	'properties.updateInvoiceName'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{'invoiceAddress.name':value}});

	},
	'properties.updateInvoiceStreet'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{'invoiceAddress.street':value}});

	},
	'properties.updateInvoicePostalInfo'(value){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(value, String);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{'invoiceAddress.postalInfo':value}});

	},

	'properties.updatePaymentMethods'(methods){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(methods, [Object]);
		let prop = Properties.findOne();
		Properties.update(prop._id, {$set:{paymentMethods:methods}});
	},

	'properties.removePaymentMethod'(methodIndex){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(methodIndex, Number);
		let prop = Properties.findOne();
		prop.paymentMethods.splice(methodIndex,1)
		Properties.update(prop._id, {$set:{paymentMethods:prop.paymentMethods}});
	},
	'properties.addPaymentMethod'(){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		let prop = Properties.findOne();
		prop.paymentMethods.push({description:'<description>', value:'<value>'})
		Properties.update(prop._id, {$set:{paymentMethods:prop.paymentMethods}});
	}
});
