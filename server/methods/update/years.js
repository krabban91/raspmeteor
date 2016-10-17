import { Meteor } from 'meteor/meteor';
import {Years} from '/both/collections/years.js';


Meteor.methods({
	'years.updateImage'(image){
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(),['admin'])){
	    	throw new Meteor.Error('not-authorized');
		}
		check(image, {
			_id: String,
			number: Number, 
			year: String, 
			fileName: String,
		});
		Years.update(image._id, { $set : {number: image.number, year: image.number, fileName: image.fileName}});
	}
});
