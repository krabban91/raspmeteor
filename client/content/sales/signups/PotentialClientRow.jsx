import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';


Date.prototype.yyyymmdd = function(char){
	let mm = this.getMonth()+1;
	mm = mm>9? mm:'0'+mm;
	let dd = this.getDate();
	dd = dd>9? dd:'0'+dd;
	return [this.getFullYear(),  mm,  dd].join(char);
}


export default class PotentialClientRow extends Component {

	onIsContactedChanged = (event, isInputChecked) => {
		if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
			Meteor.call('subscribers.changeContactedStatus', {clientId:this.props.client._id, isContacted:isInputChecked});
		}
	}


	render(){
		let date = <a href={'/sales/signups/clients/view/'+
			this.props.client._id}>{this.props.client.createdAt.yyyymmdd('-')}</a>;

		return (
			<TableRow>
				<TableRowColumn>
					{date}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.client.name}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.client.email}	
				</TableRowColumn>
				<TableRowColumn>
					{Roles.userIsInRole(Meteor.userId(), ['admin'])?
						(<Checkbox
							checked={this.props.client.isContacted?this.props.client.isContacted:false}
							onCheck={this.onIsContactedChanged}
						/>):
						this.props.client.isContacted?'Ja':'Nej'
					}
				</TableRowColumn>				
			</TableRow>
		);
	}
}


PotentialClientRow.PropTypes = {
	client : PropTypes.object.isRequired,
};
