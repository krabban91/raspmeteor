import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default class Previous extends Component {
	
	render() {
		let files = Meteor.call('files.yearImages');
	    return (
			<div className="container">
				<h3>Tidigare raspar. Hurra!</h3>
				Här ska det gå att se tidigare raspars omslag, år för år. 
				<ul>
					<li>här kommer det komma filnamn</li>
					{files?files.map((filename) => {
						return (<li key={filename}>{filename}</li>);
					}):''}
				</ul>
			</div>
		);
	}
}
