import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';


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
		Meteor.call('potentialPartners.add', 
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

	renderOldPartnerInfo(old){
		return (
			<Card key={old._id}>
				<CardHeader title={old.name} subtitle={<span>#{old.redaxNumber}</span>} actAsExpander={true} showExpandableButton={true}/>
				{old.fileLocation&&old.fileLocation.length>0?
					<CardMedia expandable={true}>
						<img src={old.fileLocation} />
					</CardMedia>
					:''}
				<CardText expandable={true}>
					<div>
					<h4>{old.type}</h4>
					{old.description}
					</div>
					<div>
						<i>samarbetspartners årgång #{old.redaxNumber}</i>					
					</div>
				</CardText>
			</Card>);
	}

	renderPartnerDealInfo(deal){
		return (
			<Card key={deal._id}>
				<CardHeader title={deal.name} subtitle={deal.type} actAsExpander={true} showExpandableButton={true}/>
				<CardText expandable={true}>
					<div>
						{deal.description}
					</div>
					<div>
						<h4>Pris</h4>
						{deal.price} SEK
					</div>
				</CardText>
			</Card>);
	}
	renderExampleAd(ad){
		return (
			<Paper className='pad1' key={ad._id}>
			<Card expandable={true}>
				<CardHeader title={ad.name} actAsExpander={true} showExpandableButton={true}/>
				{ad.fileLocation&&ad.fileLocation.length>0?
					<CardMedia expandable={true}>
						<img src={ad.fileLocation} />
					</CardMedia>
					:''}
				<CardText expandable={true}>
					{ad.description}
				</CardText>
			</Card>
			</Paper>);

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
	        	<div className='flexFlow vertical'>
				{this.props.oldPartners && this.props.oldPartners.length>0?(
					<Paper className='paperPadding flexGrow' rounded={false}>
						<h3>Bland våra tidigare samarbetspartners kan nämnas</h3>
						<div>
							{this.props.oldPartners.map((partner) =>{ return this.renderOldPartnerInfo(partner)})}
		        		</div>
		        	</Paper>
		        ):''}
				{this.props.partnerDeals && this.props.partnerDeals.length>0?(
					<Paper className='paperPadding flexGrow' rounded={false}>
						<h3>De olika samarbetsmodellerna vi har kan hittas här</h3>
		        		<div>
		        			{this.props.partnerDeals.map((deal) => { return this.renderPartnerDealInfo(deal)})}	
		        		</div>
		        	</Paper>
				):''}
				{this.props.exampleAds && this.props.exampleAds.length>0?(
					<Paper className='paperPadding flexGrow overflowY' rounded={false}>
						<h3>Annonsexempel</h3>
						<div className='overflowY'>
		        			{this.props.exampleAds.map((example) => { return this.renderExampleAd(example)})}	
		        		</div>
		        	</Paper>
				):''}
				
				<Paper className='paperPadding flexGrow' rounded={false}>
					{this.state.hasSubmitted?(<h3>
						Tack för att ni kontaktar oss! Vi kommer att höra av oss så snart vi kan!
					</h3>):(<div>
						<h3>Intresserad?</h3>
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
		    			<RaisedButton
		    				label='Skicka in'
		    				type='submit'
		    				/>
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
		oldPartners : PreviousPartners.find({},{sort:{redaxNumber:-1}}).fetch(),
		partnerDeals : PartnerDeals.find({},{sort:{price:1}}).fetch(),
		exampleAds : ExampleAds.find({},{sort:{name:1}}).fetch(),


	};
}, Partners);