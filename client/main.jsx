import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './startup/accounts-config.js';

import injectTapEventPlugin from 'react-tap-event-plugin';

 



Meteor.startup(() => {

	injectTapEventPlugin();
	moment().locale('sv')
  	//render(<App />, document.getElementById('render-target'));

});




