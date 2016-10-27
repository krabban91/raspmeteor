import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {SalesInformation} from '/both/collections/salesInformation.js';
import {Properties} from '/both/collections/properties.js';
import {SalesTotal} from '/both/collections/sales.js';


class SalesHome extends Component {


	renderNewsPost = (info) => {
		return (<div key={info._id} className='salesNewsPost'>
			<div className='salesNewsHeader'>
				<h4>{info.name}</h4>
				<h6>{moment(info.createdAt).calendar()}</h6>
			</div>
			<div className='salesNewsContent'>
				{info.content}
			</div>
			<Divider/>
		</div>);
	}

	render(){
		return (
			<div className = "overView">
				<Paper className='paperPadding'>
					<h2>Försäljningsinformation</h2>
					<Divider/>
					Hej och välkommen till försäljningsinsidan! 
					Här kan du hitta allt kring försäljningen av tidningen Rasp. 
				</Paper>
				{Roles.userIsInRole(Meteor.user(),['admin', 'seller']) && this.props.news?(
					<Paper className ='paperPadding'>
						{this.props.news.map((info)=>{return this.renderNewsPost(info);})}
						{this.props.settings && this.props.salesInfo && this.props.news?(<div className='flexFlow'>
						<Divider/>
							<table className='fill'><tbody><tr>
								<td>Totalt antal nyheter: {this.props.news.length}</td>
								<td>Säljstart: {moment(this.props.settings.sellingPeriodStart).calendar()}</td>
								<td>Säljstopp: {moment(this.props.settings.sellingPeriodStop).calendar()}</td>
								<td>Totalt sålda raspar: {this.props.salesInfo.total}</td>
							</tr></tbody></table>
							</div>):''}
					</Paper>
				):''}
			</div>
		);
	}
}


export default createContainer(()=>{
	Meteor.subscribe('salesInformation');
	Meteor.subscribe('properties');
	Meteor.subscribe('salesTotal');
	return {
		news : SalesInformation.find({},{sort:{createdAt:-1}}).fetch(),
		settings : Properties.findOne(),
		salesInfo: SalesTotal.findOne(),
	}
},SalesHome);
