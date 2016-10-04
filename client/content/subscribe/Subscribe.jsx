import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default class Subscribe extends Component {
	render() {
	    return (
			<div className="container">

				<h1>Köp Rasp</h1>
				<h2>Beställ tidningen Rasp online</h2>
				<div>
					Prenumerera på Rasp så riskerar du inte att bli utan! Maila rasp@rasp.chalmers.se så löser vi detta.
				</div>
		
			</div>
		);
	}
}
