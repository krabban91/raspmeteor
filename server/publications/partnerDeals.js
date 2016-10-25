import { Meteor } from 'meteor/meteor';

import {PartnerDeals} from '/both/collections/partnerDeals.js';

Meteor.publish('partnerDeals', function partnerDealsPublication(){
	return PartnerDeals.find({});
});
