import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import {Properties} from '/both/collections/properties.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';



 class Home extends Component {
	render() {
	    return (
	    	<div>
	    		<Paper className='paperPadding' rounded={false}>
					<h2>Rasp #{this.props.properties?this.props.properties.redaxNumber:''}</h2>
	        	    <Divider/>
					Tidningen för allvar och städat skämt.
	        	</Paper>
				<Paper  className='paperPadding' rounded={false}>
					Tidningen släpps i november på teknologgården på Chalmers. Efter detta ringlar ett tåg ner mot stadens kärna för att förse såväl Chalmerister som Göteborgare med årets utgåva. Orkar man inte vänta, eller inte har möjlighet att köpa tidningen på släppdagen kan man redan nu förbeställa sitt exemplar av tidningen. Den kommer då att skickas hem till dig per post når tidningen väl är släppt. Mer info finns under rubriken Försäljning.
				</Paper>
	    	</div>
		);
	}
}

export default createContainer( ()=> {
	Meteor.subscribe('properties');
	return {
		properties : Properties.findOne(),
	}
}, Home)