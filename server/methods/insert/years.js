import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Years, YearsSchema} from '/both/collections/years.js';

Meteor.methods({
	'years.insert'(years){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		
		check(years, YearsSchema);
		
		Years.insert({
			number : years.number,
			year : years.year, 
			fileName : years.fileName
		});
	},
	'years.add'() {
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		return Years.insert({
			number : 200,
			year : 'year', 
			fileName : 'filename.png'
		});
	}
});
