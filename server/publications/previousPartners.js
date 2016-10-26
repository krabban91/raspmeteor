import { Meteor } from 'meteor/meteor';

import {PreviousPartners} from '/both/collections/previousPartners.js';

Meteor.publish('previousPartners', function previousPartnersPublication(){
	return PreviousPartners.find({});
});
