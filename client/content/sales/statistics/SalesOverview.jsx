import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import Recharts from 'recharts';

import Paper from 'material-ui/Paper';
import {Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn} from 'material-ui/Table';
import {grey1000, grey700, grey400, blueA200, blueA400, blueA100, fullWhite} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';


import { Sales, SaleStats, StrawStats } from '/both/collections/sales.js';

import GraphTooltip from './GraphTooltip.jsx'
import Sale from './Sale.jsx'
import Straw from './Straw.jsx'



class SalesOverview extends Component {

	renderSalesTable(sales, title){
		return (
			<Paper className='paperPadding'>
				<h2>{title}</h2>
				<Paper>
					<Table>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Datum</TableHeaderColumn>
								<TableHeaderColumn>Försäljare</TableHeaderColumn>
								<TableHeaderColumn>Sålda tidningar</TableHeaderColumn>
								<TableHeaderColumn>Strån</TableHeaderColumn>
								<TableHeaderColumn>Swish</TableHeaderColumn>
								<TableHeaderColumn>iZettle</TableHeaderColumn>
								<TableHeaderColumn className='small'>Verifierad</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sales.map((sale) => {
								return (
									<Sale
									  key={sale._id}
									  sale={sale}
									/>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
			</Paper>);
	}
	
	renderGraph(){
		const data = this.props.saleStats;
		let {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  = Recharts;
		return (
			<Paper className='paperPadding'>
				<h2>Försäljning över dagar</h2>
				<Paper>
					<LineChart width={600} height={300} data={data}
			            margin={{top: 30, right: 60, left: 20, bottom: 30}}>
					    <XAxis dataKey="_id" stroke={fade(fullWhite,0.8)}/>
					    <YAxis stroke={blueA100}/>
					    <CartesianGrid strokeDasharray="3 3"/>
					    <Tooltip content={<GraphTooltip/>} />
					    <Line type="monotone" dataKey="total" stroke={blueA100} activeDot={{r: 8}}/>
				    </LineChart>
				</Paper>
			</Paper>
      );
	}

	renderStraws(){
		return (
			<Paper className='paperPadding'>
				<h2>Strån tagna per person</h2>
				<Paper>
					<Table>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Säljare</TableHeaderColumn>
								<TableHeaderColumn>Strån tagna</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.props.strawStats.map((e) => {
								return (
									<Straw
									  	key={e._id}
										straw={e}
										/>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
			</Paper>
		);
	}

	render(){
		let verified = this.props.sales.filter((e)=>{return e.verified});
		let unverified = this.props.sales.filter((e)=>{return !e.verified});
		return (
			<div className = "overView">
				<h1>Överblick av försäljningen</h1>
				{Roles.userIsInRole(Meteor.userId(),['seller','admin'])?(
					<div>
						{this.renderGraph()}
					 	{this.renderStraws()}
					</div>):''}
				{Roles.userIsInRole(Meteor.userId(), ['admin'])?(
					<div>
						{unverified.length>0?
							this.renderSalesTable(unverified, "Overifierad försäljning"):''}
						{verified.length>0?
							this.renderSalesTable(verified, "Verifierad försäljning"):''}
					</div>):''}
			</div>
			);
	}
}

SalesOverview.PropTypes = {
	sales: PropTypes.array.isRequired,
	saleStats: PropTypes.array.isRequired,
	strawStats: PropTypes.array.isRequired,
}

export default createContainer(() => {
	Meteor.subscribe('sales');
	Meteor.subscribe('saleStats');
	Meteor.subscribe('strawStats');
	return {
		sales: Sales.find({}, {sort: {createdAt: 1}}).fetch(),
		saleStats: SaleStats.find({}, {sort: {_id: 1}}).fetch(),
		strawStats: StrawStats.find({},{sort: {_id: 1}}).fetch(),
	};	
}, SalesOverview);
