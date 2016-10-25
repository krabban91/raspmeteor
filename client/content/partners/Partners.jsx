import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {PreviousPartners} from '/both/collections/previousPartners.js';
import {PartnerDeals} from '/both/collections/partnerDeals.js';
import {ExampleAds} from '/both/collections/exampleAds.js';

class Partners extends Component {
	constructor(props){
		super(props);
		this.state = {
			hasSubmitted:false, 
			name:'',
			companyName:'',
			email:'',
			phone:'',
			message:''
		};
	}

	onNameChange = (event) =>{
		this.setState({name:event.target.value})
	}
	onCompanyChange = (event) =>{
		this.setState({companyName:event.target.value})
		
	}
	onPhoneChange = (event) =>{
		this.setState({phone:event.target.value})
		
	}
	onEmailChange = (event) =>{
		this.setState({email:event.target.value})

	}
	onMessageChange = (event) =>{
		this.setState({message:event.target.value})

	}
	onSubmitCompany = (event) => {
		event.preventDefault();
		Meteor.call('potentialPartner.add', 
			{
				name:this.state.name,
				companyName: this.state.companyName, 
				email:this.state.email,
				phone:this.state.phone,
				message:this.state.message,
			},
			this.onCompanyAdded);
	}

	onCompanyAdded = (err, res) => {
		if(err){
			console.log(err);
		}
		this.setState({hasSubmitted:true,name:'',companyName:'',email:'',phone:'',message:''});
	}

	renderOldPartnerInfo(partner){
		return (<div>partner</div>);
	}

	renderPartnerDealInfo(deal){
		return (<div>deal</div>);
	}
	renderExampleAd(ad){
		return (<div>ad</div>);
	}


	render() {
	    return (
			<div className="container">
				<Paper className='paperPadding' rounded={false}>
					<h2>Annonsera i Rasp</h2>
	        	    <Divider/>
					Vill Ni som företag komma ut med Ert varumärke 
					bland tusentals Chalmerister och andra Göteborgare? 
					Då finns möjligheten att annonsera i studentpublikationen Rasp! 
					Vi har en trogen skara som läser tidningen varje år, däribland Sveriges konung.
	        	</Paper>
	        	<div className='flexFlow'>
				{this.props.oldPartners && this.props.oldPartners.count>0?(
					<Paper className='paperPadding flexGrow' rounded={false}>
						<h3>Bland våra tidigare samarbetspartners kan nämnas</h3>
						<div>
						{this.props.oldPartners.map((partner) =>{ this.renderOldPartnerInfo(partner)})}
		        		</div>
		        	</Paper>
		        ):''}
				<div>
					Bland våra tidigare samarbetspartners kan nämnas:
					CING, Jobtop, Rock &amp; Werner, Bergstrands Kafferosteri, Nordstan,  Bengt Frithiofsson med flera. 
				</div>
				{this.props.partnerDeals && this.props.partnerDeals.count>0?(
					<Paper className='paperPadding flexGrow' rounded={false}>
						<h3>De olika samarbetsmodellerna vi har kan hittas här</h3>
		        		<div>
		        		{this.props.partnerDeals.map((deal) => {this.renderPartnerDealInfo(deal)})}	
		        		</div>
		        	</Paper>
				):''}
				{this.props.exampleAds && this.props.exampleAds.count>0?(
					<Paper className='paperPadding flexGrow' rounded={false}>
						<h3>Annonsexempel</h3>
						För att veta om det är aktuellt har vi några exempelannonser här. 
						<div>
		        			{this.props.exampleAds.map((example) => {this.renderExampleAd(example)})}	
		        		</div>
		        	</Paper>
				):''}
				
				
				<Paper className='paperPadding flexGrow' rounded={false}>
					<h3>Intresserad?</h3>
					{this.state.hasSubmitted?(<div>
						Tack för att ni kontaktar oss! Vi kommer att höra av oss så snart vi kan!
					</div>):(<div>
					Fyll i information här och så hör vi av oss inom kort!
					<form onSubmit={this.onSubmitCompany}>
					<div className='flexFlow'>
						<div className='flexGrow'>
							<TextField
								floatingLabelText='Namn'
			    				value={this.state.name}
			    				onChange={this.onNameChange}
			    				required={true}
			    				/>
						</div>
						<div className='flexGrow'>
				    		<TextField
								floatingLabelText='Företag'
			    				value={this.state.companyName}
			    				onChange={this.onCompanyChange}
			    				required={true}
			    				/>
						</div>
						<div className='flexGrow'>
				    		<TextField
								floatingLabelText='Telefon'
			    				value={this.state.phone}
			    				onChange={this.onPhoneChange}
			    				/>
						</div>
						<div className='flexGrow'>
				    		<TextField
								floatingLabelText='Email'
			    				value={this.state.email}
			    				onChange={this.onEmailChange}
			    				/>
						</div>
						<div className='flexGrow'>
			    			<TextField
								floatingLabelText='Önskemål'
			    				value={this.state.message}
			    				onChange={this.onMessageChange}
			    				multiLine={true}
			    				/>
				    	</div>
			    	</div>
					<div className='flexGrow'>
		    			<RaisedButton
		    				label='Skicka in'
		    				type='submit'
		    				/>
			    	</div>
			    	</form>
					</div>)}
		        </Paper>
		        </div>
			</div>
		);
	}
}

export default createContainer(()=> {
	Meteor.subscribe('previousPartners');
	Meteor.subscribe('partnerDeals');
	Meteor.subscribe('exampleAds');
	return {
		oldPartners : PreviousPartners.find({},{sort:{redaxNumber:-1}}),
		partnerDeals : PartnerDeals.find({},{sort:{price:1}}).fetch(),
		exampleAds : ExampleAds.find({},{sort:{name:1}}).fetch(),


	};
}, Partners);