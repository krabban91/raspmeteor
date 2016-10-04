import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default class Contact extends Component {
	render() {
	    return (
			<div className="container">
				
				<h1>Redax</h1>
				<div>
					<h3>RASP-redax</h3>
					Emil Oförvägen 1A<br/>
					412 58 Göteborg<br/>
					Telefon: 031-18 10 22<br/>
					
					PlusGiro: 46631-8<br/>
					rasp @ rasp.chalmers.se
				</div>
				<h2>Redax #152 består av följande personer:</h2>
				<div>
				  <h3>Chefredaktör</h3>
					Ebba Mannheimer<br/>
					0708 - 74 31 73
				</div>
				<div>
					<h3>Kassör</h3>
					Cajsa Olsson<br/>
					0768 - 53 34 37
				</div>
				<div>
					<h3>PR-ansvarig</h3>
					Gabriel Andersson<br/>
					0705 - 92 65 32
				</div>
				<div>
				  <h3>Redaktör</h3>
					Olof Henning<br/>
					0708 - 56 06 69
				</div>
				<div>
					<h3>Redaktör</h3>
					Daniel Palmqvist
					<br/>
					0707 - 98 34 51
				</div>
		
			</div>
		);
	}
}
