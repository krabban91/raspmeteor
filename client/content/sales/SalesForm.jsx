import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactAutoForm from 'meteor-react-autoform';

import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ClearIcon from 'react-material-icons/icons/content/clear';

import  Schema  from '../../../collections/schemas/sales_schema.js';
import { Sales } from '../../../collections/api/sales.js';


export default class SalesForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			sale: {
				sellers:[{name:''}], 		//input done
				soldRasps : 0,		 		//input done
				noOfStraws : 0.5,	 		//input done
				swishPayments : 0,	 		//input done
				iZettlePayments : 0, 		//input done
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

	//-----------------------
	//Sellers
	onSellerRemove = (key, event) => {
		let newSale = this.state.sale;
		newSale.sellers.splice(key,1);
		this.setState({sale:newSale});
		console.log(key);
	}
	onSellerUpdate = (key, event) => {
		let newSale = this.state.sale;
		newSale.sellers[key].name = event.target.value;
		this.setState({sale:newSale});
		console.log(key);
	}
	onAddSeller = (event) => {
		let newSale = this.state.sale;
		newSale.sellers.push({name:''}); 
		this.setState({sale:newSale});
	}
	//-----------------------
	// Sales states
	onRaspsSoldChange = (event) => {
		if(isNaN(event.target.value)) {return;}
		let newSale = this.state.sale;
		newSale.soldRasps = event.target.value;
		newSale.swishPayments = Math.min(newSale.swishPayments, newSale.soldRasps); 
		newSale.iZettlePayments = Math.min(newSale.iZettlePayments, newSale.soldRasps); 
		this.setState({sale:newSale});
	}
	
	onStrawsChange = (event, value) => {
		let newSale = this.state.sale;
		newSale.noOfStraws = value; 
		this.setState({sale:newSale});
	}
	onSwishChange = (event, value) => {
		let newSale = this.state.sale;
		newSale.swishPayments = value; 
		this.setState({sale:newSale});
	}
	onIZettleChange = (event, value) => {
		let newSale = this.state.sale;
		newSale.iZettlePayments = value; 
		this.setState({sale:newSale});
	}

	//-----------------------

	submitForm = (event) => {
		console.log(this.state.sale);
		console.log('form submission');

	}
	
	render(){	
		return (
			<div className = "salesForm" >
				<h2>Försäljningsformulär</h2>
				här kommer vi ha ett formulär..<br/>
				Enkelt att använda osv. 
				<form onSubmit={this.submitForm}>
					<Paper className='paperPadding' rounded={false}>
						<h4>Försäljare</h4>
						{this.renderSellers(this.state.sale.sellers)}
					</Paper>
					<Paper className='paperPadding' rounded={false}>
						<h4>Försäljning</h4>
						{this.renderSalesStats()}
					</Paper>
				<RaisedButton
					label="Registrera"
					/>
				</form>
			</div>
			);
	}

	renderSellers(sellers){
		let fields = sellers.map((seller) =>{
			let index = sellers.indexOf(seller);
			let label = 'Säljare '+(index+1);
			return (
				<div
					key = {index}
					>
					<TextField
						floatingLabelText={label}
						value={seller.name}
						onChange={this.onSellerUpdate.bind(this,index)}
						/>
					{sellers.length==1 ||index==0?'':(
						<IconButton
							label='-'
							onTouchTap={this.onSellerRemove.bind(this,index)}
						>
							<ClearIcon/>													
						</IconButton>)
					}
				</div>
			);});
		let addField = (<RaisedButton
					label="Lägg till säljare"
					onTouchTap={this.onAddSeller}
					/>);
		return (<div>{fields}<br/> {addField}</div>);
	}
	renderSalesStats(){
		let possibleSales = _.range(151);
		let sale = this.state.sale;
		let rasps = (<TextField
						floatingLabelText='Antal raspar sålda'
						value={sale.soldRasps}
						onChange={this.onRaspsSoldChange}
						/>);
		
		let straws = (
			<div>
				<label>Antal strån för passet: {sale.noOfStraws}</label>
				<Slider 
					className='sliderMargin'
					min={0}
					max={4}
					value ={sale.noOfStraws}
					step={0.25}
					onChange={this.onStrawsChange}
					/>
			</div>);

		let swish = (
			<div>
				<label>Antal Swish (till 123-658 04 19): {sale.swishPayments}</label>
				<Slider
					className='sliderMargin'
					min={0}
					max={Math.max(1,sale.soldRasps)}
					disabled={sale.soldRasps?false:sale.soldRasps==0}
					value ={sale.swishPayments}
					step={1}
					onChange={this.onSwishChange}
					/>
			</div>);
		let iZettle = (
			<div>
				<label>Antal iZettle-betalningar: {sale.iZettlePayments}</label>
				<Slider
					className='sliderMargin'
					min={0}
					max={Math.max(1,sale.soldRasps)}
					disabled={sale.soldRasps?false:sale.soldRasps==0}
					value ={sale.iZettlePayments}
					step={1}
					onChange={this.onIZettleChange}
					/>
			</div>);

		return (<div>{rasps} <br/> {straws} {swish} {iZettle}</div>)
	}
}


