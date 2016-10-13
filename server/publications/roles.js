import { Meteor } from 'meteor/meteor';

Meteor.publish('roles', function rolesPublication() {
  	return Roles.find({});
  });