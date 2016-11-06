import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactAutoForm from 'meteor-react-autoform';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';


import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

import ClearIcon from 'react-material-icons/icons/content/clear';

import Sales from '/both/collections/sales.js';


export default class EditSalesForm extends Component {
	constructor(props){
		super(props);
		this.state= {dialogOpen:false}
	}

	static propTypes = {
		document:PropTypes.object,
		currentUser:PropTypes.object,
	}

	onRemoveClick = () =>
	{
		this.setState({dialogOpen:true});
	}
	onRemoveCancel = () =>
	{
		this.setState({dialogOpen:false});
		
	}
	onRemoveConfirm = () =>
	{
		Meteor.call('sales.remove',this.props.document._id);
		this.setState({dialogOpen:false});
		FlowRouter.go('/sales');

	}
	

	//-----------------------
	//Sellers
	onSellerRemove = (key, event) => {
		let sale = this.props.document;
		sale.sellers.splice(key,1);
		Meteor.call('sales.update',sale);
	}
	onSellerUpdate = (key, event) => {
		let sale = this.props.document;
		sale.sellers[key] = event.target.value;
		Meteor.call('sales.update',sale);
	}
	onAddSeller = (event) => {
		let sale = this.props.document;
		Meteor.call('sales.addSeller',sale);
	}
	//-----------------------
	// Date information
	onDateChange = (nell, date) => {
		let sale = this.props.document;
		sale.sellingDate = date;
		Meteor.call('sales.update',sale);
	}
	isDateInvalid = (date) => {
		let today = new Date();
		let dayDiff = (today-date)/(1000*60*60*24);
		return dayDiff > 30 || dayDiff <-1;
	}
	onTimeChange = (event) => {
		let sale = this.props.document;
		sale.totalSellingTime = event.target.value;
		Meteor.call('sales.update',sale);
	}
	onPlaceChange = (event) => {
		let sale = this.props.document.sale;
		sale.sellingLocation = event.target.value;
		Meteor.call('sales.update',sale);
	}

	//-----------------------
	// Sales stats
	onRaspsSoldChange = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)) {return;}
		let sale = this.props.document;
		sale.soldRasps = (value.length>0?parseInt(value):'');
		sale.swishPayments = Math.min(sale.swishPayments, Math.floor(value/2));
		sale.iZettlePayments = Math.min(sale.iZettlePayments,Math.floor(value/2));
		Meteor.call('sales.update',sale);
	}
	
	onStrawsChange = (event, value) => {
		let sale = this.props.document;
		sale.noOfStraws = value;
		Meteor.call('sales.update',sale);
	}
	onSwishChange = (event, value) => {
		let sale = this.props.document;
		let iZettle = Math.min(sale.soldRasps-value, sale.iZettlePayments);
		sale.swishPayments = value;
		sale.iZettlePayments = iZettle;
		Meteor.call('sales.update',sale);
	}
	onIZettleChange = (event, value) => {
		let sale = this.props.document;
		let swish = Math.min(sale.soldRasps-value, sale.swishPayments);
		sale.iZettlePayments = value;
		sale.swishPayments = swish;
		Meteor.call('sales.update',sale);
	}
	//-----------------------
	// Circumstances
	onWeatherChange = (event, value) => {
		let sale = this.props.document;
		sale.weather = value;
		Meteor.call('sales.update',sale);

	}
	onCrowdChange = (event, value) => {
		let sale = this.props.document;
		sale.crowdness = value;
		Meteor.call('sales.update',sale);
	}
	onTacticChange = (event, value) => {
		let sale = this.props.document;
		sale.tactic = value;
		Meteor.call('sales.update',sale);
	}
	onFunLevelChange = (event, value) => {
		let sale = this.props.document;
		sale.funLevel = value;
		Meteor.call('sales.update',sale);
	}
	//-----------------------
	// Other
	onCommentsChange = (event) => {
		let sale = this.props.document;
		sale.comments = event.target.value;
		Meteor.call('sales.update',sale);
	}

	//-----------------------

	
	render(){	
		return (
			<div className = "salesForm" >
				<Paper className='paperPadding paperMargin'>
					<h2>Ändra försäljning</h2>
					<Divider/>
					Försäljningsid : {this.props.document._id} 
				</Paper>
				<div className='flexFlow'>
					<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
						<h4>Vem?</h4>
						{this.renderSellers()}
					</Paper>
					<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
						<h4>När? Var?</h4>
						{this.renderDate()}
					</Paper>
					<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
						<h4>Hur mycket?</h4>
						{this.renderSalesStats()}
					</Paper>
					<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
						<h4>Omständigheter?</h4>
						{this.renderCircumstances()}
					</Paper>
					<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
						<h4>Övrigt</h4>
						{this.renderRemainders()}
					</Paper>
				</div>
				{this.renderRemoveDialog()}
			</div>
			);
	}
	renderRemoveDialog(){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.onRemoveCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.onRemoveConfirm}
				/>
		];
		return <div>
			<RaisedButton
				label="Ta bort"
				style={{float:'right', margin:30}}
				onTouchTap={this.onRemoveClick}
				/>
			<Dialog
	    		title={'Ta bort rapporten : '+this.props.document._id}
	    		modal={true}
	    		open={this.state.dialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort den här rapporten? 
			</Dialog>
		</div>
	}

	renderSellers(){
		let sellers = this.props.document.sellers;
		let fields = sellers.map((seller) =>{
			let index = sellers.indexOf(seller);
			let label = 'Säljare '+(index+1);
			return (
				<div key = {'seller'+index} >
					<TextField
						floatingLabelText={label}
						value={seller}
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
		return (<div>{fields} <br/> {addField} </div>);
	}

	renderDate() {
		let sale = this.props.document;
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
		let sale = this.props.document;
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

		return (<div>{rasps} {straws} {swish} {iZettle}</div>);
	}


	renderCircumstances(){
		let sale = this.props.document;
		const styles = {
			radiobutton: {
				marginBottom: 8,
			}, 
		};
		let weather = (
			<div>
				<h5>Hur var vädret?</h5>
				<RadioButtonGroup
					name='weatherRadio'
					valueSelected = {sale.weather}
					onChange={this.onWeatherChange}
					>
					<RadioButton
						label='Sol' 
						value='Sol'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Uppehåll' 
						value='Uppehåll'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Blåsigt' 
						value='Blåsigt'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Regn' 
						value='Regn'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Snö' 
						value='Snö'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Hagel' 
						value='Hagel'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Slask' 
						value='Slask'
						style={styles.radiobutton}
						/>
				</RadioButtonGroup>
			</div>

		);
		let crowdness = (
			<div>
				<h5>Antal förbipasserande?</h5>
				<RadioButtonGroup
					name='crowdnessRadio'
					valueSelected = {sale.crowdness}
					onChange={this.onCrowdChange}
					>
					<RadioButton
						label='Massor' 
						value='Massor'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Ganska många' 
						value='Ganska många'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Alldeles lagom' 
						value='Alldeles lagom'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Några' 
						value='Några'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Inte en jävel' 
						value='Inte en jävel'
						style={styles.radiobutton}
						/>
				</RadioButtonGroup>
			</div>
		);
		let tactic = (
			<div>
				<h5>Huvudsaklik säljartaktik?</h5>
				<RadioButtonGroup
					name='tacticRadio'
					valueSelected = {sale.tactic}
					onChange={this.onTacticChange}
					>
					<RadioButton
						label='Övertalning' 
						value='Övertalning'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Glad och trevlig' 
						value='Glad och trevlig'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Missionerande' 
						value='Missionerande'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Ingen särskild' 
						value='Ingen särskild'
						style={styles.radiobutton}
						/>
				</RadioButtonGroup>
			</div>
		);
		let funLevel = (
			<div>
				<h5>Hur kul var det?</h5>
				<RadioButtonGroup
					name='funLevelRadio'
					valueSelected = {sale.funLevel}
					onChange={this.onFunLevelChange}
					>
					<RadioButton
						label='Jävelroligt' 
						value='Jävelroligt'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Kul. Punkt.' 
						value='Kul. Punkt.'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='meh.' 
						value='meh.'
						style={styles.radiobutton}
						/>
					<RadioButton
						label='Jag ville dö' 
						value='Jag ville dö'
						style={styles.radiobutton}
						/>
				</RadioButtonGroup>
			</div>			
		);
		return (<div>{weather} {crowdness} {tactic} {funLevel}</div>)
	}

	renderRemainders(){
		return (
			<div>
				<TextField
					floatingLabelText='Kommentarer/förbättringsåsikter'
					value={this.props.document.comments}
					onChange={this.onCommentsChange}
					multiLine={true}
					rows={3}
					rowsMax={10}
					/>		
			</div>);

	}
}


