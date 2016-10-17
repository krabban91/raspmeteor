import { Meteor } from 'meteor/meteor';

import {Years} from '/both/collections/years.js';

import {RaspImageData} from '/server/init_values/raspImageData.js';


Meteor.publish('years', function yearsPublication(){
	let item =Years.findOne();
	console.log(item); 

	if(!item){
		RaspImageData.map((image) => {
			Years.insert({
				number : image.number,
				year : image.year, 
				fileName : image.fileName
			});
		});
	}

	return Years.find({});
});
