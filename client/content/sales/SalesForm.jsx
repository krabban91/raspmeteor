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
import DatePicker from 'material-ui/DatePicker';

import ClearIcon from 'react-material-icons/icons/content/clear';

import  Schema  from '../../../collections/schemas/sales_schema.js';
import { Sales } from '../../../collections/api/sales.js';


export default class SalesForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			sale: {
				sellers:[{name:''}], 		//input done
				sellingDate : new Date(),	//input done
				totalSellingTime : '',		//input done
				sellingLocation : "",		//input done
				soldRasps : 0,		 		//input done
				noOfStraws : 0.5,	 		//input done
				swishPayments : 0,	 		//input done
				iZettlePayments : 0, 		//input done
				weather : "",				//input done
				crowdness : "",				//input done
				tactic : "",				//input done
				funLevel : "",				//input done
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
	}
	onSellerUpdate = (key, event) => {
		let newSale = this.state.sale;
		newSale.sellers[key].name = event.target.value;
		this.setState({sale:newSale});
	}
	onAddSeller = (event) => {
		let newSale = this.state.sale;
		newSale.sellers.push({name:''}); 
		this.setState({sale:newSale});
	}
	//-----------------------
	// Date information
	onDateChange = (nell, date) => {
		let newSale = this.state.sale;
		newSale.sellingDate = date; 
		this.setState({sale:newSale});	
	}
	isDateInvalid = (date) => {
		let today = new Date();
		let dayDiff = (today-date)/(1000*60*60*24);
		return dayDiff > 30 || dayDiff <-10;
	}
	onTimeChange = (event) => {
		let newSale = this.state.sale;
		newSale.totalSellingTime = event.target.value;
		this.setState({sale:newSale});
	}
	onPlaceChange = (event) => {
		let newSale = this.state.sale;
		newSale.sellingLocation = event.target.value;
		this.setState({sale:newSale});
	}

	//-----------------------
	// Sales stats
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
	// Circumstances
	onWeatherChange = (event, index, value) => {
		let newSale = this.state.sale;
		newSale.weather = value; 
		this.setState({sale:newSale});	
	}
	onCrowdChange = (event, index, value) => {
		let newSale = this.state.sale;
		newSale.crowdness = value; 
		this.setState({sale:newSale});	
	}
	onTacticChange = (event, index, value) => {
		let newSale = this.state.sale;
		newSale.tactic = value; 
		this.setState({sale:newSale});	
	}
	onFunLevelChange = (event, index, value) => {
		let newSale = this.state.sale;
		newSale.funLevel = value; 
		this.setState({sale:newSale});	
	}
	//-----------------------
	// Other
	onCommentsChange = (event) => {
		let newSale = this.state.sale;
		newSale.funLevel = event.target.value; 
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
						<h4>Vem?</h4>
						{this.renderSellers(this.state.sale.sellers)}
					</Paper>
					<Paper className='paperPadding' rounded={false}>
						<h4>När? Var?</h4>
						{this.renderDate()}
					</Paper>
					<Paper className='paperPadding' rounded={false}>
						<h4>Hur mycket?</h4>
						{this.renderSalesStats()}
					</Paper>
					<Paper className='paperPadding' rounded={false}>
						<h4>Omständigheter?</h4>
						{this.renderCircumstances()}
					</Paper>
					<Paper className='paperPadding' rounded={false}>
						<h4>Övrigt</h4>
						{this.renderRemainders()}
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
				<div key = {index} >
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

	renderDate() {
		let sale = this.state.sale;
		let datePicker = (
			<DatePicker
				id='date_picker'
				key='datepicker'
				autoOk={true}
				shouldDisableDate={this.isDateInvalid}
				value = {sale.sellingDate}
				onChange = {this.onDateChange}
				/>
		);
		let time = (
			<TextField
				floatingLabelText='Hur länge? (t.ex. 1h15m)'
				value={sale.totalSellingTime}
				onChange={this.onTimeChange}
				/>
		);
		let place = (
			<TextField
				floatingLabelText='Vart? (Vörtpannan, stan, etc.)'
				value={sale.sellingLocation}
				onChange={this.onPlaceChange}
				/>
		);
		return (<div> {datePicker} {time} {place}</div>);
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

		return (<div>{rasps} {straws} {swish} {iZettle}</div>);
	}


	renderCircumstances(){
		let sale = this.state.sale;
		let weather = (
			<SelectField 
				hintText='Hur var vädret?'
				onChange={this.onWeatherChange}
				value={sale.weather}
				>
				<MenuItem 
					primaryText=''
					value=''
					/>
				<MenuItem 
					primaryText='Sol' 
					value='Sol'
					/>
				<MenuItem 
					primaryText='Uppehåll' 
					value='Uppehåll'
					/>
				<MenuItem 
					primaryText='Regn' 
					value='Regn'
					/>
				<MenuItem 
					primaryText='Blåsigt' 
					value='Blåsigt'
					/>
				<MenuItem 
					primaryText='Snö' 
					value='Snö'
					/>
				<MenuItem 
					primaryText='Hagel' 
					value='Hagel'
					/>
				<MenuItem 
					primaryText='Slask' 
					value='Slask'
					/>
			</SelectField>
		);
		let crowdness = (
			<SelectField 
				hintText='Var det mycket folk?'
				onChange={this.onCrowdChange}
				value={sale.crowdness}
				>
				<MenuItem 
					primaryText=''
					value=''
					/>
				<MenuItem 
					primaryText='Massor' 
					value='Massor'
					/>
				<MenuItem 
					primaryText='Ganska många' 
					value='Ganska många'
					/>
				<MenuItem 
					primaryText='Alldeles lagom' 
					value='Alldeles lagom'
					/>
				<MenuItem 
					primaryText='Några' 
					value='Några'
					/>
				<MenuItem 
					primaryText='Inte en jävel' 
					value='Inte en jävel'
					/>
			</SelectField>
		);
		let tactic = (
			<SelectField 
				hintText='Huvudsaklik säljartaktik'
				onChange={this.onTacticChange}
				value={sale.tactic}
				>
				<MenuItem 
					primaryText=''
					value=''
					/>
				<MenuItem 
					primaryText='Övertalning' 
					value='Övertalning'
					/>
				<MenuItem 
					primaryText='Glad och trevlig' 
					value='Glad och trevlig'
					/>
				<MenuItem 
					primaryText='Missionerande' 
					value='Missionerande'
					/>
				<MenuItem 
					primaryText='Ingen särskild' 
					value='Ingen särskild'
					/>
				<MenuItem 
					primaryText='Inte en jävel' 
					value='Inte en jävel'
					/>
			</SelectField>
		);
		let funLevel = (
			<SelectField 
				hintText='Hur kul var det?'
				onChange={this.onFunLevelChange}
				value={sale.funLevel}
				>
				<MenuItem 
					primaryText=''
					value=''
					/>
				<MenuItem 
					primaryText='Jävelroligt' 
					value='Jävelroligt'
					/>
				<MenuItem 
					primaryText='Kul. Punkt.' 
					value='Kul. Punkt.'
					/>
				<MenuItem 
					primaryText='meh.' 
					value='meh.'
					/>
				<MenuItem 
					primaryText='Jag ville dö' 
					value='Jag ville dö'
					/>
			</SelectField>
		);
		return (<div>{weather} {crowdness} {tactic} {funLevel}</div>)
	}
	renderRemainders(){
		return (
			<div>
				<TextField
					floatingLabelText='Kommentarer/förbättringsåsikter'
					value={this.state.comments}
					onChange={this.onCommentsChange}
					multiLine={true}
					rowsMax={10}
					/>		
			</div>);

	}
}


