import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';


Date.prototype.yyyymmdd = function(char){
	let mm = this.getMonth()+1;
	mm = mm>9? mm:'0'+mm;
	let dd = this.getDate();
	dd = dd>9? dd:'0'+dd;
	return [this.getFullYear(),  mm,  dd].join(char);
}


export default class PotentialPartnersRow extends Component {

	onIsContactedChanged = (event, isInputChecked) => {
		if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
			Meteor.call('potentialPartners.changeContactedStatus', {partnerId:this.props.partner._id, isContacted:isInputChecked});
		}
	}


	render(){
		let date = <a href={'/sales/signups/partners/view/'+
			this.props.partner._id}>{this.props.partner.createdAt.yyyymmdd('-')}</a>;

		return (
			<TableRow>
				<TableRowColumn>
					{date}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.partner.companyName}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.partner.name}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.partner.email}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.partner.phone}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.partner.message}	
				</TableRowColumn>
				<TableRowColumn>
					{Roles.userIsInRole(Meteor.userId(), ['admin'])?
						(<Checkbox
							checked={this.props.partner.isContacted?this.props.partner.isContacted:false}
							onCheck={this.onIsContactedChanged}
						/>):
						this.props.partner.isContacted?'Ja':'Nej'
					}
				</TableRowColumn>				
			</TableRow>
		);
	}
}


PotentialPartnersRow.PropTypes = {
	partner : PropTypes.object.isRequired,
};
