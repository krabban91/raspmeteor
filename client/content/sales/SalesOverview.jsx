import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import { Sales } from '../../../collections/api/sales.js';
import Sale from './Sale.jsx'

class SalesOverview extends Component {

	renderSales(){
		let sales = this.props.sales;
		console.log("the sales are:");
		console.log(sales);
		return sales.map((sale) => {
			return (
				<Sale
				  sale={sale}
				/>
			);
		});
	}

	render(){
		return (
			<div className = "overView">
			<h2>Sales Overview</h2>
			<div className = "panel-body">
				{this.renderSales()}
			</div>

			</div>
			);
	}
}

SalesOverview.PropTypes = {
	sales: PropTypes.array.isRequired,
}

export default createContainer(() => {
	return {
		sales: Sales.find({}, {sort: {createdAt: -1}}).fetch(),
	};	
}, SalesOverview);
