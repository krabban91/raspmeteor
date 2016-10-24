import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import { Properties } from '/both/collections/properties';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';


 class History extends Component {
	render() {
	    return (
			<div>
	    		<Paper className='paperPadding' rounded={false}>
					<h2>Historia</h2>
	        	    <Divider/>
					Händelserna bakom "Tidningen för allvar och städat skämt."
	        	</Paper>
				<Paper  className='paperPadding' rounded={false}>
					<h3>Chalmeristisk humortidning</h3>
					<Divider/>
					RASP är en studentikos tidning bestående av skämtsamma texter och bilder. 
					Tidningen ges ut under devisen "tidning för allvar och städat skämt" 
					vilket sedan starten stått för en tidning som är både rolig och stilfull. 
					Ett särdrag hos tidningen är dess vana att skifta form och tema mellan utgåvorna. 
					Varje år tar sig tidningen en ny skepnad och denna förblir en väl bevarad hemlighet 
					ända fram tills den släpps.
				</Paper>
				<Paper  className='paperPadding' rounded={false}>
					<h3>Rolig sedan 1872</h3>
					<Divider/>
						RASP är en tidning som roat sina läsare i över hundra år. 
						Tidningens föregångare "Framåt" grundades 1867 men lades 
						ner bara några år senare. 
						År 1872 gavs den första egentliga RASPen ut. 
						Man brukar av historiska skäl räkna årgångarna från 1864 vilket betyder att årets 
						RASP har nummer {this.props.properties?this.props.properties.redaxNumber:''}. 
						Tidningen skrivs av chalmerister men flera gästande tecknare och skribenter har 
						medverkat genom åren. 
						Av de mest kända kan nämnas Axel Engdahl och konstnären Carl Larsson.
				</Paper>
				<Paper  className='paperPadding' rounded={false}>
					<h3>Släpps i november</h3>
					<Divider/>
						RASP ges ut en gång om året. Den släpps i november under högtidliga former och 
						är alltid lika uppskattad bland chalmerister och göteborgare. 
						Så håll utkik efter årets RASP!
				</Paper>
	    	</div>);
	}
}

export default createContainer( ()=> {
	Meteor.subscribe('properties');
	return {
		properties: Properties.findOne(),
	}
}, History)