import { Meteor } from 'meteor/meteor';

import {ExampleAds} from '/both/collections/exampleAds.js';

Meteor.publish('exampleAds', function exampleAdsPublication(){
	return ExampleAds.find({});
});
