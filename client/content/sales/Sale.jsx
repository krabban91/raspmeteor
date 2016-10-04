import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Sales } from '../../../collections/api/sales.js';

export default class Sale extends Component {

	render(){
		return (
			<div className = "panel">
			<h2>Sales item</h2>
			<ul>
				<li>säljare 1 : {this.props.sale.seller1}</li>
				<li>säljare 2 : {this.props.sale.seller2}</li>
				<li>Sålda med swish : {this.props.sale.soldWithSwish}</li>
				<li>Sålda med iZettle : {this.props.sale.soldWithIZettle}</li>
				<li>datum : {this.props.sale.createdAt}</li>
			</ul>
			</div>
			);
	}
}


Sale.PropTypes = {
	sale : PropTypes.object.isRequired,
};