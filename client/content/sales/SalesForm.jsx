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
			
				sellers:[{name:''}], 		//input done	//Validation 
				sellingDate : new Date(),	//input done	
				totalSellingTime : '',		//input done	//required
				sellingLocation : "",		//input done	//required
				soldRasps : 0,		 		//input done	
				noOfStraws : 0.5,	 		//input done	
				swishPayments : 0,	 		//input done	(soldrasps>0 -> swish+izettle >0)
				iZettlePayments : 0, 		//input done
				weather : "",				//input done	//required
				crowdness : "",				//input done	//required
				tactic : "",				//input done	//required
				funLevel : "",				//input done	//required
				comments : "",				//input done
		};
		this.error = {
			sellers:'',
			sales:'', 
			circumstances:'',
		};
	}

	submitForm = (event) => {
		event.preventDefault();
		//check sellers
		let sellersValid = this.validateSellersOnSubmit(this.state.sellers); 
		if(!sellersValid){
			this.error.sellers='Namn saknas eller tomma fält.';
			this.setState({sellers:this.state.sellers});
		}
		let salesValid = this.validateSalesAndTransactions(
			this.state.soldRasps, this.state.swishPayments,this.state.iZettlePayments);
		if(!salesValid){
			this.error.sales = 'Fel mellan transaktioner och antal raspar sålda.'
			this.setState({soldRasps:this.state.soldRasps});
		}
		let circumstancesValid = this.validateCircumstances(this.state.weather, this.state.crowdness, this.state.tactic, this.state.funLevel);
		if(!circumstancesValid){
			this.error.circumstances = 'Välj något bara.';
			this.setState({weather:this.state.weather});
		}
		if(sellersValid && salesValid && circumstancesValid){
			console.log(this.state);
			console.log('form submission. well done!');
		}

	}
	
	validateSellersOnSubmit(sellers){
		return sellers && 
			sellers.length>0 && 
			sellers.every((seller) => {return seller.name && seller.name.trim().length>0});
		
	}
	validateSalesAndTransactions(soldRasps, swishs, iZettles){
		let noTransactions = swishs === 0 && iZettles === 0;
		let noneSold = soldRasps===0;
		return noneSold === noTransactions;
	}

	validateCircumstances(weather, crowdness, tactic, funLevel){
		return weather ==='' ||
			crowdness===''||
			tactic===''||
			funLevel==='';
	}

	//-----------------------
	//Sellers
	onSellerRemove = (key, event) => {
		let sellers = this.state.sellers;
		sellers.splice(key,1);
		this.error.sellers='';
			
		this.setState({sellers:sellers});
	}
	onSellerUpdate = (key, event) => {
		let sellers = this.state.sellers;
		sellers[key].name = event.target.value;
		this.error.sellers='';
		this.setState({sellers:sellers});
	}
	onAddSeller = (event) => {
		let sellers = this.state.sellers;
		sellers.push({name:''}); 
		this.error.sellers='';
		this.setState({sellers:sellers});
	}
	//-----------------------
	// Date information
	onDateChange = (nell, date) => {
		this.setState({sellingDate:date});	
	}
	isDateInvalid = (date) => {
		let today = new Date();
		let dayDiff = (today-date)/(1000*60*60*24);
		return dayDiff > 30 || dayDiff <-10;
	}
	onTimeChange = (event) => {
		this.setState({totalSellingTime:event.target.value});
	}
	onPlaceChange = (event) => {
		this.setState({sellingLocation:event.target.value});
	}

	//-----------------------
	// Sales stats
	onRaspsSoldChange = (event) => {
		let value = event.target.value;
		if(isNaN(value)) {return;}
		this.error.sales='';

		this.setState({soldRasps:value});
		this.setState({swishPayments:Math.min(this.state.swishPayments, value)});
		this.setState({iZettlePayments:Math.min(this.state.iZettlePayments,value)});
	}
	
	onStrawsChange = (event, value) => {
		this.setState({noOfStraws:value});
	}
	onSwishChange = (event, value) => {
		this.error.sales='';
		this.setState({swishPayments:value});
	}
	onIZettleChange = (event, value) => {
		this.error.sales='';
		this.setState({iZettlePayments:value});
	}
	//-----------------------
	// Circumstances
	onWeatherChange = (event, index, value) => {
		this.error.circumstances='';
		this.setState({weather:value});

	}
	onCrowdChange = (event, index, value) => {
		this.error.circumstances='';
		this.setState({crowdness:value});	
	}
	onTacticChange = (event, index, value) => {
		this.error.circumstances='';
		this.setState({tactic:value});	
	}
	onFunLevelChange = (event, index, value) => {
		this.error.circumstances='';
		this.setState({funLevel:value});	
	}
	//-----------------------
	// Other
	onCommentsChange = (event) => {
		this.setState({comments:event.target.value});	
	}

	//-----------------------

	
	render(){	
		return (
			<div className = "salesForm" >
				<h2>Försäljningsformulär</h2>
				här kommer vi ha ett formulär..<br/>
				Enkelt att använda osv. 
				<form onSubmit={this.submitForm}>
					<Paper className='paperPadding' rounded={false}>
						<h4>Vem?</h4>
						{this.renderSellers()}
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
					type='submit'
					/>
				</form>
			</div>
			);
	}

	renderSellers(){
		let sellers = this.state.sellers;
		let fields = sellers.map((seller) =>{
			let index = sellers.indexOf(seller);
			let label = 'Säljare '+(index+1);
			return (
				<div key = {index} >
					<TextField
						floatingLabelText={label}
						value={seller.name}
						onChange={this.onSellerUpdate.bind(this,index)}
						required={true}
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
		return (<div>{fields} <div className='error-label'>{this.error.sellers.length==0?'':(<span>{this.error.sellers}</span>)}</div> <br/> {addField} </div>);
	}

	renderDate() {
		let sale = this.state;
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
				required={true}
				/>
		);
		let place = (
			<TextField
				floatingLabelText='Vart? (Vörtpannan, stan, etc.)'
				value={sale.sellingLocation}
				onChange={this.onPlaceChange}
				required={true}
				/>
		);
		return (<div> {datePicker} {time} {place}</div>);
	}

	renderSalesStats(){
		let possibleSales = _.range(151);
		let sale = this.state;
		let rasps = (<TextField
						floatingLabelText='Antal raspar sålda'
						value={sale.soldRasps}
						onChange={this.onRaspsSoldChange}
						required={true}
						/>);
		
		let straws = (
			<div>
				<label>Antal strån/person för passet : {sale.noOfStraws}</label>
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

		return (<div>{rasps} {straws} {swish} {iZettle}<div className='error-label'>{this.error.sales.length==0?'':(<span>{this.error.sales}</span>)}</div></div>);
	}


	renderCircumstances(){
		let sale = this.state;
		let weather = (
			<SelectField 
				hintText='Hur var vädret?'
				onChange={this.onWeatherChange}
				value={sale.weather}
				required={true}
				>
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
				required={true}
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
				required={true}
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
				required={true}
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
					rows={3}
					rowsMax={10}
					/>		
			</div>);

	}
}


