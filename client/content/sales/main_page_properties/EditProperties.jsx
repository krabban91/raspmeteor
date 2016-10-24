import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Tab,Tabs} from 'material-ui/Tabs';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import ClearIcon from 'react-material-icons/icons/content/clear';


import { createContainer } from 'meteor/react-meteor-data';

import {Properties} from '/both/collections/properties.js';


class EditProperties extends Component {
	constructor(props){
		super(props);
		this.state = {selectedTab: 'General'};
	}

	onTabChange = (value) => {
		this.setState({selectedTab:value});
	}

	onRedaxNumberChange = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)) {return;}
		Meteor.call('properties.updateRedaxNumber', parseInt(value));
	}
	onOrgNumberChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateOrgNumber', value);
	}
	onRaspPhoneChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateRaspPhone', value);
	}
	onRaspEmailChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateRaspEmail', value);
	}

	renderGeneralSettings = () => {
		let settings = this.props.properties;
		let phone= settings.raspPhone;
		let email= settings.raspEmail;
		return (
			<Paper className='paperPadding flexGrow' >
				<h3>Generella inställningar</h3>
				<div className='flexFlow'>
					<div className='flexGrow'>
						<TextField
							floatingLabelText='Raspredax-nummer (#)'
		    				value={settings.redaxNumber}
		    				onChange={this.onRedaxNumberChange}

		    				/>
					</div>
					<div className='flexGrow'>
			    		<TextField
							floatingLabelText='Föreningens org-nr'
		    				value={settings.organizationNumber}
		    				onChange={this.onOrgNumberChange}
		    				/>
					</div>
					<div className='flexGrow'>
			    		<TextField
							floatingLabelText='Telefonnummer'
		    				value={phone?phone:''}
		    				onChange={this.onRaspPhoneChange}
		    				/>
					</div>
					<div className='flexGrow'>
		    			<TextField
							floatingLabelText='Mailadress'
		    				value={email?email:''}
		    				onChange={this.onRaspEmailChange}
		    				/>
					</div>
		    	</div>
			</Paper>);
	}
	
	onRaspAmountChange = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)) {return;}
		Meteor.call('properties.updateRaspAmount', parseInt(value));
	}

	onStartDateChange = (nell, date) => {
		Meteor.call('properties.updateSaleStartDate', date);
	}
	onEndDateChange = (nell, date) => {
		Meteor.call('properties.updateSaleStopDate', date);
	}


	renderSalesSettings = () => {
		let settings = this.props.properties;
		return (
			<Paper className='paperPadding flexGrow'>
				<h3>Försäljningsinställningar</h3>
				<div className='flexFlow'>
					<div className='flexGrow'>
					<TextField
						floatingLabelText='Totalt antal raspar'
	    				value={settings.totalAmountOfRasps}
	    				onChange={this.onRaspAmountChange}

	    				/>
					</div>
					<div className='flexGrow'>
					{settings.sellingPeriodStart?(<label>Startdatum</label>):''}
		    		<DatePicker
		    			value={settings.sellingPeriodStart}
						onChange = {this.onStartDateChange}
		    			id='date_picker_start'
						key='datepicker_start'
						autoOk={true}
		    			/>
					</div>
					<div className='flexGrow'>
					{settings.sellingPeriodStop?'Slutdatum':''}
		    		<DatePicker
		    			value={settings.sellingPeriodStop}
						onChange = {this.onEndDateChange}
		    			id='date_picker_end'
						key='datepicker_end'
						autoOk={true}
		    			/>
					</div>
		    	</div>
			</Paper>);
	}

	onMethodDescriptionChange = (index, event) => {
		let value = event.target.value;
		let methods = this.props.properties.paymentMethods;
		if(value.length==0) {value = ' ';}
		methods[index].description = value;
		Meteor.call('properties.updatePaymentMethods', methods);
	}
	onMethodValueChange = (index, event) => {
		
		let value = event.target.value;
		let methods = this.props.properties.paymentMethods;
		if(value.length==0) {value = ' ';}
		methods[index].value = value;
		Meteor.call('properties.updatePaymentMethods', methods);
	}

	onAddPaymentMethod = (event) => {
		Meteor.call('properties.addPaymentMethod');
	}
	onRemovePaymentMethod = (index, event) => {
		Meteor.call('properties.removePaymentMethod', index);
	}



	renderPaymentMethods() {
		let methods = this.props.properties.paymentMethods;
		return (
			<Paper className='paperPadding flexGrow'>
				<h3>Betalningsmetoder</h3>
				<div className='flexFlow'>
					{methods.map((method, index) => { 
						return (<Paper 
							zDepth={2} 
							className='flexGrow'
		    				key={'method '+index}
		    				style={{marginBottom:20}}
							>
							<Card>
								<CardHeader 
									title={<span>Metod {index+1}</span>}
									subtitle={<span>{method.description}: {method.value}</span>}

									style={{paddingBottom:0}}
									/>
								<CardText style={{paddingTop:0}}>
									<TextField
										floatingLabelText='Beskrivning'
					    				value={method.description?method.description:''}
					    				onChange={this.onMethodDescriptionChange.bind(this, index)}
					    				/>
					    			<TextField
					    				floatingLabelText='Information'
					    				value={method.value?method.value:''}
					    				onChange={this.onMethodValueChange.bind(this, index)}
					    				/>
			    				</CardText>
								<CardActions>
									<FlatButton 
										label='ta bort'
										onTouchTap={this.onRemovePaymentMethod.bind(this, index)}
									>
									</FlatButton>
								</CardActions>
	    					</Card>
						</Paper>);}
					)}
					<RaisedButton
						fullWidth={true} 
						label='Lägg till'
						onTouchTap={this.onAddPaymentMethod}
					/>
		    	</div>
			</Paper>);

	}

	renderAddressCard(address, title, updateCallbacks) {
		return (<Paper 
			zDepth={2} 
			className='flexGrow'
			style={{marginBottom:20}}
			>	
			<Card>
				<CardHeader 
					title={title}
					style={{paddingBottom:0}}
					/>
				<CardText style={{paddingTop:0}}>
					<TextField
						floatingLabelText='Namn'
	    				value={address.name}
	    				onChange={updateCallbacks[0]}
	    				/>
	    			<TextField
	    				floatingLabelText='Gata & nummer'
	    				value={address.street}
	    				onChange={updateCallbacks[1]}
	    				/>
	    			<TextField
	    				floatingLabelText='postkod & ort'
	    				value={address.postalInfo}
	    				onChange={updateCallbacks[2]}
	    				/>
				</CardText>
			</Card>
		</Paper>)
	}

	onVisitingAddressNameChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateVisitingName', value);
	}
	onVisitingAddressStreetChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateVisitingStreet', value);
	}
	onVisitingAddressPostalInfoChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateVisitingPostalInfo', value);
	}
	onInvoiceAddressNameChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateInvoiceName', value);
	}
	onInvoiceAddressStreetChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateInvoiceStreet', value);
	}
	onInvoiceAddressPostalInfoChange = (event) => {
		let value = event.target.value;
		Meteor.call('properties.updateInvoicePostalInfo', value);
	}



	renderAddresses(){
		let settings=this.props.properties;
		return (<Paper className='paperPadding flexGrow'>
				<h3>Adresser</h3>
				<div className='flexFlow'>
					{this.renderAddressCard(
						settings.visitingAddress, 
						'Besöksadress', 
						[
							this.onVisitingAddressNameChange,
							this.onVisitingAddressStreetChange,
							this.onVisitingAddressPostalInfoChange,
						]
					)}
					{this.renderAddressCard(
						settings.invoiceAddress, 
						'Fakturaadress', 
						[
							this.onInvoiceAddressNameChange,
							this.onInvoiceAddressStreetChange,
							this.onInvoiceAddressPostalInfoChange,
						]
					)}
		    	</div>
		</Paper>);
	}

	render () {
		// nummer, försäljningsstart, -stopp
		// Address, betalning, kontakt, 
		return (<div>
			<Paper className='paperPadding'>
				<h2>
					Generella inställningar 
				</h2>
        	    <Divider/>
	        	    Här justeras de flesta värdena som behövs för att försäljningen och hemsidan skall fungera korrekt.  
	        </Paper>
	        <div className='flexFlow'>
				{this.props.properties? this.renderGeneralSettings():''}
				{this.props.properties? this.renderSalesSettings():''}
    			{this.props.properties? this.renderAddresses():''}
    			{this.props.properties? this.renderPaymentMethods():''}
	        </div>
		</div>) 
	};

}

export default createContainer( () => {
	Meteor.subscribe('properties');
	return {
		properties : Properties.findOne(),
	}
}, EditProperties);