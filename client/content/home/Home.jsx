import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../theme.jsx'



export default class Home extends Component {
	render() {
	    return (
	    	<div>
	    		<h2>Rasp #152</h2>
					<Divider/>
				<div>
					Tidningen släpps i november på teknologgården på Chalmers. Efter detta ringlar ett tåg ner mot stadens kärna för att förse såväl Chalmerister som Göteborgare med årets utgåva. Orkar man inte vänta, eller inte har möjlighet att köpa tidningen på släppdagen kan man redan nu förbeställa sitt exemplar av tidningen. Den kommer då att skickas hem till dig per post når tidningen väl är släppt. Mer info finns under rubriken Försäljning.
				</div>
	    	</div>
		);
	}
}
