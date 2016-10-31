import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import Recharts from 'recharts';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn} from 'material-ui/Table';
import {grey1000, grey700, grey400, blueA200, blueA400, blueA100, fullWhite} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import CheckCircleIcon from 'react-material-icons/icons/action/check-circle';
import DoneIcon from 'react-material-icons/icons/action/done';



import { Sales, SaleStats, StrawStats ,SalesTotal} from '/both/collections/sales.js';
import { Goals } from '/both/collections/goals.js';

import GraphTooltip from './GraphTooltip.jsx'
import Sale from './Sale.jsx'
import Straw from './Straw.jsx'



class SalesOverview extends Component {

	renderSalesTable(sales, title){
		return (
			<Paper className='paperPadding'>
				<h2>{title}</h2>
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
			</Paper>);
	}
	
	renderGraph(){
		const data = this.props.saleStats;
		let {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  = Recharts;
		return (
			<Paper className='paperPadding'>
				<h2>Försäljning över dagar</h2>
					<LineChart width={600} height={300} data={data}
			            margin={{top: 30, right: 60, left: 20, bottom: 30}}>
					    <XAxis dataKey="_id" stroke={fade(fullWhite,0.8)}/>
					    <YAxis stroke={blueA100}/>
					    <CartesianGrid strokeDasharray="3 3"/>
					    <Tooltip content={<GraphTooltip/>} />
					    <Line type="monotone" dataKey="total" stroke={blueA100} activeDot={{r: 8}}/>
				    </LineChart>
			</Paper>
      );
	}

	renderGoals() {
		const icon  = (<Avatar icon={<DoneIcon/>}/>);
		return (
			<Paper className='paperPadding'>
				<h2>Försäljningsmål</h2>
				{this.props.salesInfo?<span>Totalt har det sålts {this.props.salesInfo.total}st Rasp.</span>:'Inga raspar är sålda'}
				{this.props.goals?(<div>
					{this.props.goals.map((goal) => {
						let day = undefined;
						if(goal.isAchieved){
							day = moment(goal.dateAchieved);
							//day.locale('sv');
						}
						let time = day?(<span>(utförd {day.calendar()})</span>):'';
						return (<Paper className='pad1' key={goal._id}>
						<Card expandable={true}>
							<CardHeader title={<span>{goal.name} {time}</span>} subtitle={goal.amountOfRasps} avatar={goal.isAchieved?icon:''} actAsExpander={goal.showDescription || goal.isAchieved} showExpandableButton={goal.showDescription || goal.isAchieved}/>
							{goal.showDescription || goal.isAchieved?
								<CardText expandable={true}>
									{goal.description}
								</CardText>:''}
						</Card>
						</Paper>);})}
				</div>):'Det finns inga mål.'}
			</Paper>);
	}

	renderStraws(){
		return (
			<Paper className='paperPadding'>
				<h2>Strån tagna per person</h2>
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
		);
	}

	render(){
		let verified = this.props.sales.filter((e)=>{return e.verified});
		let unverified = this.props.sales.filter((e)=>{return !e.verified});
		return (
			<div className = "overView">
				<Paper className='paperPadding'>
					<h1>Överblick av försäljningen</h1>
					<Divider/>
					Här kan man se hur försäljningen har gått, 
					hur det går att nå målen 
					och hur många strån man tagit.  
				</Paper>
				{Roles.userIsInRole(Meteor.userId(),['seller','admin'])?(
					<div>
						{this.renderGraph()}
					 	{this.renderGoals()}
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
	Meteor.subscribe('goals');
	Meteor.subscribe('salesTotal');
	return {
		sales: Sales.find({}, {sort: {createdAt: 1}}).fetch(),
		saleStats: SaleStats.find({}, {sort: {_id: 1}}).fetch(),
		strawStats: StrawStats.find({},{sort: {_id: 1}}).fetch(),
		salesInfo: SalesTotal.findOne(),
		goals: Goals.find({},{sort:{amountOfRasps:1}}).fetch(),
	};	
}, SalesOverview);
