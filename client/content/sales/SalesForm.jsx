import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactAutoForm from 'meteor-react-autoform';

import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


import  Schema  from '../../../collections/schemas/sales_schema.js';
import { Sales } from '../../../collections/api/sales.js';


export default class SalesForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			sale: {
				soldInPairs : true,
				seller1 : '',
				seller2 : '',
				soldRasps : 0,
				noOfStraws : 0,
				swishPayments : 0,
				iZettlePayments : 0,
				sellingDate : new Date(),
				sellingLocation : "",
				totalSellingTime : 0,
				weather : "",
				crowdness : "",
				tactic : "",
				funLevel : "",
				comments : ""
			}
		};
	}

	onSellerToggle = (event) => {
		let newSale = this.state.sale;
		
		newSale.soldInPairs = !newSale.soldInPairs;
		if(!newSale.soldInPairs){
			newSale.seller2 = '';
		}
		this.setState({sale:newSale});
	}
	onSeller1Change = (event) =>{
		let newSale = this.state.sale;
		newSale.seller1 = event.target.value;
		this.setState({sale:newSale});
	}

	onSeller2Change = (event) =>{
		let newSale = this.state.sale;
		newSale.seller2 = event.target.value;
		this.setState({sale:newSale});
	}



	submitForm = (event) => {
		console.log(this.state.sale);
		console.log('form submission');

		//meteor.call('sales.insert', text, ()=>{
		////	this is the callback if 'sales.insert' is found. 
		//});
	}
	
	render(){	
		return (
			<div className = "salesForm" >
				<h2>Försäljningsformulär</h2>
				här kommer vi ha ett formulär..<br/>
				Enkelt att använda osv. 
				<form onSubmit={this.submitForm}>
				<div className='salesFormGroup'>
					<Toggle 
						label='Sålde i par'
						toggled={this.state.sale.soldInPairs}
						onToggle={this.onSellerToggle}
						/>
					<TextField
						floatingLabelText='Säljare 1'
						value={this.state.sale.seller1}
						onChange={this.onSeller1Change}
						/>
					<TextField
						disabled = {!this.state.sale.soldInPairs}
						floatingLabelText='Säljare 2'
						value={this.state.sale.seller2}
						onChange={this.onSeller2Change}
						/>
					
				</div>
				<RaisedButton
					label="Registrera"
					/>
				</form>

			</div>
			);
	}
}


