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


export default class Sale extends Component {

	onVerifiedChanged = (event, isInputChecked) => {
		if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
			Meteor.call('sales.changeVerifiedStatus', {saleId:this.props.sale._id, verified:isInputChecked});
		}
	}


	render(){
		let date =this.props.useLink? <a href={'/sales/edit/'+this.props.sale._id}>{this.props.sale.sellingDate.yyyymmdd('-')}</a>:this.props.sale.sellingDate.yyyymmdd('-');
					
		return (
			<TableRow>
				<TableRowColumn>
					{date}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.sale.sellers.join(',')}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.sale.soldRasps}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.sale.noOfStraws}	
				</TableRowColumn>
				<TableRowColumn>
					{this.props.sale.swishPayments}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.sale.iZettlePayments}	
				</TableRowColumn>
				<TableRowColumn>
					{Roles.userIsInRole(Meteor.userId(), ['admin'])?
						(<Checkbox
							checked={this.props.sale.verified?this.props.sale.verified:false}
							onCheck={this.onVerifiedChanged}
						/>):
						this.props.sale.verified?'Ja':'Nej'
					}
				</TableRowColumn>				
			</TableRow>
		);
	}
}


Sale.PropTypes = {
	sale : PropTypes.object.isRequired,
	useLink: PropTypes.bool.isRequired,
};
